"use client";
import { useEffect, useRef } from "react";

export default function Dust() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 35 : 90;
    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; tw: number };
    let parts: P[] = [];
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2.2 + 0.6,
        vy: -(Math.random() * 0.35 + 0.08), vx: (Math.random() - 0.5) * 0.2,
        a: Math.random() * 0.5 + 0.15, tw: Math.random() * Math.PI * 2
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => {
        p.tw += 0.02; p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        const alpha = p.a * (0.65 + 0.35 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[93] opacity-70" aria-hidden="true" />;
}
