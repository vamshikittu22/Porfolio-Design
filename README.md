# Vamshi Krishna | AI-Native Software Engineering Portfolio

A production-grade, Swiss-style technical portfolio architected for high performance, modularity, and seamless AI integration. This project serves as a comprehensive showcase of modern frontend engineering, bridging the gap between sophisticated visual design and algorithmic depth.

## 🏗️ Architectural Overview

The application utilizes a **Modular Shell Architecture** designed for optimal Core Web Vitals. Key design patterns include:

- **Section-Level Hydration:** Leveraging React 19's concurrent features and lazy-loading to prioritize critical-path rendering.
- **Service-Oriented Logic:** Business logic is encapsulated in singleton services (`GeminiService`, `ChatService`, `SocialService`) to maintain clean separation of concerns.
- **RAG Integration:** The AI Assistant uses a Retrieval-Augmented Generation pattern, grounding the Gemini 3 Flash model in structured technical data for factually accurate interactions.
- **Deterministic State Machines:** Complex UI states, such as the Minimax Game Engine and the Project Navigator, are managed via deterministic logic to ensure UI/UX consistency.

## 🛠️ Technical Stack

- **Framework:** React 19 (Concurrent Mode)
- **Build Tool:** Vite (ESBuild-driven)
- **Language:** TypeScript 5.x (Strict Mode)
- **Styling:** Tailwind CSS (Utility-first JIT)
- **Animation:** Framer Motion (Spring-physics & Layout animations)
- **AI Core:** Google Gemini API (Generative Content & Multimodal reasoning)
- **Testing:** Vitest & React Testing Library

## 📂 Project Structure

```text
/
├── app/                # Main Application entry and layout orchestration
├── components/         
│   ├── layout/         # Navigation, Footer, and AI Chat Assistant
│   ├── ui/             # Reusable UI library (Glassmorphism, Code Playgrounds, etc.)
├── config/             # Static configurations, project metadata, and constants
├── sections/           # Modular page sections
│   ├── about/          # Technical matrix and profile
│   ├── career/         # Interactive work history timeline
│   ├── projects/       # Technical showcase and architecture details
│   ├── game/           # Algorithmic sandbox (Minimax Tic-Tac-Toe)
│   ├── case-study/     # "Engineering Blueprint" deep-dive documentation
│   └── travel/         # Personal narrative and AI-generated visuals
├── services/           # API clients and business logic singletons
├── public/             # Static assets, fonts, and global downloads
└── tests/              # Unit and integration testing suites
```

## 🚀 Setup & Deployment

### Environment Configuration
Ensure your environment variables are configured in a `.env` file at the root:
```bash
API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_personal_access_token
```

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run test suite
npm run test

# Build for production
npm run build
```

## 💎 Key Features

- **Engineering Blueprint:** A dedicated documentation mode explaining the "why" behind the technical decisions.
- **Neural Assistant:** A context-aware agent capable of answering specific recruiter inquiries about the technical stack.
- **Visual Physics:** 3D parallax and magnetic interaction nodes that respond to pointer velocity.
- **Print Optimization:** A specialized CSS engine that transforms the interactive web resume into a pixel-perfect 2-page PDF.

---
**Engineered with precision by Vamshi Krishna Pullaiahgari**  
*Full Stack Developer | 2025*