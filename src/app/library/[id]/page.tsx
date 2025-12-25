import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { books } from "@/config/books";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = books.find((b) => b.id === id);
  if (!book) notFound();

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {book.title}
            </h1>
            <Badge variant="ghost" className="font-mono text-[11px]">
              book/{book.id}
            </Badge>
          </div>

          <p className="text-base text-muted-foreground">{book.author}</p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-[11px]">{book.category}</Badge>
            <Badge variant="secondary" className="text-[11px]">rating:{book.rating}/5</Badge>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="/#library">
              <ExternalLink className="h-4 w-4" />
              Back to Library
            </Link>
          </Button>
        </header>

        <Separator className="opacity-60" />

        <section className="grid gap-6 md:grid-cols-[0.35fr_0.65fr] items-start">
          <div className="relative aspect-[7/10] w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/20">
            <Image src={book.cover} alt={book.title} fill className="object-cover" />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Takeaway</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {book.takeaway}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

