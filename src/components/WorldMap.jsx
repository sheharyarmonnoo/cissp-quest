import { useState } from 'react';
import { getDailyChallengeDate } from '../data/dailyChallenge';

const UNITS = [
  { id: 'all', label: 'All Domains', range: null },
  { id: 'd1-4', label: 'Domains 1-4', range: [0, 8] },
  { id: 'd5-8', label: 'Domains 5-8', range: [8, 16] },
];

export function WorldMap({
  zones, finalBoss, onEnterZone, onEnterFinalBoss,
  onOpenShop, timerMode, onToggleTimer,
  dailyChallengeDate, dailyChallengeCompleted, dailyChallengeScore,
  onEnterDailyChallenge, testMode, onToggleTestMode,
}) {
  const todayStr = getDailyChallengeDate();
  const dailyDone = dailyChallengeCompleted && dailyChallengeDate === todayStr;
  const [activeUnit, setActiveUnit] = useState('all');

  const selectedUnit = UNITS.find(u => u.id === activeUnit);
  const filteredZones = selectedUnit.range
    ? zones.slice(selectedUnit.range[0], selectedUnit.range[1])
    : zones;

  return (
    <div className="world-map">
      <video
        className="map-bg-video"
        src="/bg-map-loop.mp4"
        poster="/bg-map.webp"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <h1 className="map-title">
        <span className="title-icon">🗺️</span> CISSP: Knowledge Map
      </h1>
      <p className="map-subtitle">Defeat all zones to unlock the Final Boss!</p>

      <div className="map-toolbar">
        <button className="btn btn-shop" onClick={onOpenShop}>
          🛒 Item Shop
        </button>
        <label className="timer-toggle">
          <input type="checkbox" checked={timerMode} onChange={onToggleTimer} />
          <span className="timer-toggle-label">⏱️ Timer Mode {timerMode ? 'ON' : 'OFF'}</span>
        </label>
        <label className="timer-toggle test-mode-toggle">
          <input type="checkbox" checked={testMode} onChange={onToggleTestMode} />
          <span className="timer-toggle-label">🧪 Test Mode (unlock all) {testMode ? 'ON' : 'OFF'}</span>
        </label>
      </div>

      {/* Unit Selector */}
      <div className="unit-selector">
        {UNITS.map(unit => (
          <button
            key={unit.id}
            className={`unit-btn ${activeUnit === unit.id ? 'active' : ''}`}
            onClick={() => setActiveUnit(unit.id)}
          >
            {unit.label}
          </button>
        ))}
      </div>

      {/* Daily Challenge Card */}
      <div
        className={`daily-challenge-card ${dailyDone ? 'daily-done' : ''}`}
        onClick={() => !dailyDone && onEnterDailyChallenge()}
      >
        <div className="daily-icon">📅</div>
        <div className="daily-info">
          <div className="daily-title">Daily Challenge</div>
          <div className="daily-desc">10 random questions from all zones</div>
        </div>
        <div className="daily-status">
          {dailyDone ? (
            <span className="daily-complete">✅ {dailyChallengeScore}%</span>
          ) : (
            <span className="daily-ready">Ready!</span>
          )}
        </div>
      </div>

      <div className="zone-grid">
        {filteredZones.map((zone) => {
          const globalIndex = zones.indexOf(zone);
          return (
            <div
              key={zone.id}
              className={`zone-card ${zone.completed ? 'completed' : ''} ${zone.unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => zone.unlocked && onEnterZone(zone.id)}
            >
              <div className="zone-number">Zone {globalIndex + 1}</div>
              <img
                className="zone-icon zone-portrait"
                src={`/enemies/${zone.id}.webp`}
                alt={zone.enemy?.name || zone.name}
                loading="lazy"
                onError={(e) => { e.currentTarget.outerHTML = `<div class="zone-icon">${zone.icon}</div>`; }}
              />
              <div className="zone-name">{zone.name}</div>
              <div className="zone-topic">{zone.topic}</div>
              {zone.completed && (
                <div className="zone-score">
                  <span className="checkmark">✅</span> {zone.score}%
                  {zone.bestGrade && <span className="zone-grade"> ({zone.bestGrade})</span>}
                </div>
              )}
              {zone.completed && (
                <div className="zone-replay-label">Replay</div>
              )}
              {!zone.unlocked && (
                <div className="zone-lock">
                  <span className="lock-icon">🔒</span>
                </div>
              )}
              {zone.unlocked && !zone.completed && (
                <div className="zone-status">
                  <span className="zone-questions">{zone.questions.length} questions</span>
                </div>
              )}
              <div className="zone-difficulty">
                {'⭐'.repeat(Math.ceil(zone.questions.reduce((a, q) => a + q.difficulty, 0) / zone.questions.length))}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`final-boss-card ${finalBoss.unlocked ? 'unlocked' : 'locked'}`}
        onClick={() => finalBoss.unlocked && onEnterFinalBoss()}
      >
        <div className="boss-glow" />
        <div className="boss-content">
          <img
            className="boss-icon boss-portrait"
            src="/enemies/cat-hydra.webp"
            alt={finalBoss.name}
            loading="lazy"
            onError={(e) => { e.currentTarget.outerHTML = `<div class="boss-icon">${finalBoss.icon}</div>`; }}
          />
          <div className="boss-name">{finalBoss.name}</div>
          <div className="boss-desc">{finalBoss.description}</div>
          {!finalBoss.unlocked && (
            <div className="boss-lock">Complete all zones to unlock!</div>
          )}
          {finalBoss.unlocked && !finalBoss.completed && (
            <div className="boss-ready">⚔️ Ready to Battle!</div>
          )}
          {finalBoss.completed && (
            <div className="boss-defeated">🏆 Defeated!</div>
          )}
        </div>
      </div>
    </div>
  );
}
