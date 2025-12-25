"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { blogPosts, projects } from "@/lib/data";
import { Network, Sparkles, Layers, BookOpen, PenLine } from "lucide-react";

type NodeId =
  | "ingest"
  | "stream"
  | "batch"
  | "lakehouse"
  | "serving"
  | "observability"
  | "governance";

type Node = {
  id: NodeId;
  title: string;
  subtitle: string;
  signals: string[];
  links?: {
    projects?: string[];
    posts?: string[];
    stack?: string[];
  };
  x: number; // 0..100 (percent)
  y: number; // 0..100 (percent)
};

type Edge = {
  from: NodeId;
  to: NodeId;
  kind: "flow" | "dependency";
  label?: string;
};

const NODES: Node[] = [
  {
    id: "ingest",
    title: "Ingest",
    subtitle: "Collect, validate, route signals",
    signals: ["CDC + event streams", "schema discipline", "backpressure-aware"],
    links: { projects: ["streamline"], stack: ["Kafka", "Debezium"] },
    x: 18,
    y: 35,
  },
  {
    id: "stream",
    title: "Stream",
    subtitle: "Low-latency transforms & joins",
    signals: ["near real-time", "exactly-once pragmatism", "state management"],
    links: { projects: ["streamline"], stack: ["Kafka", "Flink"] },
    x: 38,
    y: 20,
  },
  {
    id: "batch",
    title: "Batch",
    subtitle: "Large-scale processing & backfills",
    signals: ["100TB+/day", "cost tuning", "reliability first"],
    links: { projects: ["datavinci"], stack: ["Apache Spark", "Scala"] },
    x: 38,
    y: 52,
  },
  {
    id: "lakehouse",
    title: "Lakehouse",
    subtitle: "Curated storage + tables + contracts",
    signals: ["hot/cold tiering", "partition strategy", "evolution-safe"],
    links: {
      projects: ["datavinci"],
      posts: ["cdc-patterns", "cost-optimization"],
      stack: ["Delta Lake", "Iceberg", "BigQuery"],
    },
    x: 60,
    y: 35,
  },
  {
    id: "serving",
    title: "Serving",
    subtitle: "OLAP, APIs, and decision layers",
    signals: ["query performance", "SLO thinking", "product-facing"],
    links: { projects: ["query-optimizer"], posts: ["cost-optimization"], stack: ["BigQuery"] },
    x: 82,
    y: 35,
  },
  {
    id: "observability",
    title: "Observability",
    subtitle: "Tracing, metrics, and incident response",
    signals: ["measure → tune", "fast triage", "capacity awareness"],
    links: { stack: ["Prometheus", "Grafana", "OpenTelemetry"] },
    x: 60,
    y: 12,
  },
  {
    id: "governance",
    title: "Governance",
    subtitle: "Quality, lineage, and safe change",
    signals: ["contracts", "data quality loops", "trust at scale"],
    links: { posts: ["cdc-patterns"], stack: ["dbt"] },
    x: 60,
    y: 62,
  },
];

const EDGES: Edge[] = [
  { from: "ingest", to: "stream", kind: "flow", label: "events" },
  { from: "ingest", to: "batch", kind: "flow", label: "files" },
  { from: "stream", to: "lakehouse", kind: "flow", label: "curated" },
  { from: "batch", to: "lakehouse", kind: "flow", label: "curated" },
  { from: "lakehouse", to: "serving", kind: "flow", label: "models" },
  { from: "observability", to: "ingest", kind: "dependency", label: "telemetry" },
  { from: "observability", to: "stream", kind: "dependency", label: "telemetry" },
  { from: "observability", to: "batch", kind: "dependency", label: "telemetry" },
  { from: "observability", to: "lakehouse", kind: "dependency", label: "telemetry" },
  { from: "observability", to: "serving", kind: "dependency", label: "telemetry" },
  { from: "governance", to: "ingest", kind: "dependency", label: "contracts" },
  { from: "governance", to: "lakehouse", kind: "dependency", label: "contracts" },
  { from: "governance", to: "serving", kind: "dependency", label: "contracts" },
];

function getNode(id: NodeId) {
  const node = NODES.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown node: ${id}`);
  return node;
}

function relatedEdges(nodeId: NodeId) {
  return EDGES.filter((e) => e.from === nodeId || e.to === nodeId);
}

function relatedNodes(nodeId: NodeId) {
  const ids = new Set<NodeId>();
  relatedEdges(nodeId).forEach((e) => {
    ids.add(e.from);
    ids.add(e.to);
  });
  return ids;
}

function pickNextNode(current: NodeId, direction: "left" | "right" | "up" | "down") {
  const c = getNode(current);
  const candidates = NODES.filter((n) => n.id !== current).filter((n) => {
    if (direction === "left") return n.x < c.x - 1;
    if (direction === "right") return n.x > c.x + 1;
    if (direction === "up") return n.y < c.y - 1;
    return n.y > c.y + 1;
  });
  if (candidates.length === 0) return current;

  // Score: distance with direction bias (prefer straighter moves).
  const scored = candidates
    .map((n) => {
      const dx = n.x - c.x;
      const dy = n.y - c.y;
      const dist2 = dx * dx + dy * dy;
      const offAxis =
        direction === "left" || direction === "right" ? Math.abs(dy) : Math.abs(dx);
      return { id: n.id, score: dist2 + offAxis * 8 };
    })
    .sort((a, b) => a.score - b.score);

  return scored[0].id;
}

function NodeDetails({ node }: { node: Node }) {
  const [tab, setTab] = React.useState<"projects" | "writing" | "stack">("projects");

  const linkedProjects = (node.links?.projects ?? [])
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);

  const linkedPosts = (node.links?.posts ?? [])
    .map((id) => blogPosts.find((p) => p.id === id))
    .filter(Boolean);

  const linkedStack = node.links?.stack ?? [];

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{node.title}</h3>
            <p className="text-sm text-muted-foreground">{node.subtitle}</p>
          </div>
          <Badge variant="secondary" className="font-mono text-[10px]">
            node/{node.id}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {node.signals.map((s) => (
            <Badge key={s} variant="ghost" className="text-xs">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-border/60 bg-muted/30 p-1">
        <Button
          variant={tab === "projects" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 flex-1"
          onClick={() => setTab("projects")}
        >
          <Layers className="h-4 w-4" />
          Projects
        </Button>
        <Button
          variant={tab === "writing" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 flex-1"
          onClick={() => setTab("writing")}
        >
          <PenLine className="h-4 w-4" />
          Writing
        </Button>
        <Button
          variant={tab === "stack" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 flex-1"
          onClick={() => setTab("stack")}
        >
          <BookOpen className="h-4 w-4" />
          Stack
        </Button>
      </div>

      <div className="mt-4 flex-1 overflow-auto pr-1">
        <AnimatePresence mode="wait">
          {tab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3"
            >
              {linkedProjects.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No linked projects yet.
                </p>
              ) : (
                linkedProjects.map((p) => (
                  <div
                    key={p!.id}
                    className="rounded-xl border border-border/60 bg-card/50 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium">{p!.title}</div>
                      <Badge variant="ghost" className="font-mono text-[10px]">
                        ★ {p!.stars}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {p!.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p!.tags.slice(0, 4).map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {tab === "writing" && (
            <motion.div
              key="writing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3"
            >
              {linkedPosts.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No linked posts yet.
                </p>
              ) : (
                linkedPosts.map((p) => (
                  <div
                    key={p!.id}
                    className="rounded-xl border border-border/60 bg-card/50 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium">{p!.title}</div>
                      <Badge variant="ghost" className="font-mono text-[10px]">
                        {p!.readTime}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {p!.excerpt}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p!.tags.slice(0, 3).map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {tab === "stack" && (
            <motion.div
              key="stack"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3"
            >
              {linkedStack.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No linked technologies yet.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {linkedStack.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="pt-3">
                <p className="text-xs text-muted-foreground">
                  Also explore the full Tech Radar for category grouping.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SystemsMapSvg({
  activeId,
  selectedId,
  className,
}: {
  activeId?: NodeId | null;
  selectedId?: NodeId | null;
  className?: string;
}) {
  const activeSet = activeId ? relatedNodes(activeId) : null;

  return (
    <svg
      viewBox="0 0 100 80"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Systems map"
    >
      <defs>
        <linearGradient id="edgeGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="hsl(var(--foreground) / 0.10)" />
          <stop offset="0.5" stopColor="hsl(var(--ring) / 0.35)" />
          <stop offset="1" stopColor="hsl(var(--foreground) / 0.10)" />
        </linearGradient>
      </defs>

      {/* Constellation Lines (Edges) */}
      {EDGES.map((e, idx) => {
        const a = getNode(e.from);
        const b = getNode(e.to);
        const isHot =
          (activeId && (e.from === activeId || e.to === activeId)) ||
          (selectedId && (e.from === selectedId || e.to === selectedId));

        return (
          <g key={`${e.from}-${e.to}-${idx}`}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isHot ? "hsl(var(--ring) / 0.4)" : "hsl(var(--foreground) / 0.12)"}
              strokeWidth={isHot ? 1.2 : 0.8}
              strokeLinecap="round"
              opacity={isHot ? 1 : 0.9}
            />
          </g>
        );
      })}

      {/* Nodes */}
      {NODES.map((n) => {
        const isSelected = selectedId === n.id;
        const isActive = activeId === n.id;
        const isRelated = activeSet ? activeSet.has(n.id) : true;
        const dim = activeSet ? !isRelated : false;

        return (
          <g key={n.id} opacity={dim ? 0.35 : 1}>
            {/* Star glow */}
            <circle
              cx={n.x}
              cy={n.y}
              r={isSelected ? 4.5 : isActive ? 4 : 3.5}
              fill="hsl(var(--ring))"
              fillOpacity={isSelected ? 0.4 : isActive ? 0.25 : 0.1}
              filter="blur(0.5px)"
            />
            {/* Star core */}
            <circle
              cx={n.x}
              cy={n.y}
              r={isSelected ? 3.5 : isActive ? 3 : 2.5}
              fill="hsl(var(--foreground))"
              stroke="hsl(var(--ring))"
              strokeWidth={isSelected ? 1.2 : isActive ? 1 : 0.8}
              strokeOpacity={isSelected ? 0.8 : isActive ? 0.6 : 0.4}
            />
            {/* Star cross pattern */}
            <g opacity={isSelected ? 0.9 : isActive ? 0.7 : 0.5}>
              <line
                x1={n.x - 3}
                y1={n.y}
                x2={n.x + 3}
                y2={n.y}
                stroke="hsl(var(--foreground))"
                strokeWidth={0.6}
              />
              <line
                x1={n.x}
                y1={n.y - 3}
                x2={n.x}
                y2={n.y + 3}
                stroke="hsl(var(--foreground))"
                strokeWidth={0.6}
              />
            </g>
            <circle
              cx={n.x}
              cy={n.y}
              r={isSelected ? 6 : isActive ? 5.5 : 0}
              fill="transparent"
              stroke="hsl(var(--ring) / 0.15)"
              strokeWidth={1}
            />
          </g>
        );
      })}
    </svg>
  );
}

function MapNodeOverlay({
  node,
  setActiveId,
  onSelect,
}: {
  node: Node;
  setActiveId: (id: NodeId | null) => void;
  onSelect: (id: NodeId) => void;
}) {
  return (
    <>
      <button
        type="button"
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none",
          "h-9 w-9",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
        style={{ left: `${node.x}%`, top: `${(node.y / 80) * 100}%` }}
        aria-label={`${node.title}: ${node.subtitle}`}
        onMouseEnter={() => {
          setActiveId(node.id);
        }}
        onMouseLeave={() => {
          setActiveId(null);
        }}
        onFocus={() => {
          setActiveId(node.id);
        }}
        onBlur={() => {
          setActiveId(null);
        }}
        onClick={() => onSelect(node.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSelect(node.id);
            return;
          }
          if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            const dir =
              e.key === "ArrowLeft"
                ? "left"
                : e.key === "ArrowRight"
                  ? "right"
                  : e.key === "ArrowUp"
                    ? "up"
                    : "down";
            const next = pickNextNode(node.id, dir);
            const nextEl = document.querySelector<HTMLButtonElement>(
              `[data-map-node='${next}']`
            );
            nextEl?.focus();
          }
        }}
        data-map-node={node.id}
      >
        <span className="sr-only">{node.title}</span>
      </button>
    </>
  );
}

export function SystemsMapCard({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<NodeId | null>(null);
  const [selectedId, setSelectedId] = React.useState<NodeId | null>("lakehouse");

  const activeNode = activeId ? getNode(activeId) : null;
  const selectedNode = selectedId ? getNode(selectedId) : getNode("lakehouse");

  const onOpen = () => {
    setSelectedId((prev) => prev ?? "lakehouse");
    setOpen(true);
  };

  return (
    <>
      <div className={cn("space-y-4 h-full", className)}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Network className="h-4 w-4" />
              Systems Map
            </h2>
            <p className="text-sm text-muted-foreground">
              A calm view of the data platform landscape
            </p>
          </div>
          <Button variant="glass" size="sm" onClick={onOpen}>
            Open
          </Button>
        </div>

        <div className="relative h-40 rounded-2xl border border-border/50 bg-muted/20 overflow-hidden">
          <div className="absolute inset-0">
            <SystemsMapSvg activeId={activeId} selectedId={selectedId} />
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/40 to-transparent" />

          {/* Hover tooltips for preview (simple, no keyboard overlay here) */}
          {!reducedMotion && activeNode && (
            <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-border/60 bg-card/70 backdrop-blur-xl p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium">{activeNode.title}</div>
                <Badge variant="ghost" className="font-mono text-[10px]">
                  hover
                </Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground line-clamp-1">
                {activeNode.subtitle}
              </div>
            </div>
          )}

          {/* Pointer hotspots for preview */}
          <div className="absolute inset-0">
            {NODES.map((n) => (
              <div
                key={n.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full"
                style={{ left: `${n.x}%`, top: `${(n.y / 80) * 100}%` }}
                onMouseEnter={() => setActiveId(n.id)}
                onMouseLeave={() => setActiveId(null)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">observatory/v1</span>
          <span className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            hover nodes
          </span>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 min-h-[520px]">
            {/* Map */}
            <div className="relative md:col-span-3 bg-muted/20">
              <div className="absolute inset-0 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Network className="h-4 w-4" />
                      <span className="font-mono">systems-map</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Arrow keys to move • Enter to select • Esc to close
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    v1
                  </Badge>
                </div>

                <div className="relative mt-5 h-[360px] rounded-2xl border border-border/60 bg-card/40 overflow-hidden">
                  <SystemsMapSvg activeId={activeId} selectedId={selectedId} className="absolute inset-0" />

                  {/* Accessible node overlays */}
                  {NODES.map((node) => (
                    <MapNodeOverlay
                      key={node.id}
                      node={node}
                      setActiveId={setActiveId}
                      onSelect={(id) => setSelectedId(id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-border/60 p-6">
              <NodeDetails node={selectedNode} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


