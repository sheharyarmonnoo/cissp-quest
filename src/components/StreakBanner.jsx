import { useState, useEffect } from 'react';
import { getStreakMilestone } from '../data/streakConfig';

export function StreakBanner({ streak }) {
  const [visible, setVisible] = useState(false);
  const [milestone, setMilestone] = useState(null);

  useEffect(() => {
    const ms = getStreakMilestone(streak);
    if (ms) {
      setMilestone(ms);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      setMilestone(null);
    }
  }, [streak]);

  if (!visible || !milestone) return null;

  const tierClass = milestone.threshold >= 10 ? 'legendary' : milestone.threshold >= 5 ? 'unstoppable' : 'fire';

  return (
    <div className={`streak-banner streak-${tierClass}`} style={{ '--streak-color': milestone.color, '--streak-glow': milestone.glow }}>
      <span className="streak-banner-icon">{milestone.icon}</span>
      <span className="streak-banner-text">{milestone.name}!</span>
      <span className="streak-banner-mult">{milestone.multiplier}x XP</span>
    </div>
  );
}
