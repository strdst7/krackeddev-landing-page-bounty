# KrackedDev Landing Page Concepts

## Four interactive landing page directions for KrackedDev, a Malaysia-rooted builder community.

This repository is a frontend concept showcase exploring visual identity, community storytelling, and interactive experiences. It is not a production bounty platform, membership system, or operational community portal.

Live Demo

🔗 View Live Demo

### Overview

KrackedDev is more than a developer community.

It is envisioned as:

A builder community
A learning ecosystem
A product laboratory
A launchpad for Malaysian creators, developers, designers, founders, and tinkerers

This project explores four distinct visual and interaction directions that could represent the future identity of the platform.

Each concept investigates a different interpretation of what a modern Malaysian builder community might feel like.

Concepts
01 · Kampung Print

Direction: Warm • Editorial • Risograph-inspired

A celebration of local textures, community noticeboards, indie publications, and handcrafted digital culture.

Explore
Community storytelling
Builder spotlights
Bounties
Events
FAQ sections
Click-to-stamp sticker interactions
Design Themes
Batik-inspired patterns
Print-shop aesthetics
Paper textures
Hibiscus colour palettes
Editorial typography
02 · Pasar Malam

Direction: Dark • Kinetic • Playful

Inspired by Malaysia's night markets, neon signage, loud energy, and organised chaos.

Explore
Animated navigation
Interactive bounty displays
Guild systems
Community activity signals
Motion-heavy interactions
Experimental cursor effects
Design Themes
Neon signage
Poster typography
Canvas effects
Motion graphics
Digital street culture
03 · Sandbox

Direction: Design Playground

A space where members experiment, customise and create.

Explore
Presets
Style generators
Interactive controls
Live typography experiments
Generative canvas art
Manglish-inspired interactions
Member card builder
Design Themes
Creative tooling
Builder culture
Personal identity
Rapid experimentation
04 · Bunga Club

Direction: Garden-Inspired • Soft Kinetic

The default landing experience.

An interpretation of community as a living garden where members grow, contribute and help others flourish.

Explore
Guild networks
Community pathways
Curated bounty discovery
Growth journeys
Interactive member garden
Design Themes
Organic motion
Botanical patterns
Soft editorial layouts
Community growth metaphors
Navigation

The application initially opens in Bunga Club.

Switch Concepts

Use either:

The fixed concept switcher at the bottom of the page
Keyboard shortcuts
Key	Concept1	Kampung Print
2	Pasar Malam
3	Sandbox
4	Bunga Club

Keyboard shortcuts are automatically disabled while typing inside:

Input fields
Textareas
Select elements
Important Disclaimer

This project demonstrates user interfaces, design systems and interaction concepts.

All data is bundled as sample content.

The following should not be interpreted as live or operational:

Bounties
Rewards
Applicants
Member statistics
XP totals
Events
Community metrics
Examples
Bunga Club

Selecting a bounty only updates page state.

It does not:

Submit an application
Notify moderators
Register interest
Community Garden

Planting a flower only affects the current browser session.

It is not:

Public
Persistent
Linked to a real account
Email Sign-up Form

The welcome message is a prototype state.

No email is sent.

No registration occurs.

Member Cards

Sandbox membership cards are visual previews only.

They are not verified credentials.

Security Notice

Do not submit:

Personal information
Financial data
Authentication credentials
Sensitive records

until appropriate backend integrations and security controls have been implemented.

### Tech Stack

Built using:

React 19
TypeScript
Vite 7
Tailwind CSS 4
Framer Motion
Lucide React
vite-plugin-singlefile
Features
Interactive concept switching
Animated transitions
Responsive layouts
Keyboard navigation
Localisation support
Accessibility-friendly motion handling
Local storage preferences
Run Locally
Requirements
Node.js
npm

Compatible with the Vite 7 toolchain included in the repository.

Clone Repository
git clone https://github.com/strdst7/krackeddev-landing-page-bounty.git
cd krackeddev-landing-page-bounty

Run the Newer Version
cd "krackeddev-landing-page-bounty 2"

npm ci
npm run dev


Open the URL displayed in the terminal.

Run the Original Version
cd krackeddev-landing-page-bounty

npm ci
npm run dev

Available Scripts
npm run dev


Start development server.

npm run build


Create production build.

npm run preview


Preview production build locally.

Repository Structure
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

Architecture
App Layer

src/App.tsx

Responsible for:

Active concept state
Keyboard shortcuts
Fixed concept switcher
Concept rendering
Shared Data

src/data.ts

Provides sample content for:

Bounties
Members
Guilds
Events
FAQ
Concepts

Located in:

src/concepts/
src/pasar/


Each concept is implemented independently to allow unique interaction systems and visual design approaches.

Localisation

The second project copy includes:

src/boilerplate.tsx


Features:

English support
Bahasa Melayu support
Language persistence
Local storage integration

Stored under:

kd-lang

Development Workflow
Select the target app directory.
Edit content inside src/data.ts.
Modify concept-specific behaviour inside the respective concept component.
Update bilingual copy in src/boilerplate.tsx when applicable.
Run build validation.
npm run build

Verify interactions through the development server.
npm run dev

Deployment

Each app directory is an independent Vite application.

For Vercel:

Build Command
npm run build

Output Directory
dist

Root Directory

Set the project root to the specific app directory being deployed.

Example:

krackeddev-landing-page-bounty 2/


The repository root itself is not a deployable Vite application.

Design Philosophy

Rather than imitating modern SaaS aesthetics, this project explores a distinctly Malaysian visual language for developer communities.

Themes include:

Kampung culture
Batik motifs
Pasar Malam energy
Community gardens
Builder-led learning
Creative experimentation

The goal is to imagine what a local-first builder ecosystem might look and feel like when designed from its own cultural foundations.

License

MIT License

Copyright © 2026 Nur Amirah Mohd Kamil

See the LICENSE file for details.
