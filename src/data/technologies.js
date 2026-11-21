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
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    group: "Backend & Data",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Bun", icon: "bun" },
      { name: "Express", icon: "express" },
      { name: "NestJS", icon: "nestjs" },
      { name: "Prisma", icon: "prisma" },
      { name: "Drizzle ORM", icon: "drizzle" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "SQLite", icon: "sqlite" },
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
      { name: "Neon", icon: "neon" },
      { name: "Cloudinary", icon: "cloudinary" },
      { name: "Resend", icon: "resend" },
      { name: "Stripe", icon: "stripe" },
      { name: "PostHog", icon: "posthog" },
      { name: "Gemini AI", icon: "gemini" },
      { name: "Playwright", icon: "playwright" },
      { name: "Vitest", icon: "vitest" },
      { name: "GitHub Actions", icon: "github" },
      { name: "Vercel", icon: "vercel" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
    ],
  },
];
