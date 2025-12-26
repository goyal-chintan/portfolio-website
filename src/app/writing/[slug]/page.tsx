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

  const renderBody = (body?: string) => {
    if (!body) return null;
    const lines = body.split(/\r?\n/);
    const blocks: Array<{ type: string; content: string[] }> = [];

    const pushBlock = (type: string, content: string[]) => {
      if (content.length) blocks.push({ type, content });
    };

    let current: string[] = [];
    let currentType = "paragraph";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        pushBlock(currentType, current);
        current = [];
        currentType = "paragraph";
        continue;
      }

      if (trimmed.startsWith("## ")) {
        pushBlock(currentType, current);
        current = [trimmed.replace(/^## /, "")];
        currentType = "h2";
        pushBlock(currentType, current);
        current = [];
        currentType = "paragraph";
        continue;
      }

      if (trimmed.startsWith("### ")) {
        pushBlock(currentType, current);
        current = [trimmed.replace(/^### /, "")];
        currentType = "h3";
        pushBlock(currentType, current);
        current = [];
        currentType = "paragraph";
        continue;
      }

      if (trimmed.startsWith("- ")) {
        if (currentType !== "list") {
          pushBlock(currentType, current);
          current = [];
          currentType = "list";
        }
        current.push(trimmed.replace(/^- /, ""));
        continue;
      }

      if (currentType !== "paragraph") {
        pushBlock(currentType, current);
        current = [];
        currentType = "paragraph";
      }
      current.push(trimmed);
    }
    pushBlock(currentType, current);

    return (
      <div className="space-y-6">
        {blocks.map((block, index) => {
          if (block.type === "h2") {
            return (
              <h2 key={`${block.type}-${index}`} className="text-2xl md:text-3xl font-semibold tracking-tight">
                {block.content[0]}
              </h2>
            );
          }
          if (block.type === "h3") {
            return (
              <h3 key={`${block.type}-${index}`} className="text-xl md:text-2xl font-semibold tracking-tight">
                {block.content[0]}
              </h3>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={`${block.type}-${index}`} className="list-disc pl-6 space-y-2 text-muted-foreground">
                {block.content.map((item, itemIndex) => (
                  <li key={`${block.type}-${index}-${itemIndex}`}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={`${block.type}-${index}`} className="text-base text-muted-foreground leading-relaxed">
              {block.content.join(" ")}
            </p>
          );
        })}
      </div>
    );
  };

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
            {post.status && (
              <>
                <span>·</span>
                <span className="uppercase tracking-widest">
                  {post.status === "draft" ? "Work in progress" : post.status}
                </span>
              </>
            )}
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

          {post.status === "draft" && (
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 md:p-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="text-[11px] uppercase tracking-widest">
                  Work in progress
                </Badge>
                <span className="text-xs text-muted-foreground">
                  This piece is being refined. Expect a final draft with diagrams and deeper tradeoffs soon.
                </span>
              </div>
            </div>
          )}

          <Button variant="outline" size="sm" asChild>
            <Link href="/#writing">
              <ExternalLink className="h-4 w-4" />
              Back to Writing
            </Link>
          </Button>
        </header>

        <Separator className="opacity-60" />

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          {renderBody(post.body)}
        </article>
      </div>
    </div>
  );
}
