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
    cover: "https://m.media-amazon.com/images/I/71oiJfDMtJL._SY466_.jpg",
    takeaway: "The bible of distributed systems—every data engineer should internalize its mental models.",
    category: "engineering",
    rating: 5,
  },
  {
    id: "staff-engineer",
    title: "Staff Engineer",
    author: "Will Larson",
    cover: "https://m.media-amazon.com/images/I/71hEu2N9gLS._SY466_.jpg",
    takeaway: "The roadmap from senior to staff: it's not about more code, it's about more leverage.",
    category: "leadership",
    rating: 5,
  },
  {
    id: "thinking-systems",
    title: "Thinking in Systems",
    author: "Donella Meadows",
    cover: "https://m.media-amazon.com/images/I/71oiJfDMtJL._SY466_.jpg",
    takeaway: "Systems have their own logic. Understanding feedback loops changed how I debug everything.",
    category: "thinking",
    rating: 5,
  },
  {
    id: "philosophy-software",
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    cover: "https://m.media-amazon.com/images/I/61cPLyJTW6L._SY466_.jpg",
    takeaway: "Deep modules, shallow interfaces. Complexity is the enemy—fight it with intention.",
    category: "engineering",
    rating: 4,
  },
  {
    id: "high-output",
    title: "High Output Management",
    author: "Andy Grove",
    cover: "https://m.media-amazon.com/images/I/61qcJkGwh2L._SY466_.jpg",
    takeaway: "Your output = your team's output. The manager's leverage comes from multiplying others.",
    category: "leadership",
    rating: 5,
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://m.media-amazon.com/images/I/81YkqyaFVEL._SY466_.jpg",
    takeaway: "Systems beat goals. 1% daily improvements compound into transformation.",
    category: "thinking",
    rating: 4,
  },
];
