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
  spotlight?: "primary" | "secondary";
  spotlightOrder?: number;
  brief?: {
    thesis: string;
    problem: string;
    constraints: string[];
    approach: string[];
    proof: string[];
    next: string;
    writingId?: string;
  };
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

type RawSpotlightBrief = {
  thesis: string;
  problem: string;
  constraints?: string[];
  approach?: string[];
  proof?: string[];
  next: string;
  writing_id?: string;
};

export const projects: Project[] = content.projects.map((project) => {
  const linkType = String(project.link?.primary?.type ?? "");
  const linkUrl = project.link?.primary?.url;
  const rawSpotlight = (project as { spotlight?: "primary" | "secondary" | true }).spotlight;
  const rawOrder = (project as { spotlight_order?: number | string }).spotlight_order;
  const rawBrief = (project as { brief?: RawSpotlightBrief }).brief;
  const spotlight =
    rawSpotlight === "secondary"
      ? "secondary"
      : rawSpotlight === "primary" || rawSpotlight === true
        ? "primary"
        : undefined;
  return {
    id: project.id,
    title: project.name,
    year: project.period,
    description: project.summary,
    longDescription: project.body,
    tags: Array.from(project.tags ?? []),
    status: project.status,
    featured: true,
    spotlight,
    spotlightOrder: rawOrder ? Number(rawOrder) : undefined,
    brief: rawBrief
      ? {
          thesis: rawBrief.thesis,
          problem: rawBrief.problem,
          constraints: Array.from(rawBrief.constraints ?? []),
          approach: Array.from(rawBrief.approach ?? []),
          proof: Array.from(rawBrief.proof ?? []),
          next: rawBrief.next,
          writingId: rawBrief.writing_id,
        }
      : undefined,
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
