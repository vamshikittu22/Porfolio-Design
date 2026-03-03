# Roadmap: Portfolio Revamp - Story Chapters

## Overview

Transform an existing single-page portfolio into an immersive chapter-based storytelling experience through six phases: establishing navigation architecture and state management, building a landing page with chapter cards, creating the core chapter reader with progress tracking, adding visual theming with glass morphism, enhancing the AI companion with chapter context awareness, and finally optimizing performance across the experience.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Navigation Architecture & State Foundation** - Establish routing and state management for chapter navigation
- [x] **Phase 2: Landing Page & Chapter Cards** - Build entry point with chapter card grid
- [x] **Phase 3: Chapter Reader & Navigation UX** - Create immersive reading experience with progress tracking
- [x] **Phase 4: Visual Theming & Glass Morphism** - Apply chapter-specific visual styling
- [ ] **Phase 5: AI Chapter Companion** - Enhance chatbot with chapter context awareness
- [ ] **Phase 6: Performance Optimization** - Ensure smooth animations and fast load times

## Phase Details

### Phase 1: Navigation Architecture & State Foundation
**Goal**: Users can navigate between chapters with proper URL routing and browser back/forward support
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05
**Success Criteria** (what must be TRUE):
  1. User can access chapter menu from any chapter
  2. Chapter menu displays all 6 chapters with current chapter highlighted
  3. User can jump to any chapter from the menu
  4. Chapter menu works on mobile with touch-friendly targets
  5. User can return to landing page from any chapter
**Plans**: 3 plans in 2 waves

Plans:
- [x] 01-01-PLAN.md — Chapter registry, navigation context, and TypeScript types (completed 2026-03-03)
- [x] 01-02-PLAN.md — Desktop sidebar and mobile bottom sheet UI components (completed 2026-03-03)
- [x] 01-03-PLAN.md — Chapter transitions with fade animation and scroll management (completed 2026-03-03)

### Phase 2: Landing Page & Chapter Cards
**Goal**: Users can discover and access all chapters through an engaging card-based landing page
**Depends on**: Phase 1
**Requirements**: LAND-01, LAND-02, LAND-03, LAND-04, VIS-04
**Success Criteria** (what must be TRUE):
  1. User can access landing page with chapter card grid
  2. Each chapter card displays title, theme, and preview
  3. Chapter cards are responsive across mobile/tablet/desktop
  4. User can click any chapter card to enter that chapter
  5. Chapter cards use glass morphism styling
**Plans**: 2 plans in 1 wave

Plans:
- [x] 02-01-PLAN.md — Landing page layout with responsive CSS Grid chapter card container (completed 2026-03-03)
- [x] 02-02-PLAN.md — Interactive chapter cards with glass morphism styling and navigation (completed 2026-03-03)

### Phase 3: Chapter Reader & Navigation UX
**Goal**: Users can read chapters in an immersive full-screen experience with progress tracking
**Depends on**: Phase 2
**Requirements**: CHAP-01, CHAP-02, CHAP-03, CHAP-04, CHAP-05, CHAP-06, CHAP-07, CHAP-08, PERF-04
**Success Criteria** (what must be TRUE):
  1. All 6 chapters exist with their designated content (Introduction, Builder, Journey, Explorer, Thinker, Connection)
  2. Each chapter blends professional work with personal growth/habits
  3. Blueprint/Case Study remains accessible separate from chapter flow
  4. Chapter transitions are smooth without jank
**Plans**: 4 plans in 3 waves

Plans:
- [x] 03-01-PLAN.md — Chapter container infrastructure with progress bar and keyboard navigation (completed 2026-03-03)
- [x] 03-02-PLAN.md — Chapters 1-3 (Introduction, Builder, Journey) (completed 2026-03-03)
- [x] 03-03-PLAN.md — Chapters 4-6 (Explorer, Thinker, Connection) (completed 2026-03-03)
- [x] 03-04-PLAN.md — Chapter routing integration with verification checkpoint (completed 2026-03-03)

### Phase 4: Visual Theming & Glass Morphism
**Goal**: Every chapter has consistent visual identity using glass morphism with theme support
**Depends on**: Phase 3
**Requirements**: VIS-01, VIS-02, VIS-03
**Success Criteria** (what must be TRUE):
  1. Glass morphism UI style maintained across entire chapter system
  2. Dark/light theme support works in all chapters
  3. Typography and spacing is consistent across all chapters
  4. Each chapter has unique accent color for visual differentiation
  5. Navigation bugs fixed (HeaderNav/ChapterSidebar conflicts resolved)
**Plans**: 3 plans in 2 waves

Plans:
- [ ] 04-01-PLAN.md — Navigation fixes (HeaderNav conditional, home button, clickable header) + ThemeContext
- [ ] 04-02-PLAN.md — Chapter color themes (6 unique accent colors: blue, green, purple, orange, pink, cyan)
- [ ] 04-03-PLAN.md — Glass morphism section overhaul (Hero, About, Projects, GitHub, Career, Travel, Game, Contact)

### Phase 5: AI Chapter Companion
**Goal**: AI chatbot understands chapter context and helps users navigate
**Depends on**: Phase 4
**Requirements**: AI-01, AI-02, AI-03, AI-04
**Success Criteria** (what must be TRUE):
  1. AI chatbot knows which chapter user is currently viewing
  2. AI chatbot can inject chapter context into conversation
  3. Chatbot remains accessible across all chapters (overlay/sidebar)
  4. Chatbot uses existing Gemini integration with enhanced context
**Plans**: TBD

Plans:
- [ ] 05-01: TBD during planning
- [ ] 05-02: TBD during planning

### Phase 6: Performance Optimization
**Goal**: Portfolio loads fast and runs smoothly with glass morphism effects
**Depends on**: Phase 5
**Requirements**: PERF-01, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. Glass morphism effects render at 60fps during scrolling
  2. Chapter content lazy-loads to maintain fast initial load
  3. Landing page loads in under 3 seconds
**Plans**: TBD

Plans:
- [ ] 06-01: TBD during planning

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Navigation Architecture & State Foundation | 3/3 | ✓ Complete | 2026-03-03 |
| 2. Landing Page & Chapter Cards | 2/2 | ✓ Complete | 2026-03-03 |
| 3. Chapter Reader & Navigation UX | 4/4 | ✓ Complete | 2026-03-03 |
| 4. Visual Theming & Glass Morphism | 0/3 | Planned | - |
| 5. AI Chapter Companion | 0/2 | Not started | - |
| 6. Performance Optimization | 0/1 | Not started | - |

---
*Created: 2026-03-02*
*Last updated: 2026-03-03 after Phase 4 planning*
