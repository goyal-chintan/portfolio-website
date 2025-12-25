import { Layers, Database, Cloud, Cpu, GitBranch, Activity, type LucideIcon } from "lucide-react";

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

export const techStack: TechCategory[] = [
  {
    name: "Data Plane",
    description: "Processing & transformation at scale",
    icon: Database,
    items: ["Apache Spark", "Kafka", "Flink", "Delta Lake", "Iceberg", "dbt"],
  },
  {
    name: "Control Plane",
    description: "Orchestration & infrastructure",
    icon: Layers,
    items: ["Kubernetes", "Airflow", "Terraform", "ArgoCD", "Helm"],
  },
  {
    name: "Cloud & Storage",
    description: "Where the data lives",
    icon: Cloud,
    items: ["GCP", "BigQuery", "GCS", "Bigtable", "PostgreSQL", "Redis"],
  },
  {
    name: "Languages",
    description: "Tools of the trade",
    icon: Cpu,
    items: ["Scala", "Python", "SQL", "Java", "Rust", "Go"],
  },
  {
    name: "Observability",
    description: "Seeing through the system",
    icon: Activity,
    items: ["Prometheus", "Grafana", "Datadog", "OpenTelemetry", "PagerDuty"],
  },
  {
    name: "Dev & Practices",
    description: "How we build",
    icon: GitBranch,
    items: ["Git", "CI/CD", "TDD", "Code Review", "Documentation"],
  },
];
