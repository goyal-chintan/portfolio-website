// src/config/site.config.ts

export const siteConfig = {
  // ============================================
  // PERSONAL INFO (Edit these!)
  // ============================================
  name: "Chintan Goyal",
  title: "Senior Data & Platform Engineer",
  company: "Plume Design Inc",
  location: "Hyderabad, India",

  tagline: "Building data platforms at scale. Architecting the future.",

  bio: `Deep thinker. Systems builder. I design and scale data platforms
        that power real-time decisions for millions of devices.`,

  // Rotating roles in hero
  roles: [
    "Data Engineer",
    "Platform Architect",
    "Systems Thinker",
    "Future CTO",
  ],

  // Status badge
  availability: {
    status: "open", // "open" | "busy" | "not-looking"
    message: "Open to opportunities",
  },

  // ============================================
  // SOCIAL LINKS (Leave empty string to hide)
  // ============================================
  social: {
    github: "https://github.com/chintangoyal",
    linkedin: "https://linkedin.com/in/chintangoyal",
    twitter: "https://twitter.com/chintangoyal",
    email: "chintan@example.com",
    calendar: "", // Calendly/Cal.com link (optional)
    website: "", // Other website (optional)
  },

  // ============================================
  // DOCUMENTS (paths relative to /public)
  // ============================================
  documents: {
    resume: "/resume",            // Set to "" if not available
    cv: "",                       // Full CV (optional)
    portfolio: "",                // PDF portfolio (optional)
  },

  // ============================================
  // SEO & META
  // ============================================
  seo: {
    title: "Chintan Goyal | Senior Data & Platform Engineer",
    description: "Staff-level Data & Platform Engineer building scalable systems.",
    keywords: ["Data Engineer", "Platform Engineer", "Staff Engineer", "Spark", "Kafka"],
    ogImage: "/og-image.png",     // Social share image
    twitterHandle: "@chintangoyal",
  },

  // ============================================
  // THEME PREFERENCES
  // ============================================
  theme: {
    defaultMode: "dark" as const,  // "dark" | "light" | "system"
    accentColor: "blue",           // For future customization
  },

  // ============================================
  // FEATURE FLAGS
  // ============================================
  features: {
    showBlog: true,
    showLibrary: true,
    showThoughts: true,
    showSystemsMap: false,
    enableAnimations: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
