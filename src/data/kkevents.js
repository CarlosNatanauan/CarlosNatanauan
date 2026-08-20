// src/data/kkevents.js — content for the /kkevents case study page
//
// Copy here is fixed. It was fact-checked against the project READMEs and the
// live site before it reached this repo: fix a typo if you spot one, but do not
// reword it, and do not add a metric, date, version number, or technical claim
// that is not already below. Deliberately absent, because they could not be
// verified: a "live since" date, traffic numbers, and a quote from the owner.
//
// Images are imported from src/assets/kkevents/ so Astro converts them to WebP
// and generates a srcset — see KeyScreenCard.astro. Filenames match the spec in
// docs/kkevents-case-study-spec.md.

/** @typedef {{ src: ImageMetadata, alt: string }} Shot */

const img = /** @type {Record<string, ImageMetadata>} */ (
  import.meta.glob("../assets/kkevents/*.png", {
    eager: true,
    import: "default",
  })
);

/** Resolve a spec filename to its processed Astro image metadata. */
const shot = (file, alt) => {
  const src = img[`../assets/kkevents/${file}`];
  if (!src) throw new Error(`kkevents: missing asset ${file}`);
  return { src, alt };
};

export const kkevents = {
  eyebrow: "Client project",
  title: "K & K's Events: Marketing Site & Custom CMS",
  lead: "K & K's Events is an event styling team in Sta. Rosa, Laguna. I built their public website and the admin panel behind it, so the owner can publish events, moderate reviews, manage bookings, and edit every piece of site copy without touching code.",
  live: "https://www.kandkevents.online",
  // Frontend and backend repos are private — no links to give.

  // The walkthrough clip already on the featured card, promoted to full-bleed.
  // Stays in /public: Astro's image pipeline does not process video.
  hero: {
    video: "/kkevents_website_showcase.mp4",
    poster: "/kkevents_website_showcase.jpg",
    // The poster doubles as this page's social preview image. Files in
    // /public carry no build-time metadata, so its size is recorded here —
    // update both numbers if the poster is ever re-exported.
    posterWidth: 1280,
    posterHeight: 688,
    label: "Walkthrough of the K & K's Events public website",
  },

  why: {
    label: "Why I built it",
    body: "The owner's work changes constantly — new events most months, new photos, and client reviews sitting buried in Messenger and Viber threads. A hand-coded site would have meant emailing me every time a price changed. They needed to run the site themselves.",
  },

  goal: {
    label: "Project goal",
    body: "Give a non-technical owner full control of their own website, while keeping the public site fast and impossible to break from the admin side.",
  },

  overview: [
    { label: "Client", value: "K & K's Events" },
    { label: "Type", value: "Marketing site + custom CMS" },
    { label: "Role", value: "Solo full-stack" },
    { label: "Status", value: "Live in production" },
    { label: "Architecture", value: "Static-first hybrid" },
  ],

  whatItDoes: [
    "Public marketing site with a story page for every event",
    "Passwordless admin panel controlling all site content",
    "Contact form with lead pipeline and email alerts",
    "One-time review invite links with a moderation queue",
    "First-party, cookieless analytics dashboard",
  ],

  // Slide 1 of every carousel has to stand alone — most readers never swipe.
  screens: [
    {
      id: "public-site",
      name: "The public site",
      icon: "globe",
      images: [
        shot(
          "public-home.png",
          "Public homepage: photo collage hero, headline, trust stats, and main navigation",
        ),
        shot(
          "public-gallery2.png",
          "Public gallery index with events grouped by category",
        ),
        shot(
          "public-gallery.png",
          "Public gallery index sorted by newest first",
        ),
      ],
      summary: "The site visitors actually see.",
      bullets: [
        "Single scrolling page — hero, services, gallery, testimonials, about, FAQ, contact.",
        "A portfolio index of every celebration, sortable by date or grouped by category.",
        "Every section is editable from the admin panel, with no rebuild.",
      ],
    },
    {
      id: "event-page",
      name: "An event story page",
      icon: "book",
      images: [
        shot(
          "public-event1.png",
          "Event page hero with script title, breadcrumb, and theme chip",
        ),
        shot(
          "public-event2.png",
          "Event story write-up beside the colour palette with hex codes and event details",
        ),
        shot(
          "public-event3.png",
          "Event photo grid of nine photos and one video",
        ),
        shot(
          "public-event4.1.png",
          "Facebook post strip, contact call-to-action card, and More celebrations links",
        ),
      ],
      summary: "Every published event gets its own page.",
      bullets: [
        "Title, theme, and the write-up the owner entered in the admin.",
        "The colour palette pulled from the event's own photos, with hex codes.",
        "Event details, styling tags, the full photo and video gallery, and the Facebook post.",
        "The one route that renders per request — a new event is live the moment it's saved.",
      ],
    },
    {
      id: "login",
      name: "Login",
      icon: "key",
      images: [
        shot(
          "login.png",
          "Admin login screen asking only for an email address to send a sign-in code to",
        ),
      ],
      summary: "No passwords are stored anywhere.",
      bullets: [
        "Enter an email, get a 6-digit code, exchange it for a 7-day session.",
        "The flow never reveals whether an email address exists.",
      ],
    },
    {
      id: "dashboard",
      name: "Dashboard",
      icon: "gauge",
      images: [
        shot(
          "dashboard1.png",
          "Admin dashboard summarising unread inquiries, upcoming events, active leads, and pending reviews",
        ),
        shot(
          "dashboard2.png",
          "Dashboard spotlight picker and recent activity log of content changes",
        ),
      ],
      summary: "The landing screen summarises everything needing attention.",
      bullets: [
        "Unread inquiries, upcoming events, active leads, and pending reviews at a glance.",
        "Pin any upcoming event as the spotlight shown on the public homepage.",
        "Recent activity log of every content change.",
      ],
    },
    {
      id: "gallery-editor",
      name: "Gallery editor",
      icon: "images",
      images: [
        shot(
          "gallery1.png",
          "Gallery editor listing published events with thumbnails and status",
        ),
        shot(
          "gallery2.png",
          "Event detail form with title, theme, occasion, venue, guest count, and write-up fields",
        ),
        shot(
          "gallery3.png",
          "Media upload panel with reorderable photos and a thumbnail selector",
        ),
        shot(
          "gallery4.png",
          "Sidebar showing the live public link alongside Published and Featured toggles",
        ),
      ],
      summary:
        "Publish an event with its photos, story, and palette in one screen.",
      bullets: [
        "Add title, theme, occasion, venue, guest count, and the write-up shown on the page.",
        "Uploads stay locked until the required details are filled — and it names which ones.",
        "Reorder media, set the gallery thumbnail, and toggle Published / Featured.",
        "The public link is shown live in the sidebar and works the moment you save.",
      ],
    },
    {
      id: "palette-studio",
      name: "Palette Studio",
      icon: "palette",
      images: [
        shot(
          "pallet1.png",
          "Palette Studio extracting dominant colours from an uploaded event photo",
        ),
        shot(
          "pallet2.png",
          "Sampling an exact pixel colour by tapping a point on the photo",
        ),
        shot("pallet4.png", "The saved swatch set for the event, with hex values"),
        // Deliberate repeat: the payoff shot, far enough from the event-page
        // block above to read as a callback rather than a duplicate.
        shot(
          "public-event2.png",
          "The same palette live on the event's public page, beside the story write-up",
        ),
      ],
      summary: "Pull an event's colour story straight out of a photo.",
      bullets: [
        "Extracts the dominant colours from any uploaded event photo, in the browser.",
        "Tap anywhere on the photo to sample that exact pixel.",
        "Up to 10 swatches, saved to the event.",
        "Last slide is the result: the same palette live on that event's public page.",
      ],
    },
    {
      id: "reviews",
      name: "Reviews",
      icon: "star",
      images: [
        shot(
          "reviews3.png",
          "Review moderation queue with approve, hide, and edit controls on each testimonial",
        ),
        shot("reviews4.png", "Attaching an event photo to a published review"),
        shot(
          "review5_updated.png",
          "Generated one-time review invite link with a prefilled Viber message ready to paste",
        ),
        shot(
          "reviews6.png",
          "The client-facing review form where a rating and quote are submitted",
        ),
        // Closes the loop the bullets describe: invite link, form, submitted,
        // back into the moderation queue on the first slide.
        shot(
          "reviews7.png",
          "The reviewer's confirmation screen after submitting, saying the review will appear once approved",
        ),
      ],
      summary: "Client testimonials pass through moderation before going public.",
      bullets: [
        "Approve, hide, edit, or attach an event photo to any review.",
        "Generate a one-time invite link and a ready-to-paste Viber/Messenger message.",
        "The client opens it, leaves a rating and quote, and it lands in the queue.",
        "Links are single-use and expire.",
      ],
    },
    {
      id: "schedule",
      name: "Schedule",
      icon: "calendar",
      images: [
        shot(
          "schedule2.png",
          "Booking calendar with events colour-coded by status across the month",
        ),
        shot(
          "schedule1.png",
          "Schedule list view of confirmed bookings with their statuses",
        ),
        shot(
          "schedule3.png",
          "Double-booking warning shown when adding an event to a date that already has one",
        ),
      ],
      summary: "The booking calendar for confirmed events.",
      bullets: [
        "Colour-coded by status: Planning, Set-up, Inquiry, Done.",
        "Warns before you double-book a date that already has an event.",
        "Edit any booking inline, or block out unavailable dates.",
      ],
    },
    {
      id: "inquiries",
      name: "Inquiries",
      icon: "inbox",
      images: [
        shot(
          "inquiries2.png",
          "Inquiry detail with the lead's message, status pipeline, and reply templates",
        ),
      ],
      summary: "Leads from the contact form land here with a status pipeline.",
      bullets: [
        "Track each lead as New, Replied, Booked, Declined, or Archived.",
        "Reply with saved message templates, or push it straight onto the schedule.",
        "The owner gets an email the moment a new inquiry arrives.",
      ],
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: "chart",
      images: [
        shot(
          "analytics1.png",
          "Analytics overview with visitors and pageviews charted over time",
        ),
        shot(
          "analytics2.png",
          "Top pages, referrers, and visitor locations breakdown",
        ),
        shot(
          "analytics3.png",
          "Device split and business metrics including inquiries over time",
        ),
        shot(
          "analytic4.png",
          "Booking conversion and most-requested event types",
        ),
      ],
      summary: "A private, cookieless analytics dashboard built in-house.",
      bullets: [
        "Visitors, pageviews, top pages, referrers, locations, and device split.",
        "Business metrics: inquiries over time, booking conversion, most-requested event types.",
        "No cookies, no consent banner, no third-party tracker.",
        "Superadmin-only by default, with a server-enforced toggle to open it to other admins.",
      ],
    },
    {
      id: "services-faq",
      name: "Services & FAQ",
      icon: "list",
      images: [
        shot(
          "service1.png",
          "Services editor listing each package with its copy and photos",
        ),
        shot(
          "service2.png",
          "Editing what's included and the add-ons for a single service",
        ),
        shot(
          "faq1.png",
          "FAQ editor with drag-to-reorder questions and publish toggles",
        ),
      ],
      summary: "The offer and the answers, both editable.",
      bullets: [
        "Edit service copy, what's included, photos, and add-ons.",
        "Add, reorder, and unpublish FAQ questions with drag-to-reorder.",
        "The editor explains its own layout — it tells you a service with no photos renders as a full-width text row on purpose, not as a gap.",
      ],
    },
    {
      id: "showcase",
      name: "Showcase",
      icon: "film",
      images: [
        shot(
          "showcase1.png",
          "Showcase editor curating the photo set and heading for the public carousel",
        ),
        shot(
          "showcase3.png",
          "Live resizable preview of the showcase component at a narrower breakpoint",
        ),
        shot(
          "showcase4.png",
          "The same showcase preview at desktop and wide breakpoints",
        ),
      ],
      summary: "The photo carousel at the bottom of the public site.",
      bullets: [
        "Curate the photo set and the heading visitors see.",
        "A live, resizable preview of the real component at mobile, tablet, desktop, and wide.",
        "Every change saves automatically.",
      ],
    },
    {
      id: "settings",
      name: "Settings",
      icon: "sliders",
      images: [
        shot(
          "settings1.png",
          "Settings screen for business name, tagline, cities served, logo, and contact channels",
        ),
        shot(
          "settings2.png",
          "Settings for notifications, team members and roles, and database backup",
        ),
      ],
      summary: "Business info, team, and disaster recovery.",
      bullets: [
        "Edit business name, tagline, cities served, logo, and contact channels.",
        "Invite teammates, assign roles, and disable access instantly.",
        "Download a full JSON snapshot of every table.",
      ],
    },
    {
      id: "phone",
      name: "Same build, on a phone",
      icon: "phone",
      // Tall portrait shots (1284x2778) — laid out in a row, not a carousel,
      // and never cropped into fake device frames. The iOS status bar and
      // Safari URL bar are the point: this really is a phone browser.
      phone: true,
      images: [
        shot(
          "phone_dashboard.png",
          "The admin dashboard in a mobile browser, iOS status bar and Safari address bar visible",
        ),
        shot("phone_gallery.png", "The gallery editor running in a mobile browser"),
        shot(
          "phone_analytics.png",
          "The analytics dashboard running in a mobile browser",
        ),
      ],
      summary: "The owner runs the whole thing from her phone browser.",
      bullets: [],
    },
  ],

  // SECURITY: the cards below name the defenses and stop there. Do not add,
  // now or later, any number attached to one — thresholds, windows, expiries,
  // attempt counts, infrastructure specifics — or the behaviour of any check
  // when it cannot complete. Naming a defense deters; naming what gets past it
  // does not, and this repository is public, so this comment is published too.
  // (The original brief enumerated the specifics; that enumeration is kept out
  // of version control for the same reason.)
  underTheHood: [
    {
      title: "The site can't be taken down by its own backend.",
      body: "Every public section renders twice from one source — once at build time into static HTML, then again in the browser, patching the page only if the data actually changed. The owner edits a price and visitors see it without a rebuild. If the API is cold or down, the fetch quietly fails and visitors keep the build-time content. They never see a broken page.",
    },
    {
      title: "A new event is live the second it's published.",
      body: "Prerendering everything meant a freshly published event would 404 while the rebuild ran. One route renders per request instead. That cost latency — the API is in Oregon, the database in Singapore, so the naive version put every visit around 2s against the 0.78s a static CDN file managed. Caching the response at the edge fixed it: the first visitor after a change pays the round trip, everyone else is served at static speed. Measured after shipping: ~0.86s warm, confirmed cache hit.",
    },
    {
      title: "No passwords are stored anywhere.",
      body: "A 6-digit code is emailed, verified server-side, and exchanged for a 7-day token. A superadmin can invite teammates and revoke any active session instantly by bumping a token version the server checks on every request. Around it: rate limits on the contact form and login, a bot check in front of the contact form, and a Content-Security-Policy minted per request with a nonce — so the site's inline scripts run without unsafe-inline in the policy.",
    },
  ],

  stack: {
    chips: [
      "Astro 7",
      "React 18",
      "TypeScript",
      "Express 5",
      "PostgreSQL",
      "Prisma 7",
      "Cloudinary",
      "Resend",
      "Playwright",
      "Vercel",
      "Render",
    ],
    body: "The public site is prerendered to static files and refreshes its content in the browser, so it stays online even if the API is down. Login is passwordless. Media uploads go straight from the browser to Cloudinary and never pass through the API server. The analytics charts are hand-drawn SVG — no charting library, no UI kit anywhere in the project.",
    // The two scale numbers sit together on purpose — this much interface,
    // this much data behind it — and the restore drill lands last because
    // almost nobody tests theirs, so saying it plainly is the line that stays
    // with a reader.
    //
    // Not here, deliberately: "zero UI dependencies" repeats `body` above,
    // which already ends "no charting library, no UI kit anywhere in the
    // project". And the backups were described as weekly; the cadence is the
    // one part of this row that says anything about a recovery window, and it
    // was carrying no persuasive weight — "actually run" is what does that.
    facts: [
      "~40 hand-built components",
      "14 database models",
      "automated database backups, with a restore drill that was actually run",
    ],
  },

  // Published by the client on their own homepage — safe to quote.
  clientStats: [
    { value: "50+", label: "events styled" },
    { value: "5.0", label: "average review" },
    { value: "4 years", label: "styling" },
  ],

  // A one-sentence quote from the owner would be worth more than any metric on
  // this page. There isn't one yet; do not invent it. Fill and render when it
  // arrives:
  // ownerQuote: { text: "", attribution: "" },

  cta: {
    title: "Need something similar?",
    body: "This was built for a real business that needed to run its own site. If you want a marketing site with a CMS your team can actually operate — or want to talk through a custom build — reach out.",
  },
};
