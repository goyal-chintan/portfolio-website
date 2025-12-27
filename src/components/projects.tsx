"use client";

import { projects, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { staggerItem } from "./motion";
import { ExternalLink, Github, Star, Sparkles, CheckCircle, Clock } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const statusIcons = {
    production: <CheckCircle className="h-3 w-3 text-emerald-500" />,
    development: <Clock className="h-3 w-3 text-amber-500" />,
    archived: <Sparkles className="h-3 w-3 text-muted-foreground" />,
  };

  const statusLabels = {
    production: "Production",
    development: "In Development",
    archived: "Archived",
  };

  return (
    <motion.div variants={staggerItem}>
      <div className="group h-full bento-item">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground group-hover:text-foreground dark:group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {statusIcons[project.status]}
                <span>{statusLabels[project.status]}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="h-3.5 w-3.5" />
              <span className="text-xs font-mono">{project.stars}</span>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm text-muted-foreground mb-4 flex-grow ${compact ? "line-clamp-2" : "line-clamp-3"}`}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, compact ? 3 : 5).map((tag) => (
              <Badge key={tag} variant="ghost" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > (compact ? 3 : 5) && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - (compact ? 3 : 5)}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-auto">
            {project.github && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {project.link && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  
  return (
    <div className="space-y-4 h-full overflow-hidden">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">Featured Work</h2>
        <p className="text-sm text-muted-foreground">Projects I&apos;m proud of</p>
      </div>
      
      <div className="space-y-3">
        {featured.slice(0, 2).map((project) => (
          <div key={project.id} className="group">
            <div className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-medium text-foreground group-hover:text-foreground dark:group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="h-3 w-3" />
                  <span className="text-xs font-mono">{project.stars}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="ghost" className="text-[10px] px-1.5 py-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="w-full"
        onClick={() => {
          const deepDiveEl = document.querySelector("#deep-dive");
          deepDiveEl?.scrollIntoView({ behavior: "smooth" });
          window.dispatchEvent(new CustomEvent("deepDiveTabChange", { detail: "projects" }));
          window.history.pushState(null, "", "#projects");
        }}
      >
        View all projects →
      </Button>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        <p className="text-muted-foreground">
          Building data systems that scale and AI tools that think
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}









