import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Paintbrush, Sliders, Sparkles, Wand2 } from "lucide-react";
import { Logo } from "../components/Art";

// Predefined vibe presets
const PRESETS = [
  { name: "Claymorphism", radius: 36, skew: 0, weight: 600, hue: 0, scale: 1, text: "Tactile, puffy, and playful" },
  { name: "Wobbly Kampung", radius: 24, skew: -2.5, weight: 800, hue: 130, scale: 1.02, text: "Expressive and organic" },
  { name: "Sleek Studio", radius: 8, skew: 0, weight: 500, hue: 210, scale: 0.98, text: "Sharp, premium, and clean" },
  { name: "Maximalist Chaos", radius: 0, skew: 4, weight: 900, hue: 330, scale: 1.05, text: "High contrast and loud" },
];

const SLANGS = [
  { text: "Boleh lah!", sub: "No problem, we can make it work", color: "bg-pink text-ink" },
  { text: "Can one.", sub: "Absolute confidence", color: "bg-turmeric text-ink" },
  { text: "Jom ship!", sub: "Let's push to production right now", color: "bg-jungle text-paper" },
  { text: "Tapao code", sub: "Taking code to-go", color: "bg-sky text-ink" },
  { text: "Kopi break 🧋", sub: "Time for a sweet teh tarik", color: "bg-hibiscus text-paper" },
  { text: "Steady je", sub: "Keep calm and ship on", color: "bg-paper border-2 border-ink text-ink" },
];

export default function Sandbox() {
  // Vibe controller parameters
  const [radius, setRadius] = useState(24);
  const [skew, setSkew] = useState(0);
  const [weight, setWeight] = useState(600);
  const [hue, setHue] = useState(0);
  const [scale, setScale] = useState(1);

  // Card builder state
  const [cardName, setCardName] = useState("Kawan Baru");
  const [cardGuild, setCardGuild] = useState("Web");
  const [cardEmoji, setCardEmoji] = useState("🧠");
  const [cardBadge, setCardBadge] = useState("Budak Baru");
  const [shippedItem, setShippedItem] = useState("My first awesome portfolio");

  // Manglish soundboard ripple triggers
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; text: string }[]>([]);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waveRef = useRef<HTMLCanvasElement>(null);

  // Handle preset application
  const applyPreset = (p: typeof PRESETS[number]) => {
    setRadius(p.radius);
    setSkew(p.skew);
    setWeight(p.weight);
    setHue(p.hue);
    setScale(p.scale);
  };

  // 1. Generative Batik Tree Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    ctx.clearRect(0, 0, W, H);

    // Procedural tree branch drawing
    const drawBranch = (
      startX: number,
      startY: number,
      len: number,
      angle: number,
      branchWidth: number,
      depth: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      const endX = startX + Math.cos(angle) * len;
      const endY = startY + Math.sin(angle) * len;

      ctx.lineCap = "round";
      ctx.lineWidth = branchWidth;
      // Use hue variable dynamically
      ctx.strokeStyle = `hsl(${(hue + depth * 30) % 360}, 65%, ${30 + depth * 5}%)`;

      ctx.lineTo(endX, endY);
      ctx.stroke();

      if (depth === 0) {
        // Bloom a hibiscus blossom at the end
        ctx.beginPath();
        ctx.arc(endX, endY, 6, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${(hue + 340) % 360}, 85%, 60%)`;
        ctx.fill();
        ctx.strokeStyle = "#1c1a16";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Little yellow center
        ctx.beginPath();
        ctx.arc(endX, endY, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#f3b63a";
        ctx.fill();
        return;
      }

      const branchLengthOffset = 0.72 + (weight / 1000) * 0.1;

      // Draw children branches
      drawBranch(endX, endY, len * branchLengthOffset, angle - 0.35 + (skew * Math.PI) / 180, branchWidth * 0.7, depth - 1);
      drawBranch(endX, endY, len * branchLengthOffset, angle + 0.35 + (skew * Math.PI) / 180, branchWidth * 0.7, depth - 1);
    };

    // Draw three beautiful kampung trees growing together
    drawBranch(W / 2, H, H * 0.28, -Math.PI / 2, 10, 5);
    drawBranch(W * 0.25, H, H * 0.2, -Math.PI / 2 - 0.2, 7, 4);
    drawBranch(W * 0.75, H, H * 0.22, -Math.PI / 2 + 0.2, 7, 4);
  }, [radius, skew, weight, hue, scale]);

  // 2. Simulated Fluid Wave Canvas
  useEffect(() => {
    const canvas = waveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      time += 0.015;

      // Draw multi-layered silk waves representing Southeast Asian craft textiles
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.moveTo(0, H / 2);

        const currentHue = (hue + layer * 40) % 360;
        ctx.strokeStyle = `hsla(${currentHue}, 75%, 65%, ${0.25 - layer * 0.05})`;
        ctx.lineWidth = 15 - layer * 4;

        for (let x = 0; x <= W; x += 10) {
          const waveLength = 0.008 + layer * 0.002;
          const amplitude = 28 + layer * 10 + (scale - 1) * 50;
          const y = H / 2 + Math.sin(x * waveLength + time + layer) * amplitude;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [hue, scale]);

  // Handle slang click and spawn ripple effect
  const handleSlangClick = (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      text,
    };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  // Custom inline styles for live playground feedback
  const dynamicStyles = {
    borderRadius: `${radius}px`,
    transform: `skew(${skew}deg) scale(${scale})`,
    fontWeight: weight,
    filter: `hue-rotate(${hue}deg)`,
    fontFamily: "'Bricolage Grotesque', sans-serif",
    transition: "border-radius 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <div className="relative min-h-screen bg-paper pb-28 pt-24 text-ink" style={{ filter: `hue-rotate(${hue}deg)` }}>
      {/* Decorative Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1c1a16_1px,transparent_1.5px)] [background-size:24px_24px] opacity-10" />

      {/* 3. Global Wave Ribbons */}
      <div className="relative h-28 w-full overflow-hidden">
        <canvas ref={waveRef} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-paper px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-print-sm">
            Interactive Vibe Sandbox
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          
          {/* LEFT COLUMN: THE CONTROLLER & SOUNDBOARD */}
          <div className="space-y-8">
            <div>
              <p className="font-hand text-3xl text-hibiscus">mesin vibe →</p>
              <h1 className="font-display text-5xl font-black leading-tight tracking-tight sm:text-6xl">
                Warp the site in <span className="italic">real-time.</span>
              </h1>
              <p className="mt-4 text-lg text-ink/70">
                Adjust variables or choose a preset to bend, puff, and morph the kampung's layout. See how font-weight and curves transform our identity.
              </p>
            </div>

            {/* Tactical Presets */}
            <div className="rounded-3xl border-[3px] border-ink bg-paper-2 p-6 shadow-print">
              <h3 className="flex items-center gap-2 font-display text-xl font-black">
                <Paintbrush className="h-5 w-5 text-hibiscus" />
                Vibe Presets
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p)}
                    className="group flex flex-col items-start rounded-2xl border-2 border-ink bg-paper p-4 text-left transition hover:-translate-y-0.5 hover:shadow-print-sm"
                  >
                    <span className="font-display text-lg font-black">{p.name}</span>
                    <span className="mt-1 text-xs text-ink/60">{p.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Sliders */}
            <div className="rounded-3xl border-[3px] border-ink bg-paper p-6 shadow-print space-y-6">
              <h3 className="flex items-center gap-2 font-display text-xl font-black">
                <Sliders className="h-5 w-5 text-jungle" />
                Fine-tune Sliders
              </h3>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Tactile Roundness</span>
                    <span className="font-mono">{radius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="64"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="mt-2 w-full accent-hibiscus"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Layout Skew</span>
                    <span className="font-mono">{skew}°</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={skew}
                    onChange={(e) => setSkew(Number(e.target.value))}
                    className="mt-2 w-full accent-jungle"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Font Thickness</span>
                    <span className="font-mono">{weight}</span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="900"
                    step="100"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="mt-2 w-full accent-turmeric"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Color Spectrum Hue Shift</span>
                    <span className="font-mono">{hue}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                    className="mt-2 w-full accent-pink"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Spring Scale</span>
                    <span className="font-mono">{(scale * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.85"
                    max="1.15"
                    step="0.01"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="mt-2 w-full accent-sky"
                  />
                </div>
              </div>
            </div>

            {/* Tactile Slang Soundboard */}
            <div className="rounded-3xl border-[3px] border-ink bg-paper p-6 shadow-print">
              <h3 className="flex items-center gap-2 font-display text-xl font-black">
                <Sparkles className="h-5 w-5 text-turmeric" />
                Manglish Soundboard
              </h3>
              <p className="mt-1 text-sm text-ink/60">
                Click any slang button to trigger kinetic text ripples and physics-based bounces.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SLANGS.map((s) => (
                  <button
                    key={s.text}
                    onClick={(e) => handleSlangClick(e, s.text)}
                    className={`relative overflow-hidden rounded-2xl border-2 border-ink px-4 py-3.5 text-center transition-transform hover:scale-105 active:scale-95 ${s.color}`}
                  >
                    {/* Visual ripple layer inside button */}
                    <AnimatePresence>
                      {ripples.map((r) => (
                        r.text === s.text && (
                          <motion.span
                            key={r.id}
                            initial={{ scale: 0, opacity: 0.6 }}
                            animate={{ scale: 4, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute rounded-full bg-white/40"
                            style={{
                              left: r.x,
                              top: r.y,
                              width: 32,
                              height: 32,
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                        )
                      ))}
                    </AnimatePresence>
                    <span className="font-display font-black leading-tight block">{s.text}</span>
                    <span className="mt-0.5 text-[9px] block opacity-80 leading-none">{s.sub}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: KINETIC CANVAS & MEMBER BUILDER */}
          <div className="space-y-8">
            
            {/* The Generative Tree Canvas Container */}
            <div className="relative overflow-hidden border-[3px] border-ink bg-paper shadow-print flex flex-col justify-between p-6" style={dynamicStyles}>
              <div>
                <span className="rounded-full bg-jungle/15 px-3 py-1 font-mono text-[10px] uppercase font-bold text-jungle">
                  Canvas 01: Procedural Kampung Art
                </span>
                <h3 className="mt-3 font-display text-2xl font-black leading-tight">
                  Generative Batik Tree
                </h3>
                <p className="mt-1 text-sm text-ink/60">
                  This procedural tree branches dynamically based on your sliders. Notice the blooms responding to your spectrum shifts.
                </p>
              </div>

              {/* The actual canvas */}
              <div className="relative mt-4 h-64 w-full rounded-2xl border-2 border-dashed border-ink/20 bg-paper-2 overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
              </div>
            </div>

            {/* Live Personalised Member Card Builder */}
            <div className="rounded-[32px] border-[3px] border-ink bg-paper p-6 shadow-print sm:p-8">
              <h3 className="flex items-center gap-2 font-display text-xl font-black">
                <Wand2 className="h-5 w-5 text-sky" />
                Live Card Builder
              </h3>
              <p className="mt-1 text-sm text-ink/60">
                Design your custom Kampung badge. Enter your details below to see it format and live-update in real-time.
              </p>

              {/* Input Panel */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-ink/60">Your Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.slice(0, 16))}
                    className="mt-1 w-full rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-semibold outline-none focus:bg-paper-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-ink/60">Avatar Emoji</label>
                  <select
                    value={cardEmoji}
                    onChange={(e) => setCardEmoji(e.target.value)}
                    className="mt-1 w-full rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-semibold outline-none"
                  >
                    <option value="🧠">🧠 Brainy Dev</option>
                    <option value="🎨">🎨 Designer</option>
                    <option value="🛵">🛵 Explorer</option>
                    <option value="🍜">🍜 Foodie</option>
                    <option value="🔌">🔌 Hardware</option>
                    <option value="⚡">⚡ Energised</option>
                    <option value="🏆">🏆 Champion</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-ink/60">Home Guild</label>
                  <select
                    value={cardGuild}
                    onChange={(e) => setCardGuild(e.target.value)}
                    className="mt-1 w-full rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-semibold outline-none"
                  >
                    <option value="Web">Web</option>
                    <option value="AI">AI</option>
                    <option value="Design">Design</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Data">Data</option>
                    <option value="Hardware">Hardware</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-ink/60">XP Badge Level</label>
                  <select
                    value={cardBadge}
                    onChange={(e) => setCardBadge(e.target.value)}
                    className="mt-1 w-full rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-semibold outline-none"
                  >
                    <option value="Budak Baru">Budak Baru</option>
                    <option value="Tukang">Tukang</option>
                    <option value="Mahir">Mahir</option>
                    <option value="Sifu">Sifu</option>
                    <option value="Legenda">Legenda</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-ink/60">Your Latest Shipped Project</label>
                  <input
                    type="text"
                    value={shippedItem}
                    onChange={(e) => setShippedItem(e.target.value.slice(0, 40))}
                    className="mt-1 w-full rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-semibold outline-none focus:bg-paper-2"
                  />
                </div>
              </div>

              {/* Live Rendered Card with dynamic styles */}
              <div className="mt-8 relative overflow-hidden bg-paper-2 border-[3px] border-ink p-6 transition-all duration-300" style={dynamicStyles}>
                <div className="absolute inset-0 batik opacity-[0.05]" />
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase font-bold text-paper">
                    Kracked Guild Badge
                  </span>
                  <Logo className="scale-75 origin-right" />
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-ink bg-paper text-4xl shadow-print-sm">
                    {cardEmoji}
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-black leading-none">{cardName}</h4>
                    <p className="mt-1 text-sm text-ink/60">
                      Guild: <span className="font-bold text-jungle">{cardGuild}</span> · Level: <span className="font-bold text-hibiscus">{cardBadge}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t-2 border-dashed border-ink/20 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 block">Recently Shipped</span>
                  <span className="font-hand text-2xl text-ink leading-tight block mt-1">"{shippedItem || "Nothing yet"}"</span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-bold">
                  <span className="text-ink/60">Verification Code: KD-9238</span>
                  <span className="text-hibiscus">Verified Builder ✓</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
