import type { SVGProps } from "react";

export function Hibiscus({ petal = "#e2382c", center = "#f3b63a", ...p }: SVGProps<SVGSVGElement> & { petal?: string; center?: string }) {
  return (
    <svg viewBox="0 0 100 100" {...p}>
      <g stroke="#1c1a16" strokeWidth="3" strokeLinejoin="round">
        {[0, 72, 144, 216, 288].map((r) => (
          <path
            key={r}
            transform={`rotate(${r} 50 50)`}
            d="M50 50 C 30 40, 26 12, 50 8 C 74 12, 70 40, 50 50 Z"
            fill={petal}
          />
        ))}
        <circle cx="50" cy="50" r="9" fill={center} />
      </g>
      <path d="M50 50 L 62 24" stroke="#1c1a16" strokeWidth="3" strokeLinecap="round" />
      <circle cx="63" cy="22" r="4" fill={center} stroke="#1c1a16" strokeWidth="2.5" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Hibiscus className="h-9 w-9 animate-spin-slow" />
      <span className="font-display text-2xl font-black tracking-tight leading-none">
        Kracked<span className="italic font-semibold text-hibiscus">Dev</span>
      </span>
    </div>
  );
}

export function Squiggle({ className = "", color = "#e2382c" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 300 24" className={className} preserveAspectRatio="none">
      <path
        d="M2 14 C 30 2, 50 22, 80 12 S 130 2, 160 12 S 210 22, 240 10 S 280 6, 298 12"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Starburst({ className = "", fill = "#f3b63a", children }: { className?: string; fill?: string; children?: React.ReactNode }) {
  const pts: string[] = [];
  for (let i = 0; i < 32; i++) {
    const r = i % 2 === 0 ? 50 : 40;
    const a = (Math.PI * 2 * i) / 32;
    pts.push(`${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`);
  }
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polygon points={pts.join(" ")} fill={fill} stroke="#1c1a16" strokeWidth="2" />
      </svg>
      <div className="relative flex h-full w-full items-center justify-center text-center">{children}</div>
    </div>
  );
}

/* ---------- Stamp-able stickers for chaos mode ---------- */
export const stickerKinds = ["hibiscus", "boleh", "ship", "ketupat", "star", "heart", "teh"] as const;
export type StickerKind = (typeof stickerKinds)[number];

export function Sticker({ kind }: { kind: StickerKind }) {
  switch (kind) {
    case "hibiscus":
      return <Hibiscus className="h-20 w-20 drop-shadow-[3px_3px_0_#1c1a16]" petal="#f4b3c2" />;
    case "boleh":
      return (
        <Starburst className="h-24 w-24" fill="#f3b63a">
          <span className="font-display text-lg font-black leading-none">BOLEH<br />LAH!</span>
        </Starburst>
      );
    case "ship":
      return (
        <div className="rounded-full border-[3px] border-ink bg-hibiscus px-4 py-2 font-sans text-sm font-extrabold uppercase tracking-wider text-paper shadow-print-sm">
          Ship it ✦
        </div>
      );
    case "ketupat":
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          <g stroke="#1c1a16" strokeWidth="3">
            <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" fill="#9cc56b" />
            <path d="M50 12 L88 50 M31 31 L69 69 M12 50 L50 88 M50 12 L12 50 M69 31 L31 69 M88 50 L50 88" fill="none" />
            <path d="M50 12 C 55 0, 70 4, 66 -2" fill="none" />
          </g>
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 100 100" className="h-16 w-16">
          <path d="M50 4 L61 38 L96 38 L68 59 L79 94 L50 72 L21 94 L32 59 L4 38 L39 38 Z" fill="#a7cfe8" stroke="#1c1a16" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 100 100" className="h-16 w-16">
          <path d="M50 88 C 10 60, 4 36, 20 20 C 34 8, 48 18, 50 28 C 52 18, 66 8, 80 20 C 96 36, 90 60, 50 88 Z" fill="#e2382c" stroke="#1c1a16" strokeWidth="3" />
        </svg>
      );
    case "teh":
      return (
        <div className="rotate-[-6deg] rounded-xl border-[3px] border-ink bg-paper px-3 py-2 text-center shadow-print-sm">
          <div className="text-2xl">🧋</div>
          <div className="font-hand text-xl leading-none">teh tarik<br />break!</div>
        </div>
      );
  }
}
