export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  takeaway: string;
  category: "engineering" | "leadership" | "thinking" | "business";
  rating: number;
}

export const books: Book[] = [
  {
    id: "ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    cover: "/books/ddia.svg",
    takeaway: "The bible of distributed systems—every data engineer should internalize its mental models.",
    category: "engineering",
    rating: 5,
  },
  {
    id: "staff-engineer",
    title: "Staff Engineer",
    author: "Will Larson",
    cover: "/books/staff-engineer.svg",
    takeaway: "The roadmap from senior to staff: it's not about more code, it's about more leverage.",
    category: "leadership",
    rating: 5,
  },
  {
    id: "thinking-systems",
    title: "Thinking in Systems",
    author: "Donella Meadows",
    cover: "/books/thinking-in-systems.svg",
    takeaway: "Systems have their own logic. Understanding feedback loops changed how I debug everything.",
    category: "thinking",
    rating: 5,
  },
  {
    id: "philosophy-software",
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    cover: "/books/philosophy-of-software-design.svg",
    takeaway: "Deep modules, shallow interfaces. Complexity is the enemy—fight it with intention.",
    category: "engineering",
    rating: 4,
  },
  {
    id: "high-output",
    title: "High Output Management",
    author: "Andy Grove",
    cover: "/books/high-output-management.svg",
    takeaway: "Your output = your team's output. The manager's leverage comes from multiplying others.",
    category: "leadership",
    rating: 5,
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/books/atomic-habits.svg",
    takeaway: "Systems beat goals. 1% daily improvements compound into transformation.",
    category: "thinking",
    rating: 4,
  },
];
