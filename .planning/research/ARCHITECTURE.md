# Architecture Research

**Domain:** Chapter-Based Portfolio Navigation & Storytelling
**Researched:** 2026-03-02
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                       PRESENTATION LAYER                             │
├─────────────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐   │
│  │  Landing   │  │  Chapter   │  │  Chapter   │  │    AI      │   │
│  │   Page     │→ │   Reader   │→ │    Nav     │  │  Overlay   │   │
│  │ (Cards)    │  │  (Content) │  │  (Menu)    │  │  (Chatbot) │   │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                      STATE MANAGEMENT LAYER                          │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │     Chapter Context (Active Chapter, Scroll Position)        │   │
│  │     Navigation State (History, Progress, Reading Time)       │   │
│  │     AI Context (Current Chapter Content, User Location)      │   │
│  └──────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                         DATA LAYER                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │   Chapter    │  │  Navigation  │  │   AI Chat    │             │
│  │   Metadata   │  │   History    │  │   Service    │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Landing Page** | Display chapter cards with preview metadata, handle navigation to reader | Grid/masonry layout with lazy-loaded card components |
| **Chapter Reader** | Render full chapter content with prev/next navigation, track reading progress | Scroll-driven layout with IntersectionObserver for progress tracking |
| **Chapter Navigation** | Fixed/floating menu for quick chapter access, visual progress indicator | Sticky sidebar or floating navigation dots with active state tracking |
| **AI Chatbot Overlay** | Context-aware assistant that understands current chapter and can navigate user | Modal/drawer with RAG pipeline injecting chapter context into prompts |
| **Chapter Context Provider** | Global state for active chapter, scroll position, reading progress | React Context or state management library |
| **Navigation State Manager** | Track user journey through chapters, maintain history and bookmarks | Browser History API or localStorage for persistence |

## Recommended Project Structure

```
src/
├── features/
│   ├── landing/                # Landing page with chapter cards
│   │   ├── ChapterGrid.tsx     # Card layout container
│   │   ├── ChapterCard.tsx     # Individual chapter preview
│   │   └── landing.module.css  # Landing-specific styles
│   ├── reader/                 # Chapter reading experience
│   │   ├── ChapterReader.tsx   # Main reader container
│   │   ├── ChapterContent.tsx  # Content renderer
│   │   ├── ChapterNav.tsx      # Prev/Next/Menu navigation
│   │   └── ProgressTracker.tsx # Reading progress indicator
│   ├── navigation/             # Global navigation system
│   │   ├── ChapterMenu.tsx     # Floating/sidebar chapter menu
│   │   ├── BreadcrumbNav.tsx   # Breadcrumb trail
│   │   └── ProgressRing.tsx    # Visual progress indicator
│   └── ai-assistant/           # AI chatbot integration
│       ├── ChatOverlay.tsx     # Modal/drawer container
│       ├── ChatInterface.tsx   # Message list and input
│       └── ChapterRAG.ts       # Chapter context injection service
├── context/
│   ├── ChapterContext.tsx      # Active chapter state
│   ├── NavigationContext.tsx   # Navigation history and state
│   └── AIContext.tsx           # AI chatbot state
├── data/
│   ├── chapters/               # Chapter content and metadata
│   │   ├── chapter-01.ts       # Individual chapter data
│   │   ├── chapter-02.ts
│   │   └── index.ts            # Chapter registry
│   └── types.ts                # Shared type definitions
├── hooks/
│   ├── useChapterProgress.ts   # Track reading progress
│   ├── useChapterNavigation.ts # Navigate between chapters
│   └── useAIChapterContext.ts  # Inject chapter context into AI
└── services/
    ├── chapterService.ts       # Chapter CRUD operations
    └── aiNavigationService.ts  # AI-driven navigation logic
```

### Structure Rationale

- **features/:** Colocates components by feature domain (landing, reader, navigation, AI) for better maintainability and lazy-loading boundaries
- **context/:** Separates state management concerns - chapter state, navigation state, and AI state are independent but can be composed
- **data/chapters/:** Individual chapter files enable code-splitting and on-demand loading; easy to add/remove chapters
- **hooks/:** Reusable logic for progress tracking, navigation, and AI context injection
- **services/:** Business logic layer that abstracts data operations from UI components

## Architectural Patterns

### Pattern 1: Chapter Registry with Metadata-Driven Navigation

**What:** Centralized chapter registry that defines metadata (title, description, color, order) and content separately. Navigation is generated automatically from the registry.

**When to use:** When you need flexible chapter ordering, easy addition/removal of chapters, and consistent navigation structure.

**Trade-offs:** 
- **Pros:** Single source of truth, easy to reorder/add chapters, metadata can drive card rendering
- **Cons:** Requires initial setup overhead, metadata schema must be well-defined upfront

**Example:**
```typescript
// data/chapters/index.ts
export const CHAPTER_REGISTRY = [
  {
    id: 'introduction',
    slug: 'introduction',
    title: 'Introduction',
    description: 'The beginning of the journey',
    color: 'indigo',
    order: 1,
    estimatedReadTime: 5,
    contentLoader: () => import('./chapter-01')
  },
  {
    id: 'architecture',
    slug: 'architecture',
    title: 'System Architecture',
    description: 'How everything fits together',
    color: 'emerald',
    order: 2,
    estimatedReadTime: 8,
    contentLoader: () => import('./chapter-02')
  }
];

// Automatic navigation generation
export const getNextChapter = (currentId: string) => {
  const current = CHAPTER_REGISTRY.find(c => c.id === currentId);
  return CHAPTER_REGISTRY.find(c => c.order === (current?.order ?? 0) + 1);
};
```

### Pattern 2: IntersectionObserver-Driven Progress Tracking

**What:** Use IntersectionObserver to track which chapter sections are in viewport, update progress indicators, and sync state with navigation.

**When to use:** For scroll-driven reading experiences where you need accurate progress tracking without polling.

**Trade-offs:**
- **Pros:** Performant (no scroll event listeners), accurate viewport detection, browser-native API
- **Cons:** Requires polyfill for older browsers, needs careful threshold tuning

**Example:**
```typescript
// hooks/useChapterProgress.ts
export const useChapterProgress = (chapterId: string) => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll(`[data-chapter="${chapterId}"] [data-section]`);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('data-section'));
            // Calculate progress based on section order
            const sectionIndex = Array.from(sections).indexOf(entry.target as Element);
            setProgress((sectionIndex / sections.length) * 100);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [chapterId]);

  return { progress, activeSection };
};
```

### Pattern 3: RAG-Enhanced AI Navigation

**What:** Inject current chapter context (title, content summary, position in story) into AI prompts so the chatbot understands where the user is and can intelligently navigate them.

**When to use:** When you want AI to act as a context-aware guide rather than a generic chatbot.

**Trade-offs:**
- **Pros:** Highly personalized experience, AI can answer "where am I?" and "what's next?" naturally
- **Cons:** Requires careful prompt engineering, context injection adds token overhead

**Example:**
```typescript
// services/aiNavigationService.ts
export class AINavigationService {
  constructor(
    private chapterRegistry: typeof CHAPTER_REGISTRY,
    private aiService: ChatService
  ) {}

  async sendMessageWithContext(
    message: string,
    currentChapterId: string
  ): Promise<string> {
    const currentChapter = this.chapterRegistry.find(c => c.id === currentChapterId);
    const nextChapter = getNextChapter(currentChapterId);
    const prevChapter = getPreviousChapter(currentChapterId);

    const contextPrompt = `
      Current Context:
      - User is reading: "${currentChapter?.title}" (Chapter ${currentChapter?.order})
      - Chapter description: ${currentChapter?.description}
      - Next chapter: ${nextChapter?.title || 'None (last chapter)'}
      - Previous chapter: ${prevChapter?.title || 'None (first chapter)'}
      
      Navigation Commands:
      - If user asks "what's next?", reference ${nextChapter?.title}
      - If user asks "where am I?", reference ${currentChapter?.title}
      - If user wants to navigate, use format: "Navigate to [chapter-slug]"
      
      User message: ${message}
    `;

    return this.aiService.sendMessage(contextPrompt);
  }

  parseNavigationCommand(response: string): string | null {
    const match = response.match(/Navigate to \[(.*?)\]/);
    return match ? match[1] : null;
  }
}
```

### Pattern 4: Lazy-Loaded Chapter Content

**What:** Load chapter content on-demand using React.lazy() or dynamic imports, reducing initial bundle size.

**When to use:** For portfolios with many chapters or chapters with heavy content (videos, interactive demos).

**Trade-offs:**
- **Pros:** Faster initial load, smaller critical bundle, better performance
- **Cons:** Slight delay when navigating to new chapter, needs loading states

**Example:**
```typescript
// features/reader/ChapterReader.tsx
const ChapterReader: React.FC<{ chapterId: string }> = ({ chapterId }) => {
  const chapter = CHAPTER_REGISTRY.find(c => c.id === chapterId);
  const [ChapterContent, setChapterContent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (chapter?.contentLoader) {
      chapter.contentLoader().then(module => {
        setChapterContent(() => module.default);
      });
    }
  }, [chapter]);

  if (!ChapterContent) {
    return <ChapterLoadingSkeleton />;
  }

  return (
    <Suspense fallback={<ChapterLoadingSkeleton />}>
      <ChapterContent />
    </Suspense>
  );
};
```

## Data Flow

### Reading Flow

```
User Clicks Chapter Card (Landing)
    ↓
Navigation Context Updates → Browser History Updated
    ↓
Chapter Reader Mounted → Content Lazy-Loaded
    ↓
IntersectionObserver Tracks Scroll → Progress Context Updated
    ↓
Navigation Menu Syncs Active State ← Progress Context
    ↓
User Clicks "Next Chapter" → Navigation Context → New Chapter Loaded
```

### AI Navigation Flow

```
User Opens Chatbot
    ↓
AI Context Provider Injects:
  - Current Chapter ID
  - Chapter Metadata
  - Reading Progress
  - Available Navigation Options
    ↓
User Asks "What's next?" or "Take me to architecture chapter"
    ↓
AI Service Receives Context-Enhanced Prompt
    ↓
AI Response Parsed for Navigation Commands
    ↓
If Navigation Command Found:
  → Navigation Context Updated
  → Chapter Reader Navigates to New Chapter
  → AI Confirms: "Navigating to [chapter]..."
```

### Key Data Flows

1. **Chapter Selection Flow:** Landing page card click → Navigation context update → Browser history push → Chapter reader mount → Content load
2. **Progress Tracking Flow:** Scroll → IntersectionObserver trigger → Progress context update → Navigation menu sync → Local storage persist
3. **AI Context Injection Flow:** Chatbot message → Chapter context retrieval → Prompt enhancement → AI response → Navigation command parsing → Chapter navigation

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1-10 chapters | Static chapter registry in TypeScript file, no database needed |
| 10-50 chapters | Consider CMS integration (Contentful, Sanity), pagination on landing page |
| 50+ chapters | Full CMS with search/filtering, category-based navigation, server-side rendering for SEO |

### Scaling Priorities

1. **First bottleneck:** Bundle size grows with chapter count → Solution: Aggressive lazy-loading, move chapter content to separate chunks
2. **Second bottleneck:** Landing page performance degrades with 50+ cards → Solution: Virtual scrolling (react-window), pagination, or infinite scroll

## Anti-Patterns

### Anti-Pattern 1: Tightly Coupling Chapter Content to Navigation

**What people do:** Hardcode chapter navigation links directly in chapter content (e.g., "Click here to go to Chapter 2")

**Why it's wrong:** Breaks if chapters are reordered, makes content non-portable, creates fragile dependencies

**Do this instead:** Use metadata-driven navigation where chapters reference neighbors by position or ID, not hardcoded links

```typescript
// BAD
<Link to="/chapters/architecture">Read Chapter 2</Link>

// GOOD
const nextChapter = useNextChapter(currentChapterId);
<Link to={`/chapters/${nextChapter.slug}`}>{nextChapter.title}</Link>
```

### Anti-Pattern 2: Global State for Everything

**What people do:** Put chapter content, navigation state, reading progress, AI state all in one massive global context

**Why it's wrong:** Causes unnecessary re-renders, makes testing difficult, violates separation of concerns

**Do this instead:** Separate contexts by concern - ChapterContext for active chapter, NavigationContext for history, AIContext for chatbot state

```typescript
// BAD
const AppContext = createContext({
  chapters: [...],
  currentChapter: null,
  navigationHistory: [],
  readingProgress: {},
  aiMessages: [],
  aiLoading: false
});

// GOOD
const ChapterContext = createContext({ currentChapter, setCurrentChapter });
const NavigationContext = createContext({ history, progress });
const AIContext = createContext({ messages, sendMessage });
```

### Anti-Pattern 3: AI Chatbot Without Chapter Context

**What people do:** Generic AI chatbot that doesn't know which chapter the user is reading

**Why it's wrong:** User asks "what's this section about?" and AI has no idea, breaking immersion

**Do this instead:** Always inject current chapter context into AI prompts, enable navigation commands

```typescript
// BAD
await ai.sendMessage(userQuery);

// GOOD
const context = {
  currentChapter: chapters.find(c => c.id === activeChapterId),
  nextChapter: getNextChapter(activeChapterId),
  userProgress: progress
};
await ai.sendMessage(enhancePromptWithContext(userQuery, context));
```

### Anti-Pattern 4: Rebuilding Existing Section Infrastructure

**What people do:** Throw away working IntersectionObserver, lazy-loading, and state management to build chapter system from scratch

**Why it's wrong:** Wastes proven, tested code; increases migration risk and development time

**Do this instead:** Adapt existing patterns - reuse IntersectionObserver for chapter tracking, extend current state management for chapter context, wrap existing sections as "chapters" during migration

```typescript
// MIGRATION STRATEGY: Wrap existing sections as chapters
const CHAPTER_REGISTRY = [
  {
    id: 'about',
    component: () => import('../sections/about/AboutSection'),
    // ... metadata
  },
  {
    id: 'projects',
    component: () => import('../sections/projects/ProjectsSection'),
    // ... metadata
  }
];
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **AI Service (Gemini)** | Extend existing ChatService with chapter context injection | Current chatService.ts already has RAG pattern - add chapter metadata to context |
| **Analytics** | Track chapter navigation, reading time per chapter, completion rates | Use existing event tracking, add chapter-specific events |
| **Local Storage** | Persist reading progress, bookmarks, last-read chapter | Browser-native, no dependencies |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Landing ↔ Reader** | React Router navigation (or state toggle like case-study pattern) | Can reuse App.tsx view state pattern: 'portfolio' | 'chapters' |
| **Reader ↔ Navigation** | Shared ChapterContext + NavigationContext | IntersectionObserver in reader updates context, navigation components consume |
| **AI Overlay ↔ Reader** | AI reads ChapterContext, sends navigation commands via callback | AI overlay is global (like current ChatAssistant), context-aware |
| **Chapter Registry ↔ All** | Import CHAPTER_REGISTRY, use hooks (useCurrentChapter, useNextChapter) | Single source of truth, consumed everywhere |

## Migration Strategy from Current Architecture

### Phase 1: Create Chapter Registry (Non-Breaking)

**Goal:** Define chapter structure without touching existing code

**Tasks:**
1. Create `data/chapters/` directory
2. Define chapter metadata schema (title, description, color, order)
3. Map existing case-study chapters to new registry format
4. Add chapter registry to codebase (unused initially)

**Validation:** Chapter registry loads without errors, metadata is complete

---

### Phase 2: Build Landing Page (Parallel Track)

**Goal:** Create chapter card grid that coexists with portfolio view

**Tasks:**
1. Create `features/landing/` components (ChapterGrid, ChapterCard)
2. Add "Chapters" view to App.tsx (like case-study toggle)
3. Implement card layout with Framer Motion animations
4. Connect cards to chapter registry

**Validation:** Landing page renders, cards display metadata, navigation to chapters works

---

### Phase 3: Adapt Chapter Reader from Case Study (Reuse Pattern)

**Goal:** Refactor existing CaseStudyChapterView into reusable ChapterReader

**Tasks:**
1. Extract chapter rendering logic from CaseStudyChapterView
2. Create generic ChapterReader component
3. Implement prev/next navigation controls
4. Add floating chapter menu (similar to CaseStudyNav)

**Validation:** Reader displays chapter content, navigation works, progress tracking functional

---

### Phase 4: Integrate AI Chapter Context (Extend Existing)

**Goal:** Enhance ChatAssistant with chapter awareness

**Tasks:**
1. Create ChapterContext provider
2. Inject chapter metadata into ChatService prompts
3. Add navigation command parsing to AI responses
4. Test AI-driven chapter navigation

**Validation:** AI knows current chapter, can navigate user, answers contextually

---

### Phase 5: Progressive Migration (Content)

**Goal:** Move content from sections to chapters incrementally

**Tasks:**
1. Start with case-study content (already chapter-based)
2. Wrap existing sections (About, Projects, Career) as "chapters"
3. Update navigation to support both section and chapter modes
4. Gradually migrate content to chapter format

**Validation:** All content accessible, no broken links, navigation seamless

---

## Build Order Dependencies

**Critical Path:**

1. **Chapter Registry** (no dependencies) → Defines structure for everything else
2. **ChapterContext Provider** (depends on registry) → Enables state sharing
3. **Landing Page** (depends on registry) → Entry point for chapter navigation
4. **Chapter Reader** (depends on registry + context) → Core reading experience
5. **Chapter Navigation** (depends on context) → Floating menu/breadcrumbs
6. **AI Integration** (depends on context + reader) → Context-aware assistance

**Parallel Tracks:**

- **Design System:** Can build chapter card styles, reader layout styles in parallel
- **Data Migration:** Can prepare chapter content while building components
- **Analytics:** Can be added at any stage, doesn't block core functionality

---

## Sources

**Existing Codebase Analysis:**
- `app/App.tsx` - View state management pattern (portfolio/case-study toggle)
- `sections/case-study/PortfolioCaseStudy.tsx` - Chapter-based navigation with IntersectionObserver
- `sections/case-study/CaseStudyChapterView.tsx` - Chapter content rendering pattern
- `sections/case-study/CaseStudyNav.tsx` - Fixed navigation with active state tracking
- `sections/case-study/CaseStudyData.ts` - Chapter metadata registry pattern
- `services/chatService.ts` - RAG pattern with context injection
- `components/layout/ChatAssistant/ChatAssistant.tsx` - Overlay modal pattern

**React Patterns:**
- React Context API for state management (current implementation uses local state + props)
- IntersectionObserver API for scroll tracking (heavily used in App.tsx)
- React.lazy() for code-splitting (already implemented for sections)
- Framer Motion for animations (pervasive throughout codebase)

**Navigation Patterns:**
- Stateful view switching (App.tsx line 29: `useState<'portfolio' | 'case-study'>`)
- Browser History API (can be integrated with React Router or keep state-based)
- Scroll-to-element navigation (App.tsx scrollToSection pattern)

---
*Architecture research for: Chapter-Based Portfolio Navigation & Storytelling*
*Researched: 2026-03-02*
