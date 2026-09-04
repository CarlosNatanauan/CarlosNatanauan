# AGENTS.md

## Project Overview
- This repo is an Astro 5 portfolio site with Tailwind CSS 4 via the Vite plugin.
- The site is currently a mostly single-page portfolio rendered from `src/pages/index.astro`.
- Treat this project as content-driven: most visible updates should come from `src/data/*`, assets in `src/assets/`, and small Astro components in `src/components/`.

## Key Structure
- `src/pages/index.astro`: main landing page that assembles hero, projects, experience, and contact sections.
- `src/layouts/BaseLayout.astro`: shared shell, header/nav, theme setup, mobile menu, footer, and back-to-top button.
- `src/components/`: reusable UI pieces such as `FeaturedProject`, `ProjectGridCard`, `ExperienceRow`, `ContactForm`, `AvatarFlip`, and `ImageSlot`.
- `src/data/`: portfolio content sources for profile, projects, and experience.
- `src/styles/global.css`: Tailwind import plus project-wide custom animations, gradients, and overrides.
- `src/assets/`: images that go through `astro:assets` — `projects/` (card screenshots), `profile/` (portrait), `kkevents/` (case study).
- `public/`: files that must keep a fixed URL — `robots.txt`, favicons, the kkevents clip, `outside/` photos, and `CNAME`.
- `astro.config.mjs`: canonical site URL, sitemap integration, link prefetching, and the Tailwind Vite plugin.

## Common Commands
- `npm run dev`: start local Astro dev server.
- `npm run build`: create production build.
- `npm run preview`: preview production output locally.

## Working Rules For Future Codex Edits
- Preserve the current implementation unless the task explicitly asks for redesign or refactor work.
- Prefer editing `src/data/*.js` for portfolio content changes before changing layout/component structure.
- Keep `index.astro` as the source of section order and page composition.
- When changing shared UI, check both desktop and mobile behavior because navigation, theme toggle, and section layouts are responsive.
- Keep dark mode working by respecting the existing `html.dark` class flow and the `themechange` event used by layout and profile scripts.
- Be careful with inline scripts in Astro components. Rebinding on `astro:page-load` is already used in multiple places.
- Do not add dependencies unless explicitly requested.

## Quality Guardrails
- Accessibility: preserve semantic headings, button labels, link labels, focus states, reduced-motion handling, and image alt text.
- Responsiveness: verify small-screen layouts first, especially header controls, project cards, experience cards, and the contact form.
- Performance: render images through `astro:assets` (see `ImageSlot.astro`) rather than dropping them in `public/`, avoid unnecessary client-side JavaScript, and load third-party scripts after first paint — analytics in `BaseLayout.astro` is the pattern to follow.
- Maintainability: prefer small, localized edits; avoid duplicating section markup when a component or data file can handle the change cleanly.

## Notable Repo-Specific Observations
- There are several inline scripts handling theme, mobile menu, typing animation, contact submission, profile image behavior, and back-to-top logic.
- Some files show mojibake/encoding artifacts in text content; preserve meaning carefully if cleaning copy in the future.
- There is no test suite in the repo right now, so future changes should at minimum be verified with `npm run build`.
