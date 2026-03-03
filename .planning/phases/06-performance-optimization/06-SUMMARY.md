# Phase 6: Performance Optimization - Planning Summary

**Created:** 2026-03-03  
**Status:** Planning Complete  
**Total Plans:** 3 (in 3 waves)  
**Estimated Total Time:** 75-90 minutes  

## Overview

Phase 6 optimizes portfolio performance to meet strict budgets: 60fps scroll, <3s landing page load, and Lighthouse score >90. This phase addresses the current 683kB main bundle (189kB gzipped) through strategic code splitting, GPU acceleration for glass morphism effects, and advanced lazy loading techniques.

## Problem Statement

**Current Performance Issues:**
1. **Bundle Size:** 683kB main bundle exceeds 500kB warning threshold
2. **CSS Warnings:** @import statements in wrong order (before Tailwind directives)
3. **No Chunking Strategy:** All dependencies bundled together (React, Framer Motion, Google GenAI)
4. **ChatAssistant Eagerly Loaded:** ~100kB Google GenAI SDK loaded even if user never opens chat
5. **Glass Morphism Performance:** Intensive backdrop-filter effects may cause scroll jank on slower devices
6. **Font Loading:** Potential render-blocking fonts (FOIT - Flash of Invisible Text)

**Current Build Output:**
```
dist/assets/index-Cxz5KS99.js            698.59 kB │ gzip: 188.78 kB
dist/assets/index-CcfT5IXC.css          109.64 kB │ gzip:  16.25 kB

⚠️  Some chunks are larger than 500 kB after minification.
```

**Performance Budget (Requirements):**
- PERF-01: Glass morphism effects optimized for 60fps
- PERF-02: Chapter content lazy-loaded (fast initial load)
- PERF-03: Landing page loads in <3 seconds

## Plan Breakdown

### Wave 1: Bundle Optimization & Code Splitting (06-01)

**Goal:** Reduce main bundle from 683kB to <300kB through vendor chunking

**Key Tasks:**
1. Configure `manualChunks` in `vite.config.ts` to split:
   - `vendor-react.js` (~140kB): React + ReactDOM
   - `vendor-motion.js` (~120kB): Framer Motion
   - `vendor-genai.js` (~80kB): Google GenAI SDK
   - `vendor-libs.js` (~40kB): Other dependencies
   - `index.js` (~150-200kB): Application code

2. Fix CSS import order warnings
   - Move `@import` statements BEFORE `@tailwind` directives
   - Eliminates 4 CSS build warnings

3. Verify tree-shaking for Framer Motion
   - Ensure all imports use `motion/react` (not `framer-motion`)
   - Confirm tree-shakeable imports from Phase 2 decision

4. Install and configure bundle analyzer
   - `rollup-plugin-visualizer` for visual bundle composition
   - Generate `dist/stats.html` report

5. Enable compression plugins
   - Brotli + Gzip compression for preview builds
   - Realistic production size measurements

**Estimated Time:** 25-30 minutes

**Success Metrics:**
- Main bundle: <300kB (56%+ reduction)
- Vendor chunks split for better caching
- No build warnings
- Bundle visualizer report generated

---

### Wave 2: Glass Morphism Performance Tuning (06-02)

**Goal:** Achieve 60fps scroll with backdrop-filter effects active

**Key Tasks:**
1. Add GPU acceleration to glass classes
   - `transform: translateZ(0)` → Force compositing layer
   - `will-change: backdrop-filter` → Hint browser optimization
   - `contain: paint/layout/strict` → Isolate repaints

2. Optimize scroll-triggered animations
   - Replace height/width animations with transform (translateX/Y)
   - Use GPU-accelerated properties only
   - Prevent layout thrashing during scroll

3. Debounce scroll events in `useScrollDirection` hook
   - Wrap handler in `requestAnimationFrame`
   - Mark scroll listener as `{ passive: true }`
   - Reduce CPU overhead during rapid scrolling

4. Lazy load heavy animations
   - Defer Framer Motion stagger animations on landing page
   - Optional: Detect slow devices (`navigator.hardwareConcurrency <= 2`)
   - Disable animations on reduced motion preference

5. Add performance budgets with Lighthouse CI
   - Create `lighthouserc.json` configuration
   - Enforce Performance score ≥90, FCP <2s, TTI <3.5s
   - Add `npm run perf` script

**Estimated Time:** 20-25 minutes

**Success Metrics:**
- 60fps scroll in Chrome DevTools Performance profiler
- No long tasks (>50ms) during scroll
- Reduced motion fallback working
- Lighthouse Performance >90

---

### Wave 3: Advanced Optimizations & Lazy Loading (06-03)

**Goal:** Sub-3-second landing page load with optimal resource loading

**Key Tasks:**
1. **Dynamic import for ChatAssistant** (biggest win)
   - Lazy load with `React.lazy()` + `Suspense`
   - Only load when user clicks chat button
   - Saves ~100kB on initial load

2. **Optimize font loading**
   - Add `font-display: swap` to prevent FOIT
   - Preconnect to Google Fonts (`<link rel="preconnect">`)
   - Optional: Self-host fonts for zero third-party dependency

3. **Add resource hints**
   - Preconnect to critical origins
   - Add SEO meta tags (title, description)
   - Leverage Vite's automatic preload for chunks

4. **Image lazy loading**
   - Add `loading="lazy"` to below-the-fold images
   - Add `decoding="async"` for non-blocking decode
   - Keep above-the-fold images eager-loaded

5. **Service Worker for offline support** (optional)
   - Install `vite-plugin-pwa`
   - Cache static assets with Workbox
   - Enable PWA installability

6. **Critical CSS extraction** (optional, advanced)
   - Install `vite-plugin-critical`
   - Inline above-the-fold CSS in HTML
   - Defer full CSS asynchronously

**Estimated Time:** 30-35 minutes (20 min core + 13 min optional)

**Success Metrics:**
- Landing page: <3s load on Slow 3G
- ChatAssistant not in main bundle
- Fonts load without blocking render
- Lighthouse Performance >90, SEO >90

---

## Expected Outcomes

### Bundle Size Comparison

| Asset | Before (Phase 5) | After (Phase 6) | Improvement |
|-------|------------------|-----------------|-------------|
| Main bundle | 683kB (189kB gz) | ~200kB (~80kB gz) | 71% reduction |
| vendor-react | N/A | 140kB | New chunk (cacheable) |
| vendor-motion | N/A | 120kB | New chunk (cacheable) |
| vendor-genai | N/A | 80kB | Lazy loaded (chat only) |
| vendor-libs | N/A | 40kB | New chunk |
| **Total JS** | **683kB** | **580kB** | **15% reduction + better caching** |

### Performance Metrics

| Metric | Before | Target | Test Condition |
|--------|--------|--------|----------------|
| Lighthouse Performance | TBD | >90 | Mobile, Slow 4G |
| First Contentful Paint | TBD | <1.5s | Mobile |
| Largest Contentful Paint | TBD | <2.5s | Mobile |
| Time to Interactive | TBD | <3.5s | Mobile |
| Cumulative Layout Shift | TBD | <0.1 | All devices |
| Scroll FPS | ~45-55fps | 60fps | Glass morphism active |

### User Experience Improvements

1. **Faster Initial Load**
   - Vendor chunks cached across visits
   - ChatAssistant loads on-demand (not upfront)
   - Fonts swap immediately (no invisible text)

2. **Smoother Animations**
   - GPU-accelerated glass effects
   - Debounced scroll handlers
   - Reduced motion fallbacks working

3. **Better Perceived Performance**
   - Critical CSS inlined (optional)
   - Resource hints speed up font/asset loading
   - Progressive enhancement for slow devices

4. **Offline Support** (optional)
   - Service worker caches assets
   - Portfolio accessible without internet
   - PWA installable on mobile

---

## Technical Decisions

### Code Splitting Strategy

**Decision:** Split by library type (React, Motion, GenAI) + lazy load chapters

**Rationale:**
- Vendor code changes infrequently → Long cache TTL
- App code changes frequently → Short cache TTL
- Separate chunks enable parallel HTTP/2 downloads
- ChatAssistant used by ~30% of visitors → Lazy load saves 100kB for 70%

**Alternative considered:** Route-based splitting (landing vs chapters)
- **Rejected:** Chapters already lazy-loaded per-section (Phase 3)
- Vendor chunking provides better caching benefits

---

### Glass Morphism Performance

**Decision:** GPU acceleration + reduced motion fallback

**Rationale:**
- `backdrop-filter` is expensive but core to design
- GPU compositing (translateZ) makes it feasible on modern devices
- Reduced motion users get solid backgrounds (95% opaque) instead of blur
- `contain` property isolates repaints to element boundaries

**Tradeoff:** Slower devices (2015-era phones) may still struggle
- **Mitigation:** Reduced motion fallback + device detection (optional)

---

### ChatAssistant Loading Strategy

**Decision:** On-click lazy loading (not idle preloading)

**Rationale:**
- ~70% of users never open chat → Saves 100kB for majority
- On-click delay imperceptible (<200ms on fast connection)
- Idle preloading (3s delay) adds complexity without major UX benefit

**Alternative considered:** Preload on first scroll
- **Rejected:** Many users land and immediately scroll → Would load anyway

---

### Font Loading

**Decision:** Google Fonts with `font-display: swap` + preconnect

**Rationale:**
- Simple, no font files to manage
- CDN edge caching (likely faster than self-hosted)
- `font-display: swap` eliminates FOIT
- Preconnect reduces DNS lookup time

**Alternative considered:** Self-hosted fonts
- **Deferred:** Can switch later if Google Fonts becomes bottleneck

---

## Dependencies & Blockers

**Required Before Phase 6:**
- ✅ Phase 1-3: Complete (navigation, landing, chapters)
- ✅ Phase 4: Complete (glass morphism styling)
- ⏳ Phase 5: Planned (AI companion - can run in parallel)

**Phase 6 Blocks:**
- Nothing (final phase)

**Execution Order:**
1. **06-01 MUST complete first** (sets up build infrastructure)
2. **06-02 and 06-03 can run in parallel** (independent optimizations)
3. Recommended: Sequential execution for easier verification

---

## Risks & Mitigations

### Risk 1: Bundle analyzer shows unexpected large dependencies
**Likelihood:** Medium  
**Impact:** Medium  
**Mitigation:** Built-in bundle visualizer (06-01 Task 4) will identify culprits early

### Risk 2: GPU acceleration causes visual glitches on specific browsers
**Likelihood:** Low  
**Impact:** High  
**Mitigation:** Test on Safari, Chrome, Firefox before deploying. Remove `translateZ(0)` if issues found.

### Risk 3: Critical CSS extraction causes FOUC (Flash of Unstyled Content)
**Likelihood:** Medium  
**Impact:** Medium  
**Mitigation:** Optional task (06-03 Task 6). Only implement if FCP >1.5s after other optimizations.

### Risk 4: Service Worker breaks hot reload in development
**Likelihood:** Low (plugin handles this)  
**Impact:** Medium  
**Mitigation:** Service worker only registers in production builds, not dev mode.

---

## Verification Strategy

### Automated Testing
- **Build Output:** Verify chunk sizes after each task
- **Lighthouse CI:** Enforce performance budgets (06-02 Task 5)
- **Bundle Analyzer:** Visual inspection of dependencies (06-01 Task 4)

### Manual Testing
- **Chrome DevTools Performance:** Record scroll + measure 60fps
- **Network Tab:** Verify lazy loading (ChatAssistant, sections)
- **Mobile Emulation:** Test on simulated slow 3G + Moto G4 device
- **Real Device:** Test on actual phone (if available)

### Regression Testing
- **Visual:** All chapters + landing page render correctly
- **Functional:** Navigation, chat, theme switching work
- **Accessibility:** Reduced motion, keyboard navigation, screen readers

---

## Success Criteria Summary

Phase 6 is **COMPLETE** when:

1. ✅ Main bundle reduced to <300kB (from 683kB)
2. ✅ Vendor chunks created (React, Motion, GenAI, Libs)
3. ✅ ChatAssistant lazy-loaded (saves ~100kB)
4. ✅ Glass morphism achieves 60fps scroll (Chrome DevTools Performance)
5. ✅ Landing page loads in <3s (Slow 3G network)
6. ✅ Lighthouse Performance score >90 (Mobile)
7. ✅ No build warnings (CSS import order fixed)
8. ✅ Font-display: swap eliminates FOIT
9. ✅ Reduced motion fallback working
10. ✅ All visual regression tests pass

---

## Post-Phase 6 Enhancements (Out of Scope)

Future optimizations to consider:

- **Image Optimization:** Convert to WebP/AVIF, responsive images (`<picture>`)
- **HTTP/2 Server Push:** Push critical chunks (requires server config)
- **CDN Edge Caching:** Serve static assets from edge locations
- **Incremental Static Regeneration:** Pre-render pages (requires framework support)
- **Web Workers:** Offload heavy computations (e.g., syntax highlighting)
- **Route Prefetching:** Preload next/prev chapter on hover
- **Advanced Tree-Shaking:** Analyze unused Tailwind classes (PurgeCSS)

---

## Plan Files

- `06-01-PLAN.md` — Bundle Optimization & Code Splitting (25-30 min)
- `06-02-PLAN.md` — Glass Morphism Performance Tuning (20-25 min)
- `06-03-PLAN.md` — Advanced Optimizations & Lazy Loading (30-35 min)

**Total Estimated Time:** 75-90 minutes

---

**Planning completed:** 2026-03-03  
**Ready for execution:** Yes  
**Next action:** Execute 06-01-PLAN.md
