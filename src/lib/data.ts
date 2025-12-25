import {
  Layers,
  Database,
  Cloud,
  Cpu,
  GitBranch,
  Activity,
  type LucideIcon,
} from "lucide-react";

// ============================================================================
// PROFILE DATA
// ============================================================================

export const profile = {
  name: "Chintan Goyal",
  title: "Senior Data & Platform Engineer",
  company: "Plume Design Inc",
  location: "Hyderabad, India",
  tagline: "Building data platforms at scale. Architecting the future.",
  bio: `Deep thinker. Systems builder. I design and scale data platforms that power 
        real-time decisions for millions of devices. Currently crafting the data 
        infrastructure at Plume, where WiFi meets intelligence.`,
  roles: [
    "Data Engineer",
    "Platform Architect",
    "Systems Thinker",
    "Future CTO",
  ],
  social: {
    github: "https://github.com/chintangoyal",
    linkedin: "https://linkedin.com/in/chintangoyal",
    twitter: "https://twitter.com/chintangoyal",
    email: "chintan@example.com",
  },
} as const;

// ============================================================================
// EXPERIENCE DATA
// ============================================================================

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  logo?: string;
}

export const experience: Experience[] = [
  {
    company: "Plume Design Inc",
    role: "Senior Data & Platform Engineer",
    period: "2023 - Present",
    description: "Architecting the next-gen data platform processing petabytes of telemetry from 50M+ devices. Leading the transition to Lakehouse architecture."
  },
  {
    company: "DataCo Global",
    role: "Data Engineer II",
    period: "2021 - 2023",
    description: "Built real-time CDC pipelines reducing data latency from hours to seconds. Optimized Spark jobs for 40% cost reduction."
  },
  {
    company: "TechStart",
    role: "Software Engineer",
    period: "2019 - 2021",
    description: "Developed backend microservices in Go and Python. Implemented the first automated CI/CD pipelines for the team."
  }
];

// ============================================================================
// TECH STACK DATA
// ============================================================================

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

// ============================================================================
// PROJECTS DATA
// ============================================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  stars: number;
  link?: string;
  github?: string;
  featured: boolean;
  status: "production" | "development" | "archived";
}

export const projects: Project[] = [
  {
    id: "datavinci",
    title: "DataVinci Platform",
    description:
      "Petabyte-scale data platform powering analytics for 50M+ WiFi devices worldwide. Built with Spark, Delta Lake, and BigQuery.",
    longDescription: `A comprehensive data platform that processes 100TB+ daily, enabling 
      real-time insights across millions of connected home devices. Features include 
      CDC pipelines, OLAP optimization, and cost-efficient hot/cold storage tiering.`,
    tags: ["Spark", "Delta Lake", "BigQuery", "Scala", "Kubernetes"],
    stars: 128,
    featured: true,
    status: "production",
  },
  {
    id: "streamline",
    title: "Streamline CDC",
    description:
      "Real-time Change Data Capture system for seamless data synchronization across hybrid cloud environments.",
    tags: ["Kafka", "Debezium", "Flink", "PostgreSQL"],
    stars: 87,
    github: "https://github.com/example/streamline",
    featured: true,
    status: "production",
  },
  {
    id: "spark-autotuner",
    title: "Spark Autotuner Copilot",
    description:
      "LLM-powered assistant that analyzes Spark jobs and recommends optimal configurations using RAG over best practices.",
    tags: ["Python", "LangChain", "RAG", "Spark", "Vector DB"],
    stars: 64,
    featured: true,
    status: "development",
  },
  {
    id: "mesh-guardian",
    title: "Mesh Guardian",
    description:
      "AIOps assistant for WiFi mesh network diagnostics. Natural language interface for log analysis and troubleshooting.",
    tags: ["LangGraph", "Python", "Vertex AI", "GCP"],
    stars: 42,
    featured: false,
    status: "development",
  },
  {
    id: "query-optimizer",
    title: "Query Cost Optimizer",
    description:
      "Automated analysis and optimization of BigQuery workloads, reducing query costs by 40% through intelligent scheduling.",
    tags: ["BigQuery", "Python", "Terraform", "Cost Optimization"],
    stars: 35,
    featured: false,
    status: "production",
  },
];

// ============================================================================
// BOOKS DATA
// ============================================================================

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  takeaway: string;
  category: "engineering" | "leadership" | "thinking" | "business";
  rating: number;
}

export const books: Book[] = [
  {
    id: "ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    cover: "/books/ddia.svg",
    takeaway:
      "The bible of distributed systems—every data engineer should internalize its mental models.",
    category: "engineering",
    rating: 5,
  },
  {
    id: "staff-engineer",
    title: "Staff Engineer",
    author: "Will Larson",
    cover: "/books/staff-engineer.svg",
    takeaway:
      "The roadmap from senior to staff: it's not about more code, it's about more leverage.",
    category: "leadership",
    rating: 5,
  },
  {
    id: "thinking-systems",
    title: "Thinking in Systems",
    author: "Donella Meadows",
    cover: "/books/thinking-in-systems.svg",
    takeaway:
      "Systems have their own logic. Understanding feedback loops changed how I debug everything.",
    category: "thinking",
    rating: 5,
  },
  {
    id: "philosophy-software",
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    cover: "/books/philosophy-of-software-design.svg",
    takeaway:
      "Deep modules, shallow interfaces. Complexity is the enemy—fight it with intention.",
    category: "engineering",
    rating: 4,
  },
  {
    id: "high-output",
    title: "High Output Management",
    author: "Andy Grove",
    cover: "/books/high-output-management.svg",
    takeaway:
      "Your output = your team's output. The manager's leverage comes from multiplying others.",
    category: "leadership",
    rating: 5,
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/books/atomic-habits.svg",
    takeaway:
      "Systems beat goals. 1% daily improvements compound into transformation.",
    category: "thinking",
    rating: 4,
  },
];

// ============================================================================
// WRITING DATA
// ============================================================================

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "scaling-spark",
    title: "Scaling Spark to Petabytes: Lessons from Production",
    excerpt:
      "After processing 100TB daily for two years, here are the patterns that actually work.",
    date: "2024-12-15",
    readTime: "12 min",
    tags: ["Spark", "Performance", "Data Engineering"],
    slug: "scaling-spark-petabytes",
  },
  {
    id: "cdc-patterns",
    title: "CDC Patterns for the Modern Data Stack",
    excerpt:
      "Change Data Capture isn't just about replication—it's about building reactive data systems.",
    date: "2024-11-28",
    readTime: "8 min",
    tags: ["CDC", "Kafka", "Architecture"],
    slug: "cdc-patterns-modern-stack",
  },
  {
    id: "staff-reflections",
    title: "From Senior to Staff: A Year of Reflection",
    excerpt:
      "The technical skills that got you here won't get you there. What I learned about influence.",
    date: "2024-10-10",
    readTime: "6 min",
    tags: ["Career", "Leadership", "Growth"],
    slug: "senior-to-staff-reflection",
  },
  {
    id: "cost-optimization",
    title: "40% Cloud Cost Reduction: A Data Platform Case Study",
    excerpt:
      "How we cut our BigQuery bill in half through query optimization and intelligent scheduling.",
    date: "2024-09-05",
    readTime: "10 min",
    tags: ["Cost Optimization", "BigQuery", "Cloud"],
    slug: "cloud-cost-reduction-case-study",
  },
];

// ============================================================================
// THOUGHTS (TWEET-STYLE) DATA
// ============================================================================

export interface Thought {
  id: string;
  content: string;
  date: string;
  likes: number;
}

export const thoughts: Thought[] = [
  {
    id: "t1",
    content:
      "The best data architecture is the one your team can understand at 3 AM during an incident.",
    date: "2024-12-20",
    likes: 342,
  },
  {
    id: "t2",
    content:
      "Hot take: Most 'data quality' problems are actually 'unclear requirements' problems in disguise.",
    date: "2024-12-18",
    likes: 256,
  },
  {
    id: "t3",
    content:
      "Every Spark job starts as a small script and ends as a 2000-line monolith. The trick is knowing when to stop.",
    date: "2024-12-15",
    likes: 189,
  },
  {
    id: "t4",
    content:
      "The gap between 'works on my laptop' and 'works at scale' is where data engineering careers are forged.",
    date: "2024-12-10",
    likes: 421,
  },
  {
    id: "t5",
    content:
      "Observability isn't a feature—it's a prerequisite. You can't optimize what you can't measure.",
    date: "2024-12-05",
    likes: 167,
  },
];

// ============================================================================
// NAVIGATION DATA
// ============================================================================

export interface NavItem {
  name: string;
  href: string;
  shortcut?: string;
}

export const navigation: NavItem[] = [
  { name: "Home", href: "/", shortcut: "H" },
  { name: "Projects", href: "#projects", shortcut: "P" },
  { name: "Stack", href: "#stack", shortcut: "S" },
  { name: "Library", href: "#library", shortcut: "L" },
  { name: "Writing", href: "#writing", shortcut: "W" },
  { name: "Resume", href: "/resume", shortcut: "R" },
  { name: "Contact", href: "#contact", shortcut: "C" },
];

// ============================================================================
// COMMAND PALETTE DATA
// ============================================================================

export interface CommandItem {
  id: string;
  name: string;
  shortcut?: string;
  action: string;
  group: "navigation" | "social" | "theme" | "actions";
  icon?: LucideIcon;
}

export const commands: CommandItem[] = [
  // Navigation
  { id: "home", name: "Go to Home", shortcut: "H", action: "/", group: "navigation" },
  { id: "deep-dive", name: "Deep Dive", shortcut: "D", action: "#deep-dive", group: "navigation" },
  { id: "deep-projects", name: "Deep Dive: Projects", shortcut: "P", action: "deep-dive:projects", group: "navigation" },
  { id: "deep-stack", name: "Deep Dive: Stack", shortcut: "S", action: "deep-dive:stack", group: "navigation" },
  { id: "deep-library", name: "Deep Dive: Library", shortcut: "L", action: "deep-dive:library", group: "navigation" },
  { id: "deep-writing", name: "Deep Dive: Writing", shortcut: "W", action: "deep-dive:writing", group: "navigation" },
  { id: "deep-thoughts", name: "Deep Dive: Thoughts", shortcut: "T", action: "deep-dive:thoughts", group: "navigation" },
  // Theme
  { id: "theme-toggle", name: "Toggle theme", shortcut: "T", action: "theme:toggle", group: "theme" },
  { id: "theme-dark", name: "Theme: Dark", action: "theme:dark", group: "theme" },
  { id: "theme-light", name: "Theme: Light", action: "theme:light", group: "theme" },
  { id: "theme-system", name: "Theme: System", action: "theme:system", group: "theme" },
  // Social
  { id: "github", name: "Open GitHub", action: "https://github.com/chintangoyal", group: "social" },
  { id: "linkedin", name: "Open LinkedIn", action: "https://linkedin.com/in/chintangoyal", group: "social" },
  { id: "twitter", name: "Open Twitter", action: "https://twitter.com/chintangoyal", group: "social" },
  // Actions
  { id: "resume", name: "View Resume", action: "/resume", group: "actions" },
  { id: "contact", name: "Contact Me", shortcut: "C", action: "#contact", group: "actions" },
];

// ============================================================================
// STATS DATA
// ============================================================================

export interface Stat {
  label: string;
  value: string;
  description: string;
}

export const stats: Stat[] = [
  { label: "Daily Data Processed", value: "100TB+", description: "Across distributed Spark clusters" },
  { label: "Devices Powered", value: "50M+", description: "WiFi devices worldwide" },
  { label: "Years of Experience", value: "8+", description: "In data & platform engineering" },
  { label: "Cost Reduction", value: "40%", description: "In cloud infrastructure" },
];
