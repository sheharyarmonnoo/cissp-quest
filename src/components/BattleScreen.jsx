import { useState, useEffect, useCallback, useRef } from 'react';
import { ITEMS } from '../data/items';
import { EnemyDisplay } from './EnemyDisplay';
import { StreakBanner } from './StreakBanner';
import { useTimer } from '../hooks/useTimer';
import { VsSplash, FloatingRewards, LevelUpBurst } from './FX';
import { CinematicStage, CLIP_SETS, pickClip, isCinematicEnabled, toggleCinematic } from './CinematicStage';
import { sfx } from '../lib/sfx';
import { getHeroTier } from '../lib/hero';
import { ZONES } from '../data/zones';

export function BattleScreen({ state, questions, currentZone, onAnswer, onNext, onRetreat, onUseItem, onUseAbility, onTimerBonus }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showVs, setShowVs] = useState(true);
  const [shake, setShake] = useState(false);
  const [levelUp, setLevelUp] = useState(null);
  const [cinematic, setCinematic] = useState(isCinematicEnabled());
  const [cinClip, setCinClip] = useState(null);
  const clipCounter = useRef(0);
  const lastClipUrl = useRef(null);
  const prevLevel = useRef(state.level);
  const question = questions[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;
  const isBoss = state.gamePhase === 'finalBoss';
  const isDaily = state.currentZone === 'daily-challenge';
  const useCinematic = cinematic && !isDaily;
  const clipPlaying = useCinematic && cinClip !== null;
  const clipSet = isBoss ? 'hydra' : 'generic';

  const playBeat = (beat, act = 1) => {
    const url = pickClip(clipSet, beat, act, lastClipUrl.current);
    if (!url) return;
    lastClipUrl.current = url;
    clipCounter.current += 1;
    setCinClip({ url, id: clipCounter.current });
  };

  // Battle intro splash + sound, re-shown whenever a new battle starts
  useEffect(() => {
    setShowVs(true);
    lastClipUrl.current = null;
    if (cinematic && state.currentZone !== 'daily-challenge') {
      const url = pickClip(state.currentZone === 'final-boss' ? 'hydra' : 'generic', 'intro', 1, null);
      clipCounter.current += 1;
      setCinClip(url ? { url, id: clipCounter.current } : null);
    } else {
      setCinClip(null);
    }
    if (isBoss) sfx.bossIntro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentZone]);

  // React to each answer: sound, shake, floating numbers, cinematic branch.
  // Fights escalate to Act 2 footage past the halfway point.
  useEffect(() => {
    if (!state.lastAnswer) return;
    const act = (state.currentQuestion + 1) / questions.length > 0.5 ? 2 : 1;
    if (state.lastAnswer.isCorrect) {
      sfx.correct();
      if (useCinematic) {
        const isLastQuestion = state.currentQuestion + 1 >= questions.length;
        playBeat(isLastQuestion ? 'victory' : 'strike', act);
      }
    } else if (state.lastAnswer.shieldBlocked) {
      sfx.shield();
    } else {
      sfx.wrong();
      if (useCinematic) {
        playBeat(state.hp <= 0 ? 'defeat' : 'hit', act);
      }
      setShake(true);
      const t = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.lastAnswer]);

  // Level-up fanfare
  useEffect(() => {
    if (state.level > prevLevel.current) {
      sfx.levelUp();
      setLevelUp(state.level);
    }
    prevLevel.current = state.level;
  }, [state.level]);

  const handleTimeout = useCallback(() => {
    if (!state.showExplanation && selectedOption === null) {
      const wrongIdx = [0, 1, 2, 3].find(i => i !== question?.correct);
      if (wrongIdx !== undefined) {
        setSelectedOption(wrongIdx);
        onAnswer(wrongIdx);
      }
    }
  }, [state.showExplanation, selectedOption, question, onAnswer]);

  const timer = useTimer({
    enabled: state.timerMode && !state.showExplanation && !clipPlaying,
    onTimeout: handleTimeout,
    paused: state.showExplanation || clipPlaying,
  });

  useEffect(() => {
    setSelectedOption(null);
    timer.reset();
  }, [state.currentQuestion]);

  if (!question) return null;

  const handleSelect = (index) => {
    if (state.showExplanation) return;
    if (state.eliminatedOptions.includes(index)) return;
    sfx.select();
    setSelectedOption(index);

    if (state.timerMode && index === question.correct) {
      const bonus = timer.timeLeft * 2;
      onAnswer(index);
      if (bonus > 0) onTimerBonus(bonus);
    } else {
      onAnswer(index);
    }
  };

  const getOptionClass = (index) => {
    if (state.eliminatedOptions.includes(index)) return 'eliminated';
    if (!state.showExplanation) {
      return index === selectedOption ? 'selected' : '';
    }
    if (index === question.correct) return 'correct';
    if (index === state.lastAnswer?.selectedIndex && !state.lastAnswer?.isCorrect) return 'incorrect';
    return 'dimmed';
  };

  const baseEnemy = currentZone?.enemy || (isBoss ? { name: 'The CAT Hydra', icon: '🐲' } : null);
  const artId = isBoss ? 'cat-hydra' : currentZone?.id;
  const enemy = baseEnemy ? { ...baseEnemy, art: artId ? `/enemies/${artId}.webp` : null } : null;
  const hero = getHeroTier(state.level);
  const zoneIdx = ZONES.findIndex(z => z.id === state.currentZone);
  const arenaDomain = !isBoss && zoneIdx >= 0 ? Math.floor(zoneIdx / 2) + 1 : null;

  const canSecondChance = state.unlockedAbilities.includes('second-chance')
    && !state.secondChanceUsed
    && state.showExplanation
    && state.lastAnswer
    && !state.lastAnswer.isCorrect;

  return (
    <div className={`battle-screen ${isBoss ? 'boss-battle' : ''} ${shake ? 'screen-shake' : ''}`}>
      {useCinematic && (
        <CinematicStage
          clip={cinClip}
          poster={CLIP_SETS[clipSet].poster}
          onClipEnd={() => setCinClip(null)}
          onError={() => setCinematic(false)}
        />
      )}
      {!useCinematic && arenaDomain && (
        <div
          className="battle-arena-bg"
          style={{ backgroundImage: `url(/arenas/d${arenaDomain}.webp)` }}
          aria-hidden="true"
        />
      )}
      {showVs && !isDaily && (
        <VsSplash
          enemy={enemy}
          hero={hero}
          zoneName={isBoss ? 'FINAL BATTLE' : currentZone?.name}
          isBoss={isBoss}
          onDone={() => setShowVs(false)}
        />
      )}
      {levelUp && <LevelUpBurst level={levelUp} onDone={() => setLevelUp(null)} />}
      <FloatingRewards trigger={state.showExplanation ? state.lastAnswer : null} />
      <div className="battle-header">
        <button className="btn btn-retreat" onClick={onRetreat}>
          ←
        </button>
        <div className="battle-progress">
          <div className="progress-text">
            Q{state.currentQuestion + 1}/{questions.length}
            {isDaily && <span className="daily-badge-sm">Daily</span>}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="battle-diff">
          {'⭐'.repeat(question.difficulty)}
        </div>
        {!isDaily && (
          <button
            className="btn btn-retreat btn-cinematic-toggle"
            style={{ opacity: cinematic ? 1 : 0.4 }}
            onClick={() => { setCinematic(toggleCinematic()); setCinClip(null); }}
            title={cinematic ? 'Cinematic battles ON' : 'Cinematic battles OFF'}
          >
            🎬
          </button>
        )}
      </div>

      {isBoss && (
        <div className="boss-banner">
          <span className="boss-emoji">🐉</span> BOSS BATTLE <span className="boss-emoji">🐉</span>
        </div>
      )}

      {enemy && (
        <EnemyDisplay
          enemy={enemy}
          currentQuestion={state.currentQuestion + (state.showExplanation && state.lastAnswer?.isCorrect ? 1 : 0)}
          totalQuestions={questions.length}
          lastAnswer={state.lastAnswer}
        />
      )}

      {state.timerMode && !state.showExplanation && !clipPlaying && (
        <div className={`timer-bar ${timer.urgent ? 'timer-urgent' : ''}`}>
          <div
            className="timer-fill"
            style={{ width: `${timer.percent}%`, background: timer.color }}
          />
          <span className="timer-text">{timer.timeLeft}s</span>
        </div>
      )}

      <StreakBanner streak={state.streak} />

      {/* Item Toolbar */}
      {!state.showExplanation && !clipPlaying && (
        <div className="item-toolbar">
          {Object.values(ITEMS).filter(item => item.usableInBattle).map(item => {
            const qty = state.inventory[item.id] || 0;
            const disabled = qty <= 0
              || (item.id === 'fifty-fifty' && state.eliminatedOptions.length > 0)
              || (item.id === 'hint-scroll' && state.hintText)
              || (item.id === 'guardian-shield' && state.activeEffects.shield)
              || (item.id === 'double-xp' && state.activeEffects.doubleXp);
            return (
              <button
                key={item.id}
                className={`btn btn-item ${disabled ? 'btn-item-disabled' : ''}`}
                onClick={() => !disabled && onUseItem(item.id)}
                disabled={disabled}
                title={`${item.name}: ${item.description}`}
              >
                <span className="item-icon">{item.icon}</span>
                {qty > 0 && <span className="item-qty">{qty}</span>}
              </button>
            );
          })}
          {state.activeEffects.shield && <span className="active-effect" title="Shield Active">🛡️</span>}
          {state.activeEffects.doubleXp && <span className="active-effect" title="Double XP Active">⚗️ 2x</span>}
        </div>
      )}

      {state.hintText && !state.showExplanation && !clipPlaying && (
        <div className="hint-banner">📜 Hint: {state.hintText}</div>
      )}

      {!clipPlaying && (
      <div className={`question-card ${useCinematic ? 'question-card-pop' : ''}`}>
        <div className="question-text">{question.question}</div>

        <div className="options-grid">
          {question.options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn ${getOptionClass(i)}`}
              onClick={() => handleSelect(i)}
              disabled={state.showExplanation || state.eliminatedOptions.includes(i)}
            >
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              <span className="option-text">{opt}</span>
              {state.showExplanation && i === question.correct && (
                <span className="option-icon">✓</span>
              )}
              {state.showExplanation && i === state.lastAnswer?.selectedIndex && !state.lastAnswer?.isCorrect && (
                <span className="option-icon">✗</span>
              )}
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Bottom Sheet Dialog for Answer Explanation */}
      {state.showExplanation && !clipPlaying && (
        <>
          <div className="answer-overlay" onClick={onNext} />
          <div className={`answer-sheet ${state.lastAnswer?.isCorrect ? 'answer-correct' : 'answer-incorrect'}`}>
            <div className="answer-sheet-handle" />

            <div className="result-banner">
              {state.lastAnswer?.isCorrect ? (
                <>
                  <span className="result-icon">⚔️</span>
                  <span className="result-text">
                    Critical Hit! +{state.lastAnswer.xpGained} XP
                    {state.lastAnswer.timerBonusXp > 0 && ` (+${state.lastAnswer.timerBonusXp} timer bonus)`}
                    , +{state.lastAnswer.goldGained} Gold
                    {state.lastAnswer.streakMultiplier > 1 && ` (${state.lastAnswer.streakMultiplier}x streak!)`}
                    {state.lastAnswer.isReplay && ' (Replay 50%)'}
                  </span>
                </>
              ) : (
                <>
                  <span className="result-icon">💔</span>
                  <span className="result-text">
                    {state.lastAnswer?.shieldBlocked ? 'Blocked! 🛡️ Shield absorbed the hit!' : 'Missed! -10 HP'}
                  </span>
                </>
              )}
            </div>

            <div className="explanation-text">
              <strong>📖</strong> {question.explanation}
            </div>

            <div className="answer-sheet-actions">
              {canSecondChance && (
                <button className="btn btn-ability" onClick={() => onUseAbility('second-chance')}>
                  🔄 Second Chance
                </button>
              )}
              <button className="btn btn-primary btn-next" onClick={onNext}>
                {state.currentQuestion + 1 >= questions.length ? '🏁 Finish' : '→ Next'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
