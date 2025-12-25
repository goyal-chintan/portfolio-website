export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  takeaway: string;
  category: "engineering" | "leadership" | "thinking" | "business";
  rating: number;
}

import { content } from "@/config/content.generated";

export const books: Book[] = (content.library.books ?? []) as Book[];
