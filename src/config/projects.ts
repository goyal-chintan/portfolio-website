export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  status: "production" | "development" | "archived";
  featured: boolean;
  links: {
    github?: string;
    demo?: string;
    article?: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "datavinci",
    title: "DataVinci Platform",
    description: "Petabyte-scale data platform powering analytics for 50M+ devices.",
    tags: ["Spark", "Delta Lake", "BigQuery", "Scala"],
    status: "production",
    featured: true,
    links: {
      github: "",  // Leave empty if private
    },
    metrics: [
      { label: "Daily Volume", value: "100TB+" },
      { label: "Devices", value: "50M+" },
    ],
  },
  {
    id: "streamline",
    title: "Streamline CDC",
    description: "Real-time Change Data Capture system for seamless data synchronization.",
    tags: ["Kafka", "Debezium", "Flink", "PostgreSQL"],
    status: "production",
    featured: true,
    links: {
      github: "https://github.com/example/streamline",
    },
  },
  {
    id: "spark-autotuner",
    title: "Spark Autotuner Copilot",
    description: "LLM-powered assistant that analyzes Spark jobs and recommends optimal configurations.",
    tags: ["Python", "LangChain", "RAG", "Spark", "Vector DB"],
    status: "development",
    featured: true,
    links: {
      github: "https://github.com/example/spark-autotuner",
    },
  },
  {
    id: "mesh-guardian",
    title: "Mesh Guardian",
    description: "AIOps assistant for WiFi mesh network diagnostics and troubleshooting.",
    tags: ["LangGraph", "Python", "Vertex AI", "GCP"],
    status: "development",
    featured: false,
    links: {
      demo: "https://demo.example.com/mesh-guardian",
    },
  },
  {
    id: "query-optimizer",
    title: "Query Cost Optimizer",
    description: "Automated analysis and optimization of BigQuery workloads.",
    tags: ["BigQuery", "Python", "Terraform", "Cost Optimization"],
    status: "production",
    featured: false,
    links: {
      github: "",
    },
    metrics: [
      { label: "Cost Reduction", value: "40%" },
      { label: "Queries Optimized", value: "10K+" },
    ],
  },
];
