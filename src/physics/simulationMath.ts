export interface PhysicsScenarioConfig {
  /** Initial horizontal speed of particle 1 to the right (+x), in m/s */
  v1: number;
  /** Initial speed magnitude of particle 2 (base direction to the left -x), in m/s */
  v2: number;
  /** Gravitational acceleration downward (-y), in m/s^2 */
  g: number;
  /** Optional launch angle of particle 2 above horizontal-left (degrees, default 0) */
  launchAngle2Deg?: number;
  /** Optional uniform horizontal acceleration on both particles (+x), in m/s^2 (default 0) */
  ax?: number;
  /** Optional initial horizontal separation: particle 1 at 0, particle 2 at x2_0 (default 0) */
  initialX2?: number;
  /** Optional delay in seconds before particle 2 is released (particle 1 moves first for delay2 s) */
  delay2?: number;
  /** Optional elastic horizontal floor bounce exactly when particles first become perpendicular */
  bounceAtFirstPerp?: boolean;
  /** Target angle between velocity vectors in degrees (default 90) */
  targetAngleDeg?: number;
  /** Optional particle masses (kg) for kinetic energy questions */
  m1?: number;
  m2?: number;
  /** Duration of simulation playback in seconds */
  tMax: number;
  /** Critical event time t* to highlight in animation */
  tStar: number;
  /** Secondary critical time (e.g. bounce time for Q15) */
  tBounce?: number;
}

export interface KinematicSnapshot {
  t: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  vx1: number;
  vy1: number;
  vx2: number;
  vy2: number;
  speed1: number;
  speed2: number;
  dotProduct: number;
  angleDeg: number;
  separationDistance: number;
  /** Signed vertical drop from origin (positive downward) */
  drop1: number;
  drop2: number;
  triangleArea: number;
  keRatio2Over1: number;
  bounced: boolean;
}

/**
 * Computes exact kinematic state of both particles at time t (measured from t=0 when particle 1 starts;
 * if delay2 > 0, particle 2 stays at origin until t >= delay2).
 */
export function computeKinematicState(
  config: PhysicsScenarioConfig,
  tInput: number
): KinematicSnapshot {
  const t = Math.max(0, tInput);
  const g = config.g;
  const ax = config.ax ?? 0;
  const delay2 = config.delay2 ?? 0;
  const initialX2 = config.initialX2 ?? 0;
  const theta2Rad = ((config.launchAngle2Deg ?? 0) * Math.PI) / 180;

  const v1x0 = config.v1;
  const v1y0 = 0;

  const v2x0 = -config.v2 * Math.cos(theta2Rad);
  const v2y0 = config.v2 * Math.sin(theta2Rad);

  let x1 = 0;
  let y1 = 0;
  let vx1 = v1x0;
  let vy1 = v1y0;

  let x2 = initialX2;
  let y2 = 0;
  let vx2 = 0;
  let vy2 = 0;
  let bounced = false;

  if (config.bounceAtFirstPerp && config.tBounce !== undefined && t > config.tBounce) {
    // At tBounce, both particles hit an elastic horizontal floor simultaneously
    const tb = config.tBounce;
    const yb = -0.5 * g * tb * tb;
    const vyBefore = -g * tb;
    const vyAfter = -vyBefore; // elastic rebound upward
    const tau = t - tb;
    bounced = true;

    x1 = v1x0 * t + 0.5 * ax * t * t;
    y1 = yb + vyAfter * tau - 0.5 * g * tau * tau;
    vx1 = v1x0 + ax * t;
    vy1 = vyAfter - g * tau;

    x2 = initialX2 + v2x0 * t + 0.5 * ax * t * t;
    y2 = yb + vyAfter * tau - 0.5 * g * tau * tau;
    vx2 = v2x0 + ax * t;
    vy2 = vyAfter - g * tau;
  } else {
    x1 = v1x0 * t + 0.5 * ax * t * t;
    y1 = v1y0 * t - 0.5 * g * t * t;
    vx1 = v1x0 + ax * t;
    vy1 = v1y0 - g * t;

    const t2 = Math.max(0, t - delay2);
    if (t >= delay2) {
      x2 = initialX2 + v2x0 * t2 + 0.5 * ax * t2 * t2;
      y2 = v2y0 * t2 - 0.5 * g * t2 * t2;
      vx2 = v2x0 + ax * t2;
      vy2 = v2y0 - g * t2;
    } else {
      x2 = initialX2;
      y2 = 0;
      vx2 = v2x0;
      vy2 = v2y0;
    }
  }

  const speed1 = Math.hypot(vx1, vy1);
  const speed2 = Math.hypot(vx2, vy2);
  const dotProduct = vx1 * vx2 + vy1 * vy2;
  const denom = speed1 * speed2;
  const cosAngle = denom > 1e-9 ? Math.max(-1, Math.min(1, dotProduct / denom)) : 1;
  const angleDeg = (Math.acos(cosAngle) * 180) / Math.PI;
  const separationDistance = Math.hypot(x1 - x2, y1 - y2);

  // Shoelace triangle area with vertices O(0,0), P1(x1,y1), P2(x2,y2)
  const triangleArea = 0.5 * Math.abs(x1 * y2 - x2 * y1);

  const m1 = config.m1 ?? 1;
  const m2 = config.m2 ?? 1;
  const ke1 = 0.5 * m1 * speed1 * speed1;
  const ke2 = 0.5 * m2 * speed2 * speed2;
  const keRatio2Over1 = ke1 > 1e-9 ? ke2 / ke1 : 0;

  return {
    t,
    x1,
    y1,
    x2,
    y2,
    vx1,
    vy1,
    vx2,
    vy2,
    speed1,
    speed2,
    dotProduct,
    angleDeg,
    separationDistance,
    drop1: -y1,
    drop2: -y2,
    triangleArea,
    keRatio2Over1,
    bounced,
  };
}

/**
 * Analytical perpendicular time t* for the canonical Soal 3 case:
 * two opposite horizontal launches v1 (+x), v2 (-x) in uniform g.
 */
export function solveCanonicalPerpTime(v1: number, v2: number, g: number): number {
  return Math.sqrt(v1 * v2) / g;
}

/**
 * Analytical distance d* for the canonical Soal 3 case.
 */
export function solveCanonicalDistance(v1: number, v2: number, g: number): number {
  return ((v1 + v2) * Math.sqrt(v1 * v2)) / g;
}

/**
 * Analytical time when angle between velocity vectors equals targetAngleDeg (for opposite horizontal launches).
 */
export function solveAngleTime(
  v1: number,
  v2: number,
  g: number,
  targetAngleDeg: number
): number {
  const cosTheta = Math.cos((targetAngleDeg * Math.PI) / 180);
  if (Math.abs(cosTheta) < 1e-9) {
    return solveCanonicalPerpTime(v1, v2, g);
  }
  const c2 = cosTheta * cosTheta;
  // (u - v1*v2)^2 = c2 * (u + v1^2) * (u + v2^2), where u = (g*t)^2
  const A = 1 - c2;
  const B = -2 * v1 * v2 - c2 * (v1 * v1 + v2 * v2);
  const C = (1 - c2) * v1 * v1 * v2 * v2;
  const disc = B * B - 4 * A * C;
  const sqrtDisc = Math.sqrt(Math.max(0, disc));
  const u1 = (-B + sqrtDisc) / (2 * A);
  const u2 = (-B - sqrtDisc) / (2 * A);
  // Check which root satisfies sign of dot product (u - v1*v2) matching cosTheta
  const candidate = cosTheta > 0 ? Math.max(u1, u2) : Math.min(u1, u2);
  return Math.sqrt(Math.max(0, candidate)) / g;
}
