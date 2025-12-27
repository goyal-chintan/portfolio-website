export interface SystemNode {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  x: number; // Position percentage (0-100)
  y: number;
  connections: string[]; // IDs of connected nodes
  metrics?: {
    label: string;
    value: string;
  };
}

export interface SystemEdge {
  from: string;
  to: string;
  type: "data" | "control" | "dependency";
}

export const systemNodes: SystemNode[] = [
  {
    id: "ingest",
    name: "Data Ingestion",
    description: "Real-time data collection from 50M+ IoT devices",
    icon: "Download",
    x: 15,
    y: 25,
    connections: ["stream"],
    metrics: {
      label: "Events/sec",
      value: "1.2M",
    },
  },
  {
    id: "stream",
    name: "Stream Processing",
    description: "Kafka-based real-time data pipelines",
    icon: "Zap",
    x: 35,
    y: 25,
    connections: ["lake", "warehouse"],
    metrics: {
      label: "Throughput",
      value: "500MB/s",
    },
  },
  {
    id: "batch",
    name: "Batch Processing",
    description: "Spark-based ETL and analytics workloads",
    icon: "Server",
    x: 35,
    y: 60,
    connections: ["lake", "warehouse"],
    metrics: {
      label: "Daily Volume",
      value: "100TB",
    },
  },
  {
    id: "lake",
    name: "Data Lake",
    description: "Delta Lake for raw data storage and processing",
    icon: "Database",
    x: 55,
    y: 40,
    connections: ["warehouse", "serve"],
    metrics: {
      label: "Storage",
      value: "50PB",
    },
  },
  {
    id: "warehouse",
    name: "Data Warehouse",
    description: "BigQuery for structured analytics",
    icon: "BarChart3",
    x: 70,
    y: 25,
    connections: ["serve"],
    metrics: {
      label: "Queries/day",
      value: "10K+",
    },
  },
  {
    id: "serve",
    name: "API Serving",
    description: "Real-time APIs and dashboards",
    icon: "Globe",
    x: 85,
    y: 40,
    connections: [],
    metrics: {
      label: "Requests/min",
      value: "50K",
    },
  },
  {
    id: "observe",
    name: "Observability",
    description: "Monitoring, alerting, and incident response",
    icon: "Eye",
    x: 50,
    y: 80,
    connections: [],
    metrics: {
      label: "MTTR",
      value: "<15min",
    },
  },
];

export const systemEdges: SystemEdge[] = [
  { from: "ingest", to: "stream", type: "data" },
  { from: "stream", to: "lake", type: "data" },
  { from: "stream", to: "warehouse", type: "data" },
  { from: "batch", to: "lake", type: "data" },
  { from: "batch", to: "warehouse", type: "data" },
  { from: "lake", to: "warehouse", type: "data" },
  { from: "lake", to: "serve", type: "data" },
  { from: "warehouse", to: "serve", type: "data" },
  { from: "observe", to: "ingest", type: "control" },
  { from: "observe", to: "stream", type: "control" },
  { from: "observe", to: "batch", type: "control" },
];









