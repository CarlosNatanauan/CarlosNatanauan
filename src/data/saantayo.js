// src/data/saantayo.js — content for the /saantayo case study page
//
// Every number here comes from the project's fact pack (case-study-brief.md,
// gathered 2026-10-06 from the decision log and reports; kept outside this
// repo). Fix a typo if you spot one, but do not add a metric, date or technical
// claim that is not in that brief.
//
// Three rules carried over from it:
//   1. No link to the code. The repo is private — link to the live site, its
//      /how-it-works page and its /credits page only.
//   2. The figures in `agreement` are agreement with an AI-assisted reference
//      set. Never call them "accuracy" on their own.
//   3. Screenshots that show a photo keep its credit visible, or carry one in
//      a caption: those photos are other people's work.
//
// Images are imported from src/assets/saantayo/ so Astro converts them to WebP
// and generates a srcset — see KeyScreenCard.astro.

/** @typedef {{ src: ImageMetadata, alt: string }} Shot */

const img = /** @type {Record<string, ImageMetadata>} */ (
  import.meta.glob("../assets/saantayo/*.png", {
    eager: true,
    import: "default",
  })
);

// The SVGs are served as-is: they are already small, and rasterising a flat
// illustration would only make it bigger and blurrier.
const svg = /** @type {Record<string, string>} */ (
  import.meta.glob("../assets/saantayo/*.svg", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

/** Resolve a filename to its processed Astro image metadata. */
const shot = (file, alt) => {
  const src = img[`../assets/saantayo/${file}`];
  if (!src) throw new Error(`saantayo: missing asset ${file}`);
  return { src, alt };
};

const svgUrl = (file) => {
  const src = svg[`../assets/saantayo/${file}`];
  if (!src) throw new Error(`saantayo: missing asset ${file}`);
  return src;
};

const LIVE = "https://saantayo.vercel.app";

export const saantayo = {
  eyebrow: "Personal project",
  title: "Saan Tayo? Every Philippine town, sorted by vibe",
  lead: "Saan Tayo? (“Where are we going?”) is an interactive map of all 1,642 cities and municipalities in the Philippines. Pick what you want from 13 vibes and every town that fits lights up, including the ones you have never heard of.",
  live: LIVE,
  howItWorksUrl: `${LIVE}/how-it-works`,
  creditsUrl: `${LIVE}/credits`,
  // The repo is private — no link to give.

  // Stays in /public: Astro's image pipeline does not process video.
  hero: {
    video: "/saantayo_walkthrough.mp4",
    poster: "/saantayo_walkthrough.jpg",
    // Files in /public carry no build-time metadata, so the size is recorded
    // here — update both numbers if the clip is ever re-recorded.
    posterWidth: 1280,
    posterHeight: 720,
    // Playback speed. The recording holds each state for a second or more,
    // which reads as slow on a loop. 1 is the recorded speed.
    rate: 1.25,
    label: "Walkthrough of the Saan Tayo? map: picking vibes, opening a town card, and pressing Tara!",
    // The ink dot in the clip is drawn in for the recording; it is not part
    // of the site. The photo is someone else's work.
    caption:
      "A recording of the live build. The ink dot marks each click and is not part of the site. Photo on the town card: Surigao, derivative work MagentaGreen, CC BY-SA 4.0, via Wikimedia Commons.",
  },

  // The site's own link-preview image, used as this page's social preview.
  og: { image: "/saantayo_og.png", width: 1200, height: 630 },

  stats: [
    { value: "1,642", label: "towns, every one on the official list" },
    { value: "13", label: "vibes to filter by" },
    { value: "~US$0.51", label: "of AI calls for the whole country" },
    { value: "214", label: "commits, 30 Sep to 6 Oct 2026" },
  ],

  why: {
    label: "The problem",
    body: "Travel maps of the Philippines are hand-picked. They show the same few dozen famous places, and none of them covers every town or lets you combine wishes like “beach, heritage, and not touristy”. There are 1,642 cities and municipalities, and most people can name only a small share of them.",
  },

  goal: {
    label: "The idea",
    body: "A quiet town in Aurora should have the same chance of being found as Boracay. So: every town from the official list, filters you can combine, and a site that says so when it doesn't know enough about a place.",
  },

  overview: [
    { label: "Type", value: "Interactive map + data pipeline" },
    { label: "My role", value: "Planning, review, every decision" },
    { label: "Status", value: "Live" },
    { label: "Architecture", value: "Static site, no backend" },
  ],

  // Carlos's own reason for the project. What the test showed is stated only
  // as far as the brief's numbers go — no verdict on the model beyond them.
  whyJev:
    "The project started as a way to test Jev, a small decision model by TypeSafe, on something real. Tagging every town in the country was the test: 1,642 towns, 15 questions each (a yes-or-no question for each of the 13 vibes, plus “how well known is it?” and “does the text say enough?”), with a reference set to check the answers against. It did the whole country for about US$0.51, and 12 of the 13 vibes met my 85% bar. Its own “is there enough text?” answer turned out too strict, so plain code makes that call instead.",

  // Said once, plainly, near the top — so nothing below reads as hand-written
  // when it was not.
  howItWasMade:
    "I planned it, reviewed it and made the decisions. AI coding assistants (Claude Code, and Codex for some phases) wrote most of the code. A small model called Jev judged the tags. The illustrations were drawn as SVG code with AI assistance, then reviewed and edited.",

  whatItDoes: [
    "Filter by any mix of 13 vibes, how touristy a town is, and distance from Manila, Cebu or Davao",
    "Tara! picks a random hidden gem that fits your filters",
    "Search by town, province or place: “Boracay” finds Malay",
    "A page for each of the 1,642 towns, with the sentences behind its tags",
    "The method, the agreement table and its weak spots, published on the site",
    "Credits for every source, article revision and photographer",
  ],

  // ── How it works ────────────────────────────────────────────
  pipeline: {
    rule: "The model judges, the code decides.",
    ruleBody:
      "The model only answers questions. Thresholds, rules, counts and distances live in code, the same for every town. When a rule was wrong, it could be changed without paying for the model again.",
    stages: [
      {
        name: "Sources",
        title: "Open data, joined by official code",
        points: [
          "The Philippine Statistics Authority's list: 1,642 cities and municipalities, each with a PSGC code.",
          "Wikipedia and Wikivoyage text, Wikidata, OpenStreetMap, and photo captions from Wikimedia Commons.",
          "Never joined by name: 329 towns share theirs with another, and there are nine San Joses.",
        ],
      },
      {
        name: "Prepare",
        title: "One town, one trimmed text",
        points: [
          "2,955 articles and guides, with the exact revisions kept for the credits.",
          "Only the travel-relevant parts are kept: about 3,200 tokens per town on average.",
          "Every request is cached, so nothing is fetched twice.",
        ],
      },
      {
        name: "Judge",
        title: "One yes-or-no question per vibe",
        points: [
          "Jev, a decision model by TypeSafe, reads the text and answers 15 questions per town: one for each of the 13 vibes, plus “how well known is it?” (1 to 5, shown as “How touristy”) and “does the text say enough?”.",
          "It returns how likely “yes” is. Example: “Does the town have a beach that visitors go to?”",
          "A budget cap in code, and every answer cached: nothing is paid for twice.",
        ],
      },
      {
        name: "Decide",
        title: "The same rules for every town",
        points: [
          "Yes from 75% confidence, maybe from 50%.",
          "“Not enough info” when the text about the town itself is under 250 tokens.",
          "No sea vibes inland. Map facts are shown as context and never set a tag.",
        ],
      },
      {
        name: "Site",
        title: "Static files, no server",
        points: [
          "The pipeline exports JSON; Astro builds the map home and a page per town.",
          "MapLibre GL draws the map from the site's own borders.",
          "Hosted on Vercel's free plan. Visitors cost nothing.",
        ],
      },
    ],
  },

  // Slide 1 of every carousel has to stand alone — most readers never swipe.
  screens: [
    {
      id: "the-map",
      name: "The map",
      icon: "map",
      aspect: "screen",
      images: [
        shot(
          "desktop-05-vibe-beach.png",
          "The map with Beach selected: matching towns filled in cobalt across the country, with the legend and a count of 352 towns",
        ),
        shot(
          "desktop-06-filters-combined.png",
          "Beach and Heritage, hidden gems only, within 300 km of Manila: a dashed ring around a red origin pin",
        ),
        shot(
          "desktop-02-home.png",
          "The map with no filter: the filter panel on the left and all 1,642 towns outlined",
        ),
      ],
      summary: "Pick a vibe and every town that fits lights up.",
      bullets: [
        "Cobalt for a strong match, light cobalt for a good one.",
        "Patterns, not only colour: dots mean “maybe” and hatching means “not enough info”, so the map still reads in greyscale.",
        "Distance is a straight line from Manila, Cebu or Davao, drawn as a dashed ring and labelled “as the crow flies”.",
        "Every filter state is in the URL, so any view can be shared as a link.",
      ],
    },
    {
      id: "search",
      name: "Search and the town card",
      icon: "search",
      aspect: "screen",
      images: [
        shot(
          "desktop-04-search-result.png",
          "Searching “Boracay” lands on Malay, Aklan, with its town card open. Photo: Tuderna, CC BY 3.0",
        ),
        shot(
          "desktop-07-town-card.png",
          "Taal's town card with Heritage selected: photo, match strength, vibes and distance. Photo: Ralff Nestor Nacor, CC BY-SA 4.0",
        ),
      ],
      summary: "Search by town, province or place.",
      bullets: [
        "269 place names find the town they belong to: “Boracay” finds Malay.",
        "The card shows the photo with its credit, the match strength, the top vibes and the distance.",
        "A click keeps your view and only nudges the map when the town is at the edge or under the card.",
      ],
    },
    {
      id: "tara",
      name: "Tara! and the list",
      icon: "shuffle",
      aspect: "screen",
      images: [
        shot(
          "desktop-08-tara-hidden-gem.png",
          "After pressing Tara! with Waterfalls selected: a random hidden gem, San Jose in Northern Samar, shown with an illustration",
        ),
        shot(
          "desktop-09-list.png",
          "The text list of 25 towns matching Beach and Surfing, open beside the map",
        ),
      ],
      summary: "Tara! (“Let's go!”) takes you to a random hidden gem that fits your filters.",
      bullets: [
        "A hidden gem is a town at the low end of “how touristy”.",
        "The same results are available as a text list, which is also the text alternative to the map.",
        "“Back to previous view” returns you to exactly where you were.",
      ],
    },
    {
      id: "town-page",
      name: "A page per town",
      icon: "book",
      aspect: "screen",
      images: [
        shot(
          "desktop-10-town-page.png",
          "Taal's town page: photo, name, a bar for each vibe, a locator map and distances. Photo: Ralff Nestor Nacor, CC BY-SA 4.0",
        ),
        shot(
          "desktop-12-town-page-why-these-tags.png",
          "“Why these tags” on Taal's page: sentences quoted from Wikipedia and Wikivoyage for Heritage, Festivals and Food",
        ),
      ],
      summary: "All 1,642 towns get their own page.",
      bullets: [
        "A bar per vibe with a strength word: Strong, Good or Maybe.",
        "“Why these tags” quotes up to two sentences per vibe from the town's sources, and says they are not necessarily the ones the model relied on.",
        "How touristy it is, map facts, distances, nearby places, similar towns and its sources.",
        "Headings are Filipino first, English under: “Ano'ng meron? / What's here”.",
      ],
    },
    {
      id: "honest",
      name: "When it doesn't know",
      icon: "help",
      aspect: "screen",
      images: [
        shot(
          "desktop-14-town-page-not-enough-info.png",
          "Carasi's town page: an illustration labelled as one, and a box saying not much has been written about Carasi yet",
        ),
        shot(
          "desktop-13-town-page-illustration.png",
          "Adams's town page: a mountain illustration labelled “Illustration, not a photo of Adams”",
        ),
      ],
      summary: "It says so, instead of guessing.",
      bullets: [
        "347 towns (21%) have too little written about them and are marked “not enough info”.",
        "1,048 towns have a credited photo. The other 594 get an illustration, always labelled as one.",
        "For a thin-text town only a clear “yes” is shown, never a “no”.",
      ],
    },
    {
      id: "method",
      name: "The method, published",
      icon: "chart",
      aspect: "screen",
      images: [
        shot(
          "desktop-16-how-it-works-accuracy.png",
          "The agreement table on the site's How it works page, one row per vibe",
        ),
        shot(
          "desktop-15-how-it-works.png",
          "The top of the How it works page: what's on the map and how a town gets its tags",
        ),
        shot(
          "desktop-17-credits.png",
          "The credits page: licences and a card for each data source",
        ),
      ],
      summary: "How the tags were made, how well they hold up, and what it cost.",
      bullets: [
        "All 15 questions the model was asked are printed on the page.",
        "The agreement table and its weak spots are there too, not only the good rows.",
        "Credits cover every source, licence, article revision and photographer, split into 18 region pages.",
      ],
    },
    {
      id: "phone",
      name: "On a phone",
      icon: "phone",
      phone: true,
      images: [
        shot(
          "mobile-05-vibe-beach.png",
          "The map on a phone with Beach selected in the vibe row, and a one-line legend",
        ),
        shot(
          "mobile-07-filter-sheet.png",
          "The phone filter sheet as it opens, with all 13 vibes visible",
        ),
        shot(
          "mobile-09-town-card-compact.png",
          "Taal's compact town card on a phone, taking about a third of the screen. Photo: Ralff Nestor Nacor, CC BY-SA 4.0",
        ),
      ],
      summary:
        "The vibes sit in a sideways row under the search box, and the town card opens at a third of the screen so the map stays in view.",
      bullets: [],
    },
  ],

  // ── Agreement with the reference set ────────────────────────
  // "agrees" = when the site says yes, the reference set says yes too.
  // "catches" = of the towns the reference set says yes for, how many the
  // site shows. Do not relabel either one as "accuracy".
  agreement: {
    intro:
      "I checked the tags against a reference set of 150 towns. Its labels were made with the help of a separate AI assistant using web search, plus my own knowledge of some towns, without looking at the model's answers. So these figures are agreement with that reference set, not verified ground truth.",
    rows: [
      { vibe: "Beach", agrees: "94.1%", agreesOf: "32 of 34", catches: "63%", catchesOf: "32 of 51" },
      { vibe: "Island hopping", agrees: "100%", agreesOf: "11 of 11", catches: "50%", catchesOf: "11 of 22" },
      { vibe: "Diving", agrees: "100%", agreesOf: "13 of 13", catches: "50%", catchesOf: "13 of 26" },
      { vibe: "Surfing", agrees: "100%", agreesOf: "6 of 6", catches: "55%", catchesOf: "6 of 11" },
      { vibe: "Mountains", agrees: "87.5%", agreesOf: "35 of 40", catches: "81%", catchesOf: "35 of 43" },
      { vibe: "Waterfalls", agrees: "100%", agreesOf: "22 of 22", catches: "55%", catchesOf: "22 of 40" },
      { vibe: "Caves", agrees: "100%", agreesOf: "7 of 7", catches: "41%", catchesOf: "7 of 17" },
      { vibe: "Hot springs", agrees: "86.7%", agreesOf: "13 of 15", catches: "65%", catchesOf: "13 of 20" },
      { vibe: "Heritage", agrees: "97.8%", agreesOf: "44 of 45", catches: "90%", catchesOf: "44 of 49" },
      { vibe: "Festivals", agrees: "100%", agreesOf: "35 of 35", catches: "44%", catchesOf: "35 of 79" },
      { vibe: "Food", agrees: "93.8%", agreesOf: "15 of 16", catches: "50%", catchesOf: "15 of 30" },
      { vibe: "Cool climate", agrees: "80.0%", agreesOf: "4 of 5", catches: "33%", catchesOf: "4 of 12", under: true },
      { vibe: "Countryside", agrees: "100%", agreesOf: "4 of 4", catches: "27%", catchesOf: "4 of 15" },
    ],
    notes: [
      "The bar I set is 85% agreement when the site says yes. Catching every town matters less: a missed town is only hidden from one filter, but a wrong tag sends someone somewhere for the wrong reason.",
      "Twelve of the 13 vibes are at or over the bar. Cool climate is under it (4 of 5) and is shown anyway, with a note on the site.",
      "Countryside's 100% rests on 4 towns. Whether it stays is to be reviewed.",
    ],
  },

  // ── Hard problems ───────────────────────────────────────────
  problems: [
    {
      title: "Six sources that disagree with each other.",
      body: "The official town list, Wikipedia, Wikivoyage, Wikidata, OpenStreetMap and Wikimedia Commons all had to line up. The official list uses an old region prefix for 55 towns that Wikidata lists under the new one; one code rule matched all 55. For 38 small towns the travel-guide link quietly redirected to the page of the whole province, which would have credited a province's sights to one town, so a page is now used only when its ID is the town's own. And OpenStreetMap's borders for coastal cities include their municipal waters, in one case about 89% sea, so they are clipped to the land.",
    },
    {
      title: "The missing beaches.",
      body: "587 of 899 coastal towns had no Beach tag, in a country of islands. The cause was not the model: in 98% of those towns the word “beach” appears nowhere in the article text. I tried the map first, but no rule like “OpenStreetMap shows a beach here” reached the 85% bar (the best was 83.3%), so the map stays context only. What worked was a different source of text: the titles and descriptions of each coastal town's photos on Wikimedia Commons, because many beaches are photographed but never written about. Those titles and descriptions are used as text to judge Beach; showing the photos themselves as evidence on town pages was switched off (see “Tried and dropped”).Two gates had to pass before I used it. Coastal towns tagged Beach went from 253 to 348, for about 7 US cents.",
    },
    {
      title: "Deciding when to say “not enough info”.",
      body: "The model has its own answer to “does the text say enough?”. I compared it with a plain rule on text length, on the first 70-town reference set. The model's answer agreed with the reference on 59 of 70 towns and would have marked about 52% of the country. The length rule agreed on 68 of 70 and marks 21%. The site uses the length rule.",
    },
    {
      title: "A map that dropped whole islands on small phones.",
      body: "On a short phone the whole-country view fell below zoom level 4, and the map dropped Samar, Leyte, Cebu, Bohol and Mindoro. It was found by testing at 360 × 600 and fixed by one simplification setting. The same round fixed the filter sheet, which showed none of the 13 vibes when it opened on a 360 × 640 phone and needed 555 px of scrolling; now all 13 show and it needs 181 px. One idea was measured and dropped: starting the biggest download earlier gained 1.1 s on the map and cost 1.9 s on the controls.",
    },
  ],

  dropped: [
    "“City life”: one mall was enough for a yes, and only 5 of its 15 yes tags agreed with the reference.",
    "Tags from the map: no rule passed the bar.",
    "The model's own “enough info” answer: too strict.",
    "Other-language Wikipedias: mostly short automatic stubs.",
    "Evidence photos: built, then switched off. Once the images were opened, half the doubtful picks that looked fine by title were wrong.",
  ],

  // ── Design ──────────────────────────────────────────────────
  design: {
    why: "The first version worked, and it looked like everyone else's: a cream background, a book serif for the name, teal for the data and rounded pills for everything. Two other Philippine map sites I looked at had landed on almost the same look. So I rebuilt it around a few rules, and wrote them into the project so every later change follows them.",
    rules: [
      "Each colour has one job. Cobalt is data, yellow is what you picked, red is the one action.",
      "One type family, Archivo, with a heavy condensed cut for town names, and IBM Plex Mono for distances and percentages.",
      "Square shapes, ink borders and no soft shadows.",
      "Only the sea and major roads come from the basemap. The land, coast and town names come from the site's own data, so no other country is labelled.",
    ],
    pairs: [
      {
        label: "The map home",
        before: shot(
          "before-01.png",
          "Before the redesign: a cream panel, teal data and rounded pills, with other countries labelled on the map",
        ),
        after: shot(
          "after-01.png",
          "After: white and ink, cobalt data, only the Philippines drawn, and a dashed ring for the distance filter",
        ),
      },
      {
        label: "A town page",
        before: shot(
          "before-03.png",
          "Before: Taal's page with a rounded photo and teal pills. Photo: Ralff Nestor Nacor, CC BY-SA 4.0",
        ),
        after: shot(
          "desktop-10-town-page.png",
          "After: the name set large beside the photo, with a bar for each vibe. Photo: Ralff Nestor Nacor, CC BY-SA 4.0",
        ),
      },
      {
        label: "The share image",
        before: shot(
          "before-07.png",
          "Before: Taal's link-preview image in cream with a serif name",
        ),
        after: shot(
          "share-01-taal.png",
          "After: Taal's link-preview image in white and ink with the new wordmark",
        ),
      },
      {
        label: "On a phone",
        phone: true,
        before: shot(
          "before-05.png",
          "Before: the phone map home with Beach selected, in the cream and teal look",
        ),
        after: shot(
          "after-05.png",
          "After: the phone map home with Beach selected, in white, ink and cobalt",
        ),
      },
    ],
    pairNote:
      "Some counts differ between a before and its after because the data changed too, not only the look.",
    palette: [
      { name: "Ground", hex: "#FFFFFF", job: "Cards, panels, land on the map" },
      { name: "Page", hex: "#EEF0F3", job: "Page background, loading boxes" },
      { name: "Ink", hex: "#15171C", job: "Text, borders, coastline" },
      { name: "Rules", hex: "#D5D9E1", job: "Hairlines" },
      { name: "Sea", hex: "#D3DEEF", job: "Map sea, illustration sky" },
      { name: "Cobalt", hex: "#1E3FB4", job: "Data: strong match" },
      { name: "Cobalt 2", hex: "#7A93DE", job: "Data: good match" },
      { name: "Yellow", hex: "#FFC629", job: "What you picked" },
      { name: "Red", hex: "#D3261C", job: "The one action, Tara!" },
    ],
    logo: {
      src: svgUrl("saan-tayo-wordmark.svg"),
      width: 405,
      height: 93,
      alt: "The Saan Tayo? wordmark: heavy condensed letters, with a red map pin as the dot of the question mark",
      body: "The wordmark is set in Archivo's heaviest condensed cut. The dot of the “?” is a red map pin, and the “?” with its pin is the mark on its own. The name is what you ask before you get on a jeepney.",
    },
    illustrations: {
      body: "17 flat SVG scenes stand in for the 594 towns with no photo, and for share images. They use the palette's colours only, with red once per scene, and take their texture from the same hatching and dots as the map. On the site each one is labelled “Illustration, not a photo”.",
      // Exactly as on the site — do not reword.
      credit:
        "Illustrations: drawn for this project as SVG code with AI assistance (Claude), then reviewed and edited. CC BY 4.0.",
      items: [
        { src: svgUrl("beach.svg"), alt: "Beach illustration: a palm tree, a red umbrella and the sea" },
        { src: svgUrl("rice-terraces.svg"), alt: "Rice terraces illustration: stepped cobalt bands with a small hut" },
        { src: svgUrl("festivals.svg"), alt: "Festivals illustration: bunting across a street and a smiling mask" },
        { src: svgUrl("waterfalls.svg"), alt: "Waterfalls illustration: a white fall between two cobalt cliffs" },
      ],
    },
    share: {
      body: "Every town also gets its own link-preview image, made when the site is built.",
      items: [
        shot(
          "share-01-taal.png",
          "Link-preview image for Taal: the town name, its province and its top three vibes beside a heritage illustration",
        ),
        shot(
          "share-02-adams-illustration.png",
          "Link-preview image for Adams: the town name, its province and its vibes beside a mountain illustration",
        ),
      ],
    },
  },

  // ── How I worked ────────────────────────────────────────────
  process: [
    {
      title: "Everything was written down.",
      body: "Every decision is logged with its reason and what it replaced; the log runs to D-223. Each piece of work had a plan I approved, checkpoints where I looked at screenshots before anything went further, and a report at the end. The numbers on this page come from those reports.",
    },
    {
      title: "The calls that mattered were mine.",
      body: "I set the rule that a tag must agree at least 85% of the time when it says yes, and kept it even though it means Festivals and Food miss about half the towns, because a wrong tag is worse than a missing one. When I saw that my first version looked almost the same as two other Philippine map sites, I pushed for a full redesign. And when clicking a town zoomed the map in and lost my place, I asked for the map to stay still and move only when it has to.",
    },
  ],

  limits: [
    "Tags reflect what is written, not what is there. An unwritten-about waterfall will not show.",
    "The reference set is AI-assisted, not hand-verified, and covers 150 of 1,642 towns.",
    "21% of towns (347) have too little text to judge.",
    "Several vibes catch fewer than half the reference towns: Festivals 44%, Caves 41%, Cool climate 33%, Countryside 27%.",
    "Map facts come from OpenStreetMap and can be off. Distances are straight lines.",
    "8 towns appear as dots, because no border shape exists for them yet.",
    "The map home is the slowest page: 91 to 92 on Lighthouse's mobile test of the live site, held down by the map itself (it takes about 5 s to fill in).",
    "Not tested: Safari, and a full screen-reader pass beyond the TalkBack checks I did myself.",
  ],

  next: [
    "A lighter borders file for the first view, to cut the wait on slow connections.",
    "“Report a wrong tag” on every town page.",
    "Evidence photos, with a better check.",
    "A decision on whether Countryside stays.",
    "A custom domain.",
  ],

  stack: {
    // Jev leads: testing it is why the project exists.
    chips: [
      "TypeSafe Jev",
      "Astro 7",
      "Tailwind CSS 4",
      "TypeScript",
      "MapLibre GL 6",
      "Bun",
      "DuckDB",
      "SQLite",
      "mapshaper",
      "Satori",
      "Vercel",
    ],
    body: "Jev, pinned to version 1.13.0 and called with plain fetch rather than an SDK, answers the questions; at US$0.042 per million input tokens, that is what kept the whole run near fifty cents. The data pipeline is Bun and TypeScript: each step is its own script that reads the previous step's output, so any step can be rerun alone. DuckDB reads the official Excel file directly, and SQLite caches every network request and every model answer. The site is static Astro pages reading JSON the pipeline exports, with MapLibre GL drawing the map on OpenFreeMap tiles. There is no backend and no database.",
    facts: [
      "1,642 town pages, built statically",
      "53 unit tests for the site's helpers",
      "a budget cap on AI calls, enforced in code",
    ],
  },

  licences: [
    "Text: Wikipedia and Wikivoyage (CC BY-SA 4.0).",
    "Map data: © OpenStreetMap contributors (ODbL). Basemap tiles: OpenFreeMap, © OpenMapTiles.",
    "Photos: Wikimedia Commons, each under its own licence, credited per photographer.",
    "Town list: Philippine Statistics Authority. Borders: faeldon/philippines-json-maps (MIT), plus OpenStreetMap.",
    "Town data: Wikidata (CC0). Airports: OurAirports (public domain).",
    "Illustrations: CC BY 4.0.",
  ],

  cta: {
    title: "Want to build something like this?",
    body: "If you have a messy pile of data that should be a product people can explore, or you want to talk through how this one was put together, reach out.",
  },
};
