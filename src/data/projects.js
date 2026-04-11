// src/data/projects.js
export const projects = [
  {
    name: "Keepsake — Memory Archive",
    description:
      "An offline-first Flutter app for archiving the objects that shaped you. Take a photo, write why it matters, record your voice while it's still fresh. Organize by collections and tags, swipe through photo galleries, and restore everything silently on a new device — all backed by your own Google Drive. No backend, no subscriptions, no strangers holding your memories.",
    tech: ["Flutter", "Riverpod", "Drift (SQLite)", "Google Drive API", "GoRouter"],
    repo: "https://github.com/CarlosNatanauan/keepsake_app",
    demo: "https://youtu.be/otQp8XxPmQw",
    tryIt: "https://drive.google.com/file/d/1eA4rUY1DHmFvIH22t0FAxvnfXB1ILTmW/view?usp=sharing",
    image: "/keepsake.png",
    imageMobile: "/keepsake_thumbnail.png",
    featured: true,
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
