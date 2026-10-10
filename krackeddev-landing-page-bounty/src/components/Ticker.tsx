import { shippedTicker } from "../data";

export default function Ticker() {
  const words = ["Build", "Learn", "Earn", "Together", "Bina", "Belajar", "Untung", "Bersama"];
  return (
    <section className="relative -rotate-1 border-y-[3px] border-ink bg-jungle py-3 text-paper">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-3xl font-black italic sm:text-4xl">
              {w}
              <span className="text-turmeric not-italic">✿</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 flex overflow-hidden border-t-2 border-paper/20 pt-3">
        <div className="flex shrink-0 animate-marquee-rev items-center gap-3 pr-3">
          {[...shippedTicker, ...shippedTicker].map((t, i) => (
            <span key={i} className="whitespace-nowrap rounded-full bg-paper/10 px-4 py-1.5 text-sm font-semibold">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
