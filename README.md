# Vamshi Krishna | Software Engineering Portfolio v2.5

A high-performance, modular personal portfolio designed with a **Swiss Minimalist** aesthetic. This project leverages **React 19**, **Framer Motion**, and the **Google Gemini API** to create an "AI-Native" experience that bridges the gap between static content and generative interaction.

## 🌟 Latest Architecture Updates

### 1. 🎨 Visual Engineering & Layouts
- **Restored High-Fidelity Sections:** The **About** and **Travel** sections have been reverted to their premium "Narrative + Tech Grid" layouts, prioritizing readability and visual hierarchy over experimental bubble clouds.
- **Glassmorphism System:** Unified `GlassCard` and `BubbleTag` primitives ensure consistent frosted-glass aesthetics across dark and light modes.
- **Dynamic Hero Background:** A procedural `NameBackground` component generates a floating constellation of 550+ technical keywords with depth-of-field effects (blur/opacity) based on mouse proximity.

### 2. ⚡ Kinetic Micro-Interactions (Career Section)
- **Ticker-Style Year Animation:** implemented `AnimatedDigit` components that isolate year transitions (e.g., 2024 -> 2025). Only the changing digit animates, while the rest remain static, creating a "mechanical watch" feel.
- **3D Badge Flipper:** The "Experience / Academic" status badge now utilizes a spring-physics-based `rotateX` transform (`BadgeFlipper`), simulating a physical card flip to reveal context.
- **Snap-Scroll Timeline:** The vertical career list features CSS scroll-snapping and an intersection observer that automatically updates the "Active Year" display on the left.

### 3. 🤖 AI-Native Modules (Gemini 2.5 & 3.0)
- **Living Chat Assistant:** A floating RAG-based chatbot (`ChatAssistant`) powered by Gemini 3 Flash. It injects the full portfolio context (Resume, Projects, Skills) into the system prompt, allowing recruiters to "chat with the resume."
- **Generative Postcards:** The Travel section features an on-demand image generator. It uses Gemini 2.5 Flash to synthesize high-fidelity watercolor illustrations based on specific travel narratives.
- **Strategic Game Lab:** A Tic-Tac-Toe engine integrated with Gemini. The "Hint" button sends the board state to the LLM, which returns the optimal move and strategic reasoning via JSON.

### 4. 📊 Data Intelligence
- **GitHub Equalizer:** A custom visualization in `GitHubStats` that mimics an audio equalizer, representing commit density over time.
- **GraphQL Integration:** Direct fetching from GitHub's GraphQL API to bypass REST rate limits and retrieve precise contribution history for 2024-2026.

---

## 🛠️ Tech Stack

### Core
- **Framework:** React 19 (Concurrent Mode)
- **Build Tool:** Vite
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS (Custom "Swiss" Config)

### Animation & UI
- **Physics:** Framer Motion 11 (Springs, Layout Transitions)
- **3D Transforms:** CSS `perspective`, `rotate3d`, `preserve-3d`
- **Icons:** SVG-native components (No heavy icon libraries)

### Artificial Intelligence
- **SDK:** `@google/genai` (Google GenAI SDK)
- **Models:** 
  - Text/Logic: `gemini-3-flash-preview`
  - Vision/Image: `gemini-2.5-flash-image`
  - Video: `veo-3.1-fast-generate-preview`

### Quality Assurance
- **Test Runner:** Vitest
- **Environment:** JSDOM
- **Utilities:** React Testing Library

---

## 📁 Project Structure

The project follows a **Feature-First** architecture to ensure scalability.

```text
src/
├── app/                        # App Entry & Router Logic
├── components/
│   ├── layout/                 # Global Layouts (Header, Footer, Chat)
│   │   ├── ChatAssistant/      # "Living Core" AI Component
│   │   └── HeaderNav.tsx       # Dynamic Navigation
│   └── ui/                     # Atomic Primitives (GlassCard, GlassButton)
├── config/                     # Constants, Project Data, Type Definitions
├── sections/                   # Feature Modules
│   ├── about/                  # "Narrative + Tech Grid" Layout
│   ├── career/                 # "Snapshot" with 3D Badge Flippers
│   ├── case-study/             # Detailed Architectural Breakdown
│   ├── contact/                # Web3Forms + Neural Greeting
│   ├── game/                   # Tic-Tac-Toe + Minimax + Gemini
│   ├── github/                 # Live Commit Stats
│   ├── hero/                   # 3D Titles & Parallax Background
│   ├── projects/               # Expandable Project Cards
│   ├── resume/                 # Print-Optimized Document View
│   └── travel/                 # Blog Stories + AI Image Gen
└── services/
    ├── geminiService.ts        # AI Singleton (Rate Limiting, Caching)
    ├── chatService.ts          # RAG Context Logic
    └── socialService.ts        # External API Wrappers
```

---

## 🧪 Testing & Reliability

Critical paths are covered by **Vitest**:

1.  **Service Isolation:** `geminiService` is tested for quota lock logic and exponential backoff.
2.  **UI Interaction:** Components like `ChatAssistant` and `ProjectCard` are tested for accessibility (`aria-pressed`, `aria-label`) and state transitions.
3.  **Run Tests:**
    ```bash
    npm test
    ```

---

## 🚀 Installation

1.  **Clone:**
    ```bash
    git clone https://github.com/vamshikittu22/portfolio-v2.5.git
    ```
2.  **Install:**
    ```bash
    npm install
    ```
3.  **Configure:**
    Create a `.env` file with your Gemini API Key:
    ```env
    API_KEY=your_google_ai_key
    ```
4.  **Run:**
    ```bash
    npm run dev
    ```

---

## 📄 License

**Vamshi Krishna Pullaiahgari** © 2025.
Designed with precision in Charlotte, NC.
