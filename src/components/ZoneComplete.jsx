import { useEffect } from 'react';
import { Confetti } from './FX';
import { sfx } from '../lib/sfx';

export function ZoneComplete({ state, onContinue }) {
  useEffect(() => {
    sfx.victory();
  }, []);

  // Use per-zone accuracy instead of global
  const accuracy = state.zoneRunTotal > 0
    ? Math.round((state.zoneRunCorrect / state.zoneRunTotal) * 100)
    : 0;

  const grade = accuracy >= 90 ? 'S' : accuracy >= 80 ? 'A' : accuracy >= 70 ? 'B' : accuracy >= 60 ? 'C' : 'D';
  const gradeEmoji = { S: '👑', A: '⭐', B: '✨', C: '🔶', D: '🔸' }[grade];

  const isDaily = state.currentZone === 'daily-challenge';
  const isNewBest = state.lastAnswer?.isNewBest;

  return (
    <div className="screen zone-complete-screen">
      <Confetti />
      <div className="victory-effects">
        <div className="sparkle s1">✨</div>
        <div className="sparkle s2">⭐</div>
        <div className="sparkle s3">✨</div>
      </div>

      <div className="trophy-icon">🏆</div>
      <h1 className="victory-title">
        {isDaily ? 'Daily Challenge Complete!' : 'Zone Cleared!'}
      </h1>

      {isNewBest && (
        <div className="new-best-banner">🌟 New Best Score! 🌟</div>
      )}

      <div className="grade-display">
        <span className="grade-emoji">{gradeEmoji}</span>
        <span className="grade-letter">{grade}</span>
      </div>

      <div className="victory-stats">
        <div className="v-stat">
          <span className="v-label">Accuracy</span>
          <span className="v-value">{accuracy}%</span>
        </div>
        <div className="v-stat">
          <span className="v-label">Level</span>
          <span className="v-value">{state.level}</span>
        </div>
        <div className="v-stat">
          <span className="v-label">Best Streak</span>
          <span className="v-value">🔥 {state.bestStreak}</span>
        </div>
        <div className="v-stat">
          <span className="v-label">Gold Earned</span>
          <span className="v-value">🪙 {state.gold}</span>
        </div>
      </div>

      <button className="btn btn-primary btn-continue" onClick={onContinue}>
        🗺️ Return to Map
      </button>
    </div>
  );
}
