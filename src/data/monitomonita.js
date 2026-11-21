// src/data/monitomonita.js — content for the /monitomonita case study page
//
// Every sentence and number here comes from the project's handoff folder
// (monito-monita-case-study/CASE_STUDY.md, numbers as of 21 Nov 2026; kept
// outside this repo). Shorten freely, but do not add a feature, metric or
// technical claim that is not in that file.
//
// Every image's alt text and caption is copied from the folder's images.json.
// Keep them in step with it rather than rewording them here.
//
// Images are imported from src/assets/monitomonita/ so Astro resizes them and
// generates a srcset. The originals there are the folder's 2x WebPs; the
// lossless -full.png files stay in the folder and are not committed.

/** @typedef {{ src: ImageMetadata, alt: string, caption: string }} Shot */

const img = /** @type {Record<string, ImageMetadata>} */ (
  import.meta.glob("../assets/monitomonita/*.webp", {
    eager: true,
    import: "default",
  })
);

/**
 * Resolve a filename to its processed Astro image metadata.
 * @returns {Shot}
 */
const shot = (file, alt, caption) => {
  const src = img[`../assets/monitomonita/${file}`];
  if (!src) throw new Error(`monitomonita: missing asset ${file}`);
  return { src, alt, caption };
};

const LIVE = "https://monitomonita-ph.vercel.app";

export const monitomonita = {
  eyebrow: "Personal project",
  title: "Monito Monita",
  // The pitch, word for word
  lead: "The Filipino exchange gift, run from one link: draw names, share wishlists, play the theme weeks and do the reveal at the party. No app, no sign-up.",

  live: LIVE,
  demo: `${LIVE}/demo`,
  repo: "https://github.com/CarlosNatanauan/monito-monita",

  // The 51-second demo. Only the poster ships with the page; YouTube's player
  // is created on click (see YouTubeFacade.astro).
  hero: {
    youtubeId: "DBNKbfwfE50",
    poster: shot(
      "video-thumb.webp",
      "Play the 51-second Monito Monita demo video",
      "See it in 51 seconds.",
    ),
  },

  // The case study's own 1200×630 preview, once it is in /public. Until then
  // the page falls back to the demo loop's poster frame, converted to JPEG
  // because link-preview scrapers handle WebP unevenly.
  og: {
    image: "/monitomonita_og.png",
    width: 1200,
    height: 630,
    alt: "Monito Monita: the Filipino exchange gift, run from one link.",
  },
  ogFallback: {
    image: "/monitomonita_og_fallback.jpg",
    width: 1280,
    height: 720,
    alt: "A paper slip reading Carlo pinned to a string, with gold rays and a parol on a purple sky",
  },

  stats: [
    { value: "No accounts", label: "a name and a 4-digit PIN to join" },
    { value: "233", label: "unit tests, 33 of them for the draw" },
    { value: "98", label: "PageSpeed mobile score on the live landing" },
    { value: "138", label: "commits, 9 to 21 Nov 2026" },
  ],

  summary:
    "Monito Monita is a web app for running a Filipino Christmas gift exchange from a single link shared in the group chat. Everyone joins with a name and a 4-digit PIN, the organizer draws all the names in one tap, and each person opens their own slip, which unfolds on screen with the name written in ink. At the party, a projector shows the reveal one slip at a time, with the organizer's phone as the remote.",

  problem: {
    label: "The problem",
    body: [
      "Every December, Filipino families, barkadas and offices run Monito Monita: a secret gift exchange. Names are drawn as a bunutan (folded paper slips pulled from a bowl), the weeks before the party have themes like “something soft” or “something red”, and at the party each person reveals who they had.",
      "Today it runs on a Messenger group chat, a spreadsheet and someone's memory. Someone has to draw the names and keep them secret, people forget the week's theme, wishlists get lost in the chat, and anyone who joins late or misses the draw makes it harder.",
    ],
  },

  role: {
    label: "My role",
    body: [
      "Solo project, built with AI tools: Claude Design for the design directions and screens, and Claude Code for writing the code.",
      "I owned the product decisions, wrote the specs and rules the AI worked from (they're in the repo's CLAUDE.md and docs/), reviewed every change, and tested the live app, including on my own iPhone.",
    ],
  },

  // ── Design ──────────────────────────────────────────────────
  design: {
    steps: [
      {
        title: "A generic first look",
        body: "The first build used a “Puto Bumbong” look. It worked, but it looked like every other AI-made app.",
      },
      {
        title: "Three directions, one pick: Handmade Pasko",
        body: "I explored three new directions in Claude Design and picked the third: the evening before Simbang Gabi, a paper parol as the only strong colour, and everything else made of paper someone prepared: a listahan notebook page, gift tags, a capiz card, papel de japon.",
      },
      {
        title: "The landing, redesigned twice",
        body: "First, the 51-second demo video moved into the first screen, behind a click-to-load poster, so a visitor sees the whole idea in a minute. Then the page was cut down to one picture and one row: the headline and buttons beside the video poster on laptops, one centred column on phones, and the bowl made small and set on the corner of the “Paano 'to?” notebook list.",
      },
    ],
    rules: [
      "Colour is light.",
      "Different jobs use different materials.",
      "Nothing is blurred.",
    ],
    moments: [
      "A small bowl on the landing page that draws a sample slip.",
      "The join drop: your name lifts off the notebook as a slip and falls into the bowl.",
      "The slip unfold, with the name written letter by letter like wet ink.",
      "The party reveal: the slips flip around a ring of lights and the parol lights up at the end.",
    ],
    mobile:
      "Most people open the link from Messenger on a phone, so every screen was designed mobile-first, with 16px inputs (no zoom on iPhone), 44px tap targets and respect for reduced motion.",

    // Before/after slot. Empty until the old “Puto Bumbong” screenshots
    // (before-landing-*.webp, before-me-*.webp) are added to
    // src/assets/monitomonita/ with their alt text from images.json. The
    // page skips this block while it is empty. Shape of an entry:
    //
    //   {
    //     label: "The landing",
    //     phone: true, // narrower layout for portrait shots
    //     before: shot("before-landing-phone.webp", "<alt>", "<caption>"),
    //     after: shot("landing-phone.webp", "<alt>", "<caption>"),
    //   },
    /** @type {{ label: string, phone?: boolean, before: Shot, after: Shot }[]} */
    pairs: [],

    laptop: shot(
      "landing-laptop.webp",
      "Monito Monita's landing page on a laptop: headline, Create your group, the demo video poster and a notebook list of three steps with a small glass bowl on its corner",
      "The landing: one link for the whole bunutan, the video in the first screen.",
    ),
    phones: [
      shot(
        "landing-phone.webp",
        "The landing page on a phone: headline, video poster, Create your group button and a notebook list with a small bowl",
        "On a phone, everything that matters is above the fold.",
      ),
      shot(
        "me-folded-phone.webp",
        "A folded paper slip hanging from a string on a purple evening sky, with a Tap to open your bunutan label",
        "After the draw, your slip waits, folded.",
      ),
    ],
  },

  // ── Engineering ─────────────────────────────────────────────
  engineering: [
    {
      title: "A draw that makes one loop",
      points: [
        "The draw is a pure function that builds a single gift loop (A → B → C → … → A), so the reveal can go from person to person. It respects exclusions both ways.",
        "It tries the most-constrained person first, and says which exclusions to relax when no loop exists.",
        "33 tests, including 400 random groups checked against a brute-force search over every possible loop.",
      ],
    },
    {
      title: "Pairs never leak",
      points: [
        "Before the reveal, no page, JSON or network response shows who gives to whom, except your own receiver.",
        "End-to-end tests check the HTML and every response at each stage, for groups of 3 and 30.",
        "Personal-link tokens are kept out of the Referer header.",
      ],
    },
    {
      title: "Identity without accounts",
      points: [
        "Tokens are 32 random bytes, stored only as SHA-256 hashes. PINs use salted scrypt.",
        "5 wrong PINs lock a member out for 15 minutes; 10 lock them out until the organizer unlocks them.",
        "Per-IP rate limits on creating, joining and failed come-backs.",
      ],
    },
    {
      title: "Nothing heavy until it's needed",
      points: [
        "The landing's first load is a 16–39 KB poster image: no video, no player, no animation code.",
        "The bowl's animation code loads when someone touches it. The slip's animation library (GSAP) arrives once the page is idle.",
        "A tap that comes before the code is queued and still plays.",
      ],
    },
    {
      title: "Forms that survive a slow phone",
      points: [
        "People start typing before the page's JavaScript loads. The create-group form keeps whatever was typed.",
        "An error coming back never overwrites what was typed after submitting.",
        "Tested at 6× CPU throttling on a 400 ms / 1.6 Mbps network.",
      ],
    },
    {
      title: "Budgets, measured",
      points: [
        "At most 150 KB of compressed JavaScript on the first load of the pages members open: the join page is 147.0 KB, a member's page 146.4 KB.",
        "The slip unfold runs at about 60 fps at 4× CPU throttling, and a tap starts it moving in about 25 ms.",
        "PageSpeed Insights on the live landing: 98 mobile and 100 desktop for performance, 100 for accessibility, best practices and SEO.",
      ],
    },
  ],
  organizer: shot(
    "organizer-laptop.webp",
    "The organizer page on a laptop: Names drawn, 8 of 12 have opened their slip as a light string, and a member list",
    "The organizer sees who has opened, never who drew whom.",
  ),

  // ── Testing ─────────────────────────────────────────────────
  testing: {
    suites: [
      "233 unit tests (Vitest), including 33 for the draw.",
      "77 database constraint tests, run against a Neon branch and rolled back.",
      "62 Playwright test runs on a Pixel 7 (Chromium), an iPhone 14 (WebKit), a 1366×768 laptop and a 1920×1080 projector: the whole flow from creating a group to the reveal with each person in their own browser, offline and recovery, slow phones, reduced motion and the one-click demo.",
      "A layout sweep of every page at 11 screen sizes, from 360×740 to 1920×1080, that fails on overlapping controls or text. Join, create-group and the organizer page are also checked at 200% text size.",
      "A usability test with AI personas, such as a kuya tapping Join on a slow phone and an organizer running a 20-person group. Each fix is tested the way the persona ran into it.",
    ],
    audit: {
      title: "The real-iPhone audit",
      intro:
        "I tested the live site on my own iPhone in Safari. The audit, and the permanent overlap check it led to, caught:",
      bugs: [
        "The date field on the create-group form spilling into the Budget field, taller than the others, with no placeholder.",
        "On a phone turned sideways, the reveal's controls covering the ring of slips. In portrait, Next below the fold on an iPhone SE.",
        "A wishlist field's tap area covering the field below it.",
        "The logo, Edit and wishlist links smaller than a 44px tap target.",
        "Text cut off with an ellipsis, now wrapping onto the next notebook line.",
        "Buttons, PIN boxes and labels breaking at 200% text size.",
        "A submit race behind a flaky test: an error coming back could undo what was typed after submitting.",
      ],
      // Shows the create-group form with the fixed date field
      shot: shot(
        "new-phone.webp",
        "The create-group form on a phone: name, party date, budget and four weekly themes on a ruled notebook page",
        "Create a group: a name, a date, a budget and the theme weeks.",
      ),
    },
  },

  // ── Gallery ─────────────────────────────────────────────────
  gallery: {
    phones: [
      shot(
        "join-phone.webp",
        "The join page on a phone: the group name under a parol, three gift tags, and a name and PIN form on a notebook page",
        "Joining takes a name and a 4-digit PIN. No accounts.",
      ),
      shot(
        "me-opened-phone.webp",
        "The opened slip showing the name Carlo with gold rays, followed by Carlo's wishlist and the theme of the week",
        "Open it, and the name is written in ink, with their wishlist below.",
      ),
      shot(
        "remote-phone.webp",
        "The reveal remote on a phone: the current pair, six revealed pairs and big Previous and Next buttons",
        "At the party, the organizer's phone is the remote.",
      ),
    ],
    reveal: [
      shot(
        "reveal-start.webp",
        "The reveal screen before it starts: twelve hidden slips in a ring around Handa na?",
        "Handa na? Twelve slips, twelve secrets.",
      ),
      shot(
        "reveal-mid.webp",
        "Mid-reveal on a projector: seven slips flipped to show names, lit bulbs along the loop, and Paolo in large gold letters",
        "Each Next flips a slip and lights the way to the next person.",
      ),
    ],
    finale: shot(
      "reveal-finale.webp",
      "The reveal finale on a projector: twelve flipped slips around a gold parol frame and a Maligayang Pasko banner",
      "The finale: the parol lights up. Maligayang Pasko!",
    ),
  },

  // ── Stack / next ────────────────────────────────────────────
  stack: {
    chips: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Neon Postgres",
      "Drizzle ORM",
      "Zod",
      "GSAP",
      "Upstash",
      "PostHog",
      "Vitest",
      "Playwright",
      "Remotion",
      "Vercel",
    ],
    body: "Next.js 16 with the App Router and React 19, TypeScript in strict mode, Neon Postgres through Drizzle ORM, and Zod. Upstash handles rate limiting, and PostHog records server-side events only, with no personal data. It runs on Vercel in the Singapore region, with a daily cron that deletes expired demo groups.",
    video:
      "The demo video is code too: a Remotion project that records the app's real screens frame by frame and cuts them with React components that reuse the app's slip, parol and sky.",
    facts: [
      "First commit 9 Nov 2026",
      "public and tested on 21 Nov",
      "138 commits",
    ],
  },

  next: [
    "AI gift ideas: suggestions from the receiver's wishlist, the budget and the week's theme, with limits per group.",
    "Office plans: big groups, CSV import, custom branding and several groups per company.",
    "Optional organizer accounts, for people who run more than one group a year.",
  ],

  cta: {
    title: "Want to build something like this?",
    body: "If you have an idea for an app people would open from a group chat, or want to talk through how this one was built, reach out.",
  },
};
