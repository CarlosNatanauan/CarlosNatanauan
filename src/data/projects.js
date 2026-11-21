// src/data/projects.js
//
// The project with `featured: true` renders in the large featured card at the
// top of the Projects section. Everything else renders in the 2-column grid.

export const projects = [
  {
    name: "Monito Monita",
    // The pitch, word for word from the case study handoff. The card only has
    // to earn the click; the rest is on /monitomonita.
    description:
      "The Filipino exchange gift, run from one link: draw names, share wishlists, play the theme weeks and do the reveal at the party. No app, no sign-up.",
    // One chip per layer: app, language, data, testing. The full stack is on
    // the case study page.
    tech: ["Next.js", "TypeScript", "Neon Postgres", "Playwright"],
    // The 11-second muted loop from the demo video, in /public with its
    // poster. The MP4 is an H.264 copy for older iPhones; the card lists it
    // as a second <source> once the file is in /public.
    media: "/monitomonita_loop.webm",
    mediaFallback: "/monitomonita_loop.mp4",
    mediaPoster: "/monitomonita_loop.webp",
    mediaWidth: 1280,
    mediaHeight: 720,
    // What the grid card shows if this project ever leaves the featured slot
    image: "/monitomonita.webp",
    // The repo and the one-click demo are linked from the case study: a third
    // and fourth button would not fit the card's single row on a phone.
    live: "https://monitomonita-ph.vercel.app",
    // The 51-second demo. Adds a Watch button to the featured card.
    video: "https://youtu.be/DBNKbfwfE50",
    // Detail page: src/pages/monitomonita.astro
    caseStudy: "/monitomonita",
    featured: true,
  },

  {
    name: "Saan Tayo?",
    // Short on purpose: the card only has to earn the click. The pipeline,
    // the agreement table and the limits are on /saantayo.
    description:
      "An interactive map of all 1,642 Philippine cities and municipalities, each tagged for 13 vibes by a small AI model reading open data. Pick what you want and every town that fits lights up, including the ones you've never heard of.",
    // One chip per layer — the model that judged the tags (first: testing it
    // is why the project exists), site, map, data pipeline. The rest of the
    // stack is on the case study page.
    tech: ["TypeSafe Jev", "Astro", "MapLibre GL", "Bun"],
    // A recording of the live build, in /public with its poster.
    media: "/saantayo_walkthrough.mp4",
    mediaPoster: "/saantayo_walkthrough.jpg",
    mediaWidth: 1280,
    mediaHeight: 720,
    // Playback speed; 1 is the recorded speed. Keep in step with
    // `hero.rate` in saantayo.js.
    mediaRate: 1.25,
    // What the grid card shows: the clip's poster frame. The clip above only
    // plays when this project holds the featured slot.
    image: "/saantayo_walkthrough.jpg",
    // Live site only — the repo is private.
    live: "https://saantayo.vercel.app",
    // Detail page: src/pages/saantayo.astro
    caseStudy: "/saantayo",
  },

  {
    name: "K & K's Events",
    // Deliberately short: this card only has to earn the click now that
    // /kkevents exists. What each admin screen does, and the full stack,
    // belong there — not here.
    description:
      "A marketing site and custom CMS for an event styling team in Sta. Rosa, Laguna. The owner runs the whole site herself — no code, no rebuilds.",
    // One chip per layer — public site, admin panel, API, data. The rest of
    // the stack (TypeScript, Prisma, Cloudinary, Resend, Playwright) is on
    // the case study page.
    tech: ["Astro", "React", "Express", "PostgreSQL"],
    // Website walkthrough clip. Save the ezgif MP4 export to /public with this
    // exact name and it appears automatically — the card falls back to the
    // placeholder until the file exists.
    media: "/kkevents_website_showcase.mp4",
    // Optional still frame shown before the clip plays
    mediaPoster: "/kkevents_website_showcase.jpg",
    // What the grid card shows. The clip above only plays when this project
    // holds the featured slot.
    image: "/kkevents_website_showcase.jpg",
    // Live site only — both repos are private.
    live: "https://www.kandkevents.online",
    // Detail page: src/pages/kkevents.astro
    caseStudy: "/kkevents",
  },

  {
    name: "ResiboVault",
    tagline: "Bayad ka na ba? Show proof in seconds.",
    description:
      'Born from one too many "Bayad ka na ba?" moments. Screenshot a GCash, Maya, or bank receipt — Gemini 2.5 Flash reads the amount, ref, and recipient for you. Search anytime by name or amount. Need to prove a payment? One tap generates a shareable link that expires in 7 days — they see the receipt, not your whole vault.',
    tech: [
      "Flutter",
      "Riverpod",
      "Drift/SQLite",
      "go_router",
      "Gemini 2.5 Flash",
      "Supabase",
      "Edge Functions",
      "Astro",
      "Tailwind",
      "Vercel",
    ],
    // Grouped tags, in case ResiboVault ever moves back to the featured slot
    tagGroups: [
      { label: "Mobile", tags: ["Flutter", "Riverpod", "Drift/SQLite", "go_router"] },
      { label: "AI & Backend", tags: ["Gemini 2.5 Flash", "Supabase", "Edge Functions"] },
      { label: "Web", tags: ["Astro", "Tailwind", "Vercel"] },
    ],
    live: "https://resibovault-web.vercel.app/",
    demo: "https://youtube.com/shorts/69dEFXfPr7o",
    image: "/resibo_vault_big.png",
  },

  {
    name: "Keepsake — Memory Archive",
    description:
      "An offline-first Flutter app for archiving the objects that shaped you. Take a photo, write why it matters, record your voice while it's still fresh. Organize by collections and tags, swipe through photo galleries, and restore everything silently on a new device — all backed by your own Google Drive.",
    tech: ["Flutter", "Riverpod", "Drift (SQLite)", "Google Drive API", "GoRouter"],
    repo: "https://github.com/CarlosNatanauan/keepsake_app",
    demo: "https://youtu.be/otQp8XxPmQw",
    tryIt: "https://drive.google.com/file/d/1eA4rUY1DHmFvIH22t0FAxvnfXB1ILTmW/view?usp=sharing",
    image: "/keepsake_thumbnail.png",
  },

  {
    name: "SpaceNest — Smart Rental Management",
    description:
      "A fullstack mobile app for landlords to manage spaces, rooms, and tenants — and for tenants to handle leases, rent, and maintenance requests.",
    tech: ["Flutter", "NestJS", "PostgreSQL", "Prisma", "Riverpod"],
    repo: "https://github.com/CarlosNatanauan/apartment_app",
    demo: "https://youtu.be/OduM3MMHklo",
    image: "/spacenest.png",
  },

  {
    name: "Caflow — Offline Café Chat",
    description:
      "An offline, café-only chat app that lets people in the same café talk via Nearby Connections and Wi-Fi Direct — no internet, no accounts, just anonymous café nicknames.",
    tech: ["Flutter", "Nearby Connections API", "Wi-Fi Direct", "Material 3"],
    repo: "https://github.com/CarlosNatanauan/offline_chat_app",
    demo: "https://youtu.be/CRS-6HNhUDg",
    tryIt: "https://drive.google.com/file/d/1Dig_7LhAJxd6_uSuGbrXzR8okkNiMoeK/view",
    image: "/caflow.png",
  },

  {
    name: "USAP AI",
    description:
      "A Tagalog-friendly chatbot built with Flutter, Firebase, and Gemini — chat casually, get answers, and let it remember your conversations.",
    tech: ["Flutter", "Firebase", "Vertex AI (Gemini)"],
    repo: "https://github.com/CarlosNatanauan/flutter_chatbot",
    demo: "https://youtu.be/VwWbTemfQR4",
    image: "/usap-ai.png",
  },

  {
    name: "Listly",
    description:
      "A note-taking and task management app with real-time syncing to simplify workflow and stay on top of tasks and ideas.",
    tech: ["Flutter", "Node.js", "MongoDB Atlas"],
    repo: "https://github.com/CarlosNatanauan/listly",
    demo: "https://youtu.be/izoIeaZ9dRQ",
    image: "/listly.png",
  },

  {
    name: "Parking Lot Management System",
    description:
      "A full-featured solution for Metro Parking Management Philippines Inc., streamlining operations with ticketing, vehicle logs, and admin controls.",
    tech: ["C#", ".NET", "MS SQL"],
    repo: "https://github.com/CarlosNatanauan/Metro-Parking-Philippines-System",
    image: "/parking.png",
  },
];
