import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarPlus, Check, MapPin } from "lucide-react";
import hackImg from "../assets/hackathon.jpg";
import { events } from "../data";

export default function Events() {
  const [rsvp, setRsvp] = useState<string[]>([]);

  return (
    <section id="events" className="relative px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.25fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-hand text-3xl text-jungle">jom lepak</p>
          <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
            Online,
            <br />
            offline, <span className="italic text-hibiscus">on-time-ish.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink/70">
            Weekly classes, guild crits, kopitiam meetups and hackathons with real prize money. Show up once, and
            you'll come back for the people.
          </p>
          <div className="relative mt-10 max-w-sm">
            <div className="overflow-hidden rounded-[28px] border-[3px] border-ink shadow-print rotate-[-2deg]">
              <img src={hackImg} alt="Illustrated hackathon with builders presenting" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-4 rotate-3 rounded-2xl border-[3px] border-ink bg-turmeric px-4 py-2 shadow-print-sm">
              <div className="font-display text-xl font-black">Monsoon Hack '26</div>
              <div className="text-xs font-bold uppercase tracking-wider">48h · RM10k prize pool</div>
            </div>
          </div>
        </div>

        <div className="space-y-4" data-nochaos>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ink/60">This month</span>
            <span className="font-hand text-2xl">{rsvp.length ? `${rsvp.length} on your calendar ✓` : "tap to RSVP"}</span>
          </div>
          {events.map((e, i) => {
            const going = rsvp.includes(e.title);
            return (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06 }}
                className="group flex items-stretch overflow-hidden rounded-[28px] border-[3px] border-ink bg-paper transition hover:-translate-y-1 hover:shadow-print"
              >
                <div className={`flex w-24 shrink-0 flex-col items-center justify-center border-r-[3px] border-ink sm:w-28 ${e.color}`}>
                  <span className="text-xs font-bold tracking-widest">{e.day}</span>
                  <span className="font-display text-5xl font-black leading-none">{e.date}</span>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1 p-5">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50">{e.kind} · {e.time}</span>
                  <h3 className="font-display text-2xl font-black leading-tight">{e.title}</h3>
                  <span className="flex items-center gap-1 text-sm text-ink/60">
                    <MapPin className="h-3.5 w-3.5" /> {e.where}
                  </span>
                </div>
                <button
                  onClick={() => setRsvp((r) => (going ? r.filter((x) => x !== e.title) : [...r, e.title]))}
                  className={`flex w-20 shrink-0 flex-col items-center justify-center gap-1 border-l-[3px] border-ink text-xs font-bold transition sm:w-24 ${
                    going ? "bg-jungle text-paper" : "hover:bg-paper-2"
                  }`}
                  aria-label={`RSVP to ${e.title}`}
                >
                  {going ? <Check className="h-6 w-6" /> : <CalendarPlus className="h-6 w-6" />}
                  {going ? "Going" : "RSVP"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
