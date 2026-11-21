import React from 'react';
import { PhysicsProblem } from '../physics/problems';
import { formatIndonesianDecimal } from '../physics/grading';
import { MathText } from './MathText';

interface StimulusDiagramProps {
  problem: PhysicsProblem;
  showFBD?: boolean;
}

export const StimulusDiagram: React.FC<StimulusDiagramProps> = ({
  problem,
  showFBD = true,
}) => {
  const cfg = problem.physicsConfig;

  const renderStimulusSVG = () => {
    if (problem.stimulusType === 'graph-drop') {
      // Clean parabolic drop curve Delta y = 0.5 g t^2 (conceptual, no exact answer leak!)
      const points: string[] = [];
      for (let i = 0; i <= 20; i++) {
        const frac = i / 20;
        const x = 50 + frac * 240;
        const y = 35 + frac * frac * 125;
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return (
        <svg viewBox="0 0 340 195" className="w-full h-auto max-h-[210px]">
          <rect width="340" height="195" rx="10" fill="#FAFAFA" />
          {/* Axes */}
          <line x1="50" y1="35" x2="305" y2="35" stroke="#52525B" strokeWidth="1.5" />
          <line x1="50" y1="25" x2="50" y2="175" stroke="#52525B" strokeWidth="1.5" />
          <text x="308" y="39" fontSize="11" fontWeight="600" fill="#18181B">
            t (s)
          </text>
          <text x="14" y="170" fontSize="11" fontWeight="600" fill="#18181B">
            Δy (m)
          </text>
          <text x="36" y="32" fontSize="10" fill="#52525B">
            0
          </text>
          {/* Curve */}
          <polyline
            fill="none"
            stroke="#CA8A04"
            strokeWidth="2.8"
            points={points.join(' ')}
          />
          <text x="150" y="90" fontSize="11" fontWeight="600" fill="#854D0E">
            Δy = ½ g t² (identik utk 1 &amp; 2)
          </text>
          {/* Marker at generic t_perp */}
          <line
            x1="194"
            y1="35"
            x2="194"
            y2="80"
            stroke="#18181B"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <line
            x1="50"
            y1="80"
            x2="194"
            y2="80"
            stroke="#18181B"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <circle cx="194" cy="80" r="4" fill="#18181B" />
          <text x="188" y="25" fontSize="10" fontWeight="700" fill="#18181B">
            t⊥
          </text>
          <text x="20" y="84" fontSize="10" fontWeight="700" fill="#18181B">
            Δy?
          </text>
        </svg>
      );
    }

    if (problem.stimulusType === 'graph-angle') {
      return (
        <svg viewBox="0 0 340 195" className="w-full h-auto max-h-[210px]">
          <rect width="340" height="195" rx="10" fill="#FAFAFA" />
          {/* Axes */}
          <line x1="48" y1="165" x2="310" y2="165" stroke="#52525B" strokeWidth="1.5" />
          <line x1="48" y1="22" x2="48" y2="165" stroke="#52525B" strokeWidth="1.5" />
          <text x="312" y="169" fontSize="11" fontWeight="600" fill="#18181B">
            t
          </text>
          <text x="12" y="26" fontSize="11" fontWeight="600" fill="#18181B">
            θ(°)
          </text>
          {/* Reference angle lines */}
          <line x1="48" y1="35" x2="300" y2="35" stroke="#E4E4E7" strokeDasharray="3 3" />
          <text x="14" y="39" fontSize="10" fill="#52525B">
            180°
          </text>
          <line x1="48" y1="100" x2="300" y2="100" stroke="#E4E4E7" strokeDasharray="3 3" />
          <text x="20" y="104" fontSize="10" fill="#52525B">
            90°
          </text>
          <line x1="48" y1="122" x2="260" y2="122" stroke="#CA8A04" strokeDasharray="4 3" />
          <text x="20" y="126" fontSize="10" fontWeight="700" fill="#854D0E">
            60°
          </text>
          {/* Curve decreasing from 180° */}
          <path
            d="M 48 35 C 95 45, 130 92, 165 108 C 205 126, 250 144, 300 155"
            fill="none"
            stroke="#18181B"
            strokeWidth="2.5"
          />
          <circle cx="195" cy="122" r="4.5" fill="#FACC15" stroke="#18181B" strokeWidth="1.8" />
          <text x="204" y="114" fontSize="10" fontWeight="700" fill="#18181B">
            θ = 60° (d = ?)
          </text>
        </svg>
      );
    }

    // Standard geometric / kinematic setup SVG matching exact problem geometry
    const hasDelay = Boolean(cfg.delay2);
    const hasInitialSep = Boolean(cfg.initialX2);
    const hasAngle2 = Boolean(cfg.launchAngle2Deg);
    const hasWind = Boolean(cfg.ax);
    const isTriangle = problem.stimulusType === 'triangle-area';
    const isBounce = problem.stimulusType === 'bounce';

    const p1StartX = hasInitialSep ? 105 : 170;
    const p2StartX = hasInitialSep ? 235 : 170;
    const startY = 48;

    return (
      <svg viewBox="0 0 340 195" className="w-full h-auto max-h-[210px]">
        <defs>
          <marker
            id={`arr-dark-${problem.id}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L7,3 z" fill="#18181B" />
          </marker>
          <marker
            id={`arr-gold-${problem.id}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L7,3 z" fill="#CA8A04" />
          </marker>
          <marker
            id={`arr-blue-${problem.id}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L7,3 z" fill="#0284C7" />
          </marker>
          <marker
            id={`arr-red-${problem.id}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L7,3 z" fill="#DC2626" />
          </marker>
        </defs>

        <rect width="340" height="195" rx="10" fill="#FAFAFA" />

        {/* Gravity arrow */}
        <line
          x1="312"
          y1="26"
          x2="312"
          y2="72"
          stroke="#DC2626"
          strokeWidth="2.2"
          markerEnd={`url(#arr-red-${problem.id})`}
        />
        <text x="302" y="53" textAnchor="end" fontSize="10.5" fontWeight="700" fill="#DC2626">
          g = {formatIndonesianDecimal(cfg.g)} m/s²
        </text>

        {/* Wind arrows if Q13 */}
        {hasWind && (
          <g>
            <line
              x1="28"
              y1="145"
              x2="78"
              y2="145"
              stroke="#0284C7"
              strokeWidth="2"
              markerEnd={`url(#arr-blue-${problem.id})`}
            />
            <text x="24" y="135" fontSize="10" fontWeight="700" fill="#0284C7">
              Angin a_x = +{formatIndonesianDecimal(cfg.ax ?? 0)} m/s²
            </text>
          </g>
        )}

        {/* Parabolic preview arcs */}
        {isBounce ? (
          <>
            <line x1="25" y1="138" x2="315" y2="138" stroke="#18181B" strokeWidth="2" />
            <text x="30" y="153" fontSize="10" fontWeight="600" fill="#52525B">
              Lantai horizontal licin elastis (e = 1)
            </text>
            <path
              d="M 170 48 Q 195 60 210 138 Q 230 62 250 138"
              fill="none"
              stroke="#CA8A04"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <path
              d="M 170 48 Q 120 62 85 138 Q 52 62 25 138"
              fill="none"
              stroke="#18181B"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </>
        ) : (
          <>
            {/* Trajectory 1 (right) */}
            <path
              d={`M ${p1StartX} ${startY} Q ${p1StartX + 45} ${startY + 18} ${p1StartX + 78} 152`}
              fill="none"
              stroke="#CA8A04"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            {/* Trajectory 2 (left) */}
            {hasAngle2 ? (
              <path
                d={`M ${p2StartX} ${startY} Q ${p2StartX - 45} ${startY - 38} ${p2StartX - 95} 152`}
                fill="none"
                stroke="#18181B"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            ) : (
              <path
                d={`M ${p2StartX} ${startY} Q ${p2StartX - 55} ${startY + 18} ${p2StartX - 95} 152`}
                fill="none"
                stroke="#18181B"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            )}
          </>
        )}

        {/* Triangle overlay for Q14 */}
        {isTriangle && (
          <polygon
            points="170,48 238,140 78,140"
            fill="rgba(250, 204, 21, 0.28)"
            stroke="#CA8A04"
            strokeWidth="1.5"
          />
        )}

        {/* Initial velocity arrows */}
        <line
          x1={p1StartX}
          y1={startY}
          x2={p1StartX + 52}
          y2={startY}
          stroke="#CA8A04"
          strokeWidth="2.4"
          markerEnd={`url(#arr-gold-${problem.id})`}
        />
        <text x={p1StartX + 10} y={startY - 10} fontSize="10.5" fontWeight="700" fill="#854D0E">
          v₁ = {formatIndonesianDecimal(cfg.v1)} m/s
        </text>

        {hasAngle2 ? (
          <>
            <line
              x1={p2StartX}
              y1={startY}
              x2={p2StartX - 48}
              y2={startY - 32}
              stroke="#18181B"
              strokeWidth="2.4"
              markerEnd={`url(#arr-dark-${problem.id})`}
            />
            <line
              x1={p2StartX}
              y1={startY}
              x2={p2StartX - 56}
              y2={startY}
              stroke="#A1A1AA"
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
            <text x={p2StartX - 118} y={startY - 22} fontSize="10.5" fontWeight="700" fill="#18181B">
              v₂ = {formatIndonesianDecimal(cfg.v2)} (37°)
            </text>
          </>
        ) : (
          <>
            <line
              x1={p2StartX}
              y1={startY}
              x2={p2StartX - 58}
              y2={startY}
              stroke="#18181B"
              strokeWidth="2.4"
              markerEnd={`url(#arr-dark-${problem.id})`}
            />
            <text x={p2StartX - 96} y={startY - 10} fontSize="10.5" fontWeight="700" fill="#18181B">
              v₂ = {formatIndonesianDecimal(cfg.v2)} m/s
            </text>
          </>
        )}

        {/* Initial separation marker */}
        {hasInitialSep && (
          <>
            <line
              x1={p1StartX}
              y1={startY + 18}
              x2={p2StartX}
              y2={startY + 18}
              stroke="#52525B"
              strokeWidth="1.2"
            />
            <text x="148" y={startY + 32} fontSize="10" fontWeight="700" fill="#18181B">
              x₀ = {formatIndonesianDecimal(cfg.initialX2 ?? 0)} m
            </text>
          </>
        )}

        {/* Delay tag */}
        {hasDelay && (
          <text x="82" y="178" fontSize="10" fontWeight="700" fill="#854D0E">
            Catatan: B dilepas Δt = {formatIndonesianDecimal(cfg.delay2 ?? 0)} s lebih lambat
          </text>
        )}

        {/* Particle dots at start */}
        <circle cx={p1StartX} cy={startY} r="5.5" fill="#FACC15" stroke="#18181B" strokeWidth="1.8" />
        {hasInitialSep && (
          <circle cx={p2StartX} cy={startY} r="5.5" fill="#18181B" stroke="#FACC15" strokeWidth="1.5" />
        )}
        <text x={p1StartX - 8} y={startY + 18} fontSize="10" fontWeight="700" fill="#18181B">
          O
        </text>
      </svg>
    );
  };

  const renderFBDSVG = () => {
    return (
      <svg viewBox="0 0 220 195" className="w-full h-auto max-h-[210px]">
        <defs>
          {problem.fbdForces.map((force, idx) => (
            <marker
              key={idx}
              id={`fbd-arr-${problem.id}-${idx}`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L7,3 z" fill={force.color} />
            </marker>
          ))}
        </defs>

        <rect width="220" height="195" rx="10" fill="#FAFAFA" />

        {/* Coordinate axes */}
        <line x1="25" y1="95" x2="195" y2="95" stroke="#D4D4D8" strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="110" y1="20" x2="110" y2="175" stroke="#D4D4D8" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="184" y="88" fontSize="10" fontWeight="600" fill="#71717A">
          +x
        </text>
        <text x="116" y="28" fontSize="10" fontWeight="600" fill="#71717A">
          +y
        </text>

        {/* Force vectors starting from center of mass (110, 95) */}
        {problem.fbdForces.map((force, idx) => {
          const rad = (force.directionDeg * Math.PI) / 180;
          const len = 56;
          const tx = 110 + len * Math.cos(rad);
          const ty = 95 - len * Math.sin(rad);
          return (
            <g key={idx}>
              <line
                x1="110"
                y1="95"
                x2={tx}
                y2={ty}
                stroke={force.color}
                strokeWidth="2.8"
                markerEnd={`url(#fbd-arr-${problem.id}-${idx})`}
              />
              <text
                x={force.directionDeg === 0 ? tx - 48 : tx + 8}
                y={force.directionDeg === 270 ? ty - 6 : force.directionDeg === 90 ? ty + 10 : ty - 10}
                fontSize="11"
                fontWeight="700"
                fill={force.color}
              >
                {force.label.split(' ')[0]} {force.label.split(' ')[1]}
              </text>
            </g>
          );
        })}

        {/* Particle body */}
        <circle cx="110" cy="95" r="10" fill="#FACC15" stroke="#18181B" strokeWidth="2.2" />
        <text x="105" y="99" fontSize="10" fontWeight="800" fill="#18181B">
          m
        </text>
      </svg>
    );
  };

  return (
    <div className={`grid gap-4 ${showFBD ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
      {/* Stimulus Diagram */}
      <div className={`${showFBD ? 'lg:col-span-7' : ''} rounded-2xl border border-zinc-200 bg-white p-4`}>
        <div className="text-xs font-semibold text-zinc-900 mb-2">
          <MathText text={problem.stimulusLabel} />
        </div>
        {renderStimulusSVG()}
        <p className="text-xs text-zinc-600 mt-2.5 leading-relaxed">
          <MathText text={problem.stimulusNote} />
        </p>
      </div>

      {/* Free Body Diagram */}
      {showFBD && (
        <div className="lg:col-span-5 rounded-2xl border border-zinc-200 bg-white p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-zinc-900 mb-2">{problem.fbdTitle}</div>
            {renderFBDSVG()}
          </div>
          <div className="mt-2.5 space-y-1.5">
            {problem.fbdForces.map((force, idx) => (
              <div key={idx} className="text-xs text-zinc-700 leading-snug">
                <span className="font-semibold" style={{ color: force.color }}>
                  {force.label}:
                </span>{' '}
                <MathText text={force.description} />
              </div>
            ))}
            <p className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-100">
              <MathText text={problem.fbdNote} />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
