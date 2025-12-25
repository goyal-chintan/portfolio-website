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
    excerpt: "After processing 100TB daily for two years, here are the patterns that actually work.",
    date: "2024-12-15",
    readTime: "12 min",
    tags: ["Spark", "Performance", "Data Engineering"],
    slug: "scaling-spark-petabytes",
  },
  {
    id: "cdc-patterns",
    title: "CDC Patterns for the Modern Data Stack",
    excerpt: "Change Data Capture isn't just about replication—it's about building reactive data systems.",
    date: "2024-11-28",
    readTime: "8 min",
    tags: ["CDC", "Kafka", "Architecture"],
    slug: "cdc-patterns-modern-stack",
  },
  {
    id: "staff-reflections",
    title: "From Senior to Staff: A Year of Reflection",
    excerpt: "The technical skills that got you here won't get you there. What I learned about influence.",
    date: "2024-10-10",
    readTime: "6 min",
    tags: ["Career", "Leadership", "Growth"],
    slug: "senior-to-staff-reflection",
  },
  {
    id: "cost-optimization",
    title: "40% Cloud Cost Reduction: A Data Platform Case Study",
    excerpt: "How we cut our BigQuery bill in half through query optimization and intelligent scheduling.",
    date: "2024-09-05",
    readTime: "10 min",
    tags: ["Cost Optimization", "BigQuery", "Cloud"],
    slug: "cloud-cost-reduction-case-study",
  },
];
