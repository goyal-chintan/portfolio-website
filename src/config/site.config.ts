// src/config/site.config.ts

import { content } from "@/config/content.generated";

export const siteConfig = {
  // ============================================
  // PERSONAL INFO (from resources/profile.json)
  // ============================================
  name: content.profile.name,
  title: content.profile.title,
  company: content.profile.company,
  location: content.profile.location,

  tagline: content.profile.tagline,
  bio: content.profile.bio,

  // Rotating roles in hero
  roles: content.profile.roles ?? [],

  // Status badge
  availability: {
    status: content.profile.availability.status, // "open" | "busy" | "not-looking"
    message: content.profile.availability.note,
  },

  // ============================================
  // SOCIAL LINKS (from resources/profile.json)
  // ============================================
  social: content.profile.social,

  // ============================================
  // DOCUMENTS (paths relative to /public)
  // ============================================
  documents: {
    resume: "/resume",
    cv: "",
    portfolio: "",
  },

  // ============================================
  // SEO & META
  // ============================================
  seo: {
    title: "Chintan Goyal | Senior Data & Platform Engineer",
    description: "Staff-level Data & Platform Engineer building scalable systems.",
    keywords: ["Data Engineer", "Platform Engineer", "Staff Engineer", "Spark", "Kafka"],
    ogImage: "/og-image.png",     // Social share image
    twitterHandle: "@gchintn",
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








