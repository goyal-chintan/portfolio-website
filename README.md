# Chintan Goyal - Personal Portfolio

A modern, minimalist portfolio website built with Next.js 15, featuring a "Digital Garden" Bento Grid layout and an "Engineering Zen" aesthetic.

## ✨ Features

- **Bento Grid Layout** - Modular, data-centric homepage design
- **Command Palette** - Power-user navigation with `⌘+K`
- **Dark Mode** - Deep charcoal aesthetic with subtle accents
- **Smooth Animations** - Physics-based transitions with Framer Motion
- **Glassmorphism** - Modern backdrop blur effects
- **Fully Responsive** - Mobile-first design
- **Type-Safe** - Full TypeScript support
- **Content-First** - All content centralized in `lib/data.ts`

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI (Radix primitives)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Command Palette:** cmdk

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles, animations, utilities
│   ├── layout.tsx       # Root layout with navigation
│   └── page.tsx         # Homepage with Bento Grid
├── components/
│   ├── ui/              # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   └── dialog.tsx
│   ├── bento-grid.tsx   # Bento Grid component system
│   ├── hero.tsx         # Hero section with typing effect
│   ├── tech-stack.tsx   # Tech radar visualization
│   ├── projects.tsx     # Project cards
│   ├── library.tsx      # Books section
│   ├── writing.tsx      # Blog posts & thoughts
│   ├── contact.tsx      # Contact section
│   ├── navigation.tsx   # Floating dock & footer
│   ├── command-palette.tsx  # ⌘+K command palette
│   └── motion.tsx       # Animation utilities
└── lib/
    ├── data.ts          # All portfolio content
    └── utils.ts         # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Updating Content

All portfolio content is centralized in `src/lib/data.ts`. Edit this file to update:

- **Profile** - Name, title, bio, social links
- **Tech Stack** - Technologies organized by category
- **Projects** - Featured work with descriptions and tags
- **Books** - Reading list with takeaways
- **Blog Posts** - Writing with metadata
- **Thoughts** - Tweet-style short musings
- **Navigation** - Menu items and shortcuts

### Theming

The color palette is defined in `tailwind.config.ts` under the "Engineering Zen" theme:

```typescript
colors: {
  background: "#0a0a0a",    // Deep charcoal
  foreground: "#fafafa",    // Off-white
  muted: {
    DEFAULT: "#171717",
    foreground: "#a1a1aa",  // Muted text
  },
  accent: {
    DEFAULT: "#64748b",     // Slate blue
    emerald: "#059669",     // Emerald accent
  },
  // ...
}
```

### Fonts

The project uses:
- **Inter** - UI text (loaded via Google Fonts)
- **JetBrains Mono** - Code/technical elements

## 🎨 Design Principles

1. **Minimalist** - Clean layouts with ample whitespace
2. **Data-Centric** - Information displayed in digestible cards
3. **Accessible** - High contrast, semantic HTML
4. **Performant** - Optimized animations, lazy loading
5. **Engineering-Forward** - Terminal aesthetics, code-like elements

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Environment

No environment variables are required for basic functionality.

For production, consider adding:
- Analytics (Vercel Analytics, Plausible, etc.)
- Contact form backend (if implementing)

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

---

Built with ☕ by Chintan Goyal









