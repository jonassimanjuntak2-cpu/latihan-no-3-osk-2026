import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeScoreSummary,
  evaluateAnswer,
  formatIndonesianDecimal,
  parseIndonesianDecimal,
  roundToOneDecimal,
  type QuestionAttempt,
} from './grading';
import { PROBLEMS } from './problems';
import {
  computeKinematicState,
  solveAngleTime,
  solveCanonicalDistance,
  solveCanonicalPerpTime,
} from './simulationMath';

test('parseIndonesianDecimal enforces exact Indonesian 1-decimal comma rules', () => {
  assert.deepEqual(parseIndonesianDecimal('12,5'), {
    valid: true,
    numericValue: 12.5,
    errorReason: null,
    message: '',
  });
  assert.equal(parseIndonesianDecimal('0,8').numericValue, 0.8);
  assert.equal(parseIndonesianDecimal('-3,2').numericValue, -3.2);
  assert.equal(parseIndonesianDecimal('7,0').numericValue, 7.0);

  // Reject dot separator
  const dotRes = parseIndonesianDecimal('12.5');
  assert.equal(dotRes.valid, false);
  assert.equal(dotRes.errorReason, 'uses_dot');

  // Reject 2 decimals
  const twoDec = parseIndonesianDecimal('12,50');
  assert.equal(twoDec.valid, false);
  assert.equal(twoDec.errorReason, 'wrong_decimal_places');

  // Reject bare integer without comma
  const bareInt = parseIndonesianDecimal('7');
  assert.equal(bareInt.valid, false);
  assert.equal(bareInt.errorReason, 'wrong_decimal_places');
});

test('evaluateAnswer checks correctness accurately and preserves hint without leaking key on wrong answer', () => {
  const resRight = evaluateAnswer('2,5', 2.5, 'Cek dot product');
  assert.equal(resRight.isValidFormat, true);
  assert.equal(resRight.isCorrect, true);

  const resWrong = evaluateAnswer('2,4', 2.5, 'Gunakan g = 9,8 m/s^2');
  assert.equal(resWrong.isValidFormat, true);
  assert.equal(resWrong.isCorrect, false);
  assert.equal(resWrong.feedbackMessage.includes('2,5'), false);
  assert.equal(resWrong.feedbackMessage.includes('Gunakan g = 9,8'), true);
});

test('computeScoreSummary awards 100/15 points per correct answer', () => {
  const attempts: Record<number, QuestionAttempt> = {
    1: { questionId: 1, rawInput: '0,6', isSubmitted: true, isCorrect: true, attempts: 1, numericValue: 0.6 },
    2: { questionId: 2, rawInput: '2,5', isSubmitted: true, isCorrect: true, attempts: 1, numericValue: 2.5 },
    3: { questionId: 3, rawInput: '1,0', isSubmitted: true, isCorrect: false, attempts: 1, numericValue: 1.0 },
  };
  const summary = computeScoreSummary(attempts, 15);
  assert.equal(summary.correctCount, 2);
  assert.equal(summary.wrongCount, 1);
  assert.equal(summary.unansweredCount, 12);
  assert.equal(summary.scoreDisplay, formatIndonesianDecimal((2 * 100) / 15));
});

test('PROBLEMS contains exactly 15 unique problems with valid Indonesian 1-decimal keys', () => {
  assert.equal(PROBLEMS.length, 15);
  const seenIds = new Set<number>();
  for (const p of PROBLEMS) {
    assert.equal(seenIds.has(p.id), false);
    seenIds.add(p.id);
    assert.equal(p.expectedFormatted, formatIndonesianDecimal(p.expectedValue));
    const parsed = parseIndonesianDecimal(p.expectedFormatted);
    assert.equal(parsed.valid, true, `Problem ${p.id} key invalid format`);
  }
});

test('Scientific validation of all 15 problems against simulationMath engine', () => {
  for (const p of PROBLEMS) {
    const cfg = p.physicsConfig;
    const snap = computeKinematicState(cfg, cfg.tStar);

    // Every problem's tStar must satisfy the target angle between velocity vectors!
    const expectedAngle = cfg.targetAngleDeg ?? 90;
    assert.ok(
      Math.abs(snap.angleDeg - expectedAngle) < 0.05,
      `Q${p.id}: expected angle ${expectedAngle}°, got ${snap.angleDeg}°`
    );

    let computedAnswer = 0;
    switch (p.id) {
      case 1:
        computedAnswer = solveCanonicalPerpTime(cfg.v1, cfg.v2, cfg.g);
        break;
      case 2:
      case 3:
      case 7:
        computedAnswer = solveCanonicalDistance(cfg.v1, cfg.v2, cfg.g);
        break;
      case 4:
        computedAnswer = snap.drop1;
        break;
      case 5:
        computedAnswer = snap.speed1;
        break;
      case 6:
        computedAnswer = Math.hypot(snap.x2, snap.drop2);
        break;
      case 8: {
        const tAngle = solveAngleTime(cfg.v1, cfg.v2, cfg.g, 60);
        const snapAngle = computeKinematicState(cfg, tAngle);
        computedAnswer = snapAngle.separationDistance;
        break;
      }
      case 9:
      case 10:
      case 11:
      case 13:
        computedAnswer = snap.separationDistance;
        break;
      case 12:
        computedAnswer = snap.keRatio2Over1;
        break;
      case 14:
        computedAnswer = snap.triangleArea;
        break;
      case 15:
        computedAnswer = cfg.tStar - (cfg.tBounce ?? 0);
        break;
    }

    const rounded = roundToOneDecimal(computedAnswer);
    assert.equal(
      rounded,
      p.expectedValue,
      `Q${p.id}: calculated ${computedAnswer} -> ${rounded}, expected ${p.expectedValue}`
    );
  }
});
