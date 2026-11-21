import React from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { THEORY_LEVELS, TheoryLevel } from '../data/theoryContent';
import { MathBlock, MathText } from './MathText';
import { MisterJoNarrator } from './MisterJoNarrator';
import { AppView } from './Navbar';

interface TheoryViewProps {
  selectedLevel: number;
  onSelectLevel: (level: number) => void;
  onNavigate: (view: AppView) => void;
}

const LevelDiagram: React.FC<{ kind: TheoryLevel['diagramKind'] }> = ({ kind }) => {
  if (kind === 'fenomena-nyata') {
    return (
      <svg viewBox="0 0 560 190" className="w-full h-auto">
        <rect width="560" height="190" rx="12" fill="#FAFAFA" />
        {/* Bridge / Tower */}
        <rect x="248" y="38" width="64" height="140" fill="#E4E4E7" stroke="#A1A1AA" />
        <line x1="20" y1="178" x2="540" y2="178" stroke="#18181B" strokeWidth="2" />
        {/* Origin point */}
        <circle cx="280" cy="36" r="5" fill="#18181B" />
        {/* Ball 1 trajectory (right) */}
        <path d="M 280 36 Q 340 44 390 150" fill="none" stroke="#CA8A04" strokeWidth="2.5" strokeDasharray="5 3" />
        <circle cx="348" cy="76" r="7" fill="#FACC15" stroke="#18181B" strokeWidth="1.8" />
        <line x1="348" y1="76" x2="386" y2="114" stroke="#CA8A04" strokeWidth="2.4" />
        <text x="392" y="114" fontSize="11" fontWeight="700" fill="#854D0E">v₁(t)</text>

        {/* Ball 2 trajectory (left) */}
        <path d="M 280 36 Q 195 44 130 150" fill="none" stroke="#18181B" strokeWidth="2.5" strokeDasharray="5 3" />
        <circle cx="195" cy="76" r="7" fill="#18181B" stroke="#FACC15" strokeWidth="1.6" />
        <line x1="195" y1="76" x2="152" y2="119" stroke="#18181B" strokeWidth="2.4" />
        <text x="122" y="118" fontSize="11" fontWeight="700" fill="#18181B">v₂(t)</text>

        {/* Equal height horizontal dashed line */}
        <line x1="195" y1="76" x2="348" y2="76" stroke="#71717A" strokeWidth="1.3" strokeDasharray="3 3" />
        <text x="272" y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3F3F46">
          Ketinggian selalu sama · Jarak = d
        </text>
        <text x="280" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#18181B">
          Pelemparan Serentak dari Titik O
        </text>
      </svg>
    );
  }

  if (kind === 'superposisi-vektor') {
    return (
      <svg viewBox="0 0 560 190" className="w-full h-auto">
        <rect width="560" height="190" rx="12" fill="#FAFAFA" />
        {/* Left: FBD */}
        <text x="115" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#18181B">
          Free Body Diagram (Gaya Nyata)
        </text>
        <circle cx="115" cy="82" r="11" fill="#FACC15" stroke="#18181B" strokeWidth="2" />
        <line x1="115" y1="82" x2="115" y2="148" stroke="#DC2626" strokeWidth="3" />
        <polygon points="115,155 110,144 120,144" fill="#DC2626" />
        <text x="126" y="138" fontSize="11" fontWeight="700" fill="#DC2626">W = mg</text>
        <text x="115" y="175" textAnchor="middle" fontSize="10" fill="#52525B">
          ΣF_x = 0 (tidak ada gaya samping!)
        </text>

        {/* Divider */}
        <line x1="245" y1="20" x2="245" y2="175" stroke="#E4E4E7" strokeWidth="1.5" />

        {/* Right: Superposition */}
        <text x="405" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#18181B">
          Penguraian Komponen Kecepatan
        </text>
        <circle cx="345" cy="64" r="6" fill="#18181B" />
        {/* Horizontal component */}
        <line x1="345" y1="64" x2="435" y2="64" stroke="#CA8A04" strokeWidth="2.2" strokeDasharray="4 2" />
        <text x="392" y="56" fontSize="10.5" fontWeight="700" fill="#854D0E">v_x = konstan (GLB)</text>
        {/* Vertical component */}
        <line x1="345" y1="64" x2="345" y2="144" stroke="#0284C7" strokeWidth="2.2" strokeDasharray="4 2" />
        <text x="275" y="112" fontSize="10.5" fontWeight="700" fill="#0284C7">v_y = -gt</text>
        {/* Resultant */}
        <line x1="345" y1="64" x2="435" y2="144" stroke="#18181B" strokeWidth="3" />
        <text x="440" y="148" fontSize="11" fontWeight="800" fill="#18181B">v(t)</text>
        <rect x="427" y="64" width="8" height="8" fill="none" stroke="#A1A1AA" />
      </svg>
    );
  }

  if (kind === 'penurunan-rumus') {
    return (
      <svg viewBox="0 0 560 190" className="w-full h-auto">
        <rect width="560" height="190" rx="12" fill="#FAFAFA" />
        <text x="280" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#18181B">
          Geometri Sudut Siku-Siku antara v₁(t) dan v₂(t)
        </text>
        {/* Tail-to-tail vectors at origin (280, 58) */}
        <line x1="280" y1="45" x2="280" y2="165" stroke="#D4D4D8" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="140" y1="58" x2="420" y2="58" stroke="#D4D4D8" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* v1 vector */}
        <line x1="280" y1="58" x2="368" y2="146" stroke="#CA8A04" strokeWidth="3" />
        <text x="376" y="150" fontSize="11" fontWeight="700" fill="#854D0E">v₁ = (v₁, -gt)</text>
        {/* v2 vector */}
        <line x1="280" y1="58" x2="192" y2="146" stroke="#18181B" strokeWidth="3" />
        <text x="98" y="150" fontSize="11" fontWeight="700" fill="#18181B">v₂ = (-v₂, -gt)</text>
        {/* Right-angle marker */}
        <path d="M 271 67 L 280 76 L 289 67" fill="none" stroke="#16A34A" strokeWidth="2.2" />
        <text x="280" y="178" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#15803D">
          v₁ · v₂ = 0 ⇔ -v₁v₂ + (gt)² = 0 ⇔ gt = √(v₁v₂)
        </text>
      </svg>
    );
  }

  if (kind === 'alur-analisis') {
    const steps = ['1. Koordinat', '2. Cek FBD', '3. Vektor v(t)', '4. Dot Product', '5. Uji Satuan'];
    return (
      <svg viewBox="0 0 560 140" className="w-full h-auto">
        <rect width="560" height="140" rx="12" fill="#FAFAFA" />
        {steps.map((label, i) => {
          const x = 16 + i * 108;
          return (
            <g key={label}>
              <rect
                x={x}
                y="42"
                width="96"
                height="52"
                rx="10"
                fill={i === 3 ? '#FEF08A' : '#FFFFFF'}
                stroke="#18181B"
                strokeWidth="1.5"
              />
              <text x={x + 48} y="72" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#18181B">
                {label}
              </text>
              {i < steps.length - 1 && (
                <line x1={x + 96} y1="68" x2={x + 108} y2="68" stroke="#18181B" strokeWidth="1.8" />
              )}
            </g>
          );
        })}
        <text x="280" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#18181B">
          Protokol 5 Langkah Penyelesaian Soal OSN Kinematika
        </text>
        <text x="280" y="122" textAnchor="middle" fontSize="10" fill="#52525B">
          Simpan ketelitian penuh saat langkah 1–4, bulatkan 1 angka di belakang koma hanya di akhir!
        </text>
      </svg>
    );
  }

  // strategi-relatif
  return (
    <svg viewBox="0 0 560 175" className="w-full h-auto">
      <rect width="560" height="175" rx="12" fill="#FAFAFA" />
      <text x="280" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#18181B">
        Kerangka Acuan Benda 1: Gerak Relatif Menjadi Garis Lurus (a_rel = 0)
      </text>
      <circle cx="150" cy="95" r="10" fill="#FACC15" stroke="#18181B" strokeWidth="2" />
      <text x="150" y="124" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#18181B">
        Pengamat (Benda 1)
      </text>
      <line x1="164" y1="95" x2="395" y2="95" stroke="#18181B" strokeWidth="2.4" strokeDasharray="5 3" />
      <circle cx="408" cy="95" r="10" fill="#18181B" />
      <text x="408" y="124" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#18181B">
        Benda 2
      </text>
      <text x="280" y="83" textAnchor="middle" fontSize="11" fontWeight="700" fill="#854D0E">
        v_rel = v₁(0) - v₂(0) = konstan!
      </text>
      <text x="280" y="156" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#3F3F46">
        Berlaku bahkan untuk sudut lemparan miring maupun angin konstan seragam!
      </text>
    </svg>
  );
};

export const TheoryView: React.FC<TheoryViewProps> = ({
  selectedLevel,
  onSelectLevel,
  onNavigate,
}) => {
  const current =
    THEORY_LEVELS.find((l) => l.level === selectedLevel) ?? THEORY_LEVELS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header & Level Selector */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-zinc-200 pb-5">
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-zinc-500">
            Kurikulum Bertingkat · Pemula hingga Olimpiade
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-zinc-950">
            Materi &amp; Teori Dasar Soal Nomor 3
          </h1>
        </div>

        {/* Segmented Level Tabs */}
        <div
          role="tablist"
          aria-label="Pilih tingkat teori dasar"
          className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 rounded-xl border border-zinc-200"
        >
          {THEORY_LEVELS.map((lvl) => {
            const active = lvl.level === current.level;
            return (
              <button
                key={lvl.level}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectLevel(lvl.level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-yellow-400 text-zinc-950 border border-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-white'
                }`}
              >
                {lvl.shortTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Level Title + Mister Jo Narration */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-zinc-950">
            {current.title}
          </h2>
          <p className="text-sm text-zinc-600 mt-1">{current.subtitle}</p>
        </div>

        <MisterJoNarrator
          title={`Penjelasan ${current.shortTitle}`}
          script={current.narrationScript}
        />
      </div>

      {/* Scientific Visual Diagram for this Level */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
        <div className="text-xs font-semibold text-zinc-600 mb-3">
          Ilustrasi &amp; Diagram Konsep {current.shortTitle}
        </div>
        <LevelDiagram kind={current.diagramKind} />
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-6">
        {current.sections.map((sec, idx) => (
          <section
            key={idx}
            className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 space-y-3"
          >
            <h3 className="text-lg font-display font-bold text-zinc-950">
              <MathText text={sec.heading} />
            </h3>
            {sec.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-sm sm:text-[15px] text-zinc-700 leading-relaxed">
                <MathText text={p} />
              </p>
            ))}
            {sec.bullets && (
              <ul className="space-y-2 pt-1">
                {sec.bullets.map((b, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-start gap-2.5 text-sm text-zinc-700 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0 mt-1" />
                    <span>
                      <MathText text={b} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Quantities Table (Level 1) */}
        {current.quantitiesTable && (
          <section className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-200 bg-zinc-50">
              <h3 className="text-base font-display font-bold text-zinc-950">
                Tabel Besaran Fisika, Simbol, Satuan SI &amp; Makna Fisis
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Simbol</th>
                    <th className="px-4 py-3 font-semibold">Nama Besaran</th>
                    <th className="px-4 py-3 font-semibold">Satuan SI</th>
                    <th className="px-4 py-3 font-semibold">Makna Fisis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {current.quantitiesTable.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="px-4 py-3 font-semibold text-zinc-950">
                        <MathText text={`$${row.symbolLatex}$`} />
                      </td>
                      <td className="px-4 py-3 font-medium text-zinc-900">{row.name}</td>
                      <td className="px-4 py-3 font-mono-tabular text-zinc-800">
                        <MathText text={row.unitSI} />
                      </td>
                      <td className="px-4 py-3 text-zinc-600">
                        <MathText text={row.physicalMeaning} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Formulas Breakdown (Level 3) */}
        {current.formulas && (
          <div className="space-y-4">
            {current.formulas.map((f, fIdx) => (
              <article
                key={fIdx}
                className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 space-y-4"
              >
                <h3 className="text-lg font-display font-bold text-zinc-950">{f.name}</h3>
                <div className="rounded-xl bg-yellow-50/80 border border-yellow-300 px-4 py-3">
                  <MathBlock latex={f.latex} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-zinc-500">Interpretasi Fisis</div>
                    <p className="text-zinc-700 leading-relaxed">
                      <MathText text={f.physicalMeaning} />
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-zinc-500">Kondisi Penggunaan</div>
                    <p className="text-zinc-700 leading-relaxed">
                      <MathText text={f.validityCondition} />
                    </p>
                  </div>
                </div>
                <div className="rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3 text-sm text-zinc-800">
                  <span className="font-semibold text-zinc-950">Contoh Penerapan: </span>
                  <MathText text={f.workedExample} />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Misconceptions (Level 2 & 4) */}
        {current.commonMisconceptions && (
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-zinc-950">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-display font-bold">
                Kesalahan Konsep yang Wajib Dihindari
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {current.commonMisconceptions.map((m, mIdx) => (
                <div key={mIdx} className="rounded-xl border border-zinc-200 p-4 space-y-2">
                  <div className="text-xs font-semibold text-red-700">Miskonsepsi Umum</div>
                  <p className="text-sm text-zinc-700">
                    <MathText text={m.wrong} />
                  </p>
                  <div className="pt-2 border-t border-zinc-100">
                    <div className="text-xs font-semibold text-emerald-700">Konsep Fisika yang Benar</div>
                    <p className="text-sm text-zinc-800 mt-1">
                      <MathText text={m.right} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Bottom Progression Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200">
        <button
          type="button"
          onClick={() => onSelectLevel(Math.max(1, current.level - 1))}
          disabled={current.level === 1}
          className="px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-sm font-semibold text-zinc-800 hover:bg-zinc-50 disabled:opacity-40 cursor-pointer"
        >
          ← Level Sebelumnya
        </button>

        {current.level < 5 ? (
          <button
            type="button"
            onClick={() => onSelectLevel(current.level + 1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-400 border border-zinc-900 text-zinc-950 text-sm font-semibold hover:bg-yellow-300 cursor-pointer"
          >
            Lanjut ke Level {current.level + 1}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('simulasi')}
              className="px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-sm font-semibold text-zinc-900 hover:bg-zinc-50 cursor-pointer"
            >
              Uji di Simulasi Fisika
            </button>
            <button
              type="button"
              onClick={() => onNavigate('latihan')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-400 border border-zinc-900 text-zinc-950 text-sm font-semibold hover:bg-yellow-300 cursor-pointer"
            >
              Mulai Latihan 15 Soal
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
