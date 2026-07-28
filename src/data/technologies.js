// src/data/technologies.js
// Three rows so the compact view can scroll them in alternating directions.
// Mobile folds into Web because two chips alone made a thin row.
// `icon` matches a filename in src/icons/; omit it for a text-only chip.
export const technologies = [
  {
    group: "Mobile & Web",
    items: [
      { name: "Flutter", icon: "flutter" },
      { name: "Dart", icon: "dart" },
      { name: "Java", icon: "java" },
      { name: "Astro", icon: "astro" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    group: "Backend & Data",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "NestJS", icon: "nestjs" },
      { name: "Prisma", icon: "prisma" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "C#", icon: "csharp" },
      { name: ".NET", icon: "dotnet" },
    ],
  },
  {
    group: "Services & Tools",
    items: [
      { name: "Firebase", icon: "firebase" },
      { name: "Supabase", icon: "supabase" },
      { name: "Cloudinary", icon: "cloudinary" },
      { name: "Resend", icon: "resend" },
      { name: "Stripe", icon: "stripe" },
      { name: "Gemini AI", icon: "gemini" },
      { name: "Playwright", icon: "playwright" },
      { name: "GitHub Actions", icon: "github" },
      { name: "Vercel", icon: "vercel" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
    ],
  },
];
