"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(100);
      setVisible(false);
      onDone();
      return;
    }
    let value = 0;
    const id = window.setInterval(() => {
      value += Math.floor(Math.random() * 12) + 6;
      if (value >= 100) {
        value = 100;
        window.clearInterval(id);
        window.setTimeout(() => {
          setVisible(false);
          onDone();
        }, 450);
      }
      setCount(value);
    }, 85);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-ink"
          exit={{ opacity: 0, scale: 1.08, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 top-0 h-[9vh] bg-black" />
          <div className="absolute inset-x-0 bottom-0 h-[9vh] bg-black" />
          <div className="light-sweep absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <p className="text-xs tracking-[0.45em] text-muted">A PORTFOLIO FILM</p>
          <p className="ticker-pulse mt-6 font-display text-7xl font-bold tabular-nums md:text-8xl">{count}<span className="text-gradient">%</span></p>
          <p className="mt-4 text-sm tracking-[0.3em] text-muted">IBRAHIM KHALIL ULLAH</p>
          <div className="mt-8 h-px w-64 bg-line">
            <div className="h-px bg-gradient-to-r from-electric to-violet transition-all duration-150" style={{ width: `${count}%` }} />
          </div>
          <p className="mt-4 text-sm text-muted">Assembling the experience, scene by scene</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
