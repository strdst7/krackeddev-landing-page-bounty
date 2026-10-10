import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "../data";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="font-hand text-3xl text-hibiscus">tanya je</p>
          <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
            Questions,
            <br />
            <span className="italic">answered.</span>
          </h2>
          <p className="mt-5 text-lg text-ink/70">Still curious? Drop by the Discord. Someone's always awake.</p>
        </div>
        <div className="space-y-3" data-nochaos>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`overflow-hidden rounded-3xl border-[3px] border-ink transition ${isOpen ? "bg-turmeric shadow-print" : "bg-paper"}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6">
                  <span className="font-display text-xl font-bold sm:text-2xl">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-paper">
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-5 pb-6 text-lg leading-relaxed text-ink/80 sm:px-6">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
