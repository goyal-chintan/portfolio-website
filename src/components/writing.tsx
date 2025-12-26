"use client";

import { blogPosts, thoughts, type BlogPost, type Thought } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { staggerItem } from "./motion";
import { Calendar, Clock, Heart, PenLine, MessageCircle, ArrowUpRight } from "lucide-react";

interface BlogPostCardProps {
  post: BlogPost;
  compact?: boolean;
}

function BlogPostCard({ post, compact = false }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div variants={staggerItem}>
      <article className="group bento-item h-full">
        <div className="flex flex-col h-full">
          {/* Date and read time */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-foreground dark:group-hover:text-accent transition-colors flex items-start gap-2">
            <span className="line-clamp-2">{post.title}</span>
            <ArrowUpRight className="h-4 w-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>

          {/* Excerpt */}
          {!compact && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {post.tags.slice(0, compact ? 2 : 3).map((tag) => (
              <Badge key={tag} variant="ghost" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

interface ThoughtCardProps {
  thought: Thought;
}

function ThoughtCard({ thought }: ThoughtCardProps) {
  const formattedDate = new Date(thought.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      variants={staggerItem}
      className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50"
    >
      <p className="text-sm text-foreground/90 mb-3 leading-relaxed">
        {thought.content}
      </p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{formattedDate}</span>
        <div className="flex items-center gap-1">
          <Heart className="h-3 w-3" />
          <span>{thought.likes}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function WritingPreview() {
  return (
    <div className="space-y-4 h-full overflow-hidden">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <PenLine className="h-4 w-4" />
          Writing
        </h2>
        <p className="text-sm text-muted-foreground">Technical deep-dives</p>
      </div>
      
      <div className="space-y-3">
        {blogPosts.slice(0, 2).map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          
          return (
            <div key={post.id} className="group cursor-pointer">
              <div className="p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1">
                  <span>{formattedDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-foreground dark:group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ThoughtsPreview() {
  return (
    <div className="space-y-4 h-full overflow-hidden">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Thought Stream
        </h2>
        <p className="text-sm text-muted-foreground">Quick musings</p>
      </div>
      
      <div className="space-y-3">
        {thoughts.slice(0, 2).map((thought) => (
          <ThoughtCard key={thought.id} thought={thought} />
        ))}
      </div>
    </div>
  );
}

export function WritingSection() {
  return (
    <section id="writing" className="space-y-12">
      {/* Blog Posts */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <PenLine className="h-6 w-6" />
            Writing
          </h2>
          <p className="text-muted-foreground">
            Deep dives into data engineering, system design, and career growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <Separator />

      {/* Thoughts */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Thought Stream
          </h2>
          <p className="text-muted-foreground">
            Quick insights and observations from the trenches
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {thoughts.map((thought) => (
            <ThoughtCard key={thought.id} thought={thought} />
          ))}
        </div>
      </div>
    </section>
  );
}






