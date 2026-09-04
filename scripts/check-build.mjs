// scripts/check-build.mjs
//
// Smoke test over dist/, run after `npm run build` (and in CI, where it gates
// the deploy). Every assertion here corresponds to something that actually
// broke or was missing at some point — this file is the memory of that, so a
// regression fails the build instead of being found in Lighthouse weeks later.
import { readFileSync, existsSync, statSync } from "node:fs";
import { profile } from "../src/data/profile.js";
import { join } from "node:path";

const DIST = "dist";
const SITE = "https://kuyacarlos.is-a.dev";

const failures = [];
const checks = [];
function check(label, fn) {
  try {
    const note = fn();
    checks.push(`  PASS  ${label}${note ? ` — ${note}` : ""}`);
  } catch (err) {
    failures.push(`  FAIL  ${label}\n          ${err.message}`);
  }
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}
const read = (p) => readFileSync(join(DIST, p), "utf8");
const countOf = (s, re) => (s.match(re) || []).length;

const PAGES = [
  { file: "index.html", canonical: `${SITE}/`, schema: ["Person", "WebSite", "ItemList"] },
  { file: "kkevents/index.html", canonical: `${SITE}/kkevents/` },
  { file: "404.html", canonical: `${SITE}/404/`, noindex: true },
];

// ── files that must exist ─────────────────────────────────────
for (const f of [
  "index.html",
  "kkevents/index.html",
  "404.html",
  "sitemap-index.xml",
  "sitemap-0.xml",
  "robots.txt",
  "llms.txt",
  "google03e2b0249b6470e3.html",
  "CNAME",
]) {
  check(`exists: ${f}`, () => {
    assert(existsSync(join(DIST, f)), "missing from the build");
    assert(statSync(join(DIST, f)).size > 0, "present but empty");
  });
}

// ── per-page invariants ───────────────────────────────────────
for (const page of PAGES) {
  const html = read(page.file);
  const at = (label) => `${page.file}: ${label}`;

  check(at("exactly one <h1>"), () => {
    const n = countOf(html, /<h1[\s>]/g);
    assert(n === 1, `found ${n}`);
  });

  check(at("has a non-empty <title>"), () => {
    const m = html.match(/<title>([^<]*)<\/title>/);
    assert(m && m[1].trim().length > 0, "missing or empty");
    return m[1].slice(0, 48);
  });

  check(at("has a meta description"), () => {
    const m = html.match(/<meta name="description" content="([^"]*)"/);
    assert(m && m[1].trim().length > 50, "missing or suspiciously short");
  });

  check(at("canonical is correct"), () => {
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert(m, "no canonical link");
    assert(m[1] === page.canonical, `expected ${page.canonical}, got ${m[1]}`);
  });

  check(at("every JSON-LD block parses"), () => {
    const blocks = [...html.matchAll(/ld\+json">([\s\S]*?)<\/script>/g)];
    assert(blocks.length > 0, "no structured data at all");
    const types = blocks.flatMap((b) => {
      const parsed = JSON.parse(b[1]);
      return Array.isArray(parsed) ? parsed.map((x) => x["@type"]) : [parsed["@type"]];
    });
    if (page.schema) {
      for (const want of page.schema) {
        assert(types.includes(want), `expected a ${want} node, got: ${types.join(", ")}`);
      }
    }
    return types.join(", ");
  });

  check(at("social image is absolute and present"), () => {
    const m = html.match(/<meta property="og:image" content="([^"]+)"/);
    assert(m, "no og:image");
    assert(m[1].startsWith("https://"), `not absolute: ${m[1]}`);
    const path = m[1].replace(SITE, "");
    assert(existsSync(join(DIST, path)), `file not in build: ${path}`);
  });

  check(at("og:image has explicit dimensions"), () => {
    assert(/property="og:image:width"/.test(html), "no og:image:width");
    assert(/property="og:image:height"/.test(html), "no og:image:height");
  });

  // CLS guards. Both of these were real defects.
  check(at("every <img> declares width and height"), () => {
    const bad = [...html.matchAll(/<img[^>]*>/g)]
      .map((m) => m[0])
      .filter((tag) => !(/ width="/.test(tag) && / height="/.test(tag)))
      // These two are populated by script when a dialog opens; they have no
      // layout box in the document and cannot shift it.
      .filter((tag) => !/data-avatar-modal-img|data-zoom-img/.test(tag));
    assert(bad.length === 0, `${bad.length} without dimensions: ${bad[0]?.slice(0, 90)}`);
  });

  check(at("every <video> declares width and height"), () => {
    const bad = [...html.matchAll(/<video[^>]*>/g)]
      .map((m) => m[0])
      .filter((tag) => !(/ width="/.test(tag) && / height="/.test(tag)));
    assert(bad.length === 0, `${bad.length} without dimensions — this caused a 0.105 CLS once`);
  });

  check(at("CSS is inlined, not render-blocking"), () => {
    const n = countOf(html, /rel="stylesheet"/g);
    assert(n === 0, `${n} external stylesheet link(s); build.inlineStylesheets should prevent this`);
  });

  if (page.noindex) {
    check(at("is noindex"), () => {
      assert(/<meta name="robots" content="noindex/.test(html), "missing noindex");
    });
  }
}

// ── sitemap ───────────────────────────────────────────────────
check("sitemap lists exactly the real pages", () => {
  const locs = [...read("sitemap-0.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const want = [`${SITE}/`, `${SITE}/kkevents/`];
  assert(locs.length === want.length, `expected ${want.length} urls, got ${locs.length}: ${locs}`);
  for (const w of want) assert(locs.includes(w), `missing ${w}`);
  assert(!locs.some((l) => l.includes("404")), "the 404 page must not be in the sitemap");
  return locs.length + " urls";
});

check("robots.txt points at the sitemap index", () => {
  assert(read("robots.txt").includes(`${SITE}/sitemap-index.xml`), "sitemap line missing or wrong");
});

// ── privacy ───────────────────────────────────────────────────
check("no email address is published anywhere in the build", () => {
  // Asserted against the data file rather than a regex over the output: a
  // pattern match cannot tell a real address from the contact form's
  // "you@email.com" placeholder, and writing the real one into this file to
  // search for it would republish the thing we removed.
  assert(!profile.links.email, "profile.links.email is set again — that publishes a mailto: link");
  for (const p of ["index.html", "kkevents/index.html", "404.html", "llms.txt"]) {
    assert(!/mailto:/.test(read(p)), `${p} contains a mailto: link`);
  }
});

// ── report ────────────────────────────────────────────────────
console.log(checks.join("\n"));
if (failures.length) {
  console.log("\n" + failures.join("\n"));
  console.log(`\n${failures.length} check(s) FAILED, ${checks.length} passed.`);
  process.exit(1);
}
console.log(`\nAll ${checks.length} checks passed.`);
