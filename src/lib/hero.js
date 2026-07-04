// Hero evolution tiers - the avatar upgrades as the player levels up.

export function getHeroTier(level) {
  if (level >= 10) {
    return { id: 'paladin', name: 'Firewall Paladin', art: '/hero/paladin.webp', icon: '🛡️' };
  }
  if (level >= 5) {
    return { id: 'knight', name: 'Cyber Knight', art: '/hero/knight.webp', icon: '⚔️' };
  }
  return { id: 'novice', name: 'Security Recruit', art: '/hero/novice.webp', icon: '🧑‍💻' };
}
