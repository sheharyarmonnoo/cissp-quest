// Streak milestone definitions

export const STREAK_MILESTONES = [
  { threshold: 3, name: 'Fire', icon: '🔥', multiplier: 1.25, color: '#f97316', glow: '#f9731640' },
  { threshold: 5, name: 'Unstoppable', icon: '⚡', multiplier: 1.5, color: '#eab308', glow: '#eab30840' },
  { threshold: 10, name: 'LEGENDARY', icon: '🌟', multiplier: 2.0, color: '#a855f7', glow: '#a855f740' },
];

export function getStreakMilestone(streak) {
  for (let i = STREAK_MILESTONES.length - 1; i >= 0; i--) {
    if (streak >= STREAK_MILESTONES[i].threshold) {
      return STREAK_MILESTONES[i];
    }
  }
  return null;
}
