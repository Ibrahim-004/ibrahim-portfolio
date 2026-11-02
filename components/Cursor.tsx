"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const trail = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
    const points = Array.from({ length: 10 }, () => ({ x: 0, y: 0 }));
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      ring.current?.classList.toggle("border-violet", Boolean(target));
    };
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (ring.current) {
        const scale = ring.current.classList.contains("border-violet") ? 1.8 : 1;
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      }
      let px = x, py = y;
      points.forEach((pt, i) => {
        pt.x += (px - pt.x) * 0.35; pt.y += (py - pt.y) * 0.35;
        px = pt.x; py = pt.y;
        const el = trail.current[i];
        if (el) {
          const size = 14 - i;
          el.style.transform = `translate(${pt.x}px, ${pt.y}px) translate(-50%, -50%)`;
          el.style.width = `${size}px`; el.style.height = `${size}px`;
          el.style.opacity = `${0.55 - i * 0.05}`;
        }
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move, { passive: true });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[150] hidden md:block" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} ref={(el) => { trail.current[i] = el; }} className="absolute left-0 top-0 rounded-full bg-gradient-to-br from-electric to-violet" />
      ))}
      <div ref={dot} className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white" />
      <div ref={ring} className="absolute left-0 top-0 h-10 w-10 rounded-full border border-white/40 transition-colors" />
    </div>
  );
}
