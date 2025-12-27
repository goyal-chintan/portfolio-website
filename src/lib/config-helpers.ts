import { siteConfig } from "@/config/site.config";

// Check if a social link is configured
export function hasSocialLink(platform: keyof typeof siteConfig.social): boolean {
  return Boolean(siteConfig.social[platform]);
}

// Get only configured social links
export function getActiveSocialLinks() {
  return Object.entries(siteConfig.social)
    .filter(([_, url]) => Boolean(url))
    .map(([platform, url]) => ({ platform, url }));
}

// Check if a document is available
export function hasDocument(doc: keyof typeof siteConfig.documents): boolean {
  return Boolean(siteConfig.documents[doc]);
}

// Check if a feature is enabled
export function isFeatureEnabled(feature: keyof typeof siteConfig.features): boolean {
  return siteConfig.features[feature];
}

// Get full site info
export function getSiteInfo() {
  return {
    ...siteConfig,
    activeSocialLinks: getActiveSocialLinks(),
    hasResume: hasDocument("resume"),
    hasCV: hasDocument("cv"),
    hasPortfolio: hasDocument("portfolio"),
  };
}

// Helper to get document URL or null
export function getDocumentUrl(doc: keyof typeof siteConfig.documents): string | null {
  return siteConfig.documents[doc] || null;
}









