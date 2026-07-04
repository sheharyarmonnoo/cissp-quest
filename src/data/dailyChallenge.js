// Daily challenge: seeded random 10 questions from all zones

import { ZONES } from './zones';

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0x100000000;
  };
}

function getDaySeed() {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

export function getDailyChallenge() {
  const seed = getDaySeed();
  const rng = seededRandom(seed);

  // Collect all questions from all zones
  const allQuestions = [];
  for (const zone of ZONES) {
    for (const q of zone.questions) {
      allQuestions.push({ ...q, sourceZone: zone.name });
    }
  }

  // Fisher-Yates shuffle with seeded RNG
  const shuffled = [...allQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return {
    seed,
    date: new Date().toISOString().split('T')[0],
    questions: shuffled.slice(0, 10).map((q, i) => ({
      ...q,
      id: `daily-${i}`,
      type: 'mc',
    })),
  };
}

export function getDailyChallengeDate() {
  return new Date().toISOString().split('T')[0];
}
