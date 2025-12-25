export interface Thought {
  id: string;
  content: string;
  date: string;
  likes: number;
}

export const thoughts: Thought[] = [
  {
    id: "t1",
    content: "The best data architecture is the one your team can understand at 3 AM during an incident.",
    date: "2024-12-20",
    likes: 342,
  },
  {
    id: "t2",
    content: "Hot take: Most 'data quality' problems are actually 'unclear requirements' problems in disguise.",
    date: "2024-12-18",
    likes: 256,
  },
  {
    id: "t3",
    content: "Every Spark job starts as a small script and ends as a 2000-line monolith. The trick is knowing when to stop.",
    date: "2024-12-15",
    likes: 189,
  },
  {
    id: "t4",
    content: "The gap between 'works on my laptop' and 'works at scale' is where data engineering careers are forged.",
    date: "2024-12-10",
    likes: 421,
  },
  {
    id: "t5",
    content: "Observability isn't a feature—it's a prerequisite. You can't optimize what you can't measure.",
    date: "2024-12-05",
    likes: 167,
  },
];
