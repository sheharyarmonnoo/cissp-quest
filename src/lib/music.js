// Procedural chiptune background music - a tiny WebAudio step sequencer.
// Three themes (map / battle / boss), zero audio files, ~1KB gzipped.

let ctx = null;
let masterGain = null;
let currentTheme = null;
let schedulerTimer = null;
let nextNoteTime = 0;
let stepIndex = 0;
let enabled = true;

try {
  enabled = localStorage.getItem('cissp-quest-music') !== '0';
} catch { /* ignore */ }

// Note helper: semitone offsets from A2 (110 Hz). null = rest.
const N = (semi) => 110 * Math.pow(2, semi / 12);

const THEMES = {
  map: {
    bpm: 92,
    // Gentle Am - F - C - G arpeggio, wistful overworld feel
    bass: [0, null, null, null, -4, null, null, null, 3, null, null, null, -2, null, null, null],
    arp: [12, 16, 19, 24, 8, 12, 17, 20, 15, 19, 24, 27, 10, 14, 17, 22],
    arpType: 'triangle',
    bassType: 'triangle',
    arpGain: 0.030,
    bassGain: 0.045,
    hat: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
  },
  battle: {
    bpm: 138,
    // Driving Em - C - D - B, classic JRPG fight loop
    bass: [-5, -5, null, -5, 3, 3, null, 3, 5, 5, null, 5, -1, -1, 2, 2],
    arp: [7, 12, 16, 12, 15, 19, 24, 19, 17, 21, 26, 21, 11, 14, 19, 23],
    arpType: 'square',
    bassType: 'sawtooth',
    arpGain: 0.022,
    bassGain: 0.040,
    hat: [true, false, true, true, true, false, true, true, true, false, true, true, true, false, true, true],
  },
  boss: {
    bpm: 150,
    // Tense phrygian riff, low and menacing
    bass: [-12, -12, -11, -12, -12, -9, -12, -11, -12, -12, -7, -12, -11, -9, -8, -11],
    arp: [0, null, 1, null, 3, null, 1, 0, null, 5, null, 3, 1, null, 0, null],
    arpType: 'sawtooth',
    bassType: 'sawtooth',
    arpGain: 0.020,
    bassGain: 0.050,
    hat: [true, true, false, true, true, true, false, true, true, true, false, true, true, true, true, true],
  },
};

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function scheduleNote(theme, step, time) {
  const t = THEMES[theme];
  const stepDur = 60 / t.bpm / 4;

  const bassNote = t.bass[step % 16];
  if (bassNote !== null && bassNote !== undefined) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = t.bassType;
    osc.frequency.value = N(bassNote) / 2;
    g.gain.setValueAtTime(t.bassGain, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 1.8);
    osc.connect(g).connect(masterGain);
    osc.start(time);
    osc.stop(time + stepDur * 2);
  }

  const arpNote = t.arp[step % 16];
  if (arpNote !== null && arpNote !== undefined) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = t.arpType;
    osc.frequency.value = N(arpNote);
    g.gain.setValueAtTime(t.arpGain, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 0.9);
    osc.connect(g).connect(masterGain);
    osc.start(time);
    osc.stop(time + stepDur);
  }

  if (t.hat[step % 16]) {
    const len = 0.03;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.012, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + len);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 6000;
    src.connect(hp).connect(g).connect(masterGain);
    src.start(time);
  }
}

function scheduler() {
  if (!currentTheme || !ctx) return;
  const t = THEMES[currentTheme];
  const stepDur = 60 / t.bpm / 4;
  // Schedule ahead 120ms
  while (nextNoteTime < ctx.currentTime + 0.12) {
    scheduleNote(currentTheme, stepIndex, nextNoteTime);
    nextNoteTime += stepDur;
    stepIndex = (stepIndex + 1) % 16;
  }
  schedulerTimer = setTimeout(scheduler, 40);
}

export const music = {
  play(theme) {
    if (!THEMES[theme]) return;
    if (currentTheme === theme) return;
    this.stop();
    if (!enabled) { currentTheme = theme; return; } // remember desired theme while off
    const ac = getCtx();
    if (!ac) return;
    currentTheme = theme;
    stepIndex = 0;
    nextNoteTime = ac.currentTime + 0.05;
    scheduler();
  },
  stop() {
    if (schedulerTimer) clearTimeout(schedulerTimer);
    schedulerTimer = null;
    const stopped = currentTheme;
    currentTheme = null;
    return stopped;
  },
  isEnabled() {
    return enabled;
  },
  toggle() {
    enabled = !enabled;
    try {
      localStorage.setItem('cissp-quest-music', enabled ? '1' : '0');
    } catch { /* ignore */ }
    if (!enabled) {
      const wanted = this.stop();
      currentTheme = wanted; // keep the theme so re-enable resumes it
    } else if (currentTheme) {
      const theme = currentTheme;
      currentTheme = null;
      this.play(theme);
    }
    return enabled;
  },
};
