"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Content (config-driven)
import { projects } from "@/config/projects";
import { techStack } from "@/config/tech-stack";
import { books } from "@/config/books";
import { blogPosts } from "@/config/posts";
import { thoughts } from "@/config/thoughts";

import { isFeatureEnabled } from "@/lib/config-helpers";

import { ArrowUpRight, ExternalLink, Github, Globe, Sparkles } from "lucide-react";

type TabId = "projects" | "stack" | "library" | "writing" | "thoughts";

const TAB_HASH: Record<TabId, string> = {
  projects: "#projects",
  stack: "#stack",
  library: "#library",
  writing: "#writing",
  thoughts: "#thoughts",
};

function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const tabVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const transitionSettings = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function DeepDiveTabs() {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = React.useState<TabId>("projects");
  const [detail, setDetail] = React.useState<
    | { type: "project"; id: string }
    | { type: "stack"; name: string }
    | { type: "book"; id: string }
    | null
  >(null);

  const detailOpen = detail !== null;
  const closeDetail = () => setDetail(null);

  const availableTabs = [
    { id: "projects" as const, label: "Projects", enabled: true },
    { id: "stack" as const, label: "Stack", enabled: true },
    { id: "library" as const, label: "Library", enabled: isFeatureEnabled("showLibrary") },
    { id: "writing" as const, label: "Writing", enabled: isFeatureEnabled("showBlog") },
    { id: "thoughts" as const, label: "Thoughts", enabled: isFeatureEnabled("showThoughts") },
  ].filter((tab) => tab.enabled);

  React.useEffect(() => {
    const fromHash = (hash: string) => {
      const mapped = Object.entries(TAB_HASH).find(([, value]) => value === hash)?.[0] as TabId | undefined;
      if (!mapped) return;
      if (availableTabs.some((tab) => tab.id === mapped)) {
        setActiveTab(mapped);
        const deepDiveEl = document.querySelector("#deep-dive");
        deepDiveEl?.scrollIntoView({ behavior: "smooth" });
      }
    };

    fromHash(window.location.hash);

    const onHashChange = () => {
      fromHash(window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [availableTabs]);

  // Listen for deep-dive tab change events from command palette
  React.useEffect(() => {
    const handleTabChange = (event: CustomEvent<string>) => {
      const tabId = event.detail as TabId;
      const ok = availableTabs.some((tab) => tab.id === tabId);
      if (ok) setActiveTab(tabId);
      if (ok) window.history.pushState(null, "", TAB_HASH[tabId]);
    };

    window.addEventListener("deepDiveTabChange", handleTabChange as EventListener);
    return () => window.removeEventListener("deepDiveTabChange", handleTabChange as EventListener);
  }, [availableTabs]);

  const renderTabContent = (tabId: TabId) => {
    switch (tabId) {
      case "projects":
        return (
          <div className="space-y-8">
            <div className="flex items-end justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight">Projects</h3>
                <p className="text-muted-foreground max-w-2xl">
                  Systems I’ve designed and shipped — focused on scale, reliability, and leverage.
                </p>
              </div>
              <Badge variant="ghost" className="hidden md:inline-flex font-mono text-[11px]">
                signal/projects:{projects.length}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <motion.button
                  key={p.id}
                  type="button"
                  whileHover={reducedMotion ? undefined : { y: -2 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onClick={() => setDetail({ type: "project", id: p.id })}
                  className="group text-left rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-6 transition-colors hover:border-border hover:bg-card/55"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-semibold text-foreground">{p.title}</h4>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {p.status === "production" && (
                        <Badge variant="emerald" className="text-[10px]">production</Badge>
                      )}
                      {p.status === "development" && (
                        <Badge variant="accent" className="text-[10px]">building</Badge>
                      )}
                      {p.status === "archived" && (
                        <Badge variant="ghost" className="text-[10px]">archived</Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 7).map((t) => (
                      <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                    ))}
                    {p.tags.length > 7 && (
                      <Badge variant="outline" className="text-[10px]">+{p.tags.length - 7}</Badge>
                    )}
                  </div>

                  {p.metrics && p.metrics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      {p.metrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="flex items-baseline gap-2">
                          <span className="font-mono text-foreground">{m.value}</span>
                          <span>{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        );

      case "stack":
        return (
          <div className="space-y-8">
            <div className="flex items-end justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight">The Stack</h3>
                <p className="text-muted-foreground max-w-2xl">
                  Organized by “orbits” — each category is a stable layer in the platform.
                </p>
              </div>
              <Badge variant="ghost" className="hidden md:inline-flex font-mono text-[11px]">
                signal/categories:{techStack.length}
              </Badge>
            </div>

            <div className="grid gap-4">
              {techStack.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={cat.name}
                    type="button"
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    onClick={() => setDetail({ type: "stack", name: cat.name })}
                    className="text-left rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-6 transition-colors hover:border-border hover:bg-card/55"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-muted-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-base font-semibold text-foreground">{cat.name}</div>
                        <div className="text-sm text-muted-foreground">{cat.description}</div>
                      </div>
                    </div>

                    <div className="mt-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="mt-4 flex flex-wrap gap-2">
                      {cat.items.slice(0, 10).map((t) => (
                        <Badge key={t} variant="secondary" className="text-[11px]">{t}</Badge>
                      ))}
                      {cat.items.length > 10 && (
                        <Badge variant="outline" className="text-[11px]">+{cat.items.length - 10}</Badge>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );

      case "library":
        return (
          <div className="space-y-8">
            <div className="flex items-end justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight">The Library</h3>
                <p className="text-muted-foreground max-w-2xl">
                  Books that shaped my engineering and leadership thinking.
                </p>
              </div>
              <Badge variant="ghost" className="hidden md:inline-flex font-mono text-[11px]">
                signal/books:{books.length}
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((b) => (
                <motion.button
                  key={b.id}
                  type="button"
                  whileHover={reducedMotion ? undefined : { y: -2 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onClick={() => setDetail({ type: "book", id: b.id })}
                  className="group text-left rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-6 transition-colors hover:border-border hover:bg-card/55"
                >
                  <div className="flex gap-4">
                    <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-muted/30">
                      <Image
                        src={b.cover}
                        alt={b.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>

                    <div className="min-w-0 space-y-2">
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground leading-snug flex items-start gap-2">
                          <span className="line-clamp-2">{b.title}</span>
                          <ArrowUpRight className="mt-0.5 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-sm text-muted-foreground">{b.author}</div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {b.takeaway}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case "writing":
        return (
          <div className="space-y-8">
            <div className="flex items-end justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight">Writing</h3>
                <p className="text-muted-foreground max-w-2xl">
                  Longer form notes — production lessons, architectural tradeoffs, and leadership.
                </p>
              </div>
              <Badge variant="ghost" className="hidden md:inline-flex font-mono text-[11px]">
                signal/posts:{blogPosts.length}
              </Badge>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl">
              <ul className="divide-y divide-border/50">
                {blogPosts.map((p) => (
                  <li
                    key={p.id}
                    className="p-5 md:p-6"
                  >
                    <Link
                      href={`/writing/${p.slug}`}
                      className="group block rounded-xl -m-2 p-2 transition-colors hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="space-y-1">
                          <div className="font-semibold text-foreground flex items-center gap-2">
                            <span>{p.title}</span>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {p.date} · {p.readTime}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl">
                            {p.excerpt}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {p.tags.slice(0, 3).map((t) => (
                            <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "thoughts":
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight">Short Thoughts</h3>
              <p className="text-muted-foreground max-w-2xl">
                Quick insights and observations from my journey.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {thoughts.map((thought) => (
                <motion.div
                  key={thought.id}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, ...transitionSettings }}
                  className="group rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-6 transition-all duration-200 hover:-translate-y-[2px] hover:border-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-muted-foreground">thought/{thought.id}</span>
                    <Sparkles className="h-4 w-4 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-foreground leading-relaxed mb-3">&ldquo;{thought.content}&rdquo;</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{thought.date}</span>
                    <span>❤️ {thought.likes}</span>
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
    <div id="deep-dive" data-deep-dive="observatory-tabs-v2" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Deep Dive</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the details behind my work, tools, reading, and thoughts.
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
        <TabsList className="grid w-full max-w-2xl mx-auto grid-flow-col auto-cols-fr">
          {availableTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          {availableTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-10">
              <motion.div
                key={tab.id}
                initial={reducedMotion ? { opacity: 0 } : "hidden"}
                animate={reducedMotion ? { opacity: 1 } : "visible"}
                exit={reducedMotion ? { opacity: 0 } : "exit"}
                variants={tabVariants}
                transition={transitionSettings}
              >
                {renderTabContent(tab.id)}
              </motion.div>
            </TabsContent>
          ))}
        </AnimatePresence>
      </Tabs>

      <Dialog
        open={detailOpen}
        onOpenChange={(open) => {
          if (!open) closeDetail();
        }}
      >
        <DialogContent className="max-w-2xl">
          {detail?.type === "project" && detailProject && (
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl">{detailProject.title}</DialogTitle>
              <DialogDescription className="text-base">
                {detailProject.longDescription ?? detailProject.description}
              </DialogDescription>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/projects/${detailProject.id}`}>
                    <ExternalLink className="h-4 w-4" />
                    Open page
                  </Link>
                </Button>
                {detailProject.links.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={detailProject.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
                {detailProject.links.demo && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={detailProject.links.demo} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                )}
                {detailProject.links.article && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={detailProject.links.article} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Notes
                    </a>
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {detailProject.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[11px]">{t}</Badge>
                ))}
              </div>

              {detailProject.metrics && detailProject.metrics.length > 0 && (
                <div className="pt-2 grid gap-2 md:grid-cols-2">
                  {detailProject.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-border/50 bg-muted/20 p-3"
                    >
                      <div className="text-xs text-muted-foreground">{m.label}</div>
                      <div className="font-mono text-foreground">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </DialogHeader>
          )}

          {detail?.type === "stack" && detailStack && (
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl">{detailStack.name}</DialogTitle>
              <DialogDescription className="text-base">{detailStack.description}</DialogDescription>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/stack/${toSlug(detailStack.name)}`}>
                    <ExternalLink className="h-4 w-4" />
                    Open page
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {detailStack.items.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[11px]">{t}</Badge>
                ))}
              </div>
            </DialogHeader>
          )}

          {detail?.type === "book" && detailBook && (
            <div className="grid gap-6 md:grid-cols-[0.35fr_0.65fr] items-start">
              <div className="relative aspect-[7/10] w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/20">
                <Image src={detailBook.cover} alt={detailBook.title} fill className="object-cover" />
              </div>
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-2xl">{detailBook.title}</DialogTitle>
                <DialogDescription className="text-base">{detailBook.author}</DialogDescription>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {detailBook.takeaway}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/library/${detailBook.id}`}>
                      <ExternalLink className="h-4 w-4" />
                      Open page
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="text-[11px]">{detailBook.category}</Badge>
                  <Badge variant="secondary" className="text-[11px]">rating:{detailBook.rating}/5</Badge>
                </div>
              </DialogHeader>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
