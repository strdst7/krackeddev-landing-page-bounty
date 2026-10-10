## KrackedDev Landing Page Concepts

Four interactive landing-page directions for KrackedDev, a Malaysia-rooted builder community. This repository is a frontend concept showcase, not a production bounty or membership platform.

View the live demo

### The four concepts

Concept: 01 · Kampung Print
Direction: Warm, editorial, risograph-inspired
What to explore: Community sections, bounties, members, events, FAQ, and a click-to-stamp sticker mode
────────────────────────────────────────
Concept: 02 · Pasar Malam
Direction: Dark, kinetic, playful
What to explore: Canvas effects, animated navigation, bounty presentation, guilds, and community signals
────────────────────────────────────────
Concept: 03 · Sandbox
Direction: Tactile design playground
What to explore: Presets, live style sliders, generative canvas art, Manglish text effects, and a member-card builder
────────────────────────────────────────
Concept: 04 · Bunga Club
Direction: Garden-inspired, soft kinetic
What to explore: Guild network, filtered bounty briefs, growth journey, and a visit-only community garden

Bunga Club is the initial view. Use the fixed switcher at the bottom of the page, or press 1, 2, 3, or 4 to change concepts. Keyboard shortcuts are ignored while an input, textarea, or select has focus.

What this project is—and is not

The site demonstrates visual directions and interactions using frontend state and bundled sample data. Bounty listings, rewards, applicants, members, events, XP, and similar figures in the demo should not be read as current, verified opportunities or community statistics.

In particular:

- Selecting a bounty in Bunga Club marks it within the current page state; it does not submit an application.
- Planting a flower adds it to the garden for the current visit; it is not a public, persistent member record.
- The Bunga Club email form displays an on-page welcome state. It does not send an email or register a member.
- The Sandbox member card is a preview, not an issued or verified credential.

Do not enter sensitive information into prototype forms. Connect and verify a real service before using any of these flows for applications, sign-ups, payments, or member records.

Run locally

Requirements: Node.js and npm compatible with the repository’s Vite 7 toolchain.

The repository contains two separate Vite app directories. Run commands inside one of them, not at the repository root.

To run the newer krackeddev-landing-page-bounty 2 copy:

    git clone https://github.com/strdst7/krackeddev-landing-page-bounty.git
    cd krackeddev-landing-page-bounty
    cd "krackeddev-landing-page-bounty 2"
    npm ci
    npm run dev

Open the local URL printed by Vite. To run the other copy instead, use cd krackeddev-landing-page-bounty from the repository root before npm ci.

Available scripts in either app directory:

    npm run dev       # Start the Vite development server
    npm run build     # Build to dist/
    npm run preview   # Serve the built output locally

There is no npm test, lint, or type-check script defined in the checked-in package.json. npm run build is the existing build check; it is not a substitute for testing every interaction.

Repository layout

    .
    ├── LICENSE
    ├── README.md
    ├── krackeddev-landing-page-bounty/
    │   ├── index.html
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── vite.config.ts
    │   └── src/
    └── krackeddev-landing-page-bounty 2/
        ├── index.html
        ├── package.json
        ├── package-lock.json
        ├── vite.config.ts
        └── src/
            ├── App.tsx
            ├── boilerplate.tsx
            ├── data.ts
            ├── index.css
            ├── assets/
            ├── components/
            ├── concepts/
            │   ├── Garden.tsx
            │   ├── Kampung.tsx
            │   └── Sandbox.tsx
            └── pasar/

Both app directories have their own manifest and lockfile. They share much of the concept structure, but they are not identical: the second copy wraps the app in LangProvider and includes English/Bahasa Melayu copy used by Bunga Club. The repository does not identify one directory as canonical, so confirm the intended Vercel root directory before deploying or editing one as the source of truth.

How it fits together

src/main.tsx mounts the React app. src/App.tsx holds the selected concept, renders one concept at a time, handles the 1–4 shortcuts, and provides the fixed switcher.

The concept implementations are in src/concepts/ and src/pasar/. Reusable visual sections live in src/components/. src/data.ts contains the sample bounties, members, levels, events, and FAQ content. In the second app directory, src/boilerplate.tsx contains the English/Bahasa Melayu copy and language context; the selected language is stored under kd-lang in browser local storage.

The apps use React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide icons. The Vite configuration also uses vite-plugin-singlefile for its build output. Images are bundled under src/assets/.

Editing and checking changes

1. Choose which app directory you are changing. If both copies must stay aligned, make and review the corresponding change in each.
2. Edit shared sample content in that app’s src/data.ts; edit concept-specific copy and interactions in the relevant concept component. For Bunga Club’s bilingual strings in the second copy, edit src/boilerplate.tsx.
3. Run npm run build from the changed app directory.
4. Use npm run dev to check the affected concept in a browser, including the mobile layout and any form or keyboard interaction you changed.

Avoid presenting sample bounties or prototype sign-up confirmations as operational services until they are backed by verified data and working integrations.

Deployment

Each app directory is a Vite project with a build script and a dist/ output directory. For a Vercel project, set its root directory to the specific app directory you intend to publish, use npm run build, and publish dist/. The repository root itself has no app-level package.json.

The live demo is linked above. This README does not establish which of the two directories currently backs that deployment.

License

The repository is licensed under the MIT License. Copyright © 2026 Nur Amirah Mohd Kamil.
