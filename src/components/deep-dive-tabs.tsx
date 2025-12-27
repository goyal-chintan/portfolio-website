"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Info,
  Star,
  Sparkles,
  BookOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { content } from "@/config/content.generated";
import { projects } from "@/config/projects";
import { techStack, techDomains } from "@/config/tech-stack";
import { books } from "@/config/books";
import { blogPosts } from "@/config/posts";
import { thoughts } from "@/config/thoughts";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const copy = content.copy;

type TabId = "about" | "projects" | "writing" | "stack" | "library" | "thoughts";

type DetailState =
  | { type: "story" }
  | { type: "journey"; id: string }
  | { type: "milestone"; id: string; index: number }
  | { type: "book"; id: string }
  | { type: "spotlight"; id: string };

const TAB_HASH: Record<TabId, string> = {
  about: "#about",
  projects: "#projects",
  writing: "#writing",
  stack: "#stack",
  library: "#library",
  thoughts: "#thoughts",
};

const HASH_TAB: Record<string, TabId> = Object.fromEntries(
  Object.entries(TAB_HASH).map(([key, value]) => [value, key as TabId])
);

const tabs: { id: TabId; label: string }[] = [
  { id: "about", label: copy.tabs.about },
  { id: "projects", label: copy.tabs.projects },
  { id: "writing", label: copy.tabs.writing },
  { id: "stack", label: copy.tabs.stack },
  { id: "library", label: copy.tabs.library },
  { id: "thoughts", label: copy.tabs.thoughts },
];

export function DeepDiveTabs() {
  const [activeTab, setActiveTab] = React.useState<TabId>("projects");
  const [detail, setDetail] = React.useState<DetailState | null>(null);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [expandedLifestyleId, setExpandedLifestyleId] = React.useState<string | null>(null);
  const [selectedDomainId, setSelectedDomainId] = React.useState<string | null>(null);
  const tabListRef = React.useRef<HTMLDivElement | null>(null);

  const profile = content.profile;
  const about = profile.about;

  const setTab = React.useCallback((tabId: TabId, shouldScroll: boolean) => {
    setActiveTab(tabId);
    window.history.pushState(null, "", TAB_HASH[tabId]);
    if (shouldScroll) {
      document.querySelector("#deep-dive")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash && HASH_TAB[hash]) {
      setActiveTab(HASH_TAB[hash]);
    }
  }, []);

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && HASH_TAB[hash]) {
        setActiveTab(HASH_TAB[hash]);
      }
    };

    const handleDeepDiveEvent = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const next = event.detail as TabId;
      if (TAB_HASH[next]) {
        setTab(next, true);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    window.addEventListener("deepDiveTabChange", handleDeepDiveEvent as EventListener);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
      window.removeEventListener("deepDiveTabChange", handleDeepDiveEvent as EventListener);
    };
  }, [setTab]);

  React.useEffect(() => {
    const tabList = tabListRef.current;
    if (!tabList) return;
    const activeButton = tabList.querySelector<HTMLButtonElement>(`[data-tab-id=\"${activeTab}\"]`);
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeTab]);

  const openDetail = (next: DetailState) => {
    setDetail(next);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    window.setTimeout(() => setDetail(null), 180);
  };

  const spotlights = projects
    .filter((project) => project.spotlight)
    .sort((a, b) => (a.spotlightOrder ?? 0) - (b.spotlightOrder ?? 0));
  const primarySpotlight = spotlights.find((p) => p.spotlight === "primary") ?? spotlights[0];
  const secondarySpotlights = spotlights.filter((p) => p.id !== primarySpotlight?.id);
  const spotlightIds = new Set(spotlights.map((project) => project.id));

  const openSourceProjects = projects.filter(
    (project) => project.openSource && !spotlightIds.has(project.id)
  );
  const professionalProjects = projects.filter(
    (project) => !project.openSource && !spotlightIds.has(project.id)
  );

  const story = about.site_story;

  const mapEdges = React.useMemo(() => {
    const edges: { from: string; to: string }[] = [];
    const domains = techDomains.map((domain) => domain.id).sort();
    const domainPairs: [string, string][] = [];
    for (let i = 0; i < domains.length; i += 1) {
      for (let j = i + 1; j < domains.length; j += 1) {
        domainPairs.push([domains[i], domains[j]]);
      }
    }
    const items = techStack.flatMap((category) => category.items);
    for (const [a, b] of domainPairs) {
      let overlap = 0;
      for (const item of items) {
        if (item.domains.includes(a) && item.domains.includes(b)) {
          overlap += 1;
        }
      }
      if (overlap >= 3) {
        edges.push({ from: a, to: b });
      }
    }
    return edges;
  }, []);

  const selectedDomain = selectedDomainId
    ? techDomains.find((domain) => domain.id === selectedDomainId)
    : null;

  const renderAbout = () => (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold tracking-tight text-foreground">{copy.tabs.about}</h3>
        <p className="text-muted-foreground max-w-2xl text-lg">
          {about.headline}
        </p>
      </div>

      <div className="card-glass-static p-6 md:p-8">
        <div className="space-y-3">
          <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
            {copy.about.currentFocusTitle}
          </div>
          <p className="text-lg text-foreground/90 leading-relaxed">
            {about.current_focus}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h4 className="text-xl font-semibold tracking-tight">{copy.about.systemSpecsTitle}</h4>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            {copy.about.systemSpecsKicker}
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {about.lifestyle.map((item) => {
            const isExpanded = expandedLifestyleId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setExpandedLifestyleId((prev) => (prev === item.id ? null : item.id))
                }
                className={cn(
                  "card-glass p-5 text-left transition-all",
                  "focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)]",
                  "hover:-translate-y-[2px] hover:border-[var(--ds-card-border-hover)]"
                )}
                aria-expanded={isExpanded}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                      {item.title}
                    </div>
                    <div className="text-base font-semibold text-foreground">
                      {item.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.detail}
                    </div>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {isExpanded ? copy.global.close : copy.global.details}
                  </span>
                </div>
                <div
                  className={cn(
                    "mt-4 text-sm text-muted-foreground leading-relaxed transition-all",
                    isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                    isExpanded ? "" : "overflow-hidden"
                  )}
                  style={{ transitionDuration: "var(--ds-dur-expand)", transitionTimingFunction: "var(--ds-ease)" }}
                >
                  {item.why}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-semibold tracking-tight">{copy.about.journeyTitle}</h4>
        <div className="relative border-l border-border/30 ml-2 space-y-8">
          {about.journey.map((step) => {
            const isActive = (step as { active?: boolean }).active === true;
            const milestones = step.milestones ?? [];
            const visibleMilestones = milestones.slice(0, 4);
            const overflowCount = Math.max(milestones.length - 4, 0);
            return (
              <div
                key={step.id}
                role="button"
                tabIndex={0}
                className={cn(
                  "relative pl-8 rounded-2xl py-4 pr-4 transition-colors cursor-pointer",
                  "hover:bg-[var(--ds-surface-3)] focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)]"
                )}
                onClick={() => openDetail({ type: "journey", id: step.id })}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openDetail({ type: "journey", id: step.id });
                  }
                }}
              >
                <div
                  className={cn(
                    "absolute -left-[6px] top-6 w-3 h-3 rounded-full border-4 border-background",
                    isActive ? "bg-[var(--ds-accent)]" : "bg-muted-foreground/40"
                  )}
                />
                <div className="space-y-2">
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    {step.period}
                  </div>
                  <div className="text-lg font-semibold tracking-tight text-foreground">
                    {step.role}
                  </div>
                  <div className="text-sm text-muted-foreground">{step.company}</div>
                  <div className="text-sm text-muted-foreground/90 leading-relaxed">
                    {step.summary}
                  </div>
                  {milestones.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground/70">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-[var(--ds-accent)]/70" />
                        {copy.about.milestonesLabel}
                      </span>
                      {visibleMilestones.map((milestone, index) => (
                        <button
                          key={`${step.id}-${milestone.title}`}
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openDetail({ type: "milestone", id: step.id, index });
                          }}
                          className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)]"
                        >
                          <span className="line-clamp-1">{milestone.title}</span>
                        </button>
                      ))}
                      {overflowCount > 0 && (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openDetail({ type: "journey", id: step.id });
                          }}
                          className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)]"
                        >
                          +{overflowCount}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-semibold tracking-tight">{copy.about.designStoryTitle}</h4>
        <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
          {about.site_story.short}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {about.site_story.long_outline.map((section) => (
            <div key={section.title} className="card-glass-static p-5 space-y-2">
              <div className="text-sm font-semibold tracking-tight text-foreground">
                {section.title}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold tracking-tight">{copy.tabs.projects}</h3>
      </div>

      {primarySpotlight && (
        <div className="space-y-6">
          <h4 className="text-lg font-semibold tracking-tight">
            {copy.projects.featuredTitle}
          </h4>
          <div className="card-glass p-8 md:p-10 transition-all hover:-translate-y-[2px] hover:border-[var(--ds-card-border-hover)]">
            <button
              type="button"
              onClick={() => openDetail({ type: "spotlight", id: primarySpotlight.id })}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {primarySpotlight.year}
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {primarySpotlight.title}
                  </h4>
                  {primarySpotlight.brief && (
                    <p className="text-muted-foreground text-base max-w-2xl">
                      {primarySpotlight.brief.thesis}
                    </p>
                  )}
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {copy.global.openMissionBrief}
                </span>
              </div>
              {primarySpotlight.brief?.proof && (
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {primarySpotlight.brief.proof.slice(0, 3).map((proof) => (
                    <li key={proof}>• {proof}</li>
                  ))}
                </ul>
              )}
            </button>
          </div>

          {secondarySpotlights.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {secondarySpotlights.map((project) => (
                <div
                  key={project.id}
                  className="card-glass p-6 transition-all hover:-translate-y-[2px] hover:border-[var(--ds-card-border-hover)]"
                >
                  <button
                    type="button"
                    onClick={() => openDetail({ type: "spotlight", id: project.id })}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-2">
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                          {project.year}
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {project.title}
                        </div>
                        {project.brief && (
                          <p className="text-sm text-muted-foreground">
                            {project.brief.thesis}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        {copy.global.openMissionBrief}
                      </span>
                    </div>
                    {project.brief?.proof && (
                      <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
                        {project.brief.proof.slice(0, 2).map((proof) => (
                          <li key={proof}>• {proof}</li>
                        ))}
                      </ul>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-10">
        {openSourceProjects.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-tight">{copy.projects.openSourceTitle}</h4>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {openSourceProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {professionalProjects.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold tracking-tight">{copy.projects.professionalTitle}</h4>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {professionalProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderWriting = () => (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold tracking-tight">{copy.writing.title}</h3>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post, index) => {
          const isFeatured = index === 0;
          return (
            <Link
              key={post.id}
              href={`/writing/${post.slug}`}
              className={cn(
                "group relative rounded-3xl border transition-all",
                "hover:-translate-y-[2px] hover:border-[var(--ds-card-border-hover)]",
                isFeatured
                  ? "p-8 md:p-12 bg-[var(--ds-surface-2)]"
                  : "card-glass p-6 md:p-8"
              )}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground/70">
                  <span>{post.date}</span>
                  <span>{copy.footer.separator}</span>
                  <span>{post.readTime}</span>
                </div>

                <div className="space-y-3">
                  <h4
                    className={cn(
                      "font-bold text-foreground group-hover:text-[var(--ds-text)]",
                      isFeatured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                    )}
                  >
                    {post.title}
                  </h4>
                  <p
                    className={cn(
                      "text-muted-foreground leading-relaxed",
                      isFeatured ? "text-lg max-w-3xl" : "text-base line-clamp-2 max-w-2xl"
                    )}
                  >
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1 rounded-full text-[11px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  const renderStack = () => (
    <div className="space-y-12">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold tracking-tight">{copy.stack.title}</h3>
        <p className="text-muted-foreground max-w-2xl text-lg">
          {copy.stack.subtitle}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.48fr_0.52fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setSelectedDomainId(null)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest border transition-colors",
                !selectedDomainId
                  ? "border-[var(--ds-border-strong)] text-[var(--ds-text)]"
                  : "border-border text-muted-foreground"
              )}
            >
              {copy.stack.allDomains}
            </button>
            {techDomains.map((domain) => (
              <button
                key={domain.id}
                type="button"
                onClick={() =>
                  setSelectedDomainId((prev) => (prev === domain.id ? null : domain.id))
                }
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest border transition-colors",
                  selectedDomainId === domain.id
                    ? "border-[var(--ds-border-strong)] text-[var(--ds-text)]"
                    : "border-border text-muted-foreground"
                )}
              >
                {domain.label}
              </button>
            ))}
          </div>

          <div
            className="relative hidden lg:block w-full rounded-[32px] border border-border/40 bg-[var(--ds-surface-1)]"
            style={{ aspectRatio: "1.05", minHeight: "420px", maxHeight: "560px" }}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {mapEdges.map((edge) => {
                const from = techDomains.find((domain) => domain.id === edge.from);
                const to = techDomains.find((domain) => domain.id === edge.to);
                if (!from || !to) return null;
                const isActive = selectedDomainId && (edge.from === selectedDomainId || edge.to === selectedDomainId);
                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isActive ? "var(--ds-accent-glow)" : "var(--ds-border)"}
                    strokeWidth={isActive ? 1.5 : 1}
                    strokeDasharray={isActive ? "0" : "4 10"}
                  />
                );
              })}
            </svg>
            {techDomains.map((domain) => {
              const isSelected = selectedDomainId === domain.id;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() =>
                    setSelectedDomainId((prev) => (prev === domain.id ? null : domain.id))
                  }
                  className={cn(
                    "absolute flex flex-col items-start gap-1 rounded-2xl border px-4 py-3 min-w-[168px] h-11 text-left",
                    "transition-all duration-[var(--ds-dur-lens)]",
                    isSelected
                      ? "border-[var(--ds-border-strong)] text-[var(--ds-text)] shadow-[0_0_30px_rgba(56,189,248,0.25)]"
                      : "border-border text-muted-foreground"
                  )}
                  style={{ top: `${domain.y}%`, left: `${domain.x}%`, transform: "translate(-50%, -50%)" }}
                >
                  <span className="text-xs font-mono uppercase tracking-widest">
                    {domain.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground line-clamp-1">
                    {domain.summary}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground/60">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--ds-accent)]" /> {copy.stack.primaryExpertise}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--ds-accent)]/60" /> {copy.stack.strongFoundation}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40" /> {copy.stack.workingKnowledge}
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card-glass-static p-6">
            {!selectedDomain && (
              <div className="space-y-3">
                <h4 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                  {copy.stack.howToReadTitle}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {copy.stack.howToReadBody}
                </p>
              </div>
            )}
            {selectedDomain && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {copy.stack.proofTitle}
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    {selectedDomain.label}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedDomain.summary}
                  </p>
                </div>
                <div className="space-y-3">
                  {selectedDomain.proof.projects.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        {copy.tabs.projects}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {selectedDomain.proof.projects.slice(0, 3).map((pid) => {
                          const project = projects.find((item) => item.id === pid);
                          if (!project) return null;
                          const href = project.links.github || undefined;
                          if (href) {
                            return (
                              <a
                                key={pid}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold uppercase tracking-widest text-[var(--ds-accent)]"
                              >
                                {project.title}
                              </a>
                            );
                          }
                          return (
                            <button
                              key={pid}
                              type="button"
                              onClick={() => setTab("projects", true)}
                              className="text-xs font-semibold uppercase tracking-widest text-[var(--ds-accent)]"
                            >
                              {project.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {selectedDomain.proof.writing.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        {copy.tabs.writing}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {selectedDomain.proof.writing.slice(0, 2).map((wid) => (
                          <Link
                            key={wid}
                            href={`/writing/${wid}`}
                            className="text-xs font-semibold uppercase tracking-widest text-[var(--ds-accent)]"
                          >
                            {wid.replace(/-/g, " ")}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {(["expert", "strong", "working"] as const).map((level) => {
            const items = techStack
              .flatMap((category) => category.items)
              .filter((item) => item.level === level);
            if (items.length === 0) return null;
            const title =
              level === "expert"
                ? copy.stack.primaryExpertise
                : level === "strong"
                  ? copy.stack.strongFoundation
                  : copy.stack.workingKnowledge;
            return (
              <div key={level} className="space-y-4">
                <h4 className="text-lg font-semibold tracking-tight">{title}</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((item) => {
                    const isMatch = !selectedDomainId || item.domains.includes(selectedDomainId);
                    return (
                      <div
                        key={item.id}
                        className="card-glass-static px-4 py-3"
                        style={{
                          opacity: isMatch ? 1 : 0.42,
                          filter: isMatch ? "none" : "saturate(0.85)",
                          transition: `opacity var(--ds-dur-lens) var(--ds-ease)`
                        }}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div
                              className={cn(
                                "text-sm font-semibold",
                                level === "expert" && "text-[var(--ds-text)]",
                                level === "strong" && "text-[var(--ds-text-2)]",
                                level === "working" && "text-muted-foreground"
                              )}
                            >
                              {item.name}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {item.domains
                                .map((domainId) =>
                                  techDomains.find((domain) => domain.id === domainId)?.label ?? domainId
                                )
                                .join(" • ")}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold tracking-tight">{copy.library.title}</h3>
        <p className="text-muted-foreground max-w-2xl text-lg">
          {copy.library.emptyBody}
        </p>
      </div>

      {books.length === 0 && (
        <div className="card-glass-static p-10 text-center">
          <h4 className="text-lg font-semibold text-foreground">{copy.library.emptyTitle}</h4>
          <p className="text-muted-foreground mt-2">{copy.library.emptyBody}</p>
        </div>
      )}

      {books.length > 0 && (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <button
              key={book.id}
              type="button"
              onClick={() => openDetail({ type: "book", id: book.id })}
              className="group relative text-left"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border shadow-xl transition-all group-hover:border-[var(--ds-border-strong)]">
                <Image src={book.cover} alt={book.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <BookOpen className="h-7 w-7 text-white/80" />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <h4 className="font-semibold text-sm line-clamp-1">{book.title}</h4>
                <p className="text-xs text-muted-foreground">{book.author}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderThoughts = () => (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold tracking-tight">{copy.thoughts.title}</h3>
        <p className="text-muted-foreground max-w-2xl text-lg">
          {copy.thoughts.emptyBody}
        </p>
      </div>
      {thoughts.length === 0 && (
        <div className="card-glass-static p-10 text-center">
          <h4 className="text-lg font-semibold text-foreground">{copy.thoughts.emptyTitle}</h4>
          <p className="text-muted-foreground mt-2">{copy.thoughts.emptyBody}</p>
        </div>
      )}
      {thoughts.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {thoughts.map((thought) => (
            <div key={thought.id} className="card-glass-static p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  <span>Index: {thought.id}</span>
                  <span>{thought.date}</span>
                </div>
                <p className="text-xl md:text-2xl font-light italic text-foreground/90 leading-relaxed">
                  &ldquo;{thought.content}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return renderAbout();
      case "projects":
        return renderProjects();
      case "writing":
        return renderWriting();
      case "stack":
        return renderStack();
      case "library":
        return renderLibrary();
      case "thoughts":
        return renderThoughts();
      default:
        return null;
    }
  };

  const detailBook = detail?.type === "book" ? books.find((b) => b.id === detail.id) : undefined;
  const detailJourney = detail?.type === "journey" ? about.journey.find((j) => j.id === detail.id) : undefined;
  const detailMilestone =
    detail?.type === "milestone"
      ? about.journey.find((j) => j.id === detail.id)?.milestones?.[detail.index]
      : undefined;
  const detailSpotlight = detail?.type === "spotlight"
    ? projects.find((project) => project.id === detail.id)
    : undefined;

  return (
    <div id="deep-dive" className="space-y-12 scroll-mt-40">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          {copy.deepDive.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          {copy.deepDive.subtitle}
        </p>
        <button
          type="button"
          onClick={() => openDetail({ type: "story" })}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-[var(--ds-surface-3)] px-4 py-2 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)]"
        >
          <Info className="h-4 w-4" />
          {copy.deepDive.storyButton}
        </button>
      </div>

      <div className="sticky top-24 z-30 flex justify-center">
        <div
          ref={tabListRef}
          className="inline-flex items-center gap-2 rounded-full px-2 py-[6px] overflow-x-auto no-scrollbar"
          style={{
            background: "var(--ds-seg-bg)",
            border: "1px solid var(--ds-seg-border)",
            borderRadius: "var(--ds-radius-pill)",
            backdropFilter: "blur(var(--ds-blur-card))",
            boxShadow: "var(--ds-shadow-sm)",
            height: "var(--ds-seg-height)",
          }}
          role="tablist"
          aria-label="Deep Dive Tabs"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-tab-id={tab.id}
                onClick={() => setTab(tab.id, false)}
                className={cn(
                  "relative px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                  "focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)]",
                  isActive ? "text-foreground" : "text-muted-foreground",
                  "hover:text-foreground hover:bg-[var(--ds-seg-hover)]"
                )}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--ds-seg-pill)" }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="pt-4 transition-[opacity,transform] duration-[var(--ds-dur-tab)]"
        style={{
          transitionTimingFunction: "var(--ds-ease)",
        }}
      >
        {renderContent()}
      </div>

      <Dialog
        open={detailOpen}
        onOpenChange={(open) => {
          if (!open) closeDetail();
        }}
      >
        <DialogContent
          className="max-w-[760px] max-h-[80vh] overflow-y-auto rounded-[var(--ds-radius-sheet)] border border-[var(--ds-border)] bg-[var(--ds-surface-2)] p-8 md:p-10 shadow-[var(--ds-shadow-lg)]"
        >
          {detail?.type === "story" && story && (
            <DialogHeader className="space-y-6">
              <div className="space-y-2">
                <DialogTitle className="text-3xl font-bold tracking-tight">
                  {copy.storySheet.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-muted-foreground">
                  {copy.storySheet.subtitle}
                </DialogDescription>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {copy.storySheet.intentTitle}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {story.short}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {copy.storySheet.outlineTitle}
                  </div>
                  <div className="grid gap-4">
                    {story.long_outline.map((section) => (
                      <div key={section.title} className="rounded-2xl border border-border/40 p-4">
                        <div className="text-sm font-semibold text-foreground">
                          {section.title}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {copy.storySheet.interactionTitle}
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>{copy.storySheet.interactionA}</li>
                    <li>{copy.storySheet.interactionB}</li>
                    <li>{copy.storySheet.interactionC}</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {copy.storySheet.qualityTitle}
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {copy.storySheet.qualityBullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      closeDetail();
                      setTab("projects", true);
                    }}
                    className="rounded-full px-5 py-2 text-sm font-semibold text-[var(--ds-btn-primary-text)]"
                    style={{
                      background: "var(--ds-btn-primary-bg)",
                      border: "1px solid var(--ds-btn-primary-border)",
                      boxShadow: "var(--ds-btn-primary-shadow)",
                    }}
                  >
                    {copy.storySheet.primaryCta}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeDetail();
                      window.location.hash = "#contact";
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="rounded-full px-5 py-2 text-sm font-semibold"
                    style={{
                      background: "var(--ds-btn-secondary-bg)",
                      border: "1px solid var(--ds-btn-secondary-border)",
                      color: "var(--ds-btn-secondary-text)",
                      boxShadow: "var(--ds-btn-secondary-shadow)",
                    }}
                  >
                    {copy.storySheet.secondaryCta}
                  </button>
                </div>
              </div>
            </DialogHeader>
          )}

          {detail?.type === "journey" && detailJourney && (
            <DialogHeader className="space-y-6">
              <div className="space-y-2">
                <DialogTitle className="text-3xl font-bold tracking-tight">
                  {detailJourney.role}
                </DialogTitle>
                <p className="text-lg text-muted-foreground">{detailJourney.company}</p>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {detailJourney.period}
                </p>
              </div>
              <DialogDescription className="text-lg text-muted-foreground">
                {detailJourney.summary}
              </DialogDescription>
              {detailJourney.highlights && detailJourney.highlights.length > 0 && (
                <div className="space-y-2">
                  <ul className="space-y-2 text-muted-foreground">
                    {detailJourney.highlights.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </DialogHeader>
          )}

          {detail?.type === "milestone" && detailMilestone && (
            <DialogHeader className="space-y-6">
              <div className="space-y-2">
                <DialogTitle className="text-3xl font-bold tracking-tight">
                  {detailMilestone.title}
                </DialogTitle>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {detailMilestone.date}
                </p>
              </div>
              <DialogDescription className="text-lg text-muted-foreground">
                {detailMilestone.detail}
              </DialogDescription>
              {(detailMilestone.evidence?.projects?.length || detailMilestone.evidence?.writing?.length) && (
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    Evidence
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {detailMilestone.evidence?.projects?.map((pid) => (
                      <button
                        key={pid}
                        type="button"
                        onClick={() => {
                          closeDetail();
                          setTab("projects", true);
                        }}
                        className="text-xs font-semibold uppercase tracking-widest text-[var(--ds-accent)]"
                      >
                        {copy.tabs.projects}: {pid}
                      </button>
                    ))}
                    {detailMilestone.evidence?.writing?.map((wid) => (
                      <Link
                        key={wid}
                        href={`/writing/${wid}`}
                        className="text-xs font-semibold uppercase tracking-widest text-[var(--ds-accent)]"
                      >
                        {copy.tabs.writing}: {wid}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </DialogHeader>
          )}

          {detail?.type === "book" && detailBook && (
            <div className="grid gap-10 md:grid-cols-[0.4fr_0.6fr]">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                <Image src={detailBook.cover} alt={detailBook.title} fill className="object-cover" />
              </div>
              <DialogHeader className="space-y-6">
                <div className="space-y-2">
                  <DialogTitle className="text-3xl font-bold tracking-tight">
                    {detailBook.title}
                  </DialogTitle>
                  <p className="text-lg text-muted-foreground">{detailBook.author}</p>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {copy.library.detailsLabel}
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {detailBook.takeaway}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="px-4 py-1.5 rounded-full">
                    {detailBook.category}
                  </Badge>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Sparkles
                        key={index}
                        className={cn(
                          "h-4 w-4",
                          index < detailBook.rating ? "text-amber-400" : "text-border"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </DialogHeader>
            </div>
          )}

          {detail?.type === "spotlight" && detailSpotlight?.brief && (
            <DialogHeader className="space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {copy.spotlight.briefTitle}
                </div>
                <DialogTitle className="text-3xl font-bold tracking-tight">
                  {detailSpotlight.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-muted-foreground">
                  {detailSpotlight.brief.thesis}
                </DialogDescription>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {copy.spotlight.problem}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {detailSpotlight.brief.problem}
                  </p>
                </div>

                {detailSpotlight.brief.constraints.length > 0 && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {copy.spotlight.constraints}
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {detailSpotlight.brief.constraints.slice(0, 3).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {detailSpotlight.brief.approach.length > 0 && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {copy.spotlight.approach}
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {detailSpotlight.brief.approach.slice(0, 3).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {detailSpotlight.brief.proof.length > 0 && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {copy.spotlight.proof}
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {detailSpotlight.brief.proof.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {copy.spotlight.next}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {detailSpotlight.brief.next}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {detailSpotlight.links.github ? (
                    <a
                      href={detailSpotlight.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full px-5 py-2 text-sm font-semibold text-[var(--ds-btn-primary-text)]"
                      style={{
                        background: "var(--ds-btn-primary-bg)",
                        border: "1px solid var(--ds-btn-primary-border)",
                        boxShadow: "var(--ds-btn-primary-shadow)",
                      }}
                    >
                      {copy.spotlight.primaryCtaGithub}
                    </a>
                  ) : (
                    <Link
                      href={detailSpotlight.links.resume ?? "/#contact"}
                      className="rounded-full px-5 py-2 text-sm font-semibold text-[var(--ds-btn-primary-text)]"
                      style={{
                        background: "var(--ds-btn-primary-bg)",
                        border: "1px solid var(--ds-btn-primary-border)",
                        boxShadow: "var(--ds-btn-primary-shadow)",
                      }}
                    >
                      {copy.spotlight.primaryCtaRequest}
                    </Link>
                  )}
                  {detailSpotlight.brief.writingId && (
                    <Link
                      href={`/writing/${detailSpotlight.brief.writingId}`}
                      className="rounded-full px-5 py-2 text-sm font-semibold"
                      style={{
                        background: "var(--ds-btn-secondary-bg)",
                        border: "1px solid var(--ds-btn-secondary-border)",
                        color: "var(--ds-btn-secondary-text)",
                        boxShadow: "var(--ds-btn-secondary-shadow)",
                      }}
                    >
                      {copy.spotlight.secondaryCtaWriting}
                    </Link>
                  )}
                </div>
              </div>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const primaryLink = project.links.github ?? project.links.resume;
  const isClickable = Boolean(primaryLink);
  const hasGithub = Boolean(project.links.github);
  return (
    <div
      className={cn(
        "group card-glass p-6 md:p-7 flex flex-col justify-between relative",
        isClickable ? "cursor-pointer" : "cursor-default"
      )}
    >
      {primaryLink && (
        hasGithub ? (
          <a
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 rounded-2xl"
            aria-label={`Open ${project.title} on GitHub`}
          />
        ) : (
          <Link
            href={primaryLink}
            className="absolute inset-0 z-10 rounded-2xl"
            aria-label={`Open ${project.title}`}
          />
        )
      )}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            {project.year}
          </span>
          {primaryLink && <ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-bold tracking-tight">{project.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pt-6">
        {project.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="secondary" className="px-2 py-0 text-[10px]">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex items-center justify-between pt-6 text-xs text-muted-foreground">
        {project.privacyNote && !project.links.github && (
          <span className="text-[11px] text-muted-foreground">{project.privacyNote}</span>
        )}
      </div>
    </div>
  );
}
