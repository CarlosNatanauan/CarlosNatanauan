// src/data/profile.js
export const profile = {
  // Short name shown in the hero, full name in the footer
  name: "Carlos Natanauan",
  fullName: "Carlos Benedict Natanauan",
  siteName: "Kuya Carlos",
  verified: true,
  location: "Silang, Cavite, Philippines",

  // Hero portrait — same photo in both themes
  avatar: "/profiles/carlos_natanauan.png",

  // Easter egg: flashes over the portrait when the theme switches to light,
  // then fades back. Set to "" to turn it off.
  avatarAlt: "/thorfinn.jpg",
  avatarAltHoldMs: 5000,

  // Headline: "Software Developer — Mobile & Web"
  headline: "Software Developer",
  headlineMuted: "— Mobile & Web",

  // Bio rendered as segments so tech names appear as inline pill tags.
  // Client apps are described by category, not name — same framing as the
  // Experience section, since those products aren't mine to publicise.
  bio: [
    { text: "I'm a software developer building production mobile apps with " },
    { tag: "Flutter", icon: "flutter" },
    {
      text: " — three live on the App Store and Play Store, and I maintain them full-time: a social cinema platform, a restaurant reservation app, and a field operations tool that replaced paper forms. Lately I've gone full-stack on the web with ",
    },
    { tag: "Astro", icon: "astro" },
    { text: " and " },
    { tag: "Express", icon: "express" },
    {
      text: ", shipping a marketing site and custom CMS that a real business now runs on.",
    },
  ],

  // Used by the GitHub contribution graph
  githubUsername: "CarlosNatanauan",

  links: {
    github: "https://github.com/CarlosNatanauan",
    linkedin: "https://www.linkedin.com/in/carlosnatanauan/",
    email: "mailto:carlosbenedictn@gmail.com?subject=Hello%20Carlos",
  },
};
