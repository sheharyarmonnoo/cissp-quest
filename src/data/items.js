// Item and ability definitions for CISSP Quest

export const ITEMS = {
  'fifty-fifty': {
    id: 'fifty-fifty',
    name: '50/50 Eliminator',
    icon: '🎯',
    description: 'Removes 2 wrong answers',
    cost: 40,
    usableInBattle: true,
  },
  'hint-scroll': {
    id: 'hint-scroll',
    name: 'Hint Scroll',
    icon: '📜',
    description: 'Reveals a helpful hint',
    cost: 30,
    usableInBattle: true,
  },
  'guardian-shield': {
    id: 'guardian-shield',
    name: 'Guardian Shield',
    icon: '🛡️',
    description: 'Blocks HP loss on next wrong answer',
    cost: 50,
    usableInBattle: true,
  },
  'double-xp': {
    id: 'double-xp',
    name: 'Double XP Potion',
    icon: '⚗️',
    description: '2x XP for next correct answer',
    cost: 60,
    usableInBattle: true,
  },
};

export const ABILITIES = {
  'second-chance': {
    id: 'second-chance',
    name: 'Second Chance',
    icon: '🔄',
    description: 'Retry a wrong answer once per zone',
    unlockLevel: 3,
  },
  'scholars-shield': {
    id: 'scholars-shield',
    name: "Scholar's Shield",
    icon: '📚',
    description: 'Start each zone with a free shield',
    unlockLevel: 5,
  },
};

export const ITEM_IDS = Object.keys(ITEMS);
export const ABILITY_IDS = Object.keys(ABILITIES);
