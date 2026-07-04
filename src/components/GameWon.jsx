import { useEffect } from 'react';
import { Confetti } from './FX';
import { sfx } from '../lib/sfx';

export function GameWon({ state, onReturn }) {
  const accuracy = state.totalAnswered > 0
    ? Math.round((state.totalCorrect / state.totalAnswered) * 100)
    : 0;

  useEffect(() => {
    sfx.victory();
  }, []);

  return (
    <div className="screen game-won-screen">
      <Confetti count={90} />
      <div className="fireworks">
        <div className="fw fw1">🎆</div>
        <div className="fw fw2">🎇</div>
        <div className="fw fw3">🎆</div>
        <div className="fw fw4">🎇</div>
      </div>

      <div className="crown-icon">👑</div>
      <h1 className="won-title">CISSP Quest Complete!</h1>
      <p className="won-subtitle">You slayed the CAT Hydra and conquered all 8 CISSP domains!</p>

      <div className="final-stats">
        <div className="f-stat">
          <span className="f-icon">⚔️</span>
          <span className="f-label">Final Level</span>
          <span className="f-value">{state.level}</span>
        </div>
        <div className="f-stat">
          <span className="f-icon">🎯</span>
          <span className="f-label">Accuracy</span>
          <span className="f-value">{accuracy}%</span>
        </div>
        <div className="f-stat">
          <span className="f-icon">🔥</span>
          <span className="f-label">Best Streak</span>
          <span className="f-value">{state.bestStreak}</span>
        </div>
        <div className="f-stat">
          <span className="f-icon">🪙</span>
          <span className="f-label">Gold Collected</span>
          <span className="f-value">{state.gold}</span>
        </div>
        <div className="f-stat">
          <span className="f-icon">📝</span>
          <span className="f-label">Questions Answered</span>
          <span className="f-value">{state.totalAnswered}</span>
        </div>
        <div className="f-stat">
          <span className="f-icon">✅</span>
          <span className="f-label">Correct Answers</span>
          <span className="f-value">{state.totalCorrect}</span>
        </div>
      </div>

      <div className="won-message">
        {accuracy >= 90 && <p>🏅 Master rank achieved! You're CISSP exam ready!</p>}
        {accuracy >= 70 && accuracy < 90 && <p>💪 Great job! Review the zones you missed for mastery.</p>}
        {accuracy < 70 && <p>📚 Keep studying! Replay zones to improve your score.</p>}
      </div>

      <button className="btn btn-primary btn-return" onClick={onReturn}>
        🗺️ Return to Map
      </button>
    </div>
  );
}
