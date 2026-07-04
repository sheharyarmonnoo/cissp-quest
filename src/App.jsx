import { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { WorldMap } from './components/WorldMap';
import { BattleScreen } from './components/BattleScreen';
import { ZoneComplete } from './components/ZoneComplete';
import { GameWon } from './components/GameWon';
import { PlayerHUD } from './components/PlayerHUD';
import { ItemShop } from './components/ItemShop';
import { TitleScreen } from './components/TitleScreen';
import { music } from './lib/music';
import './App.css';
import './fx.css';

function App() {
  const game = useGameState();
  const { state } = game;
  const [showShop, setShowShop] = useState(false);
  const [started, setStarted] = useState(false);

  // Switch music theme with the game phase
  useEffect(() => {
    if (!started) return;
    if (state.gamePhase === 'finalBoss') {
      music.play('boss');
    } else if (state.gamePhase === 'battle') {
      music.play('battle');
    } else {
      music.play('map');
    }
  }, [started, state.gamePhase]);

  if (!started) {
    return (
      <div className="app phase-title">
        <TitleScreen onStart={() => setStarted(true)} />
      </div>
    );
  }

  return (
    <div className={`app phase-${state.gamePhase}`}>
      <PlayerHUD
        state={state}
        onHeal={game.healPlayer}
        onReset={game.resetGame}
      />
      <main className="game-area">
        {state.gamePhase === 'map' && (
          <>
            <WorldMap
              zones={game.getZones()}
              finalBoss={game.getFinalBoss()}
              onEnterZone={game.enterZone}
              onEnterFinalBoss={game.enterFinalBoss}
              onOpenShop={() => setShowShop(true)}
              timerMode={state.timerMode}
              onToggleTimer={game.toggleTimerMode}
              dailyChallengeDate={state.dailyChallengeDate}
              dailyChallengeCompleted={state.dailyChallengeCompleted}
              dailyChallengeScore={state.dailyChallengeScore}
              onEnterDailyChallenge={game.enterDailyChallenge}
            />
            {showShop && (
              <ItemShop
                gold={state.gold}
                inventory={state.inventory}
                level={state.level}
                unlockedAbilities={state.unlockedAbilities}
                onBuy={game.buyItem}
                onClose={() => setShowShop(false)}
              />
            )}
          </>
        )}
        {(state.gamePhase === 'battle' || state.gamePhase === 'finalBoss') && (
          <BattleScreen
            state={state}
            questions={game.getCurrentQuestions()}
            currentZone={game.getCurrentZone()}
            onAnswer={game.answerQuestion}
            onNext={game.nextQuestion}
            onRetreat={game.returnToMap}
            onUseItem={game.useItem}
            onUseAbility={game.useAbility}
            onTimerBonus={game.addTimerBonus}
          />
        )}
        {state.gamePhase === 'zoneComplete' && (
          <ZoneComplete
            state={state}
            onContinue={game.returnToMap}
          />
        )}
        {state.gamePhase === 'defeat' && (
          <div className="screen defeat-screen">
            <div className="defeat-icon">💀</div>
            <h1>Defeated!</h1>
            <p>You ran out of HP! Each wrong answer costs 10 HP.</p>
            <p>Review the material and try again!</p>
            <button className="btn btn-primary" onClick={game.returnToMap}>Return to Map</button>
          </div>
        )}
        {state.gamePhase === 'gameWon' && (
          <GameWon state={state} onReturn={game.returnToMap} />
        )}
      </main>
    </div>
  );
}

export default App;
