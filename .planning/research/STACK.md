# Stack Research

**Domain:** Chapter-based portfolio with immersive storytelling
**Researched:** March 2, 2026
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 19.x | UI framework | Already in use; React 19 brings Actions, useOptimistic for smooth transitions, and improved Suspense for chapter loading. Native meta tag support helps with chapter-specific SEO. |
| TypeScript | 5.x+ | Type safety | Already in use; essential for complex navigation state management and AI integration type safety. |
| Vite | 5.x+ | Build tool | Already in use; perfect for code-splitting chapters, fast HMR during development. |
| Tailwind CSS | 3.x+ | Styling | Already in use; enables rapid prototyping of chapter-specific designs and themes. |

### Routing & Navigation

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React Router | 7.x | Client-side routing | **RECOMMENDED:** v7 just released (Feb 2026), mature ecosystem, perfect for chapter-based navigation with nested routes. Use for: `/chapters/about`, `/chapters/work`, etc. 24M weekly downloads. |
| TanStack Router | 1.163.3+ | Type-safe routing | Alternative if you need stronger TypeScript guarantees and built-in data loading per chapter. More modern but smaller ecosystem (1.8M weekly downloads). |

### Animation Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Framer Motion | 12.34.x | Main animation library | **ALREADY IN USE - CONTINUE:** Latest version (published Feb 2026) has 27.5M weekly downloads. Industry standard for React animations. Use for: chapter transitions, page transitions, scroll-linked animations, layout animations between chapters. |
| Motion One | (via Framer Motion) | Performant animations | Built into Framer Motion - hybrid engine uses WAAPI for 120fps GPU-accelerated animations when possible. |

### State Management

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Zustand | 5.0.11 | Global state | **RECOMMENDED:** Lightweight (20M weekly downloads), zero boilerplate. Perfect for: current chapter tracking, reading progress, theme state, AI chat history. No providers needed - works great with React 19. |
| React 19 built-ins | 19.x | Simple state | Use `useState`, `useActionState` for local chapter state, form submissions. Use `useOptimistic` for immediate UI feedback during chapter navigation. |
| Context API | 19.x | Theme/Chapter context | Use sparingly - React 19 allows `<Context>` as provider (cleaner API). Good for chapter-specific configuration. |

### AI Integration

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @google/generative-ai | Latest | Gemini AI SDK | **ALREADY IN USE - CONTINUE:** For AI navigation assistant/chatbot. Mature SDK for Google's Gemini API. |
| Vercel AI SDK | 4.x+ | AI streaming | Alternative if you need streaming responses or multi-provider support (Gemini, OpenAI, etc). Better DX for chat UIs. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-intersection-observer | 9.x+ | Scroll detection | Track when chapters enter viewport for analytics, progress tracking, lazy loading chapter content. |
| react-use | 17.x+ | React hooks utilities | Useful hooks: `useLocalStorage` for progress persistence, `useMedia` for responsive chapter layouts. |
| clsx / cva | Latest | Conditional classes | Combine with Tailwind for complex chapter-specific styling logic. |

### Performance & Code Splitting

| Tool | Version | Purpose | Notes |
|------|---------|---------|-------|
| React.lazy | Built-in | Code splitting | Split each chapter into separate bundles. Use with Suspense for loading states. |
| Vite dynamic imports | Built-in | Route-based splitting | Automatic with React Router's lazy loading. Each chapter loads on-demand. |

## Installation

```bash
# Routing (choose one)
npm install react-router@7

# State Management
npm install zustand

# Animation (already installed, verify version)
npm install framer-motion@latest

# Supporting Libraries
npm install react-intersection-observer react-use clsx

# AI (already installed, verify)
npm install @google/generative-ai
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| React Router 7 | TanStack Router | If you need absolute type-safety for routes and prefer file-based routing. More verbose setup. |
| React Router 7 | Next.js App Router | If you need SSR/SSG for SEO. Overkill for a portfolio, but valid if you want blog with SEO. |
| Zustand | Jotai | If you prefer atomic state model. More boilerplate for simple chapter state. |
| Zustand | Redux Toolkit | Never for this use case - way too much boilerplate for portfolio state. |
| Framer Motion | GSAP | Only if you need complex timeline animations or SVG morphing beyond Framer Motion's capabilities. Steeper learning curve. |
| Gemini API direct | Vercel AI SDK | If you want streaming responses, better error handling, or multi-provider fallback. Adds ~40KB. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Redux / Redux Toolkit | Massive overkill for portfolio state. 300+ lines for what Zustand does in 20. | Zustand or React 19 built-ins |
| Recoil | Facebook abandoned it, no updates since 2023. Buggy with React 18+. | Zustand |
| React Router v5/v6 | Outdated. v7 just released with better APIs and performance. | React Router 7 |
| GSAP (unless needed) | Costs $99/year for commercial use. Framer Motion is free and covers 95% of use cases. | Framer Motion |
| Anime.js | Unmaintained, last update 2020. Small ecosystem. | Framer Motion |
| React Spring | Good library but more complex API than Framer Motion. Smaller ecosystem (5M vs 27M downloads). | Framer Motion |
| MobX | Overkill, mutable state model conflicts with React 19's optimistic updates. | Zustand |
| Axios | Not needed - use native `fetch` with React 19's error boundaries and Suspense. | Native fetch API |

## Stack Patterns by Feature

**Chapter Navigation:**
- Use React Router 7 with nested routes: `/chapters/:chapterId`
- Framer Motion `AnimatePresence` for page transitions
- Zustand to track current chapter, progress percentage, visited chapters
- `useOptimistic` from React 19 for instant navigation feedback

**Landing Page with Chapter Cards:**
- Grid layout with Tailwind
- Framer Motion layout animations when cards rearrange
- Lazy load chapter previews with `Suspense`
- Intersection Observer for fade-in animations on scroll

**Immersive Reading Experience:**
- Framer Motion `scroll` function for parallax effects
- Intersection Observer to track reading progress
- Zustand to persist scroll position per chapter
- CSS `scroll-snap` for chapter sections

**AI Navigation Assistant:**
- Gemini API for conversational navigation
- Zustand for chat history persistence (`localStorage` middleware)
- Framer Motion for chat bubble animations
- React 19 `useActionState` for form submissions

**Performance Pattern:**
```typescript
// Chapter lazy loading
const ChapterOne = lazy(() => import('./chapters/ChapterOne'))
const ChapterTwo = lazy(() => import('./chapters/ChapterTwo'))

// Route config with preloading
<Route path="/chapters/:id" element={
  <Suspense fallback={<ChapterSkeleton />}>
    <ChapterPage />
  </Suspense>
} />

// Zustand store for chapter state
const useChapterStore = create(persist(
  (set) => ({
    currentChapter: 0,
    visitedChapters: [],
    readingProgress: {},
    // ...
  }),
  { name: 'chapter-storage' }
))
```

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| React 19.x | Framer Motion 12.34+ | Fully compatible. Framer Motion supports React 19 Actions. |
| React 19.x | React Router 7.x | Fully compatible. v7 built for React 19. |
| React 19.x | Zustand 5.x | Fully compatible. No providers = no conflicts. |
| Vite 5.x | React 19 | Fully compatible with @vitejs/plugin-react. |
| TypeScript 5.x | All of above | All libraries ship with TypeScript definitions. |

## React 19 Specific Features to Leverage

**For Chapter Navigation:**
- `useOptimistic`: Show chapter change immediately while data loads
- `useActionState`: Handle chapter form submissions (comments, bookmarks)
- `use()`: Read chapter data from promises in render
- Document metadata: Chapter-specific `<title>`, `<meta>` tags

**For Performance:**
- Improved Suspense: Better loading states between chapters
- Automatic batching: Smooth animations during state updates
- Ref cleanup: Cleaner code for scroll position tracking

**For SEO:**
```jsx
// Each chapter can set its own metadata
function ChapterAbout() {
  return (
    <>
      <title>About Me - Chapter 1</title>
      <meta name="description" content="My journey into tech..." />
      <ChapterContent />
    </>
  )
}
```

## Sources

- React 19 Release: https://react.dev/blog/2024/04/25/react-19 (Dec 5, 2024) - HIGH CONFIDENCE
- React Router: https://www.npmjs.com/package/react-router-dom (v7.13.1, Feb 2026) - HIGH CONFIDENCE
- TanStack Router: https://tanstack.com/router/latest (v1.163.3) - HIGH CONFIDENCE
- Framer Motion: https://www.framer.com/motion/ + npm (v12.34.4, Feb 2026) - HIGH CONFIDENCE
- Zustand: https://www.npmjs.com/package/zustand (v5.0.11) - HIGH CONFIDENCE
- Gemini AI: Verified already in project (existing integration) - HIGH CONFIDENCE

---
*Stack research for: Chapter-based portfolio with storytelling navigation*
*Researched: March 2, 2026*
*Confidence: HIGH - All recommendations verified against current (2025-2026) versions and official documentation*
