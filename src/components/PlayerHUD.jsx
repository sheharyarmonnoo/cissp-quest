import { useState } from 'react';
import { getStreakMilestone } from '../data/streakConfig';
import { isMuted, toggleMute } from '../lib/sfx';
import { music } from '../lib/music';
import { getHeroTier } from '../lib/hero';

export function PlayerHUD({ state, onHeal, onReset }) {
  const [muted, setMuted] = useState(isMuted());
  const [musicOn, setMusicOn] = useState(music.isEnabled());
  const [heroArtFailed, setHeroArtFailed] = useState(false);
  const hero = getHeroTier(state.level);
  const hpPercent = (state.hp / state.maxHp) * 100;
  const xpPercent = (state.xp / state.xpToNext) * 100;
  const hpColor = hpPercent > 50 ? '#4ade80' : hpPercent > 25 ? '#fbbf24' : '#ef4444';
  const milestone = getStreakMilestone(state.streak);

  return (
    <header className="player-hud">
      <div className="hud-left">
        <div className="player-avatar">
          {heroArtFailed ? (
            <span className="avatar-icon">{hero.icon}</span>
          ) : (
            <img
              className="avatar-icon hero-avatar"
              src={hero.art}
              alt={hero.name}
              onError={() => setHeroArtFailed(true)}
            />
          )}
          <span className="player-level">Lv.{state.level}</span>
        </div>
        <div className="player-info">
          <div className="player-name">{hero.name}</div>
          <div className="bar-group">
            <div className="stat-bar hp-bar">
              <div className="bar-label">HP</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${hpPercent}%`, background: hpColor }} />
              </div>
              <div className="bar-text">{state.hp}/{state.maxHp}</div>
            </div>
            <div className="stat-bar xp-bar">
              <div className="bar-label">XP</div>
              <div className="bar-track">
                <div className="bar-fill xp-fill" style={{ width: `${xpPercent}%` }} />
              </div>
              <div className="bar-text">{state.xp}/{state.xpToNext}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hud-right">
        <div className="hud-stats">
          <div className="hud-stat">
            <span className="stat-icon">🪙</span>
            <span className="stat-value">{state.gold}</span>
          </div>
          <div className={`hud-stat ${milestone ? 'streak-glow' : ''}`} style={milestone ? { '--streak-color': milestone.color } : undefined}>
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{state.streak}</span>
          </div>
          <div className="hud-stat">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">
              {state.totalAnswered > 0 ? Math.round((state.totalCorrect / state.totalAnswered) * 100) : 0}%
            </span>
          </div>
        </div>
        <div className="hud-actions">
          {state.unlockedAbilities?.length > 0 && (
            <div className="ability-indicators">
              {state.unlockedAbilities.includes('second-chance') && <span className="ability-badge" title="Second Chance">🔄</span>}
              {state.unlockedAbilities.includes('scholars-shield') && <span className="ability-badge" title="Scholar's Shield">📚</span>}
            </div>
          )}
          <button
            className="btn btn-heal"
            onClick={onHeal}
            disabled={state.gold < 20 || state.hp >= state.maxHp}
            title="Heal 30 HP for 20 Gold"
          >
            🧪 Heal (20g)
          </button>
          <button
            className="btn btn-reset"
            onClick={() => setMusicOn(music.toggle())}
            title={musicOn ? 'Music off' : 'Music on'}
          >
            <span style={{ opacity: musicOn ? 1 : 0.35 }}>🎵</span>
          </button>
          <button
            className="btn btn-reset"
            onClick={() => setMuted(toggleMute())}
            title={muted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {muted ? '🔇' : '🔊'}
          </button>
          <button className="btn btn-reset" onClick={onReset} title="Reset all progress">
            🔄
          </button>
        </div>
      </div>
    </header>
  );
}
