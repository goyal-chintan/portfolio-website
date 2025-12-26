"use client";

import Image from "next/image";
import { books, type Book } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { staggerItem } from "./motion";
import { Star, BookOpen, Quote } from "lucide-react";

interface BookCardProps {
  book: Book;
  compact?: boolean;
}

const categoryColors = {
  engineering: "bg-blue-500/10 text-blue-400",
  leadership: "bg-amber-500/10 text-amber-400",
  thinking: "bg-emerald-500/10 text-emerald-400",
  business: "bg-purple-500/10 text-purple-400",
};

function BookCard({ book, compact = false }: BookCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <div className="group bento-item h-full">
        <div className="flex gap-4">
          {/* Book cover */}
          <div className="relative w-16 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          {/* Book info */}
          <div className="flex flex-col flex-grow min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-foreground dark:group-hover:text-accent transition-colors">
                {book.title}
              </h3>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
            
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`text-[10px] ${categoryColors[book.category]}`}>
                {book.category}
              </Badge>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < book.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            {!compact && (
              <div className="flex items-start gap-1.5 mt-auto">
                <Quote className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground line-clamp-2 italic">
                  {book.takeaway}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function LibraryPreview() {
  return (
    <div className="space-y-4 h-full overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            The Library
          </h2>
          <p className="text-sm text-muted-foreground">Books that shaped my thinking</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {books.slice(0, 3).map((book) => (
          <div key={book.id} className="group">
            <div className="flex gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="relative w-10 h-14 flex-shrink-0 rounded overflow-hidden bg-muted">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-foreground dark:group-hover:text-accent transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground">{book.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LibrarySection() {
  return (
    <section id="library" className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          The Library
        </h2>
        <p className="text-muted-foreground">
          Books and ideas that have shaped my engineering philosophy
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}






