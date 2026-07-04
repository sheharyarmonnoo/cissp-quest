import { useState, useEffect } from 'react';

export function EnemyDisplay({ enemy, currentQuestion, totalQuestions, lastAnswer }) {
  const [animClass, setAnimClass] = useState('');
  const [artFailed, setArtFailed] = useState(false);

  const hpPercent = Math.max(0, ((totalQuestions - currentQuestion) / totalQuestions) * 100);
  const defeated = currentQuestion >= totalQuestions;

  useEffect(() => {
    if (!lastAnswer) return;
    if (lastAnswer.isCorrect) {
      setAnimClass('enemy-hit');
    } else {
      setAnimClass('enemy-dodge');
    }
    const timer = setTimeout(() => setAnimClass(''), 500);
    return () => clearTimeout(timer);
  }, [lastAnswer]);

  useEffect(() => {
    setArtFailed(false);
  }, [enemy?.art]);

  if (!enemy) return null;

  const showArt = enemy.art && !artFailed;

  return (
    <div className={`enemy-display ${animClass} ${defeated ? 'enemy-defeated' : ''}`}>
      {showArt ? (
        <img
          className="enemy-portrait enemy-icon"
          src={enemy.art}
          alt={enemy.name}
          onError={() => setArtFailed(true)}
        />
      ) : (
        <div className="enemy-icon">{enemy.icon}</div>
      )}
      <div className="enemy-info">
        <div className="enemy-name">{enemy.name}</div>
        <div className="enemy-hp-bar">
          <div
            className="enemy-hp-fill"
            style={{ width: `${hpPercent}%` }}
          />
        </div>
        <div className="enemy-hp-text">{Math.round(hpPercent)}% HP</div>
      </div>
    </div>
  );
}
