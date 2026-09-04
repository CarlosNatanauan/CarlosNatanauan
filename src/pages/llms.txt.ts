// src/pages/llms.txt.ts — https://llmstxt.org
//
// A plain-text summary of the site for language models, which increasingly
// reach a page through a summary rather than a crawl. Generated from the same
// data files the pages render from, so it cannot drift out of sync the way a
// hand-maintained copy in /public would.
import type { APIRoute } from "astro";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { experience } from "../data/experience.js";
import { technologies } from "../data/technologies.js";

/** The bio is stored as segments so tech names can render as chips; flatten it. */
const bioText = profile.bio.map((seg) => seg.text ?? seg.tag).join("");

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://kuyacarlos.is-a.dev");
  const url = (path: string) => new URL(path, base).toString();

  const projectLines = projects.map((p) => {
    const href = p.caseStudy ?? p.live ?? p.repo ?? p.demo;
    const name = href ? `[${p.name}](${url(href)})` : p.name;
    const stack = p.tech?.length ? ` Built with ${p.tech.join(", ")}.` : "";
    return `- ${name}: ${p.description}${stack}`;
  });

  const experienceLines = experience.map(
    (job) =>
      `- ${job.role}, ${job.company} (${job.period})\n` +
      job.bullets.map((b) => `  - ${b}`).join("\n"),
  );

  const stackLines = technologies.map(
    (row) => `- ${row.group}: ${row.items.map((i) => i.name).join(", ")}`,
  );

  const body = `# ${profile.fullName} (${profile.siteName})

> ${profile.headline} ${profile.headlineMuted}. Based in ${profile.location}.

${bioText}

## Pages

- [Portfolio home](${url("/")}): bio, projects, experience, tech stack, and contact form.
- [K & K's Events case study](${url("/kkevents")}): how a marketing site and custom headless CMS were built for an event styling team, screen by screen.

## Projects

${projectLines.join("\n")}

## Experience

${experienceLines.join("\n")}

## Tech stack

${stackLines.join("\n")}

## Contact

Reach ${profile.name} through the contact form at ${url("/#contact")}, or on ${Object.entries(
    profile.links,
  )
    .filter(([, v]) => v.startsWith("http"))
    .map(([k, v]) => `${k} (${v})`)
    .join(" and ")}.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
