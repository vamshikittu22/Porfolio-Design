# Phase 2: Landing Page & Chapter Cards - Research

**Researched:** 2026-03-03  
**Domain:** Landing page with responsive card grid layout  
**Confidence:** HIGH

## Summary

Phase 2 implements a card-based landing page for discovering and accessing 6 portfolio chapters. The primary technical challenges are: (1) creating a responsive card grid that works across mobile/tablet/desktop breakpoints, (2) applying glass morphism styling consistently, (3) animating card interactions with Framer Motion while respecting performance budgets, and (4) meeting WCAG 2.5.5 touch target accessibility requirements.

The research confirms that **CSS Grid with auto-fit/minmax** is the standard for responsive card layouts, **Framer Motion's whileHover/whileTap** gestures provide performant card interactions, and **glass morphism via backdrop-filter** is well-supported. The existing Phase 1 infrastructure (NavigationContext, CHAPTERS registry) provides the foundation needed.

**Primary recommendation:** Use CSS Grid with `repeat(auto-fit, minmax(280px, 1fr))` for the card layout, Framer Motion layout animations for card entrance, and extend existing glass morphism patterns from Phase 1. Ensure 44px minimum touch targets on mobile.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Framer Motion | 11.18.2 | Card animations, hover/tap gestures | Already in project, official React animation library with layout animations |
| CSS Grid | Native | Responsive card grid layout | Browser-native, specifically designed for 2D layouts |
| React | 19.0.0 | Component architecture | Already in project |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| CSS `backdrop-filter` | Native | Glass morphism effect | For semi-transparent glass card backgrounds |
| CSS `@media` queries | Native | Responsive breakpoints | Mobile-first responsive design |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Grid | CSS Flexbox with flex-wrap | Flexbox requires more manual spacing logic; Grid handles 2D layout natively |
| Framer Motion | GSAP or react-spring | GSAP is heavier (~80kb) and requires license for commercial use; react-spring lacks layout animations |
| backdrop-filter | Static background with opacity | Loses glass morphism visual depth effect |

**Installation:**
No new dependencies required - all libraries already installed in Phase 1.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── pages/
│   └── LandingPage.tsx           # Main landing page component
├── components/
│   └── cards/
│       ├── ChapterCard.tsx       # Individual chapter card
│       └── ChapterCardGrid.tsx   # Grid container with cards
├── data/
│   └── chapters.ts               # CHAPTERS registry (exists from Phase 1)
└── contexts/
    └── NavigationContext.tsx     # Navigation state (exists from Phase 1)
```

### Pattern 1: Responsive Card Grid with CSS Grid
**What:** Auto-fit grid that adapts column count to viewport width  
**When to use:** When you need cards to reflow automatically without breakpoint logic  
**Example:**
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem; /* 32px */
  padding: 2rem;
}

/* Mobile: 1 column (< 600px)
   Tablet: 2 columns (600-900px)
   Desktop: 3 columns (> 900px) */
```
**Source:** CSS-Tricks Complete Guide to Grid (https://css-tricks.com/snippets/css/complete-guide-grid/)

**Key insight:** `auto-fit` collapses empty columns and expands existing cards, while `auto-fill` preserves empty column space. Use `auto-fit` for card grids.

### Pattern 2: Card Stagger Animation with Framer Motion
**What:** Sequential card entrance with stagger delay  
**When to use:** When animating lists/grids of items on initial load  
**Example:**
```tsx
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms delay between cards
      delayChildren: 0.2    // Start after 200ms
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

<motion.div 
  className="card-grid"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {chapters.map(chapter => (
    <motion.div key={chapter.id} variants={cardVariants}>
      <ChapterCard chapter={chapter} />
    </motion.div>
  ))}
</motion.div>
```
**Source:** Framer Motion layout animations documentation

### Pattern 3: Glass Morphism Card Styling
**What:** Semi-transparent background with backdrop blur  
**When to use:** For modern, depth-rich card designs  
**Example:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark mode variant */
.glass-card--dark {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```
**Note:** Phase 1 already established glass morphism patterns. Extend those for consistency.

### Pattern 4: Accessible Interactive Cards
**What:** Card hover/tap states with proper touch target sizing  
**When to use:** All interactive card components  
**Example:**
```tsx
<motion.div
  className="chapter-card"
  whileHover={{ scale: 1.02, y: -4 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => navigateToChapter(chapter.id)}
  style={{
    cursor: 'pointer',
    minHeight: '200px',  // Ensure adequate touch target
    padding: '1.5rem'
  }}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navigateToChapter(chapter.id);
    }
  }}
>
  {/* Card content */}
</motion.div>
```
**Source:** Framer Motion gestures documentation + WCAG 2.5.5

### Anti-Patterns to Avoid

- **Hard-coded breakpoints for column counts:** Don't use `@media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }`. Use `auto-fit` with `minmax()` instead for automatic reflow.
- **Animating on mount without reduced motion check:** Always respect `prefers-reduced-motion`. Phase 1 already has `useReducedMotion` hook - use it.
- **Small touch targets on mobile:** Cards must be minimum 44x44px CSS pixels per WCAG 2.5.5 AAA (project requirement).
- **Using `index` as key in `.map()`:** Use stable IDs (`chapter.id`) as React keys for proper animation tracking.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive grid layout | Custom breakpoint logic with flexbox | CSS Grid `auto-fit` with `minmax()` | Browser handles column calculations; eliminates resize bugs |
| Card hover animations | Custom CSS transitions | Framer Motion `whileHover`/`whileTap` | Handles complex states, interruption, and reduced motion automatically |
| Touch target sizing | Manual padding calculations | CSS `min-width`/`min-height` with 44px | Declarative, easier to audit for accessibility |
| Stagger animations | Manual setTimeout chains | Framer Motion `staggerChildren` | Handles interruption, cleanup, and performance automatically |

**Key insight:** CSS Grid's `auto-fit`/`auto-fill` with `minmax()` is the single most important pattern for responsive card grids. It eliminates the need for breakpoint media queries entirely.

## Common Pitfalls

### Pitfall 1: Card Grid Not Responsive on Very Small Screens
**What goes wrong:** Cards shrink below readable size on narrow mobile screens  
**Why it happens:** `minmax(280px, 1fr)` can force horizontal overflow on screens < 280px  
**How to avoid:** Add container padding and adjust min size:
```css
.card-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  padding: 1rem; /* Prevents edge clipping */
}
```
**Warning signs:** Horizontal scrollbar on mobile, cards cut off at edges

### Pitfall 2: Layout Shift During Card Animation
**What goes wrong:** Cards "jump" or reflow during entrance animation  
**Why it happens:** Animating height/width triggers layout recalculation  
**How to avoid:** Use `transform` and `opacity` only, or use Framer Motion's `layout` prop:
```tsx
<motion.div
  layout  // Automatically uses transform-based animations
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
```
**Warning signs:** Visible reflow, janky animations, poor Lighthouse score

### Pitfall 3: Glass Morphism Performance on Low-End Devices
**What goes wrong:** `backdrop-filter: blur()` causes jank/dropped frames  
**Why it happens:** Backdrop filter is GPU-intensive on complex backgrounds  
**How to avoid:** Conditionally disable on low-end devices or use fallback:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
}

@supports (backdrop-filter: blur(10px)) {
  .glass-card {
    backdrop-filter: blur(10px);
  }
}

/* Alternative: Disable on prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .glass-card {
    backdrop-filter: none;
    background: rgba(255, 255, 255, 0.15); /* Slightly more opaque */
  }
}
```
**Warning signs:** FPS drops below 60, Lighthouse performance score < 90

### Pitfall 4: Touch Targets Too Small on Mobile
**What goes wrong:** Cards difficult to tap on mobile, fails WCAG 2.5.5  
**Why it happens:** Card padding/height insufficient for 44px minimum  
**How to avoid:** Ensure total card height ≥ 44px on mobile:
```tsx
<motion.div
  className="chapter-card"
  style={{
    minHeight: '44px',  // WCAG minimum
    padding: '1rem',    // Internal spacing
    // Actual card likely taller due to content
  }}
>
```
**Warning signs:** Lighthouse accessibility warnings, difficult mobile navigation

### Pitfall 5: Card Click Not Working on Navigation
**What goes wrong:** Clicking card doesn't navigate to chapter  
**Why it happens:** Missing `onClick` handler or conflicting with Framer Motion gestures  
**How to avoid:** Use `onTap` instead of `onClick` with Framer Motion:
```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onTap={() => navigateToChapter(chapter.id)}  // Use onTap, not onClick
>
```
**Warning signs:** Hover works but tap/click doesn't navigate

## Code Examples

Verified patterns from official sources:

### Complete ChapterCard Component
```tsx
import { motion } from 'motion/react';
import { useNavigation } from '@/contexts/NavigationContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ChapterCardProps {
  chapter: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const { navigateToChapter } = useNavigation();
  const prefersReducedMotion = useReducedMotion();

  const handleNavigate = () => {
    navigateToChapter(chapter.id, 'jump');
  };

  return (
    <motion.article
      className="glass-card chapter-card"
      whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -4 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      onTap={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigate();
        }
      }}
      aria-label={`Navigate to ${chapter.title}`}
      style={{
        cursor: 'pointer',
        minHeight: '200px',
        padding: '1.5rem',
      }}
    >
      <div className="card-icon">
        <img src={chapter.icon} alt="" aria-hidden="true" />
      </div>
      <h2 className="card-title">{chapter.title}</h2>
      <p className="card-description">{chapter.description}</p>
    </motion.article>
  );
}
```

### ChapterCardGrid with Stagger Animation
```tsx
import { motion } from 'motion/react';
import { CHAPTERS } from '@/data/chapters';
import { ChapterCard } from './ChapterCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export function ChapterCardGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="chapter-card-grid"
      variants={prefersReducedMotion ? {} : containerVariants}
      initial="hidden"
      animate="visible"
    >
      {CHAPTERS.map(chapter => (
        <motion.div 
          key={chapter.id} 
          variants={prefersReducedMotion ? {} : cardVariants}
        >
          <ChapterCard chapter={chapter} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Responsive Grid CSS
```css
/* Source: CSS-Tricks Guide to Grid */
.chapter-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 2rem; /* 32px between cards */
  padding: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .chapter-card-grid {
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

/* Ensure minimum touch target size (WCAG 2.5.5) */
@media (max-width: 640px) {
  .chapter-card {
    min-height: 180px; /* Comfortable tap target */
  }
}
```

### Glass Morphism Card Styling
```css
/* Extend existing glass morphism patterns from Phase 1 */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.05);
}

@supports (backdrop-filter: blur(10px)) {
  .glass-card {
    backdrop-filter: blur(10px);
  }
}

/* Fallback for prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .glass-card {
    backdrop-filter: none;
    background: rgba(255, 255, 255, 0.15);
  }
}

.glass-card:hover {
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 12px 48px rgba(0, 0, 0, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.08);
}

.glass-card:active {
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.05);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Flexbox with media queries | CSS Grid auto-fit/auto-fill | CSS Grid Level 1 (2017) | Eliminates manual breakpoint logic |
| CSS transitions | Framer Motion layout animations | Framer Motion v4+ (2020) | Automatic FLIP animations, better interruption handling |
| Manual stagger with setTimeout | `staggerChildren` variant | Framer Motion v3+ (2019) | Declarative, handles cleanup automatically |
| `framer-motion` package | `motion/react` import | Framer Motion v11 (2024) | Tree-shaking optimization, smaller bundle |

**Deprecated/outdated:**
- **`grid-gap`**: Now just `gap` (works in Grid and Flexbox)
- **`import { motion } from 'framer-motion'`**: Use `import { motion } from 'motion/react'` (v11+)
- **Manual reduced motion detection**: Use Framer Motion's built-in `useReducedMotion()` hook

## Integration with Phase 1

### Existing Infrastructure to Leverage

From Phase 1 CONTEXT.md and VERIFICATION.md:

1. **CHAPTERS Registry (`data/chapters.ts`)**
   - 6 chapters with `id`, `title`, `description`, `icon` metadata
   - **Use:** Map over CHAPTERS to render ChapterCard components

2. **NavigationContext (`contexts/NavigationContext.tsx`)**
   - `currentChapter` state
   - `navigateToChapter(chapterId, navigationType)` method
   - **Use:** Call `navigateToChapter(chapter.id, 'jump')` on card click
   - **Note:** Use `'jump'` navigation type (not `'sequential'`) to reset scroll to top

3. **useReducedMotion Hook (`hooks/useReducedMotion.ts`)**
   - Detects `prefers-reduced-motion: reduce`
   - **Use:** Conditionally disable card animations when true

4. **Glass Morphism Patterns**
   - Existing glass morphism styling from Phase 1 components
   - **Use:** Extend for chapter card glass effect consistency

### New Components for Phase 2

1. **`LandingPage.tsx`**: Main landing page layout container
2. **`ChapterCardGrid.tsx`**: Grid container with stagger animation
3. **`ChapterCard.tsx`**: Individual chapter card component

### Data Flow
```
LandingPage
  └─ ChapterCardGrid
      └─ ChapterCard (×6)
          ├─ Uses: CHAPTERS data
          ├─ Calls: navigateToChapter() from NavigationContext
          └─ Checks: useReducedMotion() hook
```

## Open Questions

1. **Card preview images**
   - What's unclear: Do chapter cards need preview images or just icons?
   - Recommendation: Start with icons only (VIS-04 requirement), add preview images in later phase if needed

2. **Landing page layout**
   - What's unclear: Should landing page have header/footer or just cards?
   - Recommendation: Start with cards only, add header/footer if UX testing shows need

3. **Card size constraints**
   - What's unclear: Should all cards be equal height or dynamic based on content?
   - Recommendation: Use equal height (`min-height: 200px`) for visual consistency

## Sources

### Primary (HIGH confidence)
- Framer Motion Official Docs - Layout Animations (https://www.framer.com/motion/layout-animations/)
- Framer Motion Official Docs - AnimatePresence (https://www.framer.com/motion/animate-presence/)
- Framer Motion Official Docs - Gestures (https://www.framer.com/motion/gestures/)
- CSS-Tricks Complete Guide to Grid (https://css-tricks.com/snippets/css/complete-guide-grid/)
- WCAG 2.5.5 Target Size (https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)

### Secondary (MEDIUM confidence)
- Phase 1 CONTEXT.md - NavigationContext and CHAPTERS registry patterns
- Phase 1 VERIFICATION.md - Existing glass morphism implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in project, official documentation verified
- Architecture patterns: HIGH - Patterns from official CSS-Tricks and Framer Motion docs
- Pitfalls: MEDIUM-HIGH - Based on common patterns and WCAG requirements, some from training data

**Research date:** 2026-03-03  
**Valid until:** ~30 days (stable technologies, unlikely to change rapidly)

**Key constraints from project:**
- Mobile-first design (60%+ traffic)
- 44px minimum touch targets (WCAG 2.5.5)
- Glass morphism styling (VIS-04)
- Performance budget: 60fps scroll, <3s load, Lighthouse >90
- Reduced motion support (300ms animations, 0ms when reduced motion enabled)
