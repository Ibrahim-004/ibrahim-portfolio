"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/content/data";

function TiltCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    e.currentTarget.style.transform = `perspective(1000px) rotateY(${px * 12}deg) rotateX(${py * -12}deg) translateY(-6px) scale(1.02)`;
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = ""; };
  return (
    <article onMouseMove={onMove} onMouseLeave={onLeave} className="glass group relative overflow-hidden rounded-3xl p-6 transition-transform duration-200 md:p-8 hover:border-violet/50" style={{ willChange: "transform" }}>
      <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <div className="preview-gradient relative mb-6 h-44 overflow-hidden rounded-2xl">
        <span className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-white/90 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-3" aria-hidden="true">{project.title.charAt(0)}</span>
        <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white">{project.kind}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" aria-hidden="true" />
      </div>
      <div className="relative flex items-center justify-between gap-4">
        <p className="text-xs tracking-[0.25em] text-muted">{project.kind.toUpperCase()}</p>
        {project.gated && <span className="rounded-full bg-electric/20 px-3 py-1 text-xs font-semibold">Gated demo</span>}
      </div>
      <h3 className="mt-6 font-display text-3xl font-bold leading-tight">{project.title}</h3>
      <p className="mt-4 leading-7 text-muted">{project.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{t}</span>)}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button onClick={() => onOpen(project)} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Open case study</button>
        <a href={project.url} target="_blank" rel="noreferrer" className="rounded-full border border-line px-5 py-3 text-sm font-semibold">Visit live link</a>
      </div>
    </article>
  );
}

export default function Projects({ onRequestAccess }: { onRequestAccess: (project: Project) => void }) {
  const [open, setOpen] = useState<Project | null>(null);
  // Lock background scroll while a case study is open, so the modal
  // stays in the main window instead of drifting with the page scroll.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  return (
    <>
    <section id="projects" className="max-reveal bg-panel px-6 py-24 md:px-12 md:py-32" aria-label="Projects">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.35em] text-muted">PROJECTS</p>
        <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">Selected work, in full screen spirit.</h2>
        <p className="mt-4 max-w-xl leading-7 text-muted">Each card opens a short case study. No login details are shown anywhere on this site. For gated demos, request access and I will reply with the next step.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p) => <TiltCard key={`${p.title}-${p.kind}`} project={p} onOpen={setOpen} />)}
        </div>
      </div>
    </section>
      {/* Case study modal is intentionally OUTSIDE the section above.
          The section is animated with a transform, and a fixed element
          inside a transformed ancestor is positioned against that
          ancestor, not the viewport, which is why the modal used to
          appear off screen and only show after scrolling. */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[180] flex items-end justify-center bg-black/80 p-4 backdrop-blur-sm md:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={`Case study for ${open.title}`}>
            <motion.div className="glass max-h-[85vh] w-full max-w-2xl overflow-auto rounded-3xl p-6 md:p-10" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.25em] text-muted">{open.kind.toUpperCase()}</p>
                  <h3 className="mt-3 font-display text-3xl font-bold">{open.title}</h3>
                </div>
                <button onClick={() => setOpen(null)} className="rounded-full border border-line px-4 py-2 text-sm" aria-label="Close case study">Close</button>
              </div>
              <p className="mt-5 leading-8 text-muted">{open.description}</p>
              <h4 className="mt-8 font-semibold">What this shows</h4>
              <ol className="mt-3 space-y-2 leading-7 text-muted">
                <li>1. A clear user journey, from first screen to outcome.</li>
                <li>2. Structure that search engines and people can both follow.</li>
                <li>3. A product built to be used every day, not just launched.</li>
              </ol>
              <div className="mt-8 flex flex-wrap gap-3">
                {!open.gated && <a href={open.url} target="_blank" rel="noreferrer" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Visit live project</a>}
                {open.gated && <button onClick={() => { onRequestAccess(open); setOpen(null); }} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Request demo access</button>}
                <button onClick={() => setOpen(null)} className="rounded-full border border-line px-6 py-3 text-sm font-semibold">Back to projects</button>
              </div>
              <p className="mt-4 text-sm text-muted">Live link: {open.url}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
