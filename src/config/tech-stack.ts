import { Layers, Database, Cloud, Cpu, type LucideIcon } from "lucide-react";
import { content } from "@/config/content.generated";

export type SkillLevel = "expert" | "strong" | "working";

export interface TechDomain {
  id: string;
  label: string;
  summary: string;
  x: number;
  y: number;
  proof: TechItemEvidence;
}

export interface TechItemEvidence {
  projects: string[];
  writing: string[];
}

export interface TechItem {
  id: string;
  name: string;
  level: SkillLevel;
  domains: string[];
  evidence: TechItemEvidence;
  notes?: string;
}

export interface TechCategory {
  name: string;
  description: string;
  icon: LucideIcon;
  items: TechItem[];
}

const iconByName: Record<string, LucideIcon> = {
  Languages: Cpu,
  "Data Frameworks": Database,
  "Databases and Table Formats": Database,
  "Orchestration and DevOps": Layers,
  "Cloud, Storage, and Formats": Cloud,
};

export const techDomains: TechDomain[] = Array.from(content.stack.domains ?? []).map((domain) => ({
  id: domain.id,
  label: domain.label,
  summary: domain.summary,
  x: domain.x,
  y: domain.y,
  proof: {
    projects: Array.from(domain.proof?.projects ?? []),
    writing: Array.from(domain.proof?.writing ?? []),
  },
}));

export const techStack: TechCategory[] = content.stack.categories.map((category) => ({
  name: category.name,
  description: category.name,
  icon: iconByName[category.name] ?? Layers,
  items: category.items.map((item) => ({
    id: item.id,
    name: item.name,
    level: item.level,
    domains: Array.from(item.domains ?? []),
    evidence: {
      projects: Array.from(item.evidence?.projects ?? []),
      writing: Array.from(item.evidence?.writing ?? []),
    },
  })),
}));



