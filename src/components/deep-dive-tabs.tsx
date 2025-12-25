"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Github,
  Globe,
  ArrowUpRight,
  Sparkles,
  BookOpen
} from "lucide-react";

// Content (config-driven)
import { projects } from "@/config/projects";
import { techStack } from "@/config/tech-stack";
import { books } from "@/config/books";
import { blogPosts } from "@/config/posts";
import { thoughts } from "@/config/thoughts";

type TabId = "projects" | "writing" | "stack" | "library" | "thoughts";

interface TabItem {
  id: TabId;
  label: string;
}

const TAB_HASH: Record<TabId, string> = {
  projects: "#projects",
  writing: "#writing",
  stack: "#stack",
  library: "#library",
  thoughts: "#thoughts",
};

const HASH_TAB: Record<string, TabId> = Object.fromEntries(
  Object.entries(TAB_HASH).map(([k, v]) => [v, k as TabId])
);



export function DeepDiveTabs() {
  const [activeTab, setActiveTab] = React.useState<TabId>("projects");
  const [detail, setDetail] = React.useState<{ type: string; id?: string; name?: string } | null>(null);
  const [detailOpen, setDetailOpen] = React.useState(false);


  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash && HASH_TAB[hash]) {
      setActiveTab(HASH_TAB[hash]);
    }
  }, []);

  const openDetail = (type: string, idOrName: string) => {
    if (type === "stack") {
      setDetail({ type, name: idOrName });
    } else {
      setDetail({ type, id: idOrName });
    }
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setTimeout(() => setDetail(null), 300);
  };

  const availableTabs: TabItem[] = [
    { id: "projects", label: "Projects" },
    { id: "writing", label: "Writing" },
    { id: "stack", label: "Stack" },
    { id: "library", label: "Library" },
    { id: "thoughts", label: "Thoughts" },
  ];



  const renderTabContent = (id: TabId) => {
    switch (id) {
      case "projects":
        return (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight">Featured Projects</h3>
                <p className="text-muted-foreground max-w-2xl text-lg">
                  Production-grade systems designed for scalability, reliability, and precision.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="card-glass p-6 md:p-8 flex flex-col justify-between cursor-pointer"
                  onClick={() => openDetail("project", p.id)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{p.year}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold tracking-tight">{p.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-6">
                    {p.tags.slice(0, 3).map((t) => (
                      <Badge key={t} variant="secondary" className="px-2 py-0 text-[10px] bg-secondary/50 border-white/5">{t}</Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "writing":
        return (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight">Writing</h3>
                <p className="text-muted-foreground max-w-2xl text-lg">
                  Lessons from production, architectural tradeoffs, and the journey from senior to staff.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              {blogPosts.map((p, index) => {
                const isFeatured = index === 0;
                return (
                  <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.005, y: -2 }}
                    whileTap={{ scale: 0.995 }}
                    className={cn(
                      "group relative rounded-3xl border transition-all duration-500",
                      isFeatured
                        ? "p-8 md:p-12 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-primary/20 shadow-2xl shadow-primary/5"
                        : "card-glass p-6 md:p-8 hover:bg-glass-panel/60"
                    )}
                  >
                    <Link href={`/writing/${p.slug}`} className="absolute inset-0 z-10" />

                    <div className="flex flex-col gap-6">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground/60">
                        {isFeatured && (
                          <Badge variant="emerald" className="px-3 py-1 rounded-full uppercase tracking-widest text-[10px] bg-emerald-500/10 border-emerald-500/20 text-emerald-500">
                            Featured Post
                          </Badge>
                        )}
                        <span>{p.date}</span>
                        <span>•</span>
                        <span>{p.readTime}</span>
                      </div>

                      <div className="space-y-3">
                        <h4 className={cn(
                          "font-bold text-foreground group-hover:text-primary transition-colors duration-300",
                          isFeatured ? "text-3xl md:text-5xl tracking-tighter" : "text-xl md:text-2xl tracking-tight"
                        )}>
                          {p.title}
                        </h4>
                        <p className={cn(
                          "text-muted-foreground leading-relaxed",
                          isFeatured ? "text-lg md:text-xl max-w-3xl" : "text-base line-clamp-2 max-w-2xl"
                        )}>
                          {p.excerpt}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <Badge key={t} variant="secondary" className="px-3 py-1 rounded-full text-[11px] bg-secondary/50 border-white/5">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case "stack":
        return (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight">Technical Stack</h3>
                <p className="text-muted-foreground max-w-2xl text-lg">
                  A curated collection of tools and technologies I use to build scalable data platforms.
                </p>
              </div>
            </div>

            <div className="grid gap-8">
              {techStack.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group flex flex-col md:flex-row gap-8 p-8 card-glass hover:bg-glass-panel/60 transition-all duration-500"
                  >
                    <div className="md:w-1/3 space-y-4">
                      <div className="inline-flex p-3 rounded-2xl bg-primary/5 text-primary border border-primary/10">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-bold tracking-tight text-foreground">{cat.name}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <div className="md:w-2/3 flex flex-wrap content-start gap-3">
                      {cat.items.map((t) => (
                        <div key={t} className="group/item relative">
                          <Badge
                            variant="secondary"
                            className="px-5 py-2.5 rounded-full text-sm font-medium bg-secondary/30 hover:bg-primary/10 hover:text-primary hover:border-primary/30 border border-transparent transition-all duration-300"
                          >
                            {t}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case "library":
        return (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight">The Library</h3>
                <p className="text-muted-foreground max-w-2xl text-lg">
                  Books that have shaped my thinking on systems, leadership, and craft.
                </p>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {books.map((b) => (
                <motion.div
                  key={b.id}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative cursor-pointer"
                  onClick={() => openDetail("book", b.id)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-primary/5">
                    <Image src={b.cover} alt={b.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <BookOpen className="h-8 w-8 text-white/80" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <h4 className="font-bold text-sm tracking-tight line-clamp-1">{b.title}</h4>
                    <p className="text-xs text-muted-foreground">{b.author}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "thoughts":
        return (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight">Long-form Thoughts</h3>
                <p className="text-muted-foreground max-w-2xl text-lg">
                  Mental models and systems thinking notes.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {thoughts.map((thought) => (
                <motion.div
                  key={thought.id}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="card-glass p-8 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                      <span>Index: {thought.id}</span>
                      <span>{thought.date}</span>
                    </div>
                    <p className="text-xl md:text-2xl font-light italic text-foreground/90 leading-relaxed">
                      &ldquo;{thought.content}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/10">
                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground/60">
                      <span>{thought.likes} Replications</span>
                    </div>
                    <Sparkles className="h-4 w-4 text-primary/40" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const detailProject =
    detail?.type === "project" ? projects.find((p) => p.id === detail.id) : undefined;
  const detailStack =
    detail?.type === "stack" ? techStack.find((c) => c.name === detail.name) : undefined;
  const detailBook =
    detail?.type === "book" ? books.find((b) => b.id === detail.id) : undefined;

  return (
    <div id="deep-dive" className="space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Deep Dive</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Exploring the architectures, mental models, and tools behind my work.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => {
          const next = v as TabId;
          setActiveTab(next);
          window.history.pushState(null, "", TAB_HASH[next]);
        }}
        className="w-full"
      >
        <div className="flex justify-center pb-8">
          <TabsList className="inline-flex h-auto p-2 bg-glass-panel/10 backdrop-blur-xl rounded-full border border-white/5 shadow-2xl">
            {availableTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300",
                  "data-[state=active]:text-primary data-[state=active]:bg-transparent",
                  "hover:text-foreground/80 hover:bg-white/5",
                  "border-none shadow-none focus-visible:ring-2 focus-visible:ring-primary/20"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="deep-dive-pill"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-accent/5 blur-md" />
                  </motion.div>
                )}
                <span className="relative z-10">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pt-4"
          >
            {renderTabContent(activeTab)}
          </motion.div>
        </AnimatePresence>
      </Tabs>

      <Dialog
        open={detailOpen}
        onOpenChange={(open) => {
          if (!open) closeDetail();
        }}
      >
        <DialogContent className="max-w-3xl rounded-[2.5rem] p-8 md:p-12 border-white/5 bg-glass-panel/60 backdrop-blur-3xl">
          {detail?.type === "project" && detailProject && (
            <DialogHeader className="space-y-6">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-3xl md:text-5xl font-bold tracking-tight">{detailProject.title}</DialogTitle>
                <Badge variant="outline" className="text-xs font-mono">{detailProject.year}</Badge>
              </div>
              <DialogDescription className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {detailProject.longDescription ?? detailProject.description}
              </DialogDescription>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4">
                {detailProject.links.github && (
                  <Button variant="outline" className="rounded-full h-12" asChild>
                    <a href={detailProject.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" /> GitHub
                    </a>
                  </Button>
                )}
                {detailProject.links.demo && (
                  <Button className="rounded-full h-12 bg-primary text-primary-foreground" asChild>
                    <a href={detailProject.links.demo} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" /> Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </DialogHeader>
          )}

          {detail?.type === "stack" && detailStack && (
            <DialogHeader className="space-y-6">
              <DialogTitle className="text-4xl font-bold tracking-tight">{detailStack.name}</DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
                {detailStack.description}
              </DialogDescription>
              <div className="flex flex-wrap gap-3">
                {detailStack.items.map((t) => (
                  <Badge key={t} variant="secondary" className="px-4 py-2 rounded-full font-medium">{t}</Badge>
                ))}
              </div>
            </DialogHeader>
          )}

          {detail?.type === "book" && detailBook && (
            <div className="grid gap-12 md:grid-cols-[0.4fr_0.6fr]">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <Image src={detailBook.cover} alt={detailBook.title} fill className="object-cover" />
              </div>
              <DialogHeader className="space-y-6">
                <div className="space-y-2">
                  <DialogTitle className="text-3xl font-bold tracking-tight">{detailBook.title}</DialogTitle>
                  <p className="text-xl text-primary font-medium">{detailBook.author}</p>
                </div>
                <div className="space-y-4">
                  <h5 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Key Takeaway</h5>
                  <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6">
                    {detailBook.takeaway}
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <Badge variant="secondary" className="px-4 py-1.5 rounded-full">{detailBook.category}</Badge>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className={cn("h-4 w-4", i < detailBook.rating ? "text-amber-400" : "text-border")} />
                    ))}
                  </div>
                </div>
              </DialogHeader>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
