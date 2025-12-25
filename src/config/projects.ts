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

export const projects: Project[] = content.projects.map((project) => ({
  id: project.id,
  title: project.name,
  year: project.period,
  description: project.summary,
  longDescription: project.body,
  tags: project.tags ?? [],
  status: project.status,
  featured: true,
  links: {
    github: project.link?.primary?.type === "github" ? project.link.primary.url : undefined,
    resume: project.link?.primary?.type === "resume" ? project.link.primary.url : undefined,
  },
  metrics: project.metrics,
  openSource: project.open_source,
  linkStatus: project.link_status,
  privacyNote: project.privacy_note,
}));
