import Link from "next/link";
import { notFound } from "next/navigation";

import { techStack } from "@/config/tech-stack";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default async function StackCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = techStack.find((c) => toSlug(c.name) === slug);
  if (!category) notFound();

  const Icon = category.icon;

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <Icon className="h-6 w-6 text-muted-foreground" />
              {category.name}
            </h1>
            <Badge variant="ghost" className="font-mono text-[11px]">
              stack/{slug}
            </Badge>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {category.description}
          </p>

          <Button variant="outline" size="sm" asChild>
            <Link href="/#stack">
              <ExternalLink className="h-4 w-4" />
              Back to Stack
            </Link>
          </Button>
        </header>

        <Separator className="opacity-60" />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Tools</h2>
          <div className="flex flex-wrap gap-2">
            {category.items.map((item) => (
              <Badge key={item.id} variant="secondary" className="text-[11px]">
                {item.name}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
