# Vamshi Krishna | Software Engineering Portfolio v2.5

An "AI-Native" high-performance digital ecosystem designed with **Swiss Minimalist** aesthetics. This project serves as a technical proof-of-concept for modern web architecture, bridging the gap between high-fidelity visual design and enterprise-grade software engineering.

## 🏛️ Architectural Philosophy

The portfolio is built on three core pillars: **Swiss Precision**, **Algorithmic Logic**, and **AI Resilience**. Unlike traditional static portfolios, this application functions as a modular shell that prioritizes performance and interactivity.

### 1. The Design System (Bauhaus x Futurism)
- **Swiss Grid Logic:** Every element adheres to a strict architectural grid, utilizing high-contrast typography (Inter/Manrope) and glassmorphism.
- **Kinetic Identity:** The Hero section features a **Procedural Word Constellation** of 550+ technical keywords, utilizing tiered Z-depth layers to simulate an organic, digital atmosphere.
- **Inertia Physics:** Mouse coordinates are mapped to hardware-accelerated `rotate3d` and `translate3d` transforms, giving the UI a tactile, biological sense of weight.

### 2. The Intelligence Layer (Gemini-Native)
- **RAG-Based Chat Assistant:** Integrates Gemini 3 Flash with a custom **Retrieval-Augmented Generation (RAG)** pipeline. It grounds the LLM in structured JSON resume data to ensure 95%+ factual accuracy for recruiter inquiries.
- **Resilient AI Pipeline:** Implements a 4-tier fallback hierarchy to handle API quota locks:
  1. **Session Cache:** Instant hydration.
  2. **Live Inference:** Real-time synthesis via Gemini 2.5 Flash.
  3. **Persistent Backup:** LocalStorage snapshots of previous successful generations.
  4. **Physical Fallbacks:** Curated Unsplash assets for zero-inventory scenarios.
- **Generative Postcards:** Travel narratives are enhanced with AI-generated watercolor illustrations that react to the story's specific cultural and geographic context.

### 3. Engineering Precision (Logic & Data)
- **Unbeatable AI Engine:** A custom Tic-Tac-Toe module featuring a **Minimax recursive search tree**. It evaluates up to 549,946 nodes to guarantee a non-loss state in "Hard" mode, optimized with static "Opening Books" for sub-1ms response times.
- **GraphQL Orchestration:** Direct integration with GitHub's GraphQL API (v4) to fetch multi-year contribution calendars and repository metadata in a single optimized request.
- **Skill Matrix Workspace:** A physics-based interaction model where 40+ technology nodes react to pointer proximity using magnetic displacement formulas and exponential decay.

---

## 🛠️ Technical Stack

- **Framework:** React 19 (Concurrent Mode & Suspense)
- **Language:** TypeScript 5.8 (Strict Mode / Structural Typing)
- **Build Tool:** Vite 5.x (ESBuild sharding)
- **Animation:** Framer Motion 11 (Spring-based physics)
- **Styling:** Tailwind CSS (Zero-runtime design tokens)
- **Generative AI:** Google Gemini SDK (Flash 3.0 & 2.5 Image)
- **Testing:** Vitest & React Testing Library
- **Deployment:** Vercel Edge Network (Global CDN / TLS 1.3)

---

## 📊 Performance Benchmarks

The architecture is optimized for a "Base-Up" delivery, ensuring usability on low-power devices while scaling for high-performance GPUs.

- **Lighthouse Performance:** 98/100
- **Lighthouse Accessibility:** 100/100 (WCAG 2.1 Compliant)
- **Time to Interactive (TTI):** < 0.8s (via Section-Level Hydration)
- **Critical JS Payload:** < 120KB (Gzipped)
- **Layout Stability:** 0.01 CLS (via SVH units and aspect-ratio locking)

---

## 📁 Repository Structure

```text
src/
├── app/                  # Application Shell & Module Hydration
├── components/           # Reusable Architecture
│   ├── layout/           # Global Orchestrators (Chat, Nav, Blueprint)
│   └── ui/               # Design Primitives (GlassUI, CodePlayground)
├── config/               # Immutable Data (Resume JSON, Project Manifests)
├── services/             # Singleton Logic (GeminiService, SocialService)
├── sections/             # Feature-Specific Modules
│   ├── case-study/       # The "Engineering Blueprint" Technical Deep-Dives
│   ├── career/           # Mechanical-Watch Timeline & 3D Flippers
│   ├── game/             # Minimax Algorithm Sandbox
│   ├── hero/             # Kinetic Typography & 3D Interactivity
│   └── travel/           # Generative AI Postcards
└── tests/                # Vitest Logic & Component Verification
```

---

## 🚀 Deployment & Development

### Environment Variables
Required for full feature activation:
- `API_KEY`: Google Gemini API Key.
- `GITHUB_TOKEN`: GitHub Personal Access Token (for Live GraphQL stats).

### Setup
```bash
# Install production dependencies
npm install

# Execute development environment with HMR
npm run dev

# Execute unit testing suite
npm run test

# Generate optimized production bundle
npm run build
```

---

## 📄 Final Review Note

This portfolio is an exercise in **Full-Stack Craftsmanship**. It demonstrates the ability to manage complex state machines, optimize network delivery, and integrate cutting-edge Generative AI within a professional, highly-accessible user interface.

**Developed with precision by Vamshi Krishna Pullaiahgari**  
USA | 2026