import { useEffect, useRef } from 'react';

// FMV battle engine. Each battle beat picks a random clip from a pool so no
// two answers play out the same. Fights escalate into Act 2 (wounded enemy,
// cracked arena) past the halfway point, and the final boss has its own set.

export const CLIP_SETS = {
  generic: {
    poster: '/cinematic/faceoff.webp',
    intro: ['/cinematic/intro.mp4'],
    strike1: ['/cinematic/strike.mp4', '/cinematic/strike-b.mp4', '/cinematic/strike-c.mp4'],
    strike2: ['/cinematic/strike2-a.mp4', '/cinematic/strike2-b.mp4'],
    hit1: ['/cinematic/hit.mp4', '/cinematic/hit-b.mp4', '/cinematic/hit-c.mp4'],
    hit2: ['/cinematic/hit2-a.mp4', '/cinematic/hit2-b.mp4'],
    victory: ['/cinematic/victory.mp4'],
    defeat: ['/cinematic/defeat.mp4'],
  },
  hydra: {
    poster: '/cinematic/hydra/faceoff.webp',
    intro: ['/cinematic/hydra/intro.mp4'],
    strike1: ['/cinematic/hydra/strike-a.mp4', '/cinematic/hydra/strike-b.mp4'],
    strike2: ['/cinematic/hydra/strike-a.mp4', '/cinematic/hydra/strike-b.mp4'],
    hit1: ['/cinematic/hydra/hit-a.mp4', '/cinematic/hydra/hit-b.mp4'],
    hit2: ['/cinematic/hydra/hit-a.mp4', '/cinematic/hydra/hit-b.mp4'],
    victory: ['/cinematic/hydra/victory.mp4'],
    defeat: ['/cinematic/hydra/defeat.mp4'],
  },
};

// beat: 'intro' | 'strike' | 'hit' | 'victory' | 'defeat'
// act: 1 (fresh fight) or 2 (past halfway - escalated clips)
// avoidUrl: last clip played, so consecutive answers never repeat footage
export function pickClip(setId, beat, act, avoidUrl) {
  const set = CLIP_SETS[setId] || CLIP_SETS.generic;
  let pool;
  if (beat === 'strike') {
    pool = act >= 2 && set.strike2?.length ? set.strike2 : set.strike1;
  } else if (beat === 'hit') {
    pool = act >= 2 && set.hit2?.length ? set.hit2 : set.hit1;
  } else {
    pool = set[beat] || [];
  }
  if (!pool || pool.length === 0) return null;
  const candidates = pool.length > 1 && avoidUrl
    ? pool.filter(u => u !== avoidUrl)
    : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

let cinematicPref = true;
try {
  cinematicPref = localStorage.getItem('cissp-quest-cinematic') !== '0';
} catch { /* ignore */ }
const reducedMotion = typeof window !== 'undefined'
  && window.matchMedia
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function isCinematicEnabled() {
  return cinematicPref && !reducedMotion;
}

export function toggleCinematic() {
  cinematicPref = !cinematicPref;
  try {
    localStorage.setItem('cissp-quest-cinematic', cinematicPref ? '1' : '0');
  } catch { /* ignore */ }
  return isCinematicEnabled();
}

// clip: { url, id } - id bumps every pick so the same file can replay.
// clip === null freezes the video on its current frame (question time).
export function CinematicStage({ clip, poster, onClipEnd, onError }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !clip?.url) return;
    v.src = clip.url;
    v.currentTime = 0;
    const p = v.play();
    if (p && p.catch) {
      p.catch(() => {
        if (onError) onError();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clip?.id]);

  return (
    <div className="cinematic-stage" aria-hidden="true">
      <video
        ref={videoRef}
        className="cinematic-video"
        poster={poster}
        preload="auto"
        muted
        playsInline
        onEnded={() => onClipEnd && onClipEnd()}
        onError={() => onError && onError()}
      />
      <div className="cinematic-vignette" />
    </div>
  );
}
