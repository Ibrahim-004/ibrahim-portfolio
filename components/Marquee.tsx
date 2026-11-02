const words = ["SEO STRATEGY", "OUTREACH", "FULL STACK", "ANALYTICS", "CONVERSION", "AUTOMATION", "RANKINGS", "GROWTH"];

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink py-5" aria-hidden="true">
      <div className="marquee-track" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {[...row, ...row].map((w, i) => (
          <span key={i} className="mx-6 flex items-center gap-6 whitespace-nowrap font-display text-2xl font-bold tracking-tight text-white/80 md:text-3xl">
            {w} <span className="text-gradient">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
