import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "bm";

/**
 * Official KrackedDevs boilerplate (EN + BM), plus the bilingual strings
 * used by the Bunga Club concept. Placeholders use {name} tokens.
 */
export const copy = {
  en: {
    brand: { name: "KrackedDev", tag: "Bunga Club" },
    langLabel: "Language",
    nav: {
      roots: "The guilds",
      harvest: "Bounties",
      season: "How we grow",
      wall: "Plant a seed",
      join: "Come grow",
    },
    hero: {
      eyebrow: "A community for people who make things",
      titleA: "KrackedDev",
      titleB: "grows together.",
      sub: "Malaysia's builder ecosystem: a community, a school and a product lab, run by builders.",
      cta1: "Find your people",
      cta2: "See what can grow",
      scroll: "Rooted in Malaysia",
      aside: "good things grow\nwhen we grow them together",
    },
    blueprint: {
      eyebrow: "Who we are",
      tagline:
        "KrackedDevs is Malaysia's builder ecosystem: a community, a school and a product lab, run by builders.",
      body: "KrackedDevs is Malaysia's builder ecosystem: a community, a school and a product lab, run by builders. Members learn in public, ship real projects and get hired through the companies and government partners that work with us. KrackedDevs is operated by RapidScreen (M) Sdn. Bhd. in Kuala Lumpur.",
      operator: "Operated by RapidScreen (M) Sdn. Bhd. · Kuala Lumpur",
      marquee: ["community", "school", "product lab", "run by builders"],
      plate: "KD — plate 01",
    },
    guildDesc: {
      Web: "Make the internet feel a little more human.",
      AI: "Teach useful tools to speak like us.",
      Design: "Give good ideas a shape, a voice and a feeling.",
      Mobile: "Take thoughtful little tools everywhere.",
      Data: "Find the story hiding inside the numbers.",
      Hardware: "Make curious things you can hold in your hand.",
    },
    roots: {
      eyebrow: "Good roots make room",
      titleA: "Different roots.",
      titleB: "Same direction.",
      sub: "Six guilds for six kinds of curious. Find a branch, meet the people there, and follow the work wherever it leads.",
      hint: "Hover or tap a branch to meet a guild",
      footnote: "6 guilds, one shared garden",
      folks: "folks, already making things",
    },
    harvest: {
      eyebrow: "Open calls for makers",
      titleA: "Good work,",
      titleB: "well rewarded.",
      sub: "Real briefs from Malaysian teams. Pick the one that makes you curious, ship something useful, get paid directly.",
      total: "in open rewards",
      count: "{n} growing opportunities",
      daysLeft: "{d} days left",
      note: "Community bounty concept · budgets shown in MYR",
      share: "Have a brief to share?",
      reward: "Project reward",
      modalCta: "This one speaks to me",
      modalCtaDone: "Already on your list",
    },
    season: {
      eyebrow: "A little at a time",
      titleA: "Nothing grows",
      titleB: "overnight.",
      sub: "Not your first project. Not your confidence. Not your crew. So we made a place where the small steps count, too.",
      onTheWay: "And on the way?",
      steps: [
        { title: "Find a seed", description: "Pick a guild, follow a question, or start with a small bounty." },
        { title: "Grow some roots", description: "Learn beside people who remember what it felt like to start." },
        { title: "Make it real", description: "Ship something useful. Earn XP for what you put into the world." },
        { title: "Help it bloom", description: "Share what you learned and make the next person's first step easier." },
      ],
    },
    wall: {
      eyebrow: "There is room for one more",
      titleA: "Every garden",
      titleB: "needs you.",
      sub: "Add your name to the garden. Choose a guild and watch your little flower find its place among the crew.",
      placeholder: "Your first name",
      guildLabel: "{g} guild",
      plant: "Plant a seed",
      planted: "Your flower's in. Look for it in the garden below.",
      counter: "{n} builders in the garden",
      note: "a concept wall · your flower stays for this visit",
    },
    closing: {
      eyebrow: "There is a place at the table",
      titleA: "Come as you are.",
      titleB: "Grow as you go.",
      sub: "First project or fiftieth, there is always room in the garden. Free to join, no gatekeeping, just good people making good things.",
      label: "Your email, and we will save you a seat",
      cta: "Join the community",
      fine: "Free to join. No spam. Just a warm welcome and a place to start.",
      welcomeTitle: "Ahlan wa sahlan.",
      welcomeBody: "The door is open. We will send a little hello to {email}.",
      invite: "Invite someone else",
    },
    footer: {
      tagline: "A community, a school and a product lab, run by builders.",
      operator: "Operated by RapidScreen (M) Sdn. Bhd. · Kuala Lumpur",
      made: "Open creative bounty concept · made with care in Malaysia",
      top: "Back to the sunshine",
    },
  },
  bm: {
    brand: { name: "KrackedDev", tag: "Kelab Bunga" },
    langLabel: "Bahasa",
    nav: {
      roots: "Gild",
      harvest: "Bounti",
      season: "Cara kami tumbuh",
      wall: "Tanam benih",
      join: "Sertai kami",
    },
    hero: {
      eyebrow: "Satu komuniti untuk mereka yang membina",
      titleA: "KrackedDev",
      titleB: "tumbuh bersama.",
      sub: "Ekosistem pembina Malaysia: sebuah komuniti, sebuah sekolah dan sebuah makmal produk, dikendalikan oleh pembina.",
      cta1: "Cari orang anda",
      cta2: "Lihat apa yang boleh tumbuh",
      scroll: "Berakar di Malaysia",
      aside: "perkara baik tumbuh\napabila kita tumbuh bersama",
    },
    blueprint: {
      eyebrow: "Siapa kami",
      tagline:
        "KrackedDevs ialah ekosistem pembina Malaysia: sebuah komuniti, sebuah sekolah dan sebuah makmal produk, dikendalikan oleh pembina.",
      body: "KrackedDevs ialah ekosistem pembina Malaysia: sebuah komuniti, sebuah sekolah dan sebuah makmal produk, dikendalikan oleh pembina. Ahli belajar secara terbuka, menghasilkan projek sebenar dan diambil bekerja melalui syarikat serta rakan kerajaan yang bekerjasama dengan kami. KrackedDevs dikendalikan oleh RapidScreen (M) Sdn. Bhd. di Kuala Lumpur.",
      operator: "Dikendalikan oleh RapidScreen (M) Sdn. Bhd. · Kuala Lumpur",
      marquee: ["komuniti", "sekolah", "makmal produk", "dikendalikan oleh pembina"],
      plate: "KD — plat 01",
    },
    guildDesc: {
      Web: "Jadikan internet rasa lebih manusiawi.",
      AI: "Ajar alat yang berguna untuk bercakap macam kita.",
      Design: "Beri idea yang baik rupa, suara dan rasa.",
      Mobile: "Bawa alat kecil yang bernilai ke mana sahaja.",
      Data: "Cari cerita yang tersembunyi dalam nombor.",
      Hardware: "Cipta benda ingin tahu yang boleh dipegang di tangan.",
    },
    roots: {
      eyebrow: "Akar yang baik beri ruang",
      titleA: "Akar berbeza.",
      titleB: "Hala tuju sama.",
      sub: "Enam gild untuk enam jenis ingin tahu. Cari satu cabang, temui orang di situ, dan ikut ke mana sahaja kerja itu membawa anda.",
      hint: "Lalukan atau tekan satu cabang untuk bertemu dengan gild",
      footnote: "6 gild, satu kebun bersama",
      folks: "ahli, sudah membina sesuatu",
    },
    harvest: {
      eyebrow: "Panggilan terbuka untuk pembina",
      titleA: "Kerja yang baik,",
      titleB: "ganjaran yang berbaloi.",
      sub: "Brief sebenar daripada pasukan di Malaysia. Pilih yang membuat anda ingin tahu, hantar sesuatu yang berguna, dan dibayar terus.",
      total: "dalam ganjaran terbuka",
      count: "{n} peluang yang sedang tumbuh",
      daysLeft: "{d} hari lagi",
      note: "Konsep bounti komuniti · bajet ditunjukkan dalam MYR",
      share: "Ada brief untuk dikongsi?",
      reward: "Ganjaran projek",
      modalCta: "Yang ini saya nak",
      modalCtaDone: "Sudah ada dalam senarai anda",
    },
    season: {
      eyebrow: "Sedikit-sedikit",
      titleA: "Tiada apa yang tumbuh",
      titleB: "sekelip mata.",
      sub: "Bukan projek pertama anda. Bukan keyakinan anda. Bukan kawan anda. Jadi kami jadikan satu tempat di mana langkah kecil juga dihargai.",
      onTheWay: "Dan dalam perjalanan?",
      steps: [
        { title: "Cari benih", description: "Pilih satu gild, kejar satu persoalan, atau mulakan dengan bounti kecil." },
        { title: "Tumbuhkan akar", description: "Belajar di sisi orang yang masih ingat rasa mula-mula." },
        { title: "Jadikan ia nyata", description: "Hantar sesuatu yang berguna. Dapatkan XP untuk apa yang anda hasilkan." },
        { title: "Bantu ia mekar", description: "Kongsi apa yang anda belajar dan mudahkan langkah pertama orang seterusnya." },
      ],
    },
    wall: {
      eyebrow: "Masih ada ruang untuk seorang lagi",
      titleA: "Setiap kebun",
      titleB: "perlukan anda.",
      sub: "Tambah nama anda ke dalam kebun. Pilih satu gild dan lihat bunga kecil anda mencari tempat dalam kalangan kita.",
      placeholder: "Nama pertama anda",
      guildLabel: "gild {g}",
      plant: "Tanam sebiji benih",
      planted: "Bunga anda sudah ditanam. Carilah ia di kebun di bawah.",
      counter: "{n} pembina di kebun",
      note: "dinding konsep · bunga anda kekal untuk lawatan ini",
    },
    closing: {
      eyebrow: "Ada tempat di meja",
      titleA: "Datanglah apa adanya.",
      titleB: "Tumbuhlah sambil jalan.",
      sub: "Projek pertama atau yang kelima puluh, sentiasa ada tempat di kebun. Percuma untuk sertai, tiada kawalan, hanya orang baik membina benda yang baik.",
      label: "Emel anda, dan kami simpan tempat duduk",
      cta: "Sertai komuniti",
      fine: "Percuma untuk sertai. Tiada spam. Hanya ucapan selamat datang dan tempat untuk bermula.",
      welcomeTitle: "Ahlan wa sahlan.",
      welcomeBody: "Pintu terbuka. Kami akan menghantar salam kecil kepada {email}.",
      invite: "Jemput orang lain",
    },
    footer: {
      tagline: "Sebuah komuniti, sebuah sekolah dan sebuah makmal produk, dikendalikan oleh pembina.",
      operator: "Dikendalikan oleh RapidScreen (M) Sdn. Bhd. · Kuala Lumpur",
      made: "Konsep panggilan terbuka kreatif · dibuat dengan penuh kasih di Malaysia",
      top: "Kembali ke cahaya matahari",
    },
  },
};

export type Copy = (typeof copy)["en"];

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Copy }>({
  lang: "en",
  setLang: () => {},
  t: copy.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("kd-lang") as Lang) || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("kd-lang", lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang === "bm" ? "ms" : "en";
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t: copy[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
