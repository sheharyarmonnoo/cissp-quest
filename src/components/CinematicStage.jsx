import { useEffect, useRef } from 'react';

// Fullscreen FMV battle stage. Plays a clip per battle beat, then freezes on
// the final frame so the question UI overlays the paused footage.

const CLIPS = {
  intro: '/cinematic/intro.mp4',
  strike: '/cinematic/strike.mp4',
  hit: '/cinematic/hit.mp4',
  victory: '/cinematic/victory.mp4',
  defeat: '/cinematic/defeat.mp4',
};

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

export function CinematicStage({ stage, onClipEnd, onError }) {
  const videoRef = useRef(null);
  const lastClipRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (stage === 'idle') return; // freeze on current frame

    const src = CLIPS[stage];
    if (!src || lastClipRef.current === stage) return;
    lastClipRef.current = stage;

    v.src = src;
    v.currentTime = 0;
    const p = v.play();
    if (p && p.catch) {
      p.catch(() => {
        // Autoplay refused or file missing - bail out of cinematic mode
        if (onError) onError();
      });
    }
  }, [stage, onError]);

  // Allow re-entering the same stage later (e.g. two 'hit' clips in a row)
  useEffect(() => {
    if (stage === 'idle') lastClipRef.current = null;
  }, [stage]);

  return (
    <div className="cinematic-stage" aria-hidden="true">
      <video
        ref={videoRef}
        className="cinematic-video"
        poster="/cinematic/faceoff.webp"
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
