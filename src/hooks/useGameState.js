import { useState, useCallback, useEffect, useRef } from 'react';
import { ZONES, FINAL_BOSS } from '../data/zones';
import { ITEMS, ABILITIES } from '../data/items';
import { getStreakMilestone } from '../data/streakConfig';
import { getDailyChallenge, getDailyChallengeDate } from '../data/dailyChallenge';
import { loadStateFromDB, saveStateToDB, clearStateFromDB } from '../lib/db';

const INITIAL_STATE = {
  playerName: 'Security Warrior',
  level: 1,
  xp: 0,
  xpToNext: 100,
  hp: 100,
  maxHp: 100,
  streak: 0,
  bestStreak: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  gold: 0,
  zonesCompleted: [],
  currentZone: null,
  currentQuestion: 0,
  zoneScores: {},
  gamePhase: 'map',
  showExplanation: false,
  lastAnswer: null,
  bossDefeated: false,
  // New fields
  inventory: {},
  activeEffects: {},
  unlockedAbilities: [],
  zoneRunCorrect: 0,
  zoneRunTotal: 0,
  timerMode: false,
  dailyChallengeDate: null,
  dailyChallengeCompleted: false,
  dailyChallengeScore: null,
  zoneBestGrades: {},
  secondChanceUsed: false,
  eliminatedOptions: [],
  hintText: null,
};

// Sync load from localStorage as fallback for initial render
function loadStateSync() {
  try {
    const saved = localStorage.getItem('cissp-quest-state');
    if (saved) return { ...INITIAL_STATE, ...JSON.parse(saved) };
  } catch {}
  return null;
}

function getGrade(accuracy) {
  if (accuracy >= 90) return 'S';
  if (accuracy >= 80) return 'A';
  if (accuracy >= 70) return 'B';
  if (accuracy >= 60) return 'C';
  return 'D';
}

const GRADE_ORDER = { S: 5, A: 4, B: 3, C: 2, D: 1 };

function generateHint(question) {
  const correctIdx = question.correct;
  const correctText = question.options[correctIdx];
  // Return first ~40 chars of correct answer as a teaser
  const hint = correctText.length > 40
    ? correctText.substring(0, 40) + '...'
    : 'The answer relates to: ' + correctText.split(' ').slice(0, 3).join(' ') + '...';
  return hint;
}

export function useGameState() {
  const [state, setState] = useState(() => loadStateSync() || { ...INITIAL_STATE });
  const saveTimer = useRef(null);

  // Load from IndexedDB on mount (replaces sync localStorage)
  useEffect(() => {
    loadStateFromDB().then(saved => {
      if (saved) setState(prev => ({ ...INITIAL_STATE, ...saved }));
    });
  }, []);

  // Debounced save to IndexedDB
  const saveToDB = useCallback((nextState) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveStateToDB(nextState);
    }, 100);
  }, []);

  const updateState = useCallback((updates) => {
    setState(prev => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
      saveToDB(next);
      return next;
    });
  }, [saveToDB]);

  const CHAPTER_STARTS = new Set([0, 8]);

  const getZones = useCallback(() => {
    return ZONES.map((zone, i) => ({
      ...zone,
      unlocked: CHAPTER_STARTS.has(i) || state.zonesCompleted.includes(ZONES[i - 1].id),
      completed: state.zonesCompleted.includes(zone.id),
      score: state.zoneScores[zone.id] || null,
      bestGrade: state.zoneBestGrades[zone.id] || null,
    }));
  }, [state.zonesCompleted, state.zoneScores, state.zoneBestGrades]);

  const getFinalBoss = useCallback(() => ({
    ...FINAL_BOSS,
    unlocked: state.zonesCompleted.length === ZONES.length,
    completed: state.bossDefeated,
  }), [state.zonesCompleted, state.bossDefeated]);

  const getCurrentZone = useCallback(() => {
    if (state.currentZone === 'final-boss') return FINAL_BOSS;
    if (state.currentZone === 'daily-challenge') return null;
    return ZONES.find(z => z.id === state.currentZone) || null;
  }, [state.currentZone]);

  const enterZone = useCallback((zoneId) => {
    const zone = ZONES.find(z => z.id === zoneId);
    if (!zone) return;

    // Check if Scholar's Shield ability is unlocked - auto-apply shield
    const hasScholarsShield = state.unlockedAbilities.includes('scholars-shield');

    updateState(prev => ({
      ...prev,
      currentZone: zoneId,
      currentQuestion: 0,
      gamePhase: 'battle',
      showExplanation: false,
      lastAnswer: null,
      zoneRunCorrect: 0,
      zoneRunTotal: 0,
      secondChanceUsed: false,
      eliminatedOptions: [],
      hintText: null,
      activeEffects: hasScholarsShield
        ? { ...prev.activeEffects, shield: true }
        : { doubleXp: false, shield: false },
    }));
  }, [updateState, state.unlockedAbilities]);

  const enterFinalBoss = useCallback(() => {
    const hasScholarsShield = state.unlockedAbilities.includes('scholars-shield');
    updateState(prev => ({
      ...prev,
      currentZone: 'final-boss',
      currentQuestion: 0,
      gamePhase: 'finalBoss',
      showExplanation: false,
      lastAnswer: null,
      zoneRunCorrect: 0,
      zoneRunTotal: 0,
      secondChanceUsed: false,
      eliminatedOptions: [],
      hintText: null,
      activeEffects: hasScholarsShield
        ? { ...prev.activeEffects, shield: true }
        : { doubleXp: false, shield: false },
    }));
  }, [updateState, state.unlockedAbilities]);

  const enterDailyChallenge = useCallback(() => {
    const hasScholarsShield = state.unlockedAbilities.includes('scholars-shield');
    updateState(prev => ({
      ...prev,
      currentZone: 'daily-challenge',
      currentQuestion: 0,
      gamePhase: 'battle',
      showExplanation: false,
      lastAnswer: null,
      zoneRunCorrect: 0,
      zoneRunTotal: 0,
      secondChanceUsed: false,
      eliminatedOptions: [],
      hintText: null,
      activeEffects: hasScholarsShield
        ? { ...prev.activeEffects, shield: true }
        : { doubleXp: false, shield: false },
    }));
  }, [updateState, state.unlockedAbilities]);

  const getCurrentQuestions = useCallback(() => {
    if (state.currentZone === 'final-boss') return FINAL_BOSS.questions;
    if (state.currentZone === 'daily-challenge') return getDailyChallenge().questions;
    const zone = ZONES.find(z => z.id === state.currentZone);
    return zone ? zone.questions : [];
  }, [state.currentZone]);

  const buyItem = useCallback((itemId) => {
    const item = ITEMS[itemId];
    if (!item || state.gold < item.cost) return;
    updateState(prev => ({
      ...prev,
      gold: prev.gold - item.cost,
      inventory: {
        ...prev.inventory,
        [itemId]: (prev.inventory[itemId] || 0) + 1,
      },
    }));
  }, [state.gold, updateState]);

  const useItem = useCallback((itemId) => {
    if (!state.inventory[itemId] || state.inventory[itemId] <= 0) return;

    const questions = state.currentZone === 'final-boss'
      ? FINAL_BOSS.questions
      : state.currentZone === 'daily-challenge'
        ? getDailyChallenge().questions
        : ZONES.find(z => z.id === state.currentZone)?.questions;
    if (!questions) return;
    const question = questions[state.currentQuestion];
    if (!question) return;

    updateState(prev => {
      const newInventory = {
        ...prev.inventory,
        [itemId]: prev.inventory[itemId] - 1,
      };

      let newEffects = { ...prev.activeEffects };
      let newEliminated = [...prev.eliminatedOptions];
      let newHint = prev.hintText;

      if (itemId === 'fifty-fifty') {
        // Remove 2 wrong answers
        const wrongIndices = [0, 1, 2, 3].filter(i => i !== question.correct && !prev.eliminatedOptions.includes(i));
        const toEliminate = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
        newEliminated = [...prev.eliminatedOptions, ...toEliminate];
      } else if (itemId === 'hint-scroll') {
        newHint = generateHint(question);
      } else if (itemId === 'guardian-shield') {
        newEffects.shield = true;
      } else if (itemId === 'double-xp') {
        newEffects.doubleXp = true;
      }

      return {
        ...prev,
        inventory: newInventory,
        activeEffects: newEffects,
        eliminatedOptions: newEliminated,
        hintText: newHint,
      };
    });
  }, [state.inventory, state.currentZone, state.currentQuestion, updateState]);

  const useAbility = useCallback((abilityId) => {
    if (abilityId === 'second-chance' && !state.secondChanceUsed) {
      updateState(prev => ({
        ...prev,
        secondChanceUsed: true,
        showExplanation: false,
        lastAnswer: null,
      }));
    }
  }, [state.secondChanceUsed, updateState]);

  const answerQuestion = useCallback((selectedIndex) => {
    const questions = state.currentZone === 'final-boss'
      ? FINAL_BOSS.questions
      : state.currentZone === 'daily-challenge'
        ? getDailyChallenge().questions
        : ZONES.find(z => z.id === state.currentZone)?.questions;
    if (!questions) return;
    const question = questions[state.currentQuestion];
    const isCorrect = selectedIndex === question.correct;

    // Check if this is a replay zone
    const isReplay = state.currentZone !== 'final-boss'
      && state.currentZone !== 'daily-challenge'
      && state.zonesCompleted.includes(state.currentZone);

    updateState(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const milestone = getStreakMilestone(newStreak);
      const streakMultiplier = milestone ? milestone.multiplier : 1;

      const difficultyXP = question.difficulty * 15;
      const bossBonus = question.type === 'boss' ? 25 : 0;
      let xpGained = isCorrect ? difficultyXP + bossBonus : 0;

      // Apply streak multiplier
      if (isCorrect && streakMultiplier > 1) {
        xpGained = Math.floor(xpGained * streakMultiplier);
      }

      // Apply double XP effect
      if (isCorrect && prev.activeEffects.doubleXp) {
        xpGained *= 2;
      }

      // Replay penalty: 50% XP and gold
      const replayFactor = isReplay ? 0.5 : 1;
      xpGained = Math.floor(xpGained * replayFactor);

      const goldGained = isCorrect
        ? Math.floor(((question.difficulty * 5) + (question.type === 'boss' ? 15 : 0)) * replayFactor)
        : 0;

      // HP loss - blocked by shield
      let hpLoss = 0;
      let shieldBlocked = false;
      if (!isCorrect) {
        if (prev.activeEffects.shield) {
          shieldBlocked = true;
          hpLoss = 0;
        } else {
          hpLoss = 10;
        }
      }

      let newXp = prev.xp + xpGained;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNext;
      let newMaxHp = prev.maxHp;
      let newUnlockedAbilities = [...prev.unlockedAbilities];

      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel += 1;
        newXpToNext = Math.floor(newXpToNext * 1.3);
        newMaxHp += 10;
      }

      // Check for ability unlocks
      for (const ability of Object.values(ABILITIES)) {
        if (newLevel >= ability.unlockLevel && !newUnlockedAbilities.includes(ability.id)) {
          newUnlockedAbilities.push(ability.id);
        }
      }

      // Clear consumed effects
      const newEffects = { ...prev.activeEffects };
      if (isCorrect) {
        newEffects.doubleXp = false;
      }
      if (!isCorrect && shieldBlocked) {
        newEffects.shield = false;
      }

      // Bonus XP info for timer
      const timerBonusXp = 0; // Will be added by BattleScreen via separate param

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpToNext: newXpToNext,
        hp: Math.max(0, prev.hp - hpLoss),
        maxHp: newMaxHp,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
        totalAnswered: prev.totalAnswered + 1,
        gold: prev.gold + goldGained,
        zoneRunCorrect: prev.zoneRunCorrect + (isCorrect ? 1 : 0),
        zoneRunTotal: prev.zoneRunTotal + 1,
        showExplanation: true,
        lastAnswer: {
          selectedIndex,
          isCorrect,
          xpGained,
          goldGained,
          streakMultiplier: isCorrect ? streakMultiplier : 1,
          shieldBlocked,
          isReplay,
        },
        activeEffects: newEffects,
        unlockedAbilities: newUnlockedAbilities,
        eliminatedOptions: [],
        hintText: null,
      };
    });
  }, [state.currentZone, state.currentQuestion, state.zonesCompleted, updateState]);

  const addTimerBonus = useCallback((bonusXp) => {
    if (bonusXp <= 0) return;
    updateState(prev => {
      let newXp = prev.xp + bonusXp;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNext;
      let newMaxHp = prev.maxHp;

      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel += 1;
        newXpToNext = Math.floor(newXpToNext * 1.3);
        newMaxHp += 10;
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpToNext: newXpToNext,
        maxHp: newMaxHp,
        lastAnswer: prev.lastAnswer ? { ...prev.lastAnswer, timerBonusXp: bonusXp } : prev.lastAnswer,
      };
    });
  }, [updateState]);

  const nextQuestion = useCallback(() => {
    const questions = state.currentZone === 'final-boss'
      ? FINAL_BOSS.questions
      : state.currentZone === 'daily-challenge'
        ? getDailyChallenge().questions
        : ZONES.find(z => z.id === state.currentZone)?.questions;
    if (!questions) return;

    if (state.hp <= 0) {
      updateState({ gamePhase: 'defeat', showExplanation: false });
      return;
    }

    if (state.currentQuestion + 1 >= questions.length) {
      // Zone completed
      if (state.currentZone === 'final-boss') {
        updateState(prev => ({
          ...prev,
          gamePhase: 'gameWon',
          bossDefeated: true,
          showExplanation: false,
        }));
      } else if (state.currentZone === 'daily-challenge') {
        const accuracy = state.zoneRunTotal > 0
          ? Math.round((state.zoneRunCorrect / state.zoneRunTotal) * 100) : 0;
        updateState(prev => ({
          ...prev,
          gamePhase: 'zoneComplete',
          showExplanation: false,
          dailyChallengeDate: getDailyChallengeDate(),
          dailyChallengeCompleted: true,
          dailyChallengeScore: accuracy,
        }));
      } else {
        const accuracy = state.zoneRunTotal > 0
          ? Math.round((state.zoneRunCorrect / state.zoneRunTotal) * 100) : 0;
        const grade = getGrade(accuracy);
        const prevScore = state.zoneScores[state.currentZone] || 0;
        const prevGrade = state.zoneBestGrades[state.currentZone] || null;
        const isNewBest = accuracy > prevScore;
        const newScore = Math.max(accuracy, prevScore);
        const newGrade = !prevGrade || GRADE_ORDER[grade] > GRADE_ORDER[prevGrade] ? grade : prevGrade;

        updateState(prev => ({
          ...prev,
          gamePhase: 'zoneComplete',
          zonesCompleted: prev.zonesCompleted.includes(state.currentZone)
            ? prev.zonesCompleted
            : [...prev.zonesCompleted, state.currentZone],
          zoneScores: {
            ...prev.zoneScores,
            [state.currentZone]: newScore,
          },
          zoneBestGrades: {
            ...prev.zoneBestGrades,
            [state.currentZone]: newGrade,
          },
          showExplanation: false,
          lastAnswer: prev.lastAnswer ? { ...prev.lastAnswer, isNewBest } : null,
        }));
      }
    } else {
      updateState({
        currentQuestion: state.currentQuestion + 1,
        showExplanation: false,
        lastAnswer: null,
        eliminatedOptions: [],
        hintText: null,
      });
    }
  }, [state.currentZone, state.currentQuestion, state.hp, state.zoneRunCorrect, state.zoneRunTotal, state.zoneScores, state.zoneBestGrades, updateState]);

  const returnToMap = useCallback(() => {
    updateState({
      gamePhase: 'map',
      currentZone: null,
      currentQuestion: 0,
      showExplanation: false,
      lastAnswer: null,
      eliminatedOptions: [],
      hintText: null,
      activeEffects: {},
    });
  }, [updateState]);

  const healPlayer = useCallback(() => {
    if (state.gold >= 20) {
      updateState(prev => ({
        ...prev,
        hp: Math.min(prev.maxHp, prev.hp + 30),
        gold: prev.gold - 20,
      }));
    }
  }, [state.gold, updateState]);

  const toggleTimerMode = useCallback(() => {
    updateState(prev => ({ ...prev, timerMode: !prev.timerMode }));
  }, [updateState]);

  const resetGame = useCallback(() => {
    clearStateFromDB();
    setState({ ...INITIAL_STATE });
  }, []);

  return {
    state,
    getZones,
    getFinalBoss,
    getCurrentZone,
    enterZone,
    enterFinalBoss,
    enterDailyChallenge,
    getCurrentQuestions,
    answerQuestion,
    addTimerBonus,
    nextQuestion,
    returnToMap,
    healPlayer,
    resetGame,
    buyItem,
    useItem,
    useAbility,
    toggleTimerMode,
  };
}
