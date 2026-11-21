import { useEffect, useState } from 'react';
import { AppView, Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ConceptMapView } from './components/ConceptMapView';
import { TheoryView } from './components/TheoryView';
import { SimulationLabView } from './components/SimulationLabView';
import { PracticeView } from './components/PracticeView';
import { ResultsView } from './components/ResultsView';
import {
  AnswerEvaluation,
  computeScoreSummary,
  QuestionAttempt,
} from './physics/grading';
import { PROBLEMS } from './physics/problems';

const STORAGE_KEY = 'osn_fisika_soal3_attempts_v1';

function loadInitialAttempts(): Record<number, QuestionAttempt> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<number, QuestionAttempt>;
  } catch {
    return {};
  }
}

function getInitialView(): AppView {
  if (typeof window === 'undefined') return 'beranda';
  const params = new URLSearchParams(window.location.search);
  if (params.get('autostart') === '1') {
    return 'latihan';
  }
  return 'beranda';
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>(getInitialView);
  const [selectedTheoryLevel, setSelectedTheoryLevel] = useState<number>(1);
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [attempts, setAttempts] = useState<Record<number, QuestionAttempt>>(
    loadInitialAttempts
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [attempts]);

  const handleNavigate = (view: AppView) => {
    setActiveView(view);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToTheory = (level: number) => {
    setSelectedTheoryLevel(level);
    handleNavigate('teori');
  };

  const handleNavigateToProblem = (problemId: number) => {
    setActiveQuestionId(problemId);
    handleNavigate('latihan');
  };

  const handleSubmitAnswer = (
    questionId: number,
    rawInput: string,
    evaluation: AnswerEvaluation
  ) => {
    setAttempts((prev) => {
      const existing = prev[questionId];
      return {
        ...prev,
        [questionId]: {
          questionId,
          rawInput,
          isSubmitted: true,
          isCorrect: evaluation.isCorrect,
          attempts: (existing?.attempts ?? 0) + 1,
          numericValue: evaluation.numericValue,
        },
      };
    });
  };

  const handleResetAll = () => {
    setAttempts({});
    setActiveQuestionId(1);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const summary = computeScoreSummary(attempts, PROBLEMS.length);

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        answeredCount={summary.answeredCount}
      />

      <main className="flex-1">
        {activeView === 'beranda' && (
          <HomeView
            onNavigate={handleNavigate}
            answeredCount={summary.answeredCount}
            correctCount={summary.correctCount}
          />
        )}

        {activeView === 'peta' && (
          <ConceptMapView
            onNavigateToTheory={handleNavigateToTheory}
            onNavigateToProblem={handleNavigateToProblem}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'teori' && (
          <TheoryView
            selectedLevel={selectedTheoryLevel}
            onSelectLevel={setSelectedTheoryLevel}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'simulasi' && (
          <SimulationLabView onNavigate={handleNavigate} />
        )}

        {activeView === 'latihan' && (
          <PracticeView
            activeQuestionId={activeQuestionId}
            onSelectQuestion={setActiveQuestionId}
            attempts={attempts}
            onSubmitAnswer={handleSubmitAnswer}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'hasil' && (
          <ResultsView
            attempts={attempts}
            onResetAll={handleResetAll}
            onJumpToProblem={handleNavigateToProblem}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-50/70 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            Program Latihan OSN-K Fisika SMA · Fokus Eksklusif Soal Nomor 3 Kinematika
          </div>
          <div>
            Pembimbing Digital: <strong className="text-zinc-800">Mister Jo</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
