import Link from "next/link";
import { notFound } from "next/navigation";

import { blogPosts } from "@/config/posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

export default async function WritingPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 space-y-10">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {post.title}
            </h1>
            <Badge variant="ghost" className="font-mono text-[11px]">
              post/{post.id}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          <Button variant="outline" size="sm" asChild>
            <Link href="/#writing">
              <ExternalLink className="h-4 w-4" />
              Back to Writing
            </Link>
          </Button>
        </header>

        <Separator className="opacity-60" />

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h2>Draft</h2>
          <p>
            This post page is live and shareable, but the full content is still being written.
          </p>
          <p>
            If you want, I can generate a clean long-form structure (sections, diagrams, and key takeaways) and
            you can fill it in over time.
          </p>
        </article>
      </div>
    </div>
  );
}
