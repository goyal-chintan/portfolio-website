"use client";

import { siteConfig } from "@/config/site.config";
import { PlaceholderPage } from "@/components/placeholder-page";
import { FileText } from "lucide-react";

export default function ResumePage() {
  // For now, just show the placeholder page
  // TODO: Add file checking logic later
  return (
    <PlaceholderPage
      title="Resume Coming Soon"
      message="I'm currently updating my resume. Please check back later or reach out directly for more information about my experience and background."
      icon={<FileText className="h-16 w-16" />}
      actionText="Email Me"
      actionLink={`mailto:${siteConfig.social.email}`}
    />
  );
}
