import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { CONCEPT_MAP_NODES } from '../data/theoryContent';
import { AppView } from './Navbar';
import { MathBlock, MathText } from './MathText';
import { MisterJoNarrator } from './MisterJoNarrator';

interface ConceptMapViewProps {
  onNavigateToTheory: (level: number) => void;
  onNavigateToProblem: (problemId: number) => void;
  onNavigate: (view: AppView) => void;
}

const CONCEPT_MAP_SCRIPT =
  'Inilah peta konsep eksklusif untuk Soal Nomor Tiga. Di tingkat dasar kita membutuhkan dua prasyarat utama: gerak lurus GLB serta GLBB satu dimensi dan penguraian vektor dua dimensi. Kedua prasyarat ini menyatu dalam inti soal nomor tiga, yaitu independensi gerak proyektil dalam medan gravitasi homogen. Dari sana kita gunakan dua alat matematis penting: dot product sama dengan nol untuk mencari waktu tegak lurus, dan percepatan relatif bernilai nol untuk memperoleh jarak pisah linear. Semua itu kemudian berkembang menjadi enam variasi OSN tingkat lanjut yang akan kamu kuasai pada lima belas soal latihan!';

export const ConceptMapView: React.FC<ConceptMapViewProps> = ({
  onNavigateToTheory,
  onNavigateToProblem,
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-5">
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-zinc-500">
            Peta Konsep · Analisis Struktural Soal Nomor 3
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-zinc-950">
            Peta Materi &amp; Hubungan Antarkonsep
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl">
            Klik tingkat teori atau nomor soal pada setiap simpul untuk langsung mendalami materi
            dan berlatih variasi soalnya.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('teori')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-400 border border-zinc-900 text-zinc-950 text-sm font-semibold hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          Lanjut ke Teori Dasar
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <MisterJoNarrator title="Penjelasan Peta Konsep" script={CONCEPT_MAP_SCRIPT} compact />

      {/* Visual Flow Schema SVG */}
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 sm:p-6">
        <div className="text-xs font-semibold text-zinc-700 mb-3">
          Diagram Alir Keterkaitan Konsep Soal Nomor 3
        </div>
        <div className="overflow-x-auto">
          <svg viewBox="0 0 920 180" className="w-full min-w-[680px] h-auto">
            <defs>
              <marker id="map-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#18181B" />
              </marker>
            </defs>

            {/* Box 1: Prasyarat */}
            <rect x="10" y="25" width="185" height="54" rx="10" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1.5" />
            <text x="102" y="47" textAnchor="middle" fontSize="11" fontWeight="700" fill="#18181B">
              GLB &amp; GLBB 1D
            </text>
            <text x="102" y="64" textAnchor="middle" fontSize="10" fill="#52525B">
              a_x = 0 · a_y = -g
            </text>

            <rect x="10" y="102" width="185" height="54" rx="10" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="1.5" />
            <text x="102" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="#18181B">
              Aljabar Vektor 2D
            </text>
            <text x="102" y="141" textAnchor="middle" fontSize="10" fill="#52525B">
              Komponen (i, j) &amp; Besar
            </text>

            {/* Arrows to Inti */}
            <line x1="195" y1="52" x2="255" y2="82" stroke="#18181B" strokeWidth="1.6" markerEnd="url(#map-arr)" />
            <line x1="195" y1="129" x2="255" y2="98" stroke="#18181B" strokeWidth="1.6" markerEnd="url(#map-arr)" />

            {/* Box 2: Inti Soal 3 */}
            <rect x="262" y="54" width="210" height="72" rx="12" fill="#FEF08A" stroke="#18181B" strokeWidth="2" />
            <text x="367" y="80" textAnchor="middle" fontSize="12" fontWeight="800" fill="#18181B">
              Inti Soal Nomor 3
            </text>
            <text x="367" y="98" textAnchor="middle" fontSize="10" fontWeight="600" fill="#422006">
              Independensi Gerak Proyektil
            </text>
            <text x="367" y="114" textAnchor="middle" fontSize="10" fill="#422006">
              y₁(t) = y₂(t) = -½gt²
            </text>

            {/* Arrows to Alat Matematis */}
            <line x1="472" y1="80" x2="532" y2="55" stroke="#18181B" strokeWidth="1.6" markerEnd="url(#map-arr)" />
            <line x1="472" y1="100" x2="532" y2="128" stroke="#18181B" strokeWidth="1.6" markerEnd="url(#map-arr)" />

            {/* Box 3: Alat Matematis */}
            <rect x="538" y="25" width="175" height="54" rx="10" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.5" />
            <text x="625" y="47" textAnchor="middle" fontSize="11" fontWeight="700" fill="#18181B">
              Dot Product = 0
            </text>
            <text x="625" y="64" textAnchor="middle" fontSize="10" fill="#52525B">
              t⊥ = √(v₁v₂) / g
            </text>

            <rect x="538" y="102" width="175" height="54" rx="10" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.5" />
            <text x="625" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="#18181B">
              Gerak Relatif (a_rel = 0)
            </text>
            <text x="625" y="141" textAnchor="middle" fontSize="10" fill="#52525B">
              d = (v₁ + v₂) t
            </text>

            {/* Arrows to Variasi */}
            <line x1="713" y1="52" x2="762" y2="82" stroke="#18181B" strokeWidth="1.6" markerEnd="url(#map-arr)" />
            <line x1="713" y1="129" x2="762" y2="98" stroke="#18181B" strokeWidth="1.6" markerEnd="url(#map-arr)" />

            {/* Box 4: Ekstensi OSN */}
            <rect x="768" y="45" width="142" height="90" rx="12" fill="#18181B" />
            <text x="839" y="75" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#FACC15">
              15 Soal OSN-K
            </text>
            <text x="839" y="95" textAnchor="middle" fontSize="9.5" fill="#F4F4F5">
              Sudut 60° · Tunda Δt
            </text>
            <text x="839" y="110" textAnchor="middle" fontSize="9.5" fill="#F4F4F5">
              Angin · Luas Δ · Pantul
            </text>
          </svg>
        </div>
      </div>

      {/* Detailed Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CONCEPT_MAP_NODES.map((node) => (
          <article
            key={node.id}
            className="rounded-2xl border border-zinc-200 bg-white p-5 flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-900">{node.tier}</span>
                <span className="text-zinc-500">Teori Level {node.linkedTheoryLevel}</span>
              </div>

              <h2 className="text-lg font-display font-bold text-zinc-950">
                <MathText text={node.title} />
              </h2>

              <p className="text-sm text-zinc-600 leading-relaxed">
                <MathText text={node.summary} />
              </p>

              {node.formulaLatex && (
                <div className="rounded-xl bg-yellow-50/70 border border-yellow-200 px-3 py-2 text-sm">
                  <MathBlock latex={node.formulaLatex} />
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onNavigateToTheory(node.linkedTheoryLevel)}
                className="text-xs font-semibold text-zinc-900 hover:underline cursor-pointer"
              >
                Buka Teori Level {node.linkedTheoryLevel}
              </button>

              <div className="flex flex-wrap items-center gap-1.5">
                {node.linkedProblems.map((qId) => (
                  <button
                    key={qId}
                    type="button"
                    onClick={() => onNavigateToProblem(qId)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-yellow-300 text-zinc-900 text-xs font-mono-tabular font-semibold transition-colors cursor-pointer"
                  >
                    #{qId}
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom link */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={() => onNavigate('simulasi')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 bg-white text-sm font-semibold text-zinc-900 hover:bg-zinc-50 cursor-pointer"
        >
          Eksperimen di Simulasi Fisika
          <ArrowDown className="w-4 h-4 -rotate-90" />
        </button>
      </div>
    </div>
  );
};
