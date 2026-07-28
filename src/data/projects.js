// src/data/projects.js
//
// The project with `featured: true` renders in the large featured card at the
// top of the Projects section. Everything else renders in the 2-column grid.

export const projects = [
  {
    name: "K & K's Events",
    description:
      "A marketing site and custom headless CMS for an event styling team in Sta. Rosa, Laguna. The owner publishes the gallery, reviews, schedule, and inquiries through a passwordless admin panel — no code, no rebuilds.",
    tech: ["Astro", "React", "TypeScript", "Express", "PostgreSQL", "Prisma"],
    // Website walkthrough clip. Save the ezgif MP4 export to /public with this
    // exact name and it appears automatically — the card falls back to the
    // placeholder until the file exists.
    media: "/kkevents_website_showcase.mp4",
    // Optional still frame shown before the clip plays
    mediaPoster: "/kkevents_website_showcase.jpg",
    // TODO: add a K & K's Events screenshot to /public and point `image` at it
    image: "",
    // Live site only — no repo link for this one.
    live: "https://www.kandkevents.online",
    featured: true,
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
