# Phase 1: Navigation Architecture & State Foundation - Implementation Context

**Status**: Context captured, ready for planning  
**Date**: 2026-03-02  
**Phase Goal**: Establish the core navigation system and state management architecture that will support the chapter-based storytelling experience.

---

## Overview

This document captures implementation decisions made during the `/gsd-discuss-phase 1` workflow. These decisions resolve gray areas in the requirements and provide concrete direction for creating executable plans.

The phase focuses on building the foundation for navigating between 6 chapters in a portfolio website, with hash-based URLs, a sidebar/bottom-sheet menu, smooth transitions, and React Context state management.

---

## Implementation Decisions

### 1. URL Strategy

**Goal**: Define how URLs represent navigation state and how they behave.

#### Decisions Made

1. **Navigation mechanism**: Hash-based navigation (#chapter-1 format)
   - **Rationale**: Keeps SPA flow smooth without page reloads, maintains immersive reading experience
   - **Alternative considered**: React Router routes - rejected because full page navigation breaks storytelling flow

2. **URL format**: Number + name format (#01-introduction, #02-builder, #03-journey, etc.)
   - **Rationale**: Shows chapter order and context, readable and bookmarkable
   - **Alternative considered**: Name-only (#introduction) - rejected because doesn't convey sequence

3. **Default behavior**: Landing page as default (no hash)
   - **Rationale**: Root URL shows landing page with chapter cards, chapters update hash on navigation
   - **Alternative considered**: Auto-redirect to first chapter - rejected because removes intentional entry point

4. **Browser back/forward**: Return to previously viewed chapter in history
   - **Rationale**: Natural browser behavior, matches user expectations for web navigation
   - **Alternative considered**: Always return to landing page - rejected because breaks standard browser behavior

#### Implementation Notes

- Use `window.location.hash` to read/write chapter state
- Listen to `hashchange` event to sync navigation state
- Map hash values to chapter IDs in navigation context
- Handle invalid/missing hash gracefully (redirect to landing)

---

### 2. Chapter Menu UI

**Goal**: Design the interface for viewing all chapters and jumping between them.

#### Decisions Made

1. **UI pattern**: Sidebar (desktop) + bottom sheet (mobile)
   - **Rationale**: Clear hierarchy, always accessible, matches reading app conventions
   - **Desktop**: Collapsible sidebar on left/right (respects existing layout)
   - **Mobile**: Bottom sheet that slides up on tap (thumb-friendly zone)
   - **Alternative considered**: Hamburger menu overlay - rejected because hides navigation discoverability

2. **Chapter item display**: Icon-based navigation
   - **Rationale**: Visual storytelling, each chapter gets custom icon/illustration + title + number
   - **Design requirement**: Need 6 unique chapter icons that match glass morphism aesthetic
   - **Alternative considered**: Rich chapter cards with descriptions - rejected because less visual impact

3. **Sidebar default state**: Auto-hide on scroll
   - **Rationale**: Sidebar expands when scrolling up (navigation intent), collapses when scrolling down (reading intent)
   - **Trigger**: Use scroll direction detection (similar to existing IntersectionObserver pattern in App.tsx)
   - **Alternative considered**: Remember user preference in localStorage - may add in later phase

#### Implementation Notes

- Desktop sidebar: Fixed position, z-index above content, glass morphism styling
- Mobile bottom sheet: Use Framer Motion `<motion.div>` with drag gestures
- Icons: SVG assets, lazy-loaded with chapter content
- Active chapter indicator: Highlight current chapter in menu
- Scroll direction detection: Reuse or extend existing scroll tracking from `App.tsx:66-91`

---

### 3. Chapter Transitions

**Goal**: Define animation and behavior when navigating between chapters.

#### Decisions Made

1. **Transition animation**: Fade transition
   - **Rationale**: Smooth crossfade, performant on mobile, works on all devices
   - **Implementation**: Use Framer Motion `<AnimatePresence>` with opacity animation
   - **Alternative considered**: Book flip effect - rejected because GPU-intensive on mobile (60%+ traffic constraint)

2. **Transition duration**: Honor `prefers-reduced-motion` setting
   - **Rationale**: Accessibility-first approach, respects user preferences
   - **Duration when motion enabled**: 300ms (fast, responsive feel)
   - **Duration when motion reduced**: 0ms (instant transition)
   - **Alternative considered**: Fixed 400-600ms - rejected because doesn't respect accessibility needs

3. **Scroll position behavior**: Conditional based on navigation type
   - **Sequential navigation** (next/previous buttons): Keep scroll position
   - **Jump navigation** (menu, URL hash): Reset to top
   - **Rationale**: Preserves reading context when browsing sequentially, ensures clean start when jumping
   - **Alternative considered**: Always reset to top - rejected because disrupts flow when clicking "next"

#### Implementation Notes

- Detect `prefers-reduced-motion` with CSS media query: `window.matchMedia('(prefers-reduced-motion: reduce)')`
- Store navigation type (sequential vs jump) in navigation context
- Scroll position: Use `window.scrollTo(0, 0)` for reset, no-op for sequential
- Framer Motion config:
  ```typescript
  const transition = prefersReducedMotion 
    ? { duration: 0 } 
    : { duration: 0.3, ease: 'easeInOut' };
  ```

---

### 4. State Management

**Goal**: Architect how navigation state is stored, accessed, and synchronized.

#### Decisions Made

1. **State management strategy**: React Context API
   - **Rationale**: Built-in, no dependencies, sufficient scope for navigation state
   - **State shape**:
     - `currentChapter: string | null` (chapter ID, synced with URL hash)
     - `isMenuOpen: boolean` (sidebar/bottom sheet open state)
     - `isTransitioning: boolean` (prevents double-navigation during animation)
     - `navigationType: 'sequential' | 'jump'` (determines scroll behavior)
   - **Alternative considered**: Zustand - rejected because Context is sufficient for this scope (may revisit in later phases)

2. **Progress tracking**: Skip for Phase 1
   - **Rationale**: Simplifies initial implementation, focus on core navigation first
   - **Future phase**: Add localStorage-based progress tracking in Phase 3 (AI Companion Integration)
   - **Alternative considered**: localStorage in Phase 1 - deferred to reduce scope

3. **Provider scope**: Global NavigationProvider wrapping entire app
   - **Rationale**: Simple, all components can access navigation, supports both landing page and chapter views
   - **Location**: Wrap `<App />` in `main.tsx` or wrap content in `App.tsx`
   - **Alternative considered**: Scoped to chapter view only - rejected because landing page needs access to navigate to chapters

#### Implementation Notes

- Create `contexts/NavigationContext.tsx` with:
  - `NavigationProvider` component
  - `useNavigation()` hook for consuming context
  - Hash change listener to sync `currentChapter` with URL
- Type safety:
  ```typescript
  type ChapterId = '01-introduction' | '02-builder' | '03-journey' | '04-explorer' | '05-thinker' | '06-connection';
  type NavigationType = 'sequential' | 'jump';
  ```
- Navigation methods:
  - `navigateToChapter(chapterId: ChapterId, type: NavigationType): void`
  - `toggleMenu(): void`
  - `closeMenu(): void`

---

## Integration Points

### Existing Codebase Patterns to Leverage

1. **Chapter navigation pattern** (`sections/case-study/`)
   - `CaseStudyNav.tsx`: Active state tracking, navigation UI
   - `CaseStudyChapterView.tsx`: Chapter content rendering
   - `CaseStudyData.ts`: Chapter metadata registry
   - **Action**: Generalize these patterns for main portfolio chapters

2. **Scroll tracking** (`app/App.tsx:66-91`)
   - IntersectionObserver for scroll position detection
   - **Action**: Extend for auto-hide sidebar scroll direction detection

3. **View state management** (`app/App.tsx:44-64`)
   - Current pattern: `view` state with `setView` callback
   - **Action**: Coexist with NavigationContext (view state for high-level sections, NavigationContext for chapter system)

### New Components to Create

1. **NavigationContext** (`contexts/NavigationContext.tsx`)
   - Context provider, hook, state management

2. **ChapterSidebar** (desktop) and **ChapterBottomSheet** (mobile)
   - Menu UI with icon-based chapter list
   - Responsive: sidebar on `>= md`, bottom sheet on `< md`

3. **ChapterTransition** wrapper
   - Framer Motion AnimatePresence wrapper
   - Handles fade transition with prefers-reduced-motion

4. **ChapterRegistry** (`data/chapters.ts` or similar)
   - Chapter metadata: id, title, icon, route hash
   - Single source of truth for 6 chapters

---

## Chapter Metadata Structure

Based on icon-based navigation decision, each chapter needs:

```typescript
interface Chapter {
  id: ChapterId;
  number: number; // 1-6
  title: string; // "The Introduction", "The Builder", etc.
  hash: string; // "01-introduction", "02-builder", etc.
  icon: string; // Path to SVG icon/illustration
  description?: string; // Optional short description (for future use)
}
```

**6 Chapters**:
1. The Introduction (#01-introduction)
2. The Builder (#02-builder)
3. The Journey (#03-journey)
4. The Explorer (#04-explorer)
5. The Thinker (#05-thinker)
6. The Connection (#06-connection)

---

## Success Criteria

Phase 1 implementation is complete when:

1. ✅ User can navigate between 6 chapters using sidebar (desktop) or bottom sheet (mobile)
2. ✅ URL hash updates on navigation (#01-introduction format) and browser back/forward works
3. ✅ Chapter transitions use fade animation, respecting prefers-reduced-motion
4. ✅ Sidebar auto-hides on scroll down, auto-shows on scroll up
5. ✅ Sequential navigation (next/prev) preserves scroll, jump navigation resets to top
6. ✅ NavigationContext provides current chapter state to all components
7. ✅ Landing page displays as default (no hash), navigating to chapter updates hash
8. ✅ Icon-based chapter menu shows all 6 chapters with custom icons

---

## Open Questions for Planning

These questions will be resolved during plan creation:

1. **Icon design**: Who creates the 6 chapter icons? User-provided or placeholder SVGs?
2. **Chapter content**: Are chapter content components stubbed in Phase 1 or deferred to Phase 2?
3. **Mobile breakpoint**: Use existing Tailwind breakpoint (768px) or custom?
4. **Sidebar placement**: Left or right side on desktop?
5. **Testing scope**: Unit tests for context, integration tests for navigation, or E2E tests?

---

## Next Steps

1. ✅ Context captured in this document
2. 🔄 Commit `01-CONTEXT.md` to git
3. ⏳ Run `/gsd-plan-phase 1` to generate executable plans with task breakdown
4. ⏳ Plans will reference this context for implementation details
