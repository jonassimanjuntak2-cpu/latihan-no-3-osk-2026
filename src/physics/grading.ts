export interface ParseResult {
  valid: boolean;
  numericValue: number | null;
  errorReason:
    | 'empty'
    | 'uses_dot'
    | 'wrong_decimal_places'
    | 'invalid_chars'
    | null;
  message: string;
}

export interface AnswerEvaluation {
  isValidFormat: boolean;
  isCorrect: boolean;
  numericValue: number | null;
  expectedFormatted: string;
  feedbackTitle: string;
  feedbackMessage: string;
}

export interface QuestionAttempt {
  questionId: number;
  rawInput: string;
  isSubmitted: boolean;
  isCorrect: boolean;
  attempts: number;
  numericValue: number | null;
}

export interface ScoreSummary {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  scorePercentage: number;
  scoreDisplay: string;
  pointsPerCorrect: number;
  masteryLabel: string;
}

/**
 * Formats a number using Indonesian decimal convention (comma) rounded to 1 decimal place.
 */
export function formatIndonesianDecimal(value: number): string {
  const rounded = Math.round((value + Number.EPSILON) * 10) / 10;
  const normalized = Object.is(rounded, -0) ? 0 : rounded;
  return normalized.toFixed(1).replace('.', ',');
}

/**
 * Rounds a number to 1 decimal place cleanly.
 */
export function roundToOneDecimal(value: number): number {
  const rounded = Math.round((value + Number.EPSILON) * 10) / 10;
  return Object.is(rounded, -0) ? 0 : rounded;
}

/**
 * Parses and validates strict Indonesian 1-decimal-place numeric input.
 * Accepted examples: "12,5", "0,8", "-3,2", "7,0"
 * Rejected examples: "12.5" (uses dot), "12,50" (2 decimals), "12" (no decimal), "abc"
 */
export function parseIndonesianDecimal(raw: string): ParseResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      valid: false,
      numericValue: null,
      errorReason: 'empty',
      message: 'Kolom jawaban masih kosong. Masukkan angka dengan satu angka di belakang koma, misalnya 2,5.',
    };
  }

  if (trimmed.includes('.')) {
    return {
      valid: false,
      numericValue: null,
      errorReason: 'uses_dot',
      message:
        'Gunakan tanda koma (,) sebagai pemisah desimal, bukan tanda titik (.). Contoh yang benar: 12,5.',
    };
  }

  if (!/^-?\d+(,\d+)?$/.test(trimmed)) {
    return {
      valid: false,
      numericValue: null,
      errorReason: 'invalid_chars',
      message:
        'Format tidak valid. Masukkan hanya angka dan tanda koma desimal (tanpa satuan), misalnya 2,5 atau -3,2.',
    };
  }

  if (!/^-?\d+,\d$/.test(trimmed)) {
    return {
      valid: false,
      numericValue: null,
      errorReason: 'wrong_decimal_places',
      message:
        'Jawaban wajib memiliki tepat satu angka di belakang koma. Contoh: tulis 4,0 (bukan 4) atau 12,5 (bukan 12,50).',
    };
  }

  const normalized = trimmed.replace(',', '.');
  const numericValue = Number.parseFloat(normalized);
  if (Number.isNaN(numericValue)) {
    return {
      valid: false,
      numericValue: null,
      errorReason: 'invalid_chars',
      message: 'Nilai numerik tidak dapat dibaca.',
    };
  }

  return {
    valid: true,
    numericValue,
    errorReason: null,
    message: '',
  };
}

/**
 * Evaluates a student's submission against the exact rounded 1-decimal answer.
 */
export function evaluateAnswer(
  rawInput: string,
  expectedRoundedValue: number,
  conceptualHint: string
): AnswerEvaluation {
  const parsed = parseIndonesianDecimal(rawInput);
  const expectedRounded = roundToOneDecimal(expectedRoundedValue);
  const expectedFormatted = formatIndonesianDecimal(expectedRounded);

  if (!parsed.valid || parsed.numericValue === null) {
    return {
      isValidFormat: false,
      isCorrect: false,
      numericValue: null,
      expectedFormatted,
      feedbackTitle: 'Periksa Format Jawaban',
      feedbackMessage: parsed.message,
    };
  }

  // Exact match after rounding to 1 decimal place (tolerance <= 0.001 for IEEE-754 safety)
  const diff = Math.abs(parsed.numericValue - expectedRounded);
  const isCorrect = diff < 0.001;

  if (isCorrect) {
    return {
      isValidFormat: true,
      isCorrect: true,
      numericValue: parsed.numericValue,
      expectedFormatted,
      feedbackTitle: 'Jawaban Benar!',
      feedbackMessage: `Tepat sekali! Hasil akhir ${expectedFormatted} sudah sesuai dengan prinsip fisika dan aturan pembulatan satu angka di belakang koma.`,
    };
  }

  return {
    isValidFormat: true,
    isCorrect: false,
    numericValue: parsed.numericValue,
    expectedFormatted,
    feedbackTitle: 'Jawaban Belum Tepat',
    feedbackMessage: `Periksa kembali analisis dan perhitunganmu. Petunjuk konsep: ${conceptualHint}`,
  };
}

/**
 * Computes scoring summary across 15 questions (100/15 points per correct answer).
 */
export function computeScoreSummary(
  attempts: Record<number, QuestionAttempt>,
  totalQuestions = 15
): ScoreSummary {
  const pointsPerCorrect = 100 / totalQuestions;
  let answeredCount = 0;
  let correctCount = 0;
  let wrongCount = 0;

  for (let id = 1; id <= totalQuestions; id++) {
    const entry = attempts[id];
    if (entry && entry.isSubmitted) {
      answeredCount++;
      if (entry.isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }
  }

  const unansweredCount = totalQuestions - answeredCount;
  const scorePercentage = correctCount * pointsPerCorrect;
  const scoreDisplay = formatIndonesianDecimal(scorePercentage);

  let masteryLabel = 'Belum Mulai';
  if (answeredCount > 0) {
    if (scorePercentage >= 86) masteryLabel = 'Siap Medali OSN-K';
    else if (scorePercentage >= 66) masteryLabel = 'Kompetitif Tingkat Kota/Kabupaten';
    else if (scorePercentage >= 40) masteryLabel = 'Berkembang — Perkuat Analisis Vektor';
    else masteryLabel = 'Pemula — Tinjau Teori Level 1–3';
  }

  return {
    totalQuestions,
    answeredCount,
    correctCount,
    wrongCount,
    unansweredCount,
    scorePercentage,
    scoreDisplay,
    pointsPerCorrect,
    masteryLabel,
  };
}
