import React from 'react';
import { Award, CheckCircle2, HelpCircle, RotateCcw, XCircle } from 'lucide-react';
import { DifficultyTier, PROBLEMS } from '../physics/problems';
import {
  computeScoreSummary,
  formatIndonesianDecimal,
  QuestionAttempt,
} from '../physics/grading';
import { AppView } from './Navbar';
import { MisterJoNarrator } from './MisterJoNarrator';

interface ResultsViewProps {
  attempts: Record<number, QuestionAttempt>;
  onResetAll: () => void;
  onJumpToProblem: (problemId: number) => void;
  onNavigate: (view: AppView) => void;
}

const TIERS: DifficultyTier[] = [
  'Fundamental',
  'Menengah',
  'Menengah Lanjut',
  'Lanjut',
  'HOTS Olimpiade',
];

export const ResultsView: React.FC<ResultsViewProps> = ({
  attempts,
  onResetAll,
  onJumpToProblem,
  onNavigate,
}) => {
  const summary = computeScoreSummary(attempts, PROBLEMS.length);

  const resultsScript = `Berikut adalah rekap hasil belajarmu. Dari lima belas soal berbasis Soal Nomor Tiga, kamu telah menjawab benar ${summary.correctCount} soal, menjawab belum tepat ${summary.wrongCount} soal, dan masih menyisakan ${summary.unansweredCount} soal. Nilai akhirmu adalah ${summary.scoreDisplay} persen, dengan predikat ${summary.masteryLabel}. Gunakan daftar rincian di bawah untuk meninjau soal yang masih perlu diperbaiki!`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-5">
        <div className="space-y-1.5">
          <div className="text-xs font-medium text-zinc-500">
            Dashboard Evaluasi · Penilaian 100/15 Poin per Soal
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-zinc-950">
            Hasil Belajar &amp; Evaluasi Kemampuan
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('latihan')}
            className="px-4 py-2.5 rounded-xl bg-yellow-400 border border-zinc-900 text-zinc-950 text-sm font-semibold hover:bg-yellow-300 cursor-pointer"
          >
            Kembali ke Latihan
          </button>
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-zinc-300 text-zinc-800 text-sm font-semibold hover:bg-zinc-100 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Ulangi Latihan
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border-2 border-zinc-950 bg-yellow-400 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-900">
            <span>Nilai Total</span>
            <Award className="w-4 h-4" />
          </div>
          <div className="text-3xl font-display font-extrabold text-zinc-950 tabular-nums">
            {summary.scoreDisplay}%
          </div>
          <div className="text-xs font-medium text-zinc-900">{summary.masteryLabel}</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-1">
          <div className="text-xs font-medium text-zinc-500">Jawaban Benar</div>
          <div className="text-3xl font-display font-bold text-emerald-700 tabular-nums">
            {summary.correctCount}
          </div>
          <div className="text-xs text-zinc-600">
            +{formatIndonesianDecimal(summary.pointsPerCorrect)} poin per soal benar
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-1">
          <div className="text-xs font-medium text-zinc-500">Belum Tepat</div>
          <div className="text-3xl font-display font-bold text-red-700 tabular-nums">
            {summary.wrongCount}
          </div>
          <div className="text-xs text-zinc-600">Klik nomor di tabel untuk mencoba ulang</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-1">
          <div className="text-xs font-medium text-zinc-500">Progres Pengerjaan</div>
          <div className="text-3xl font-display font-bold text-zinc-950 tabular-nums">
            {summary.answeredCount}/15
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden mt-2">
            <div
              className="h-full bg-yellow-400 border-r border-zinc-900 transition-all duration-300"
              style={{ width: `${(summary.answeredCount / 15) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <MisterJoNarrator title="Evaluasi Tutor Mister Jo" script={resultsScript} compact />

      {/* Tier Breakdown */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="text-lg font-display font-bold text-zinc-950">
          Penguasaan Per Tingkat Kesulitan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TIERS.map((tier) => {
            const tierProblems = PROBLEMS.filter((p) => p.difficulty === tier);
            const tierCorrect = tierProblems.filter(
              (p) => attempts[p.id]?.isCorrect
            ).length;
            return (
              <div
                key={tier}
                className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 space-y-1.5"
              >
                <div className="text-xs font-semibold text-zinc-600">{tier}</div>
                <div className="text-xl font-display font-bold text-zinc-950 tabular-nums">
                  {tierCorrect}/{tierProblems.length}
                </div>
                <div className="text-xs text-zinc-500">
                  Soal {tierProblems[0].id}–{tierProblems[tierProblems.length - 1].id}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detailed 15-Question Status Table */}
      <section className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-200 bg-zinc-50">
          <h2 className="text-base font-display font-bold text-zinc-950">
            Daftar Status 15 Soal Latihan
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-600">
              <tr>
                <th className="px-4 py-3 font-semibold">No</th>
                <th className="px-4 py-3 font-semibold">Judul &amp; Fokus Konsep</th>
                <th className="px-4 py-3 font-semibold">Tingkat</th>
                <th className="px-4 py-3 font-semibold">Jawabanmu</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {PROBLEMS.map((p) => {
                const att = attempts[p.id];
                const isDone = Boolean(att?.isSubmitted);
                const isRight = Boolean(att?.isCorrect);
                return (
                  <tr key={p.id} className="hover:bg-zinc-50/70">
                    <td className="px-4 py-3 font-mono-tabular font-bold text-zinc-950">
                      #{p.id}
                    </td>
                    <td className="px-4 py-3 text-zinc-800 font-medium">{p.title}</td>
                    <td className="px-4 py-3 text-xs text-zinc-600">{p.difficulty}</td>
                    <td className="px-4 py-3 font-mono-tabular text-zinc-900">
                      {isDone ? `${att.rawInput} ${p.unit}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {!isDone ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500">
                          <HelpCircle className="w-3.5 h-3.5" /> Belum Dikerjakan
                        </span>
                      ) : isRight ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700">
                          <XCircle className="w-3.5 h-3.5" /> Belum Tepat
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => onJumpToProblem(p.id)}
                        className="text-xs font-semibold text-zinc-950 underline hover:text-yellow-700 cursor-pointer"
                      >
                        Buka Soal
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
