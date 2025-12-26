import { Layers, Database, Cloud, Cpu, type LucideIcon } from "lucide-react";
import { content } from "@/config/content.generated";

export interface TechItem {
  name: string;
  icon: LucideIcon;
  category: string;
  proficiency: "expert" | "advanced" | "intermediate";
}

export interface TechCategory {
  name: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}

const iconByName: Record<string, LucideIcon> = {
  Languages: Cpu,
  "Data Frameworks": Database,
  "Databases and Table Formats": Database,
  "Orchestration and DevOps": Layers,
  "Cloud, Storage, and Formats": Cloud,
};

export const techStack: TechCategory[] = content.stack.categories.map((category) => ({
  name: category.name,
  description: category.name,
  icon: iconByName[category.name] ?? Layers,
  items: Array.from(category.items),
}));



