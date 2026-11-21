import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import { PROBLEMS } from '../physics/problems';
import {
  AnswerEvaluation,
  evaluateAnswer,
  QuestionAttempt,
} from '../physics/grading';
import { MathBlock, MathText } from './MathText';
import { StimulusDiagram } from './StimulusDiagram';
import { PhysicsCanvasAnimation } from './PhysicsCanvasAnimation';
import { MisterJoNarrator } from './MisterJoNarrator';
import { AppView } from './Navbar';

interface PracticeViewProps {
  activeQuestionId: number;
  onSelectQuestion: (id: number) => void;
  attempts: Record<number, QuestionAttempt>;
  onSubmitAnswer: (
    questionId: number,
    rawInput: string,
    evaluation: AnswerEvaluation
  ) => void;
  onNavigate: (view: AppView) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  activeQuestionId,
  onSelectQuestion,
  attempts,
  onSubmitAnswer,
  onNavigate,
}) => {
  const problem =
    PROBLEMS.find((p) => p.id === activeQuestionId) ?? PROBLEMS[0];
  const savedAttempt = attempts[problem.id];

  const [inputValue, setInputValue] = useState(savedAttempt?.rawInput ?? '');
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const attemptsRef = useRef(attempts);
  attemptsRef.current = attempts;
  const attemptsCount = Object.keys(attempts).length;

  // Sync local input and reset solution disclosure ONLY when switching questions or resetting all attempts
  useEffect(() => {
    const existing = attemptsRef.current[problem.id];
    setInputValue(existing?.rawInput ?? '');
    setEvaluation(null);
    setShowSolution(false);
  }, [problem.id, attemptsCount === 0]);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = evaluateAnswer(
      inputValue,
      problem.expectedValue,
      problem.hintOnWrong
    );
    setEvaluation(res);
    if (res.isValidFormat) {
      onSubmitAnswer(problem.id, inputValue.trim(), res);
    }
  };

  const isSolvedCorrectly = Boolean(savedAttempt?.isCorrect);
  const revealCriticalMetrics = isSolvedCorrectly || showSolution;

  const questionNarrationScript = `${problem.narration.soalTextSpoken} ${problem.narration.stimulusSpoken} ${problem.narration.fbdSpoken}`;
  const solutionNarrationScript = `${problem.narration.persamaanSpoken} ${problem.narration.penyelesaianSpoken} ${problem.narration.interpretasiSpoken} ${problem.narration.strategiSpoken}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Question Navigator Strip */}
      <section
        aria-label="Navigasi 15 soal"
        className="rounded-2xl border border-zinc-200 bg-white p-4 space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-semibold text-zinc-700">
            Pilih Nomor Soal (1–15 Isian Singkat Numerik)
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Benar
            </span>
            <span className="inline-flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-red-600" /> Perlu Perbaikan
            </span>
            <span className="inline-flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-zinc-400" /> Belum Dijawab
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-15 gap-1.5">
          {PROBLEMS.map((item) => {
            const att = attempts[item.id];
            const isActive = item.id === problem.id;
            let stateClasses =
              'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100';
            let statusWord = 'Belum';

            if (att?.isSubmitted) {
              if (att.isCorrect) {
                stateClasses =
                  'bg-emerald-50 border-emerald-400 text-emerald-900';
                statusWord = 'Benar';
              } else {
                stateClasses = 'bg-red-50 border-red-300 text-red-900';
                statusWord = 'Salah';
              }
            }

            if (isActive) {
              stateClasses =
                'bg-yellow-400 border-zinc-950 text-zinc-950 font-bold ring-2 ring-yellow-300';
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectQuestion(item.id)}
                aria-label={`Soal ${item.id} (${statusWord})`}
                aria-current={isActive ? 'step' : undefined}
                className={`h-10 rounded-xl border text-xs font-mono-tabular font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1 ${stateClasses}`}
              >
                <span>{item.id}</span>
                {att?.isSubmitted && att.isCorrect && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0" />
                )}
                {att?.isSubmitted && !att.isCorrect && (
                  <XCircle className="w-3 h-3 text-red-700 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Problem Header & Statement */}
      <article className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600">
              <span className="font-bold text-zinc-950">Soal {problem.id} dari 15</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-800">{problem.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>
                <MathText text={problem.topicTag} />
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-zinc-950">
              <MathText text={problem.title} />
            </h1>
          </div>

          {savedAttempt?.isSubmitted && (
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold shrink-0 ${
                savedAttempt.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-red-50 border-red-300 text-red-800'
              }`}
            >
              {savedAttempt.isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Status: Terjawab Benar
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  Status: Belum Tepat (Coba Lagi)
                </>
              )}
            </div>
          )}
        </div>

        {/* Problem Naskah */}
        <div className="rounded-2xl bg-yellow-50/50 border border-yellow-200 p-4 sm:p-5 text-base sm:text-[17px] text-zinc-900 leading-relaxed">
          <MathText text={problem.questionText} />
        </div>

        {/* Mister Jo Audio Narrator for Question + Stimulus + FBD */}
        <MisterJoNarrator
          title={`Pembacaan Soal & FBD No. ${problem.id}`}
          script={questionNarrationScript}
          compact
        />

        {/* Scientific Stimulus + FBD */}
        <StimulusDiagram problem={problem} showFBD />

        {/* Live Physics Proof Animation (hides exact critical answer until solved or opened) */}
        <PhysicsCanvasAnimation
          config={problem.physicsConfig}
          problemId={problem.id}
          resetKey={problem.id}
          title={`Simulasi Fenomena Soal No. ${problem.id}`}
          revealCriticalMetrics={revealCriticalMetrics}
        />

        {/* Numeric Short-Answer Form */}
        <form
          onSubmit={handleCheck}
          className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-1 space-y-1.5">
              <label
                htmlFor={`answer-input-${problem.id}`}
                className="block text-sm font-semibold text-zinc-900"
              >
                Jawaban Numerik (tepat 1 angka di belakang koma, gunakan koma)
              </label>
              <div className="flex items-stretch gap-2">
                <input
                  id={`answer-input-${problem.id}`}
                  type="text"
                  inputMode="decimal"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Masukkan jawaban, misalnya 12,5"
                  className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 bg-white text-base font-mono-tabular font-semibold text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-zinc-900"
                />
                <div
                  aria-label={`Satuan jawaban: ${problem.unit}`}
                  className="px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-100 text-sm font-mono-tabular font-bold text-zinc-800 flex items-center justify-center shrink-0"
                >
                  {problem.unit}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-yellow-400 border-2 border-zinc-950 text-zinc-950 font-display font-bold text-sm hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Periksa Jawaban
            </button>
          </div>

          {/* Feedback Area */}
          {evaluation && (
            <div
              role="status"
              className={`rounded-xl border p-4 flex items-start gap-3 ${
                !evaluation.isValidFormat
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : evaluation.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-red-50 border-red-300 text-red-950'
              }`}
            >
              {!evaluation.isValidFormat ? (
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              ) : evaluation.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-sm">
                <div className="font-bold">{evaluation.feedbackTitle}</div>
                <p className="leading-relaxed">
                  <MathText text={evaluation.feedbackMessage} />
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Toggleable Pembahasan Button + Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowSolution((v) => !v)}
            aria-expanded={showSolution}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-950 text-yellow-300 font-semibold text-sm hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>{showSolution ? 'TUTUP PEMBAHASAN' : 'LIHAT PEMBAHASAN'}</span>
            {showSolution ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectQuestion(Math.max(1, problem.id - 1))}
              disabled={problem.id === 1}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-sm font-semibold text-zinc-800 hover:bg-zinc-50 disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Sebelumnya
            </button>

            {problem.id < 15 ? (
              <button
                type="button"
                onClick={() => onSelectQuestion(problem.id + 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-900 bg-yellow-400 text-sm font-semibold text-zinc-950 hover:bg-yellow-300 cursor-pointer"
              >
                Berikutnya
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('hasil')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-900 bg-yellow-400 text-sm font-semibold text-zinc-950 hover:bg-yellow-300 cursor-pointer"
              >
                Lihat Hasil Belajar
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 8-Section Interactive Textbook Pembahasan */}
        {showSolution && (
          <section
            aria-label={`Pembahasan lengkap soal nomor ${problem.id}`}
            className="mt-4 pt-6 border-t-2 border-zinc-200 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-xl font-display font-bold text-zinc-950">
                Pembahasan Lengkap Buku Teks — Soal No. {problem.id}
              </h2>
              <span className="text-xs font-mono-tabular font-semibold text-zinc-600">
                Kunci Akhir: {problem.expectedFormatted} {problem.unit}
              </span>
            </div>

            {/* Audio Pembahasan Mister Jo */}
            <MisterJoNarrator
              title={`Pembahasan & Strategi Soal No. ${problem.id}`}
              script={solutionNarrationScript}
            />

            <div className="grid grid-cols-1 gap-5">
              {/* 1. Memahami Soal */}
              <div className="rounded-2xl border border-zinc-200 p-5 space-y-3">
                <h3 className="text-base font-display font-bold text-zinc-950">
                  1. Memahami Soal
                </h3>
                <div className="space-y-1.5 text-sm text-zinc-700">
                  <div className="font-semibold text-zinc-900">Informasi Diketahui:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {problem.explanation.memahamiSoal.diketahui.map((d, i) => (
                      <li key={i}>
                        <MathText text={d} />
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-zinc-700">
                  <strong className="text-zinc-900">Ditanyakan: </strong>
                  <MathText text={problem.explanation.memahamiSoal.ditanyakan} />
                </p>
                <p className="text-sm text-zinc-700">
                  <strong className="text-zinc-900">Kondisi Fisika: </strong>
                  <MathText text={problem.explanation.memahamiSoal.kondisiFisika} />
                </p>
                <div className="text-xs text-zinc-600 pt-1">
                  <strong>Asumsi: </strong>
                  {problem.explanation.memahamiSoal.asumsi.map((a, i) => (
                    <span key={i}>
                      <MathText text={a} />
                      {i < problem.explanation.memahamiSoal.asumsi.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Identifikasi Konsep */}
              <div className="rounded-2xl border border-zinc-200 p-5 space-y-2 text-sm text-zinc-700">
                <h3 className="text-base font-display font-bold text-zinc-950">
                  2. Identifikasi Konsep
                </h3>
                <p>
                  <strong className="text-zinc-900">Prinsip Utama: </strong>
                  <MathText text={problem.explanation.identifikasiKonsep.prinsip} />
                </p>
                <p>
                  <strong className="text-zinc-900">Alasan Pemilihan: </strong>
                  <MathText text={problem.explanation.identifikasiKonsep.alasan} />
                </p>
                <p>
                  <strong className="text-zinc-900">Hukum yang Digunakan: </strong>
                  <MathText text={problem.explanation.identifikasiKonsep.hukum} />
                </p>
              </div>

              {/* 3. Visualisasi */}
              <div className="rounded-2xl border border-zinc-200 p-5 space-y-3">
                <h3 className="text-base font-display font-bold text-zinc-950">
                  3. Visualisasi &amp; Pembuktian
                </h3>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  <MathText text={problem.explanation.visualisasiCatatan} />
                </p>
              </div>

              {/* 4. Pemilihan Persamaan */}
              <div className="rounded-2xl border border-yellow-300 bg-yellow-50/70 p-5 space-y-3">
                <h3 className="text-base font-display font-bold text-zinc-950">
                  4. Pemilihan Persamaan
                </h3>
                <div className="rounded-xl bg-white border border-yellow-300 px-4 py-3">
                  <MathBlock latex={problem.explanation.pemilihanPersamaan.rumusUtamaLatex} />
                </div>
                <p className="text-sm text-zinc-800">
                  <strong className="text-zinc-950">Makna Rumus: </strong>
                  <MathText text={problem.explanation.pemilihanPersamaan.maknaRumus} />
                </p>
                <p className="text-sm text-zinc-800">
                  <strong className="text-zinc-950">Kesesuaian: </strong>
                  <MathText text={problem.explanation.pemilihanPersamaan.alasanSesuai} />
                </p>
              </div>

              {/* 5. Penyelesaian Matematis */}
              <div className="rounded-2xl border border-zinc-200 p-5 space-y-3">
                <h3 className="text-base font-display font-bold text-zinc-950">
                  5. Penyelesaian Matematis Bertahap
                </h3>
                <ol className="space-y-3">
                  {problem.explanation.penyelesaianMatematis.map((step, i) => (
                    <li
                      key={i}
                      className="text-sm text-zinc-800 leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-zinc-900 text-yellow-300 text-xs font-mono-tabular font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <MathText text={step} />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 6. Hasil Akhir */}
              <div className="rounded-2xl border-2 border-zinc-950 bg-yellow-400/20 p-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-display font-bold text-zinc-950">
                    6. Hasil Akhir (Standar 1 Desimal Koma)
                  </h3>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Nilai eksak sebelum pembulatan: {problem.explanation.hasilAkhir.nilaiEksak}{' '}
                    {problem.explanation.hasilAkhir.satuan}
                  </p>
                </div>
                <div className="px-5 py-2.5 rounded-xl bg-zinc-950 text-yellow-300 font-mono-tabular text-xl font-bold">
                  {problem.explanation.hasilAkhir.dibulatkan}{' '}
                  <span className="text-sm font-normal text-white">
                    {problem.explanation.hasilAkhir.satuan}
                  </span>
                </div>
              </div>

              {/* 7. Interpretasi Fisis */}
              <div className="rounded-2xl border border-zinc-200 p-5 space-y-2">
                <h3 className="text-base font-display font-bold text-zinc-950">
                  7. Interpretasi Fisis
                </h3>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  <MathText text={problem.explanation.interpretasiFisis} />
                </p>
              </div>

              {/* 8. Strategi Cepat Olimpiade */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 space-y-2.5 text-sm text-zinc-700">
                <h3 className="text-base font-display font-bold text-zinc-950">
                  8. Strategi Cepat Olimpiade
                </h3>
                <p>
                  <strong className="text-zinc-900">Metode Efisien: </strong>
                  <MathText text={problem.explanation.strategiCepat.metode} />
                </p>
                <p>
                  <strong className="text-zinc-900">Kapan Berlaku: </strong>
                  <MathText text={problem.explanation.strategiCepat.kapanBerlaku} />
                </p>
                <p className="text-red-800 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                  <strong>Peringatan Kesalahan Umum: </strong>
                  <MathText text={problem.explanation.strategiCepat.peringatanKesalahan} />
                </p>
              </div>
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
