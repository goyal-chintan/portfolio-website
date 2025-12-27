export interface Thought {
  id: string;
  content: string;
  date: string;
  likes: number;
}

import { content } from "@/config/content.generated";

export const thoughts: Thought[] = Array.from(content.thoughts.thoughts ?? []);






