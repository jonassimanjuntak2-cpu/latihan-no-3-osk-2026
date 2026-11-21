import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FastForward, Pause, Play, RotateCcw, Rewind } from 'lucide-react';
import {
  computeKinematicState,
  PhysicsScenarioConfig,
} from '../physics/simulationMath';
import { formatIndonesianDecimal } from '../physics/grading';

interface PhysicsCanvasAnimationProps {
  config: PhysicsScenarioConfig;
  title?: string;
  problemId?: number;
  /** When false (before student solves/opens solution), hides exact critical answer readouts */
  revealCriticalMetrics?: boolean;
  /** Optional external controlled time or key to reset on problem switch */
  resetKey?: string | number;
}

const SPEEDS = [0.25, 0.5, 1.0, 1.5, 2.0];

export const PhysicsCanvasAnimation: React.FC<PhysicsCanvasAnimationProps> = ({
  config,
  title = 'Animasi Pembuktian Fenomena Fisika',
  problemId,
  revealCriticalMetrics = true,
  resetKey,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [t, setT] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(2); // 1.0x default
  const lastFrameRef = useRef<number | null>(null);

  const speedMultiplier = SPEEDS[speedIdx];

  // Reset cleanly when problem or scenario changes
  useEffect(() => {
    setIsPlaying(false);
    setT(0);
    lastFrameRef.current = null;
  }, [resetKey, config.v1, config.v2, config.g, config.ax, config.launchAngle2Deg, config.delay2]);

  // Animation loop using requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      lastFrameRef.current = null;
      return;
    }

    let rafId = 0;
    const step = (now: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = now;
      }
      const dtReal = Math.min(0.05, (now - lastFrameRef.current) / 1000);
      lastFrameRef.current = now;

      setT((prev) => {
        const next = prev + dtReal * speedMultiplier;
        if (next >= config.tMax) {
          setIsPlaying(false);
          return config.tMax;
        }
        return next;
      });

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, speedMultiplier, config.tMax]);

  const snap = useMemo(() => computeKinematicState(config, t), [config, t]);

  // Precompute bounding box across [0, tMax] so camera never jumps
  const bounds = useMemo(() => {
    let minX = -1;
    let maxX = 1;
    let minY = -1;
    let maxY = 0.5;
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const sampleT = (i / steps) * config.tMax;
      const s = computeKinematicState(config, sampleT);
      minX = Math.min(minX, s.x1, s.x2);
      maxX = Math.max(maxX, s.x1, s.x2);
      minY = Math.min(minY, s.y1, s.y2);
      maxY = Math.max(maxY, s.y1, s.y2);
    }
    const padX = Math.max(1.2, (maxX - minX) * 0.18);
    const padY = Math.max(0.8, (maxY - minY) * 0.22);
    return {
      minX: minX - padX,
      maxX: maxX + padX,
      minY: minY - padY,
      maxY: maxY + padY * 0.55,
    };
  }, [config]);

  // Draw physics canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const cssWidth = canvas.clientWidth || 640;
    const cssHeight = canvas.clientHeight || 340;
    if (canvas.width !== Math.round(cssWidth * dpr) || canvas.height !== Math.round(cssHeight * dpr)) {
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Clear white technical backdrop
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    const worldW = bounds.maxX - bounds.minX;
    const worldH = bounds.maxY - bounds.minY;
    const scale = Math.min((cssWidth - 40) / worldW, (cssHeight - 40) / worldH);
    const offsetX = (cssWidth - worldW * scale) / 2 - bounds.minX * scale;
    const offsetY = (cssHeight - worldH * scale) / 2 + bounds.maxY * scale;

    const toPx = (wx: number, wy: number) => ({
      x: wx * scale + offsetX,
      y: offsetY - wy * scale,
    });

    // Subtle scientific grid
    ctx.strokeStyle = '#F4F4F5';
    ctx.lineWidth = 1;
    const gridStep = worldW > 14 ? 2 : 1;
    for (let gx = Math.ceil(bounds.minX); gx <= Math.floor(bounds.maxX); gx += gridStep) {
      const p = toPx(gx, 0);
      ctx.beginPath();
      ctx.moveTo(p.x, 12);
      ctx.lineTo(p.x, cssHeight - 12);
      ctx.stroke();
    }
    for (let gy = Math.ceil(bounds.minY); gy <= Math.floor(bounds.maxY); gy += gridStep) {
      const p = toPx(0, gy);
      ctx.beginPath();
      ctx.moveTo(12, p.y);
      ctx.lineTo(cssWidth - 12, p.y);
      ctx.stroke();
    }

    // Origin axes
    const origin = toPx(0, 0);
    ctx.strokeStyle = '#E4E4E7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(16, origin.y);
    ctx.lineTo(cssWidth - 16, origin.y);
    ctx.moveTo(origin.x, 16);
    ctx.lineTo(origin.x, cssHeight - 16);
    ctx.stroke();

    // Elastic floor for Q15
    if (config.bounceAtFirstPerp && config.tBounce !== undefined) {
      const floorY = -0.5 * config.g * config.tBounce * config.tBounce;
      const floorPx = toPx(0, floorY);
      ctx.fillStyle = '#FEF3C7';
      ctx.fillRect(16, floorPx.y, cssWidth - 32, cssHeight - floorPx.y - 8);
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(16, floorPx.y);
      ctx.lineTo(cssWidth - 16, floorPx.y);
      ctx.stroke();
      ctx.fillStyle = '#52525B';
      ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Lantai Horizontal Elastis (e = 1)', 24, floorPx.y + 16);
    }

    // Wind arrows for Q13 or custom ax != 0
    if (config.ax && Math.abs(config.ax) > 0.01) {
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.35)';
      ctx.fillStyle = 'rgba(2, 132, 199, 0.55)';
      ctx.lineWidth = 1.5;
      const dir = config.ax > 0 ? 1 : -1;
      for (let row = 0; row < 3; row++) {
        const yPos = 42 + row * 95;
        ctx.beginPath();
        ctx.moveTo(30, yPos);
        ctx.lineTo(80, yPos);
        ctx.stroke();
        const tipX = dir > 0 ? 80 : 30;
        ctx.beginPath();
        ctx.moveTo(tipX, yPos);
        ctx.lineTo(tipX - dir * 7, yPos - 4);
        ctx.lineTo(tipX - dir * 7, yPos + 4);
        ctx.closePath();
        ctx.fill();
      }
      ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`Angin a_x = ${formatIndonesianDecimal(config.ax)} m/s²`, 28, 28);
    }

    // Triangle area shading for Q14
    const p1 = toPx(snap.x1, snap.y1);
    const p2 = toPx(snap.x2, snap.y2);
    if (problemId === 14 && t > 0.02) {
      ctx.fillStyle = 'rgba(250, 204, 21, 0.28)';
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.fill();
    }

    // Trajectory trails up to current time t
    const trailSteps = Math.max(2, Math.round((t / Math.max(0.01, config.tMax)) * 80));
    const drawTrail = (which: 1 | 2, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let i = 0; i <= trailSteps; i++) {
        const st = (i / trailSteps) * t;
        const ss = computeKinematicState(config, st);
        const pt = toPx(which === 1 ? ss.x1 : ss.x2, which === 1 ? ss.y1 : ss.y2);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };

    if (t > 0.005) {
      drawTrail(1, '#EAB308');
      drawTrail(2, '#18181B');
    }

    // Separation line between P1 and P2
    if (t > 0.005) {
      ctx.strokeStyle = '#71717A';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.setLineDash([]);

      if (revealCriticalMetrics) {
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2 - 8;
        ctx.fillStyle = '#3F3F46';
        ctx.font = '600 11px "IBM Plex Mono", monospace';
        const dLabel = `d = ${formatIndonesianDecimal(snap.separationDistance)} m`;
        const w = ctx.measureText(dLabel).width;
        ctx.fillText(dLabel, midX - w / 2, midY);
      }
    }

    // Origin marker
    ctx.fillStyle = '#18181B';
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('O (0,0)', origin.x + 7, origin.y - 7);

    // Initial separation marker for Q9
    if (config.initialX2 && Math.abs(config.initialX2) > 0.01) {
      const p2Start = toPx(config.initialX2, 0);
      ctx.fillStyle = '#18181B';
      ctx.beginPath();
      ctx.arc(p2Start.x, p2Start.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(`Start B (${formatIndonesianDecimal(config.initialX2)} m)`, p2Start.x - 42, p2Start.y - 10);
    }

    // Draw velocity vector helper
    const vecScale = 4.2;
    const drawArrow = (
      fromX: number,
      fromY: number,
      vx: number,
      vy: number,
      color: string,
      label: string
    ) => {
      const toX = fromX + vx * vecScale;
      const toY = fromY - vy * vecScale;
      const angle = Math.atan2(toY - fromY, toX - fromX);
      const len = Math.hypot(toX - fromX, toY - fromY);
      if (len < 2) return;

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      const head = 7.5;
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - head * Math.cos(angle - Math.PI / 6), toY - head * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - head * Math.cos(angle + Math.PI / 6), toY - head * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(label, toX + (vx >= 0 ? 6 : -22), toY + (vy <= 0 ? 12 : -6));
    };

    // Draw velocity vectors on particles
    drawArrow(p1.x, p1.y, snap.vx1, snap.vy1, '#CA8A04', 'v₁');
    if (t >= (config.delay2 ?? 0)) {
      drawArrow(p2.x, p2.y, snap.vx2, snap.vy2, '#18181B', 'v₂');
    }

    // Draw particle bodies
    ctx.fillStyle = '#FACC15';
    ctx.strokeStyle = '#18181B';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(p1.x, p1.y, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#18181B';
    ctx.strokeStyle = '#FACC15';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p2.x, p2.y, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Inset Vector Angle Comparison Box (top-right corner) showing v1 & v2 tail-to-tail!
    const boxW = 148;
    const boxH = 118;
    const boxX = cssWidth - boxW - 12;
    const boxY = 12;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
    ctx.strokeStyle = '#E4E4E7';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#52525B';
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Sudut Antar Vektor', boxX + 10, boxY + 17);

    const cx = boxX + boxW / 2;
    const cy = boxY + 52;
    const maxV = Math.max(snap.speed1, snap.speed2, 8);
    const vNormScale = 36 / maxV;

    const u1x = snap.vx1 * vNormScale;
    const u1y = -snap.vy1 * vNormScale;
    const u2x = snap.vx2 * vNormScale;
    const u2y = -snap.vy2 * vNormScale;

    // Right-angle indicator when perpendicular
    const targetAng = config.targetAngleDeg ?? 90;
    const isTargetMet = Math.abs(snap.angleDeg - targetAng) <= 2.2;
    if (targetAng === 90 && isTargetMet && snap.speed1 > 0.1 && snap.speed2 > 0.1) {
      const len1 = Math.hypot(u1x, u1y);
      const len2 = Math.hypot(u2x, u2y);
      const n1x = (u1x / len1) * 10;
      const n1y = (u1y / len1) * 10;
      const n2x = (u2x / len2) * 10;
      const n2y = (u2y / len2) * 10;
      ctx.strokeStyle = '#16A34A';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cx + n1x, cy + n1y);
      ctx.lineTo(cx + n1x + n2x, cy + n1y + n2y);
      ctx.lineTo(cx + n2x, cy + n2y);
      ctx.stroke();
    }

    // Draw tail-to-tail vectors in inset
    const drawMiniVec = (dx: number, dy: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + dx, cy + dy);
      ctx.stroke();
    };
    drawMiniVec(u1x, u1y, '#CA8A04');
    drawMiniVec(u2x, u2y, '#18181B');

    ctx.fillStyle = isTargetMet ? '#15803D' : '#18181B';
    ctx.font = '700 12px "IBM Plex Mono", monospace';
    ctx.fillText(
      `θ = ${snap.angleDeg.toFixed(1).replace('.', ',')}°`,
      boxX + 10,
      boxY + boxH - 12
    );

    ctx.restore();
  }, [snap, bounds, config, problemId, revealCriticalMetrics, t]);

  // Phase commentary explaining physical cause-and-effect at time t
  const phaseComment = useMemo(() => {
    const target = config.targetAngleDeg ?? 90;
    if (t < 0.03) {
      return 'Keadaan awal (t = 0,0 s): Kedua benda bersiap meluncur sesuai kondisi awal soal; gaya berat mulai bekerja ke bawah.';
    }
    if (config.delay2 && t < config.delay2) {
      return `Fase tunda (t < ${formatIndonesianDecimal(config.delay2)} s): Partikel A sudah meluncur ke kanan bawah, partikel B belum dilepas.`;
    }
    if (config.bounceAtFirstPerp && config.tBounce && Math.abs(t - config.tBounce) < 0.06) {
      return `Momen pantulan pertama (t = ${formatIndonesianDecimal(config.tBounce)} s): Kecepatan saling tegak lurus pertama kali tepat saat menyentuh lantai elastis!`;
    }
    if (config.bounceAtFirstPerp && config.tBounce && t > config.tBounce && t < config.tStar - 0.05) {
      return 'Fase pasca-pantul: Kedua partikel melambung naik lalu turun; |v_y| lebih kecil dari laju pantul sehingga sudut antar vektor menjadi tumpul (> 90°).';
    }
    if (Math.abs(snap.angleDeg - target) <= 2.2) {
      return `Momen kritis tercapai! Sudut antar vektor kecepatan tepat ${target}°${
        revealCriticalMetrics ? ` pada t = ${formatIndonesianDecimal(t)} s` : ''
      }.`;
    }
    if (t < config.tStar) {
      return 'Selama jatuh, komponen v_x konstan (atau bergeser seragam bila ada angin), sedangkan v_y terus bertambah ke bawah sehingga sudut antar vektor mengecil.';
    }
    return 'Setelah melewati sudut target, tarikan gravitasi terus memutar kedua vektor kecepatan semakin sejajar mengarah ke bawah.';
  }, [t, config, snap.angleDeg, revealCriticalMetrics]);

  return (
    <div
      data-testid={problemId ? `physics-animation-q${problemId}` : 'physics-animation'}
      className="rounded-2xl border border-zinc-200 bg-white overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">{title}</h4>
          <p className="text-xs text-zinc-500">
            Benda 1 (kuning) vs Benda 2 (hitam) · Gerak mengikuti hukum Newton & kinematika 2D
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono-tabular">
          <span className="text-zinc-700">
            t = <strong className="text-zinc-950">{formatIndonesianDecimal(t)} s</strong>
          </span>
          <span className="text-zinc-300">|</span>
          <span className="text-zinc-700">
            θ = <strong className="text-zinc-950">{formatIndonesianDecimal(snap.angleDeg)}°</strong>
          </span>
          {revealCriticalMetrics && (
            <>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-700">
                d = <strong className="text-zinc-950">{formatIndonesianDecimal(snap.separationDistance)} m</strong>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Canvas Stage */}
      <div className="relative bg-white p-2">
        <canvas
          ref={canvasRef}
          className="w-full h-[290px] sm:h-[330px] block rounded-xl border border-zinc-100"
        />
      </div>

      {/* Controls & Scrubber */}
      <div className="px-4 py-3 border-t border-zinc-200 bg-zinc-50/70 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {isPlaying ? (
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Pause className="w-3.5 h-3.5" />
                Jeda
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (t >= config.tMax - 0.005) setT(0);
                  setIsPlaying(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-yellow-400 text-zinc-950 border border-zinc-900 text-xs font-semibold hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Play className="w-3.5 h-3.5" />
                Putar Animasi
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setT(0);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-zinc-300 text-zinc-800 text-xs font-medium hover:bg-zinc-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Ulangi
            </button>

            <button
              type="button"
              onClick={() => setSpeedIdx((i) => Math.max(0, i - 1))}
              disabled={speedIdx === 0}
              aria-label="Perlambat animasi"
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white border border-zinc-300 text-zinc-700 text-xs font-medium hover:bg-zinc-100 disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Rewind className="w-3.5 h-3.5" />
              Perlambat
            </button>

            <button
              type="button"
              onClick={() => setSpeedIdx((i) => Math.min(SPEEDS.length - 1, i + 1))}
              disabled={speedIdx === SPEEDS.length - 1}
              aria-label="Percepat animasi"
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white border border-zinc-300 text-zinc-700 text-xs font-medium hover:bg-zinc-100 disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <FastForward className="w-3.5 h-3.5" />
              Percepat
            </button>

            <span className="text-xs font-mono-tabular text-zinc-600 px-1">
              Laju: {String(speedMultiplier).replace('.', ',')}x
            </span>
          </div>

          {revealCriticalMetrics && (
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setT(config.tStar);
              }}
              className="px-3 py-1.5 rounded-lg bg-yellow-100 border border-yellow-400 text-zinc-900 text-xs font-semibold hover:bg-yellow-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Lompat ke Momen Kritis (t*)
            </button>
          )}
        </div>

        {/* Time Scrubber */}
        <div className="flex items-center gap-3">
          <label
            htmlFor={`scrubber-${problemId ?? 'lab'}`}
            className="text-xs font-medium text-zinc-600 whitespace-nowrap"
          >
            Geser Waktu
          </label>
          <input
            id={`scrubber-${problemId ?? 'lab'}`}
            type="range"
            min={0}
            max={config.tMax}
            step={0.01}
            value={t}
            onChange={(e) => {
              setIsPlaying(false);
              setT(Number(e.target.value));
            }}
            className="w-full accent-yellow-500 cursor-pointer"
          />
          <span className="text-xs font-mono-tabular text-zinc-700 w-16 text-right">
            {t.toFixed(2).replace('.', ',')} s
          </span>
        </div>

        <p className="text-xs text-zinc-700 leading-relaxed bg-white border border-zinc-200 rounded-xl px-3 py-2">
          {phaseComment}
        </p>
      </div>
    </div>
  );
};
