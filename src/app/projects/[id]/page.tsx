import Link from "next/link";
import { notFound } from "next/navigation";

import { projects } from "@/config/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github, Globe } from "lucide-react";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {project.title}
            </h1>
            <Badge variant="ghost" className="font-mono text-[11px]">
              project/{project.id}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-[11px]">
              {project.status}
            </Badge>
            {project.featured && (
              <Badge variant="emerald" className="text-[11px]">
                featured
              </Badge>
            )}
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {project.longDescription ?? project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/#projects">
                <ExternalLink className="h-4 w-4" />
                Back to Deep Dive
              </Link>
            </Button>
            {project.links.github && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
            {project.links.demo && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                  Demo
                </a>
              </Button>
            )}
            {project.links.article && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.links.article} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Notes
                </a>
              </Button>
            )}
          </div>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <>
            <Separator className="opacity-60" />
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Key Metrics</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-5"
                  >
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                    <div className="font-mono text-foreground text-lg">{m.value}</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
