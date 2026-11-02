"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Theme = "night" | "day";

// Soft, original background music made with the Web Audio API.
// No audio file is downloaded, so nothing is copied from another artist,
// and the loop stays tiny enough for the fast page too.
const NOTES: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0
};
const CHORDS: string[][] = [
  ["C3", "E3", "G3", "C4"],
  ["A3", "C4", "E4", "A4"],
  ["F3", "A3", "C4", "F4"],
  ["G3", "B3", "D4", "G4"]
];
const MELODY: string[] = ["E4", "G4", "A4", "G4", "E4", "D4", "C4", "E4"];

export default function SoundTheme() {
  const [theme, setTheme] = useState<Theme>("night");
  const [music, setMusic] = useState(false);
  const [clicks, setClicks] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const musicRef = useRef(false);
  const clicksRef = useRef(true);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const playNote = useCallback((freq: number, at: number, dur: number, vol: number, type: OscillatorType = "sine") => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, at);
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(vol, at + 0.4);
    gain.gain.linearRampToValueAtTime(0, at + dur);
    osc.connect(gain);
    if (musicGainRef.current) gain.connect(musicGainRef.current);
    else gain.connect(ctx.destination);
    osc.start(at);
    osc.stop(at + dur + 0.1);
  }, []);

  const playClick = useCallback(() => {
    try {
      const ctx = getCtx();
      const at = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1100, at);
      osc.frequency.exponentialRampToValueAtTime(700, at + 0.07);
      gain.gain.setValueAtTime(0.12, at);
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(at);
      osc.stop(at + 0.1);
    } catch {
      // Audio is an enhancement only, so a blocked context never breaks the page.
    }
  }, [getCtx]);

  const stopMusic = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (musicGainRef.current && ctxRef.current) {
      musicGainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.5);
    }
  }, []);

  const startMusic = useCallback(() => {
    try {
      const ctx = getCtx();
      if (!musicGainRef.current) {
        musicGainRef.current = ctx.createGain();
        musicGainRef.current.gain.value = 0.05;
        musicGainRef.current.connect(ctx.destination);
      }
      musicGainRef.current.gain.setValueAtTime(0.05, ctx.currentTime);
      stepRef.current = 0;
      const tick = () => {
        const at = ctx.currentTime + 0.05;
        const chord = CHORDS[stepRef.current % CHORDS.length];
        chord.forEach((n) => playNote(NOTES[n], at, 3.2, 0.5, "sine"));
        const melody = MELODY[stepRef.current % MELODY.length];
        playNote(NOTES[melody], at + 0.8, 1.4, 0.22, "triangle");
        stepRef.current += 1;
      };
      tick();
      timerRef.current = window.setInterval(tick, 2400);
    } catch {
      // Audio is an enhancement only.
    }
  }, [getCtx, playNote]);

  // Restore the saved choices, then keep the page theme in sync.
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("portfolio-theme") as Theme | null;
      if (savedTheme === "day" || savedTheme === "night") setTheme(savedTheme);
      // Music is never restored automatically, it always needs a fresh tap,
      // because browsers block audio that starts without a user action.
      const savedClicks = localStorage.getItem("portfolio-clicks");
      if (savedClicks === "off") {
        setClicks(false);
        clicksRef.current = false;
      }
    } catch {
      // Private mode or blocked storage just keeps the defaults.
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* keep defaults */ }
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem("portfolio-clicks", clicks ? "on" : "off"); } catch { /* keep defaults */ }
    clicksRef.current = clicks;
  }, [clicks]);

  // Click sound on an action: any button or link the visitor taps.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!clicksRef.current) return;
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input[type='submit'], [role='button']")) playClick();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [playClick]);

  useEffect(() => () => stopMusic(), [stopMusic]);

  const toggleMusic = () => {
    const next = !music;
    musicRef.current = next;
    setMusic(next);
    try { localStorage.setItem("portfolio-music", next ? "on" : "off"); } catch { /* keep defaults */ }
    if (next) startMusic();
    else stopMusic();
  };

  return (
    <div className="glass fixed bottom-6 left-6 z-[106] flex flex-wrap items-center gap-2 rounded-full px-3 py-2 shadow-2xl" role="group" aria-label="Sound and theme controls">
      <button type="button" onClick={toggleMusic} aria-pressed={music} aria-label={music ? "Turn background music off" : "Turn background music on"} className="rounded-full px-3 py-2 text-xs font-bold text-mist hover:opacity-80">
        ♪ Music: {music ? "On" : "Off"}
      </button>
      <span className="h-5 w-px bg-line" aria-hidden="true" />
      <button type="button" onClick={() => setClicks((v) => !v)} aria-pressed={clicks} aria-label={clicks ? "Turn click sounds off" : "Turn click sounds on"} className="rounded-full px-3 py-2 text-xs font-bold text-mist hover:opacity-80">
        Click: {clicks ? "On" : "Off"}
      </button>
      <span className="h-5 w-px bg-line" aria-hidden="true" />
      <button type="button" onClick={() => setTheme((v) => (v === "night" ? "day" : "night"))} aria-pressed={theme === "day"} aria-label={theme === "day" ? "Switch to night mode" : "Switch to day mode"} className="rounded-full px-3 py-2 text-xs font-bold text-mist hover:opacity-80">
        {theme === "day" ? "☀ Day" : "☾ Night"}
      </button>
    </div>
  );
}
