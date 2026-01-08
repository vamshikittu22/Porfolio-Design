
import { CaseStudyChapter } from './types';

export const CASE_STUDY_DATA: CaseStudyChapter[] = [
  {
    id: "system-architecture",
    visualId: "SYS.00",
    title: "System Architecture",
    subtitle: "The Orchestration Layer",
    color: "indigo",
    content: {
      purpose: "Most portfolios are static brochures. I wanted a living application. This architecture was designed to bridge the gap between a resume and a software product, demonstrating capability in state management, asynchronous data handling, and performance optimization immediately upon load.",
      visualDescription: "The application uses a 'Shell & Lazy-Load' pattern. The user immediately sees the Navigation, Hero, and About sections (Critical Rendering Path), while heavier interactive modules like the Game Engine and AI Chatbot are hydrated quietly in the background using React Suspense boundaries.",
      techStack: [
        { name: "React 19", reason: "Leveraging Concurrent Mode for non-blocking UI updates during heavy animation frames." },
        { name: "Vite", reason: "Chosen for its ESBuild-based dev server, ensuring sub-100ms HMR updates during rapid UI iteration." },
        { name: "TypeScript 5.x", reason: "Enforcing strict type safety on API responses (GitHub/Gemini) to prevent runtime crashes." },
        { name: "Tailwind CSS", reason: "Zero-runtime overhead styling that keeps the bundle size minimal compared to CSS-in-JS libraries." }
      ],
      architecture: `
App_Root
├── Global_Context (Theme, Toast, Sound)
├── Eager_Bundle (Critical Path)
│   ├── HeaderNav
│   ├── Hero_Section (WebP + BlurUp)
│   └── About_Section
└── Lazy_Bundle (Suspense)
    ├── Game_Engine (Minimax Logic)
    ├── AI_Chat_Service (Gemini SDK)
    └── GitHub_Visualizer (GraphQL)
      `,
      coreLogic: "The core logic relies on an 'Intersection Observer' pattern for route management. Instead of traditional routing, the app tracks scroll position relative to section IDs. This allows the URL to update dynamically and the navigation bar to highlight the active module without triggering a full page re-render.",
      features: [
        "Hybrid Rendering Strategy (Eager + Lazy)",
        "Global Dark/Light Mode Context with LocalStorage Persistence",
        "Custom 'GeminiService' Singleton for AI Rate Limiting",
        "Responsive 'Glassmorphism' UI Primitives"
      ],
      challenges: [
        {
          problem: "Initial Load Performance (LCP)",
          solution: "Implemented code-splitting at the section level. The 'Game' and 'Travel' sections (heavy assets) are not imported until the user scrolls within 1000px of them.",
          outcome: "Reduced initial bundle size by 40%, achieving a 98/100 Lighthouse Performance score."
        }
      ],
      metrics: [
        { label: "Lighthouse Perf", value: "98/100" },
        { label: "First Contentful Paint", value: "0.4s" },
        { label: "Interactive Time", value: "0.8s" }
      ],
      code: {
        title: "Lazy Architecture Pattern",
        filename: "App.tsx",
        lang: "typescript",
        code: `// Dynamic imports for heavy sections
const GameSection = lazy(() => import('./sections/game/GameSection'));

function App() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <GameSection />
      </Suspense>
    </main>
  );
}`,
        highlightLines: [2, 8],
        sandboxUrl: "https://codesandbox.io/s/react-lazy-loading-example-forked-v2-5"
      },
      insights: [
        { type: 'optimization', title: 'Performance Win', description: 'Lazy loading reduced TTI by 60%.' },
        { type: 'metric', title: 'Bundle Audit', description: 'Initial JS payload kept under 120KB gzipped.' }
      ]
    }
  },
  {
    id: "hero-kernel",
    visualId: "IK.01",
    title: "Identity Kernel",
    subtitle: "Procedural Content Generation",
    color: "purple",
    content: {
      purpose: "The Hero section solves the 'Blank Page' problem. Instead of a static image, it immerses the visitor in a cloud of my technical identity.",
      visualDescription: "A 3D constellation of over 550 keywords (skills, locations, tools) floats in the background.",
      techStack: [
        { name: "Framer Motion", reason: "Handles the physics-based spring animations for the mouse parallax effect." }
      ],
      architecture: `Hero_Container -> Word_Cloud_Generator -> Parallax_Controller`,
      coreLogic: "The keyword cloud is not a static image. It is procedurally generated on mount with weighted importance scores.",
      features: ["Procedural Generation", "Parallax Depth"],
      challenges: [
        { problem: "DOM Overload", solution: "Implemented 'will-change: transform' and grouped words into layers.", outcome: "60fps stability." }
      ],
      metrics: [
        { label: "Node Count", value: "550+" },
        { label: "Animation FPS", value: "60" }
      ],
      code: {
        title: "Parallax Mapping Logic",
        filename: "ParallaxEngine.ts",
        lang: "typescript",
        code: `const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);`,
        highlightLines: [1, 2]
      },
      insights: [
        { type: 'optimization', title: 'GPU Acceleration', description: 'Layout shifts avoided by using transform exclusively.' },
        { type: 'challenge', title: 'Paint Storms', description: 'Initial render of 500+ nodes required careful sharding.' }
      ]
    }
  },
  {
    id: "github-intelligence",
    visualId: "DH.03",
    title: "GitHub Intelligence",
    subtitle: "Live Data Visualization",
    color: "emerald",
    content: {
      purpose: "Proves real engineering velocity through live GitHub integration.",
      visualDescription: "A dashboard featuring an 'Equalizer' bar graph that visualizes commit intensity.",
      techStack: [
        { name: "GitHub GraphQL API", reason: "Fetches precise data in a single request." },
        { name: "SessionStorage", reason: "Caches the expensive API response." }
      ],
      architecture: `Data_Fetcher_Service -> Cache_Check -> GraphQL_Client`,
      coreLogic: "The fetch logic follows a 'Stale-While-Revalidate' pattern, checking SessionStorage before API hit.",
      features: ["Live Fetch", "Rate Limit Fallback"],
      challenges: [
        { problem: "API Rate Limiting", solution: "Implemented SessionStorage caching layer.", outcome: "Zero 429 errors." }
      ],
      metrics: [
        { label: "Data Source", value: "GraphQL" },
        { label: "Cache Hit Rate", value: "100%" }
      ],
      code: {
        title: "GraphQL Query Definition",
        filename: "queries.ts",
        lang: "graphql",
        code: `query {
  user(login: "vamshikittu22") {
    contributionsCollection {
      contributionCalendar { totalContributions }
    }
  }
}`,
        highlightLines: [4, 5],
        sandboxUrl: "https://docs.github.com/en/graphql/overview/explorer"
      },
      insights: [
        { type: 'challenge', title: 'Rate Limits', description: 'GitHub API rate limits blocked live data during peak traffic.' },
        { type: 'solution', title: 'Resilience Strategy', description: 'Implemented exponential backoff with high-fidelity caching.' }
      ]
    }
  },
  {
    id: "game-engine",
    visualId: "RE.05",
    title: "Game Engine",
    subtitle: "Minimax Algorithm Implementation",
    color: "rose",
    content: {
      purpose: "Demonstration of recursive logic and complex state management through a Tic-Tac-Toe AI.",
      visualDescription: "A Tic-Tac-Toe board inside a glass panel with selectable AI difficulty.",
      techStack: [
        { name: "React Reducer", reason: "Manages complex state transitions." }
      ],
      architecture: `Game_Container -> CPU_Engine -> Minimax_Recursion`,
      coreLogic: "The 'Hard' mode uses the Minimax Algorithm to recursively simulate every possible future move.",
      features: ["Unbeatable AI", "AI Hints"],
      challenges: [
        { problem: "Recursion Depth", solution: "Hardcoded opening book for instant initial moves.", outcome: "Instant response." }
      ],
      metrics: [
        { label: "Depth", value: "9 Levels" },
        { label: "Win Rate", value: "100%" }
      ],
      code: {
        title: "Minimax Scoring Logic",
        filename: "Minimax.ts",
        lang: "typescript",
        code: `if (winner === 'CPU') return 10 - depth;
if (winner === 'USER') return depth - 10;`,
        highlightLines: [1, 2]
      },
      insights: [
        { type: 'optimization', title: 'Opening Book', description: 'Skipping heavy initial-move calculations with static lookups.' },
        { type: 'metric', title: 'Search Space', description: '549,946 total nodes explored in unoptimized minimax.' }
      ]
    }
  }
];
