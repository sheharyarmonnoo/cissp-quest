// Synthesized sound effects via WebAudio - no audio files needed.
// Sounds are generated on the fly; mute preference persists in localStorage.

let ctx = null;
let muted = false;

try {
  muted = localStorage.getItem('cissp-quest-muted') === '1';
} catch { /* ignore */ }

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function isMuted() {
  return muted;
}

export function toggleMute() {
  muted = !muted;
  try {
    localStorage.setItem('cissp-quest-muted', muted ? '1' : '0');
  } catch { /* ignore */ }
  return muted;
}

function tone(freq, { start = 0, duration = 0.15, type = 'square', gain = 0.08, slideTo = null } = {}) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + duration);
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function noise({ start = 0, duration = 0.2, gain = 0.06 } = {}) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + start;
  const bufferSize = ac.sampleRate * duration;
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const g = ac.createGain();
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 900;
  src.connect(filter).connect(g).connect(ac.destination);
  src.start(t0);
}

function vibrate(pattern) {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch { /* ignore */ }
}

export const sfx = {
  select() {
    if (muted) return;
    tone(520, { duration: 0.06, type: 'square', gain: 0.04 });
  },
  correct() {
    vibrate(25);
    if (muted) return;
    // Rising arpeggio - sword strike + reward
    noise({ duration: 0.08, gain: 0.05 });
    tone(523, { start: 0.0, duration: 0.09, type: 'square' });
    tone(659, { start: 0.08, duration: 0.09, type: 'square' });
    tone(784, { start: 0.16, duration: 0.14, type: 'square' });
  },
  wrong() {
    vibrate([70, 40, 70]);
    if (muted) return;
    // Descending buzz - taking damage
    tone(220, { duration: 0.22, type: 'sawtooth', gain: 0.07, slideTo: 110 });
    noise({ start: 0.02, duration: 0.18, gain: 0.05 });
  },
  shield() {
    if (muted) return;
    tone(330, { duration: 0.1, type: 'triangle', gain: 0.08 });
    tone(494, { start: 0.09, duration: 0.16, type: 'triangle', gain: 0.08 });
  },
  levelUp() {
    if (muted) return;
    [392, 523, 659, 784, 1047].forEach((f, i) =>
      tone(f, { start: i * 0.09, duration: 0.12, type: 'square', gain: 0.06 })
    );
  },
  victory() {
    if (muted) return;
    // Small fanfare
    tone(523, { start: 0.0, duration: 0.12, type: 'square' });
    tone(523, { start: 0.13, duration: 0.1, type: 'square' });
    tone(659, { start: 0.24, duration: 0.12, type: 'square' });
    tone(784, { start: 0.36, duration: 0.3, type: 'square', gain: 0.09 });
    tone(1047, { start: 0.52, duration: 0.4, type: 'triangle', gain: 0.07 });
  },
  bossIntro() {
    if (muted) return;
    tone(98, { duration: 0.5, type: 'sawtooth', gain: 0.09, slideTo: 65 });
    tone(147, { start: 0.15, duration: 0.5, type: 'sawtooth', gain: 0.06, slideTo: 98 });
    noise({ start: 0.1, duration: 0.45, gain: 0.05 });
  },
  defeat() {
    if (muted) return;
    [392, 370, 349, 294].forEach((f, i) =>
      tone(f, { start: i * 0.16, duration: 0.2, type: 'sawtooth', gain: 0.06 })
    );
  },
  coin() {
    if (muted) return;
    tone(988, { duration: 0.06, type: 'square', gain: 0.04 });
    tone(1319, { start: 0.06, duration: 0.12, type: 'square', gain: 0.04 });
  },
};
