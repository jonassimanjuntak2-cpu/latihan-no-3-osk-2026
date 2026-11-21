import React, { useMemo, useState } from 'react';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { PhysicsCanvasAnimation } from './PhysicsCanvasAnimation';
import {
  computeKinematicState,
  PhysicsScenarioConfig,
  solveCanonicalDistance,
  solveCanonicalPerpTime,
} from '../physics/simulationMath';
import { formatIndonesianDecimal } from '../physics/grading';
import { MisterJoNarrator } from './MisterJoNarrator';
import { AppView } from './Navbar';

interface SimulationLabViewProps {
  onNavigate: (view: AppView) => void;
}

const LAB_SCRIPT =
  'Selamat datang di Laboratorium Simulasi Fisika Soal Nomor Tiga! Di sini kamu bebas mengubah nilai kelajuan awal benda satu, kelajuan awal benda dua, percepatan gravitasi g, sudut lempar benda dua, dan percepatan angin horizontal. Cobalah tekan preset Soal Asli OSK untuk melihat gerakan asli dengan v satu tiga meter per detik dan v dua empat meter per detik. Perhatikan bagaimana posisi kedua benda dan sudut antara vektor kecepatannya berubah setiap detik!';

export const SimulationLabView: React.FC<SimulationLabViewProps> = ({
  onNavigate,
}) => {
  const [v1, setV1] = useState(3.0);
  const [v2, setV2] = useState(4.0);
  const [g, setG] = useState(9.8);
  const [launchAngle2Deg, setLaunchAngle2Deg] = useState(0);
  const [ax, setAx] = useState(0);

  // Analytically find tStar (perpendicular velocity time) numerically when angled/windy
  const analyticalSummary = useMemo(() => {
    if (launchAngle2Deg === 0 && ax === 0) {
      const tStar = solveCanonicalPerpTime(v1, v2, g);
      const dStar = solveCanonicalDistance(v1, v2, g);
      return { tStar, dStar, dropStar: 0.5 * g * tStar * tStar };
    }
    // General quadratic for v1(t).v2(t) = 0:
    // (v1 + ax*t)(-v2*cos(a) + ax*t) + (-g*t)(v2*sin(a) - g*t) = 0
    const rad = (launchAngle2Deg * Math.PI) / 180;
    const v2x0 = -v2 * Math.cos(rad);
    const v2y0 = v2 * Math.sin(rad);
    const A = ax * ax + g * g;
    const B = ax * (v1 + v2x0) - g * v2y0;
    const C = v1 * v2x0;
    const disc = B * B - 4 * A * C;
    const tStar = disc >= 0 ? Math.max(0.05, (-B + Math.sqrt(disc)) / (2 * A)) : 0.5;
    const snap = computeKinematicState(
      { v1, v2, g, launchAngle2Deg, ax, tMax: Math.max(1.2, tStar * 1.6), tStar },
      tStar
    );
    return { tStar, dStar: snap.separationDistance, dropStar: snap.drop1 };
  }, [v1, v2, g, launchAngle2Deg, ax]);

  const config: PhysicsScenarioConfig = useMemo(
    () => ({
      v1,
      v2,
      g,
      launchAngle2Deg,
      ax,
      tMax: Math.max(1.2, Number((analyticalSummary.tStar * 1.65).toFixed(2))),
      tStar: analyticalSummary.tStar,
    }),
    [v1, v2, g, launchAngle2Deg, ax, analyticalSummary.tStar]
  );

  const applyPresetOSK = () => {
    setV1(3.0);
    setV2(4.0);
    setG(9.8);
    setLaunchAngle2Deg(0);
    setAx(0);
  };

  const applyPresetBulan = () => {
    setV1(2.0);
    setV2(3.2);
    setG(1.6);
    setLaunchAngle2Deg(0);
    setAx(0);
  };

  const applyPresetAngin = () => {
    setV1(2.0);
    setV2(8.0);
    setG(10.0);
    setLaunchAngle2Deg(0);
    setAx(3.0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-5">
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-zinc-500">
            Laboratorium Interaktif · Pengamatan Hubungan Antarbesaran
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-zinc-950">
            Simulasi Fisika Kinematika Dua Proyektil
          </h1>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('latihan')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-400 border border-zinc-900 text-zinc-950 text-sm font-semibold hover:bg-yellow-300 cursor-pointer whitespace-nowrap shrink-0"
        >
          Masuk Latihan 15 Soal
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Two-Zone Sandbox Layout: Left Stage (65%) + Right Control Deck (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Interactive Stage */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <PhysicsCanvasAnimation
            config={config}
            title="Simulasi Interaktif Gerak Dua Benda"
            revealCriticalMetrics
          />
          <MisterJoNarrator title="Panduan Laboratorium Simulasi" script={LAB_SCRIPT} compact />
        </div>

        {/* Right Zone: Control & Concept Deck */}
        <aside className="lg:col-span-5 xl:col-span-4 rounded-2xl border border-zinc-200 bg-white p-5 space-y-5">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-200">
            <h2 className="text-base font-display font-bold text-zinc-950">
              Parameter Eksperimen
            </h2>
            <button
              type="button"
              onClick={applyPresetOSK}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 hover:text-zinc-950 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset OSK
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-zinc-500">Preset Cepat Fenomena</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={applyPresetOSK}
                className="px-2.5 py-1.5 rounded-lg bg-yellow-100 border border-yellow-300 text-xs font-semibold text-zinc-900 hover:bg-yellow-200 cursor-pointer"
              >
                Soal Asli No. 3
              </button>
              <button
                type="button"
                onClick={applyPresetBulan}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 hover:bg-zinc-200 cursor-pointer"
              >
                Gravitasi Bulan
              </button>
              <button
                type="button"
                onClick={applyPresetAngin}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 hover:bg-zinc-200 cursor-pointer"
              >
                Dengan Angin (a_x)
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor="sim-v1" className="font-medium text-zinc-700">
                  Kelajuan Awal Benda 1 (v₁)
                </label>
                <span className="font-mono-tabular font-semibold text-zinc-950">
                  {formatIndonesianDecimal(v1)} m/s
                </span>
              </div>
              <input
                id="sim-v1"
                type="range"
                min={1}
                max={12}
                step={0.5}
                value={v1}
                onChange={(e) => setV1(Number(e.target.value))}
                className="w-full accent-yellow-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor="sim-v2" className="font-medium text-zinc-700">
                  Kelajuan Awal Benda 2 (v₂)
                </label>
                <span className="font-mono-tabular font-semibold text-zinc-950">
                  {formatIndonesianDecimal(v2)} m/s
                </span>
              </div>
              <input
                id="sim-v2"
                type="range"
                min={1}
                max={12}
                step={0.5}
                value={v2}
                onChange={(e) => setV2(Number(e.target.value))}
                className="w-full accent-yellow-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor="sim-g" className="font-medium text-zinc-700">
                  Percepatan Gravitasi (g)
                </label>
                <span className="font-mono-tabular font-semibold text-zinc-950">
                  {formatIndonesianDecimal(g)} m/s²
                </span>
              </div>
              <input
                id="sim-g"
                type="range"
                min={1.6}
                max={15}
                step={0.2}
                value={g}
                onChange={(e) => setG(Number(e.target.value))}
                className="w-full accent-yellow-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor="sim-ang" className="font-medium text-zinc-700">
                  Sudut Elevasi Benda 2 (α₂)
                </label>
                <span className="font-mono-tabular font-semibold text-zinc-950">
                  {launchAngle2Deg}°
                </span>
              </div>
              <input
                id="sim-ang"
                type="range"
                min={0}
                max={45}
                step={1}
                value={launchAngle2Deg}
                onChange={(e) => setLaunchAngle2Deg(Number(e.target.value))}
                className="w-full accent-yellow-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor="sim-ax" className="font-medium text-zinc-700">
                  Percepatan Angin Horizontal (a_x)
                </label>
                <span className="font-mono-tabular font-semibold text-zinc-950">
                  {formatIndonesianDecimal(ax)} m/s²
                </span>
              </div>
              <input
                id="sim-ax"
                type="range"
                min={-4}
                max={4}
                step={0.5}
                value={ax}
                onChange={(e) => setAx(Number(e.target.value))}
                className="w-full accent-yellow-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Analytical Readout */}
          <div className="rounded-xl bg-yellow-50/80 border border-yellow-200 p-4 space-y-2.5">
            <div className="text-xs font-semibold text-zinc-900">
              Prediksi Analitis Saat v₁ ⊥ v₂ (θ = 90°)
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-zinc-500">Waktu Kritis (t*)</div>
                <div className="text-base font-mono-tabular font-bold text-zinc-950">
                  {formatIndonesianDecimal(analyticalSummary.tStar)} s
                </div>
              </div>
              <div>
                <div className="text-zinc-500">Jarak Pisah (d*)</div>
                <div className="text-base font-mono-tabular font-bold text-zinc-950">
                  {formatIndonesianDecimal(analyticalSummary.dStar)} m
                </div>
              </div>
              <div>
                <div className="text-zinc-500">Jatuh Benda 1 (Δy₁)</div>
                <div className="text-base font-mono-tabular font-bold text-zinc-950">
                  {formatIndonesianDecimal(analyticalSummary.dropStar)} m
                </div>
              </div>
              <div>
                <div className="text-zinc-500">Percepatan Relatif</div>
                <div className="text-base font-mono-tabular font-bold text-zinc-950">
                  0,0 m/s²
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
