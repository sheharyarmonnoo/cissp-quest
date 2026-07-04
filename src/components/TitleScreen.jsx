import { useState } from 'react';
import { music } from '../lib/music';
import { sfx } from '../lib/sfx';

const STORY = [
  {
    icon: '🌑',
    title: 'The Breach',
    text: 'Darkness has fallen across the Eight Domains. The CAT Hydra and its lieutenants have shattered the CIA Triad, and confidentiality, integrity, and availability lie in ruins.',
  },
  {
    icon: '⚔️',
    title: 'The Last Defender',
    text: 'You are the last Security Recruit of the Order. Clear all 16 zones, master every domain, and grow from Recruit to Firewall Paladin.',
  },
  {
    icon: '🐲',
    title: 'The Final Battle',
    text: 'Only when every zone has fallen will the CAT Hydra reveal itself. Defeat it to restore the Triad - and walk into your real exam like a boss.',
  },
];

export function TitleScreen({ onStart }) {
  const [phase, setPhase] = useState('title'); // title | story
  const [slide, setSlide] = useState(0);

  const introSeen = (() => {
    try { return localStorage.getItem('cissp-quest-intro-seen') === '1'; } catch { return true; }
  })();

  const begin = () => {
    sfx.select();
    music.play('map');
    if (introSeen) {
      onStart();
    } else {
      setPhase('story');
    }
  };

  const nextSlide = () => {
    sfx.select();
    if (slide + 1 >= STORY.length) {
      try { localStorage.setItem('cissp-quest-intro-seen', '1'); } catch { /* ignore */ }
      onStart();
    } else {
      setSlide(slide + 1);
    }
  };

  if (phase === 'story') {
    const s = STORY[slide];
    return (
      <div className="title-screen story-screen" onClick={nextSlide}>
        <video className="map-bg-video" src="/bg-map-loop.mp4" poster="/bg-map.webp" autoPlay muted loop playsInline aria-hidden="true" />
        <div className="story-card">
          <div className="story-icon">{s.icon}</div>
          <h2 className="story-title">{s.title}</h2>
          <p className="story-text">{s.text}</p>
          <button className="btn btn-primary story-next" onClick={nextSlide}>
            {slide + 1 >= STORY.length ? '⚔️ Begin' : '→ Next'}
          </button>
          <div className="story-dots">
            {STORY.map((_, i) => (
              <span key={i} className={`story-dot ${i === slide ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="title-screen" onClick={begin}>
      <video className="map-bg-video" src="/bg-map-loop.mp4" poster="/bg-map.webp" autoPlay muted loop playsInline aria-hidden="true" />
      <div className="title-content">
        <img
          className="title-hydra"
          src="/enemies/cat-hydra.webp"
          alt=""
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <h1 className="title-logo">
          <span className="title-logo-top">CISSP</span>
          <span className="title-logo-bottom">QUEST</span>
        </h1>
        <p className="title-tagline">16 zones · 8 domains · 1 hydra</p>
        <div className="title-start">▶ TAP TO START</div>
        <p className="title-version">Slay the exam before it slays you</p>
      </div>
    </div>
  );
}
