// src/data/outside.js — the "Outside the IDE" section

/** @typedef {{ src: string, alt: string }} Photo */

export const outside = {
  heading: "Outside the IDE",
  text: "I run. It's how I clear my head.",
  strava: "https://strava.app.link/kyZJ1H9d84b",

  // Order is front-to-back: the first one is the card on top of the stack.
  // Square 560px crops (2x the 220px display size) — see /public/outside/.
  /** @type {Photo[]} */
  photos: [
    { src: "/outside/run3.jpg", alt: "Out on a run" },
    { src: "/outside/run2.jpg", alt: "Kitted up before a run" },
    { src: "/outside/run1.jpg", alt: "Night run" },
  ],
};
