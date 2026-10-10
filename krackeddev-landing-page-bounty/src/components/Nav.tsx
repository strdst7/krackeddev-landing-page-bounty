import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { Logo } from "./Art";

const links = [
  { href: "#doors", label: "Ecosystem" },
  { href: "#bounties", label: "Bounties" },
  { href: "#levels", label: "Levels" },
  { href: "#members", label: "Members" },
  { href: "#events", label: "Events" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav({ chaos, setChaos }: { chaos: boolean; setChaos: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border-[2.5px] border-ink px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled ? "bg-paper/95 shadow-print backdrop-blur" : "bg-paper"
        }`}
      >
        <a href="#top" data-nochaos>
          <Logo />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-3 py-1.5 text-[15px] font-semibold transition hover:bg-ink hover:text-paper">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2" data-nochaos>
          <button
            onClick={() => setChaos(!chaos)}
            title="Toggle sticker mode: click anywhere to stamp"
            className={`hidden items-center gap-1.5 rounded-full border-[2.5px] border-ink px-3 py-1.5 text-sm font-bold transition sm:flex ${
              chaos ? "bg-turmeric shadow-print-sm" : "bg-paper hover:bg-paper-2"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            {chaos ? "Stickers ON" : "Sticker mode"}
          </button>
          <a href="#join" className="rounded-full border-[2.5px] border-ink bg-hibiscus px-4 py-1.5 text-sm font-bold text-paper transition hover:-translate-y-0.5 hover:shadow-print-sm">
            Join the crew
          </a>
          <button onClick={() => setOpen(!open)} className="rounded-full border-[2.5px] border-ink p-1.5 lg:hidden" aria-label="Menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border-[2.5px] border-ink bg-paper p-4 shadow-print lg:hidden" data-nochaos>
          <ul className="grid grid-cols-2 gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a onClick={() => setOpen(false)} href={l.href} className="block rounded-2xl border-2 border-ink px-4 py-3 font-semibold hover:bg-turmeric">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setChaos(!chaos);
              setOpen(false);
            }}
            className="mt-3 w-full rounded-2xl border-2 border-ink bg-turmeric px-4 py-3 font-bold"
          >
            {chaos ? "Turn off sticker mode" : "✦ Sticker mode"}
          </button>
        </div>
      )}
    </header>
  );
}
