
import { CaseStudyChapter } from './types';

export const CASE_STUDY_DATA: CaseStudyChapter[] = [
  {
    id: "system-architecture",
    visualId: "SYS.00",
    title: "System Architecture",
    subtitle: "The Orchestration Layer",
    color: "indigo",
    content: {
      purpose: "Most portfolios are static brochures. I wanted a living application that demonstrates performance optimization immediately upon load.",
      visualDescription: "Uses a 'Shell & Lazy-Load' pattern. Critical paths load immediately, while heavy modules hydrate in the background.",
      techStack: [
        { name: "React 19", reason: "Concurrent Mode for non-blocking UI updates." },
        { name: "Vite", reason: "Sub-100ms HMR updates for rapid iteration." }
      ],
      architecture: "AppRoot -> EagerBundle -> LazyBundle(Suspense)",
      coreLogic: "Intersection Observer tracks scroll position to dynamic section IDs without re-renders.",
      features: ["Hybrid Rendering", "Global Context", "Lazy Suspense"],
      challenges: [
        { problem: "LCP Issues", solution: "Code-splitting at section level.", outcome: "98/100 Lighthouse score." }
      ],
      metrics: [
        { label: "Lighthouse", value: "98/100" },
        { label: "FCP", value: "0.4s" }
      ],
      code: {
        title: "Lazy Architecture",
        lang: "tsx",
        code: "const Game = lazy(() => import('./Game'));"
      }
    }
  },
  {
    id: "hero-kernel",
    visualId: "IK.01",
    title: "Identity Kernel",
    subtitle: "Procedural Generation",
    color: "purple",
    content: {
      purpose: "The Hero section immerses visitors in a cloud of technical identity via parallax depth.",
      visualDescription: "3D constellation of 550+ keywords shifting based on mouse input.",
      techStack: [
        { name: "Framer Motion", reason: "Physics-based spring animations." }
      ],
      architecture: "HeroContainer -> WordCloudGenerator -> MouseListener",
      coreLogic: "Procedural assigned x/y/z coordinates assigned on mount with weighted scoring.",
      features: ["Parallax Depth", "3D Transforms"],
      challenges: [
        { problem: "DOM Overload", solution: "will-change: transform layer grouping.", outcome: "60fps stable." }
      ],
      metrics: [
        { label: "Nodes", value: "550+" },
        { label: "FPS", value: "60" }
      ],
      code: {
        title: "Parallax Logic",
        lang: "tsx",
        code: "const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);"
      }
    }
  },
  {
    id: "github-intelligence",
    visualId: "DH.03",
    title: "GitHub Intelligence",
    subtitle: "Live Data Visualization",
    color: "emerald",
    content: {
      purpose: "Verifiable engineering velocity fetched directly from GitHub profile.",
      visualDescription: "Audio-visualizer style equalizer representing commit density.",
      techStack: [
        { name: "GitHub GraphQL", reason: "Fetch precise data in a single request." }
      ],
      architecture: "GitHubSection -> DataFetcher -> EqualizerUI",
      coreLogic: "Stale-While-Revalidate pattern using SessionStorage caching.",
      features: ["Live Fetch", "Rate Limit Handling"],
      challenges: [
        { problem: "API Limits", solution: "SessionStorage caching layer.", outcome: "Zero 429 errors." }
      ],
      metrics: [
        { label: "API", value: "GQL" },
        { label: "Cache", value: "100%" }
      ],
      code: {
        title: "GraphQL Query",
        lang: "gql",
        code: "query { user(login: \"vamshi\") { contributions } }"
      }
    }
  },
  {
    id: "game-engine",
    visualId: "RE.05",
    title: "Game Engine",
    subtitle: "Minimax Algorithm",
    color: "rose",
    content: {
      purpose: "Demonstration of recursive logic and complex state management.",
      visualDescription: "Tic-Tac-Toe board with unbeatable AI mode.",
      techStack: [
        { name: "React Reducer", reason: "Complex state transition management." }
      ],
      architecture: "GameContainer -> CPUEngine -> MinimaxRecursion",
      coreLogic: "Recursively simulates futures to maximize CPU score (+10) and minimize Human score (-10).",
      features: ["Unbeatable AI", "AI Hints"],
      challenges: [
        { problem: "Slow Initial Move", solution: "Opening book hardcoding.", outcome: "Instant response." }
      ],
      metrics: [
        { label: "Depth", value: "9 Levels" },
        { label: "Win Rate", value: "100%" }
      ],
      code: {
        title: "Minimax Recurse",
        lang: "ts",
        code: "const score = minimax(board, depth + 1, false);"
      }
    }
  },
  {
    id: "neural-chat",
    visualId: "CP.07",
    title: "AI Assistant",
    subtitle: "RAG-Based Neural Proxy",
    color: "amber",
    content: {
      purpose: "24/7 representative answering questions via portfolio context injection.",
      visualDescription: "Floating glass panel with typing indicators and auto-scroll.",
      techStack: [
        { name: "Gemini 3 Flash", reason: "Sub-second inference speed." }
      ],
      architecture: "ChatSystem -> ContextBuilder -> GeminiAPI",
      coreLogic: "Strict system prompt engineering to ground responses in provided resume JSON.",
      features: ["Context Aware", "Rate Limit Lock"],
      challenges: [
        { problem: "Hallucination", solution: "Grounded RAG prompt instructions.", outcome: "High fidelity." }
      ],
      metrics: [
        { label: "Accuracy", value: "95%" },
        { label: "Latency", value: "1.2s" }
      ],
      code: {
        title: "System Context",
        lang: "ts",
        code: "const systemPrompt = `Context: ${resumeJson}`;"
      }
    }
  }
];
