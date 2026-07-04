import { useEffect, useState } from 'react';

// VS splash shown when a battle starts
export function VsSplash({ enemy, hero, zoneName, isBoss, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`vs-splash ${isBoss ? 'vs-boss' : ''}`} onClick={onDone}>
      <div className="vs-side vs-left">
        {hero?.art ? (
          <img
            className="vs-avatar vs-avatar-art"
            src={hero.art}
            alt={hero.name}
            onError={(e) => { e.currentTarget.outerHTML = '<div class="vs-avatar">🧙</div>'; }}
          />
        ) : (
          <div className="vs-avatar">🧙</div>
        )}
        <div className="vs-name">{hero?.name || 'You'}</div>
      </div>
      <div className="vs-badge">VS</div>
      <div className="vs-side vs-right">
        {enemy?.art ? (
          <img
            className="vs-avatar vs-avatar-art"
            src={enemy.art}
            alt={enemy.name}
            onError={(e) => { e.currentTarget.outerHTML = `<div class="vs-avatar">${enemy?.icon || '👾'}</div>`; }}
          />
        ) : (
          <div className="vs-avatar">{enemy?.icon || '👾'}</div>
        )}
        <div className="vs-name">{enemy?.name || 'Enemy'}</div>
      </div>
      <div className="vs-zone-name">{zoneName}</div>
    </div>
  );
}

// Floating reward/damage numbers spawned on each answer
export function FloatingRewards({ trigger }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const id = Date.now();
    const newItems = [];
    if (trigger.isCorrect) {
      newItems.push({ id: `${id}-xp`, text: `+${trigger.xpGained} XP`, cls: 'float-xp', x: 20 + Math.random() * 20 });
      if (trigger.goldGained > 0) {
        newItems.push({ id: `${id}-gold`, text: `+${trigger.goldGained} 🪙`, cls: 'float-gold', x: 55 + Math.random() * 20 });
      }
      newItems.push({ id: `${id}-slash`, text: '⚔️', cls: 'float-slash', x: 40 + Math.random() * 15 });
    } else if (trigger.shieldBlocked) {
      newItems.push({ id: `${id}-shield`, text: '🛡️ BLOCKED', cls: 'float-shield', x: 30 + Math.random() * 25 });
    } else {
      newItems.push({ id: `${id}-dmg`, text: '-10 HP', cls: 'float-dmg', x: 30 + Math.random() * 25 });
    }
    setItems(prev => [...prev, ...newItems]);
    const t = setTimeout(() => {
      setItems(prev => prev.filter(i => !newItems.some(n => n.id === i.id)));
    }, 1400);
    return () => clearTimeout(t);
  }, [trigger]);

  if (items.length === 0) return null;

  return (
    <div className="floating-layer">
      {items.map(i => (
        <span key={i.id} className={`floating-item ${i.cls}`} style={{ left: `${i.x}%` }}>
          {i.text}
        </span>
      ))}
    </div>
  );
}

const CONFETTI_COLORS = ['#7c3aed', '#a78bfa', '#fbbf24', '#34d399', '#f472b6', '#60a5fa'];

// Confetti burst for victory screens
export function Confetti({ count = 60 }) {
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 2,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 6 + Math.random() * 6,
      rotate: Math.random() * 360,
      drift: -40 + Math.random() * 80,
    }))
  );

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map(p => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.5,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            '--rot': `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}

// Level-up burst overlay
export function LevelUpBurst({ level, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="levelup-burst" onClick={onDone}>
      <div className="levelup-ring" />
      <div className="levelup-text">
        <span className="levelup-label">LEVEL UP!</span>
        <span className="levelup-number">Lv {level}</span>
      </div>
    </div>
  );
}
