import React from 'react';
import { ArrowRight, BookOpen, Compass, FlaskConical, PlayCircle } from 'lucide-react';
import { AppView } from './Navbar';
import { MisterJoAvatar, MisterJoNarrator } from './MisterJoNarrator';
import { MathText } from './MathText';

interface HomeViewProps {
  onNavigate: (view: AppView) => void;
  answeredCount: number;
  correctCount: number;
}

const WELCOME_SCRIPT =
  'Halo calon juara Olimpiade Sains Nasional! Saya Mister Jo, mentor Fisika pribadimu. Dalam program eksklusif ini, kita akan membedah habis satu soal kinematika berkelas dari naskah OSK Fisika dua ribu dua puluh enam, yaitu soal nomor tiga tentang dua benda yang bergerak dalam medan gravitasi homogen hingga vektor kecepatannya saling tegak lurus. Kamu bisa mempelajari teorinya dari tingkat pemula sampai strategi olimpiade, mencoba simulasi interaktifnya, lalu menguji ketajamanmu pada lima belas soal isian singkat numerik. Ayo tekan Mulai Belajar sekarang!';

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  answeredCount,
  correctCount,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Hero Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-600">
              <span className="font-semibold text-zinc-900">OSN-K Fisika SMA 2026</span>
              <span aria-hidden="true">·</span>
              <span>Fokus Eksklusif Soal Nomor 3</span>
              <span aria-hidden="true">·</span>
              <span>15 Soal Isian Singkat Numerik</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-zinc-950 leading-[1.12] text-balance">
              Kuasai Kinematika Proyektil &amp; Vektor Relatif Tingkat Olimpiade
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
              Program latihan terstruktur yang dirancang khusus dari analisis mendalam{' '}
              <strong className="text-zinc-900">Soal Nomor 3</strong> naskah OSK Fisika SMA 2026.
              Pelajari teori 5 level, buktikan fenomena lewat simulasi animasi fisika, dan
              taklukkan 15 soal numerik bertingkat bersama guru pembimbing{' '}
              <strong className="text-zinc-900">Mister Jo</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onNavigate('teori')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-yellow-400 border-2 border-zinc-950 text-zinc-950 font-display font-bold text-base hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              Mulai Belajar
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('latihan')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-zinc-950 text-white font-semibold text-sm hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              Langsung Latihan 15 Soal
            </button>
          </div>

          {/* 4-column KPI strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-zinc-200">
            <div className="py-2">
              <div className="text-xs text-zinc-500">Jumlah Soal</div>
              <div className="text-xl font-display font-bold text-zinc-950 tabular-nums">15 Soal</div>
            </div>
            <div className="py-2">
              <div className="text-xs text-zinc-500">Format Jawaban</div>
              <div className="text-xl font-display font-bold text-zinc-950">1 Desimal (,)</div>
            </div>
            <div className="py-2">
              <div className="text-xs text-zinc-500">Progres Kamu</div>
              <div className="text-xl font-display font-bold text-zinc-950 tabular-nums">
                {answeredCount}/15
              </div>
            </div>
            <div className="py-2">
              <div className="text-xs text-zinc-500">Jawaban Benar</div>
              <div className="text-xl font-display font-bold text-zinc-950 tabular-nums">
                {correctCount} Soal
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Source Problem No. 3 Card + Mister Jo Profile */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 rounded-3xl border border-zinc-200 bg-yellow-50/50 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-yellow-200">
              <div className="flex items-center gap-3">
                <MisterJoAvatar size="md" />
                <div>
                  <div className="text-xs text-zinc-500">Guru Pembimbing Pribadi</div>
                  <div className="text-base font-display font-bold text-zinc-950">MISTER JO</div>
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-700">Tutor Suara Interaktif</span>
            </div>

            <div className="space-y-2.5 py-2">
              <div className="text-xs font-semibold text-zinc-600">
                Naskah Soal Sumber · OSK Fisika SMA 2026 No. 3
              </div>
              <p className="text-sm text-zinc-800 leading-relaxed">
                <MathText
                  text={"Dua buah benda bergerak dalam medan gravitasi homogen dengan percepatan $g$. Pada saat awal, benda-benda tersebut terletak di satu titik dan bergerak dengan kecepatan $v_1 = 3{,}0\\text{ m/s}$ dan $v_2 = 4{,}0\\text{ m/s}$ secara horizontal dalam arah yang berlawanan. Jarak antara kedua benda pada saat vektor kecepatan mereka menjadi saling tegak lurus adalah ... m."}
                />
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-yellow-200 space-y-2">
            <div className="text-xs font-semibold text-zinc-900">
              Cakupan Analisis Ilmiah Soal No. 3
            </div>
            <p className="text-xs text-zinc-700 leading-relaxed">
              <MathText
                text={"Seluruh 15 soal latihan, animasi pembuktian, dan Free Body Diagram diturunkan murni dari kinematika proyektil 2D, dot product kecepatan ($\\vec{v}_1 \\cdot \\vec{v}_2 = 0$), dan kinematika relatif ($\\vec{a}_{\\text{rel}} = \\vec{0}$)."}
              />
            </p>
          </div>
        </div>
      </section>

      {/* Mister Jo Welcome Voice Bar */}
      <MisterJoNarrator title="Sambutan Pembimbing Olimpiade" script={WELCOME_SCRIPT} compact />

      {/* 3 Core Learning Paths */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <button
          type="button"
          onClick={() => onNavigate('peta')}
          className="text-left rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-900 transition-colors cursor-pointer flex flex-col justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 border border-yellow-300 flex items-center justify-center text-zinc-900">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-display font-bold text-zinc-950">01. Peta Materi</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Lihat keterkaitan materi prasyarat, prinsip inti Soal No. 3, hingga variasi HOTS
              Olimpiade dalam satu alur konsep utuh.
            </p>
          </div>
          <span className="text-xs font-semibold text-zinc-950 inline-flex items-center gap-1">
            Buka Peta Materi <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('teori')}
          className="text-left rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-900 transition-colors cursor-pointer flex flex-col justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 border border-yellow-300 flex items-center justify-center text-zinc-900">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-display font-bold text-zinc-950">02. Teori Dasar 5 Level</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Belajar bertingkat dari Pengetahuan Awal hingga Strategi Olimpiade lengkap dengan
              penurunan rumus KaTeX &amp; penjelasan lisan Mister Jo.
            </p>
          </div>
          <span className="text-xs font-semibold text-zinc-950 inline-flex items-center gap-1">
            Pelajari Teori <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('simulasi')}
          className="text-left rounded-2xl border border-zinc-200 bg-white p-5 hover:border-zinc-900 transition-colors cursor-pointer flex flex-col justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 border border-yellow-300 flex items-center justify-center text-zinc-900">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-display font-bold text-zinc-950">03. Simulasi Fisika</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Ubah parameter kelajuan awal, gravitasi planet, sudut lempar, dan angin untuk
              mengamati secara langsung momen vektor saling tegak lurus.
            </p>
          </div>
          <span className="text-xs font-semibold text-zinc-950 inline-flex items-center gap-1">
            Buka Laboratorium <PlayCircle className="w-3.5 h-3.5" />
          </span>
        </button>
      </section>
    </div>
  );
};
