import { content } from "@/config/content.generated";

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  longDescription?: string;
  tags: string[];
  status: "production" | "development" | "archived";
  featured: boolean;
  links: {
    github?: string;
    demo?: string;
    article?: string;
    resume?: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  openSource?: boolean;
  linkStatus?: string;
  privacyNote?: string;
}

export const projects: Project[] = content.projects.map((project) => {
  const linkType = String(project.link?.primary?.type ?? "");
  const linkUrl = project.link?.primary?.url;
  return {
    id: project.id,
    title: project.name,
    year: project.period,
    description: project.summary,
    longDescription: project.body,
    tags: Array.from(project.tags ?? []),
    status: project.status,
    featured: true,
    links: {
      github: linkType === "github" ? linkUrl : undefined,
      resume: linkType === "resume" ? linkUrl : undefined,
    },
    metrics: project.metrics ? project.metrics.map((m) => ({ label: m.label, value: m.value })) : undefined,
    openSource: project.open_source,
    linkStatus: project.link_status,
    privacyNote: project.privacy_note,
  };
});
