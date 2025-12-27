import { content } from "@/config/content.generated";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  status?: string;
  body?: string;
}

export const blogPosts: BlogPost[] = content.writing.map((post) => ({
  id: post.id,
  title: post.title,
  excerpt: post.summary,
  date: post.date,
  readTime: post.read_time,
  tags: Array.from(post.tags ?? []),
  slug: post.id,
  status: post.status,
  body: post.body,
}));







