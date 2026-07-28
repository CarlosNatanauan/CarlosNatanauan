// src/data/certifications.js
//
// TODO (Carlos): fill this in — the Certifications section renders a visible
// "still to do" note on the site until this array has at least one entry.

/**
 * @typedef {{ date: string, name: string, issuer: string, image?: string, url?: string }} Certification
 */

/** @type {Certification[]} */
export const certifications = [
  // {
  //   date: "Mar 2024",
  //   name: "Certification name",
  //   issuer: "Issuing organization",
  //   image: "/certs/your-cert.png", // optional, shown as a 120x80 thumbnail
  //   url: "https://credential-link",  // optional
  // },
];

// TODO (Carlos): where should "View All →" point? A credentials page,
// LinkedIn certifications tab, or a Drive folder. Empty = link hidden.
export const certificationsUrl = "";
