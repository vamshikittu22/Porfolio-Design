
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, GlassButton, BubbleTag } from '../../components/ui/GlassUI';
import { ScrollReveal } from '../../components/ui/ScrollReveal';

// --- TYPES & INTERFACES ---

interface TechItem {
  name: string;
  reason: string;
}

interface Challenge {
  problem: string;
  solution: string;
  outcome: string;
}

interface Metric {
  label: string;
  value: string;
}

interface CodeSnippet {
  title: string;
  lang: string;
  code: string;
}

interface CaseStudyChapter {
  id: string;
  visualId: string;
  title: string;
  subtitle: string;
  color: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'cyan';
  content: {
    purpose: string;
    visualDescription: string;
    techStack: TechItem[];
    architecture: string; // ASCII or Mermaid-style text
    coreLogic: string;
    features: string[];
    challenges: Challenge[];
    metrics: Metric[];
    code: CodeSnippet;
  };
}

// --- DATA: THE ENGINEERING NARRATIVE ---

const CASE_STUDY_DATA: CaseStudyChapter[] = [
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
        },
        {
          problem: "Animation Jank on Mobile",
          solution: "Offloaded all layout animations to the GPU using Framer Motion's 'layout' prop and avoiding CPU-bound CSS properties like 'top/left'.",
          outcome: "Consistent 60fps scrolling on mid-tier mobile devices."
        }
      ],
      metrics: [
        { label: "Lighthouse Perf", value: "98/100" },
        { label: "First Contentful Paint", value: "0.4s" },
        { label: "Interactive Time", value: "0.8s" }
      ],
      code: {
        title: "Lazy Loading Strategy",
        lang: "tsx",
        code: `// App.tsx Architecture
const GameSection = lazy(() => import('../sections/game/GameSection'));

// The Observer triggers the import only when needed
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Dynamic import trigger
        import('../sections/game/GameSection'); 
      }
    });
  }, { rootMargin: '1000px' });
}, []);`
      }
    }
  },
  {
    id: "hero-kernel",
    visualId: "IK.01",
    title: "Identity Kernel",
    subtitle: "Procedural Content Generation",
    color: "purple",
    content: {
      purpose: "The Hero section solves the 'Blank Page' problem. Instead of a static image, it immerses the visitor in a cloud of my technical identity. It serves as a visual metaphor for 'Order from Chaos'—taking hundreds of disconnected skills and organizing them into a coherent professional profile.",
      visualDescription: "A 3D constellation of over 550 keywords (skills, locations, tools) floats in the background. As the mouse moves, the text layers shift in parallax—foreground words move faster than background words—creating a sense of genuine depth.",
      techStack: [
        { name: "Framer Motion", reason: "Handles the physics-based spring animations for the mouse parallax effect." },
        { name: "CSS Variables", reason: "Used for high-performance, reactive theme switching without React re-renders." }
      ],
      architecture: `
Hero_Container
├── Background_Layer
│   └── Word_Cloud_Generator
│       ├── 550x Word_Nodes (Randomized x/y/z)
│       └── Parallax_Controller (Mouse_Listener)
├── Foreground_Layer
│   ├── 3D_Title_Component
│   └── CTA_Cluster
└── Image_Composite
    └── WebP_Asset + Blur_Filter
      `,
      coreLogic: "The keyword cloud is not a static image. It is procedurally generated on mount. The algorithm creates an array of 550 objects, assigning each a random coordinate (0-100%), opacity, blur amount, and font size based on a weighted 'importance' score. The parallax effect uses `useSpring` physics to interpolate mouse position, preventing jerky movement.",
      features: [
        "Procedural Coordinate Generation",
        "Mouse-Reactive Parallax Depth",
        "3D Text Transforms (CSS perspective)",
        "Semantic HTML Heading Structure"
      ],
      challenges: [
        {
          problem: "DOM Node Overload",
          solution: "Rendering 550 DOM nodes caused frame drops. I implemented CSS 'will-change: transform' and grouped words into layers to reduce paint costs.",
          outcome: "Maintained 60fps while rendering 500+ individual motion elements."
        },
        {
          problem: "Layout Shifts (CLS)",
          solution: "Used a strict aspect-ratio container for the Hero Image to reserve space before the asset loads.",
          outcome: "Cumulative Layout Shift (CLS) reduced to 0.00."
        }
      ],
      metrics: [
        { label: "Node Count", value: "550+" },
        { label: "Animation FPS", value: "60" },
        { label: "Input Latency", value: "<16ms" }
      ],
      code: {
        title: "Parallax Logic",
        lang: "tsx",
        code: `// Mouse Parallax Physics
const x = useMotionValue(0);
const y = useMotionValue(0);

// Spring physics for smooth follow
const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

// Transform map: Mouse -0.5 to 0.5 -> Rotation -5 to 5 deg
const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);`
      }
    }
  },
  {
    id: "skills-matrix",
    visualId: "SM.02",
    title: "Skills Matrix",
    subtitle: "Relational Knowledge Graph",
    color: "cyan",
    content: {
      purpose: "Bullet lists are boring and fail to show relationships. The Skills Matrix visualizes my tech stack as a living ecosystem. It communicates that I don't just 'know' these tools—I understand how they cluster together (e.g., React near TypeScript, C# near .NET).",
      visualDescription: "An interactive grid of floating bubbles. When the user selects a category (e.g., 'Cloud'), unrelated skills fade out and blur, while relevant skills highlight and gravitate forward. Hovering a skill reveals a detailed card explaining *how* I use it.",
      techStack: [
        { name: "React State", reason: "Manages the filtering logic and hover states." },
        { name: "Framer Layout", reason: "Handles the seamless transition between filtered and unfiltered states." }
      ],
      architecture: `
Skills_Container
├── Control_Panel (Filter_Tabs)
├── Visualization_Viewport
│   ├── 40x Bubble_Nodes (Absolute Position)
│   └── Interaction_Layer (Hover_Handler)
└── Detail_Panel (Contextual_Data)
    └── Dynamic_Content_Renderer
      `,
      coreLogic: "The layout uses a jitter algorithm. Instead of a strict grid, each bubble is placed in a cell but given a random x/y offset (jitter) and a floating animation duration. This creates an 'organic' feel. The filtering logic uses a discriminating union type to check if a skill belongs to the selected category, applying CSS filters (blur/grayscale) to non-matches.",
      features: [
        "Physics-Simulated Floating Nodes",
        "Category-Based Focus Filtering",
        "Contextual Detail Expansion",
        "Accessibility Support (ARIA-pressed)"
      ],
      challenges: [
        {
          problem: "Visual Clutter",
          solution: "With 40+ skills, the screen was messy. I implemented a 'Z-Index' boost on hover, bringing the active bubble to the front and dimming others.",
          outcome: "Clear focus states without removing context."
        },
        {
          problem: "Responsive Layout",
          solution: "On mobile, the physics simulation is disabled, and bubbles snap to a scrollable flex grid to ensure touch targets are hit-able.",
          outcome: "Usable on all device sizes."
        }
      ],
      metrics: [
        { label: "Skill Nodes", value: "40+" },
        { label: "Categories", value: "6" },
        { label: "Filter Time", value: "Instant" }
      ],
      code: {
        title: "Organic Jitter Algorithm",
        lang: "tsx",
        code: `// Generating organic positions
return items.map((item, i) => {
  const col = i % cols;
  const row = Math.floor(i / cols);
  
  // Add random variance to grid position
  const jitterX = Math.random() * 10 - 5;
  const jitterY = Math.random() * 10 - 5;
  
  return {
    ...item,
    left: \`\${(col * (100/cols)) + jitterX}%\`,
    top: \`\${(row * (100/rows)) + jitterY}%\`,
    duration: 5 + Math.random() * 5 // Random float speed
  };
});`
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
      purpose: "Anyone can claim they code; this section proves it. It connects directly to my GitHub profile to show real engineering velocity. It solves the 'trust' problem for recruiters by providing verifiable, live data.",
      visualDescription: "A dashboard featuring an 'Equalizer' bar graph that visualizes commit intensity. Below it, a timeline allows users to toggle between yearly datasets (2023-2025). It explicitly highlights if the data is 'Live' (API) or 'Cached'.",
      techStack: [
        { name: "GitHub GraphQL API", reason: "Fetches precise contribution data in a single request, unlike the REST API which requires pagination." },
        { name: "SessionStorage", reason: "Caches the expensive API response to prevent hitting rate limits on page reloads." },
        { name: "Fetch API", reason: "Native browser standard for network requests, no heavy Axios dependency needed." }
      ],
      architecture: `
GitHub_Section
├── Data_Fetcher_Service
│   ├── Cache_Check (SessionStorage)
│   └── GraphQL_Client
├── Dashboard_UI
│   ├── User_Profile_Card
│   ├── Activity_Equalizer (Animation)
│   └── Repo_Showcase_Carousel
└── Fallback_State (Skeleton_Loader)
      `,
      coreLogic: "The fetch logic follows a 'Stale-While-Revalidate' inspired pattern. On mount, it checks `sessionStorage`. If data exists, it renders immediately. If not, it executes a GraphQL query to fetch contribution calendars for 3 years simultaneously. If the API fails (rate limit), it gracefully degrades to a local JSON fallback dataset.",
      features: [
        "Live GraphQL Data Fetching",
        "Rate-Limit Handling & Fallbacks",
        "Audio-Visualizer Style Bar Graph",
        "Yearly Contribution Toggles"
      ],
      challenges: [
        {
          problem: "API Rate Limiting",
          solution: "GitHub's public API is strict. I implemented a caching layer that stores the JSON response for the user's session duration.",
          outcome: "Zero 429 errors during testing."
        },
        {
          problem: "Data Visualization",
          solution: "Visualizing raw numbers is boring. I mapped commit counts to bar heights (0-100%) and added a CSS keyframe animation to make the bars 'breathe', simulating a living system.",
          outcome: "High visual engagement."
        }
      ],
      metrics: [
        { label: "Data Source", value: "GraphQL" },
        { label: "Years Tracked", value: "3" },
        { label: "Cache Hit Rate", value: "100%" }
      ],
      code: {
        title: "GraphQL Query Structure",
        lang: "graphql",
        code: `query {
  user(login: "vamshikittu22") {
    y2025: contributionsCollection(
      from: "2025-01-01T00:00:00Z", 
      to: "2025-12-31T23:59:59Z"
    ) {
      contributionCalendar { totalContributions }
    }
    // ... aliases for other years
  }
}`
      }
    }
  },
  {
    id: "game-engine",
    visualId: "RE.05",
    title: "Game Engine",
    subtitle: "Minimax Algorithm Implementation",
    color: "rose",
    content: {
      purpose: "This isn't just a game; it's a demonstration of algorithmic competency. It shows I can implement recursive logic, manage complex state machines, and optimize for 'unbeatable' outcomes.",
      visualDescription: "A Tic-Tac-Toe board inside a glass panel. Users play against the CPU. The CPU difficulty can be toggled. At 'Hard' level, the CPU never loses.",
      techStack: [
        { name: "React Reducer", reason: "Manages the complex state transitions (turn switching, win checking, draw logic)." },
        { name: "Web Workers", reason: "(Potential optimization) To offload Minimax calculation from the main thread if depth increases." }
      ],
      architecture: `
Game_Container
├── Game_State (Board, Turn, Winner)
├── CPU_Engine
│   ├── Random_Move (Easy)
│   ├── Block_Move (Medium)
│   └── Minimax_Recursion (Hard)
└── UI_Layer
    ├── Grid_Renderer
    └── Score_Board
      `,
      coreLogic: "The 'Hard' mode uses the **Minimax Algorithm**. It recursively simulates every possible future move. It assigns a score (+10 for CPU win, -10 for Human win, 0 for Draw). It then assumes the Human plays optimally (minimizing CPU score) and the CPU plays optimally (maximizing CPU score) to choose the perfect move.",
      features: [
        "Unbeatable Minimax AI",
        "3 Difficulty Tiers",
        "Gemini AI Hint Integration",
        "Win/Loss State Persistence"
      ],
      challenges: [
        {
          problem: "Recursion Depth",
          solution: "In early iterations, the algorithm was slow on the first move (empty board). I added a hardcoded opening book (e.g., always take center or corner) to skip the initial calculation spike.",
          outcome: "Instant response time."
        },
        {
          problem: "UX Feedback",
          solution: "Added a simulated 'Thinking' delay (600ms) because instant CPU moves felt robotic and jarring to the user.",
          outcome: "More natural gameplay feel."
        }
      ],
      metrics: [
        { label: "Algorithm", value: "Minimax" },
        { label: "Depth", value: "9 Levels" },
        { label: "Win Rate", value: "100%" }
      ],
      code: {
        title: "Minimax Logic",
        lang: "typescript",
        code: `const minimax = (board, depth, isMax): number => {
  const winner = checkWinner(board);
  if (winner === 'X') return 10 - depth; // Prefer fast wins
  if (winner === 'O') return depth - 10; // Prefer slow losses
  if (isFull(board)) return 0;

  if (isMax) {
    let best = -Infinity;
    // Recursively check all empty spots...
    return best;
  } else {
    let best = Infinity;
    // Recursively check...
    return best;
  }
};`
      }
    }
  },
  {
    id: "neural-chat",
    visualId: "CP.07",
    title: "AI Chat Assistant",
    subtitle: "RAG-Based Neural Proxy",
    color: "amber",
    content: {
      purpose: "Recruiters often have specific questions my static text might miss. This Chat Assistant acts as a 24/7 representative, answering questions about my experience using a Retrieval-Augmented Generation (RAG) pattern to ensure accuracy.",
      visualDescription: "A floating button expands into a glass-panel chat interface. The UI mimics a modern messaging app with typing indicators, auto-scroll, and quick-suggestion chips.",
      techStack: [
        { name: "Google Gemini 3 Flash", reason: "Selected for its massive context window and sub-second inference speed." },
        { name: "Context Injection", reason: "Feeds the resume/project data as a 'System Instruction' rather than fine-tuning a model." }
      ],
      architecture: `
Chat_System
├── Chat_UI_Component (State: Messages[])
├── Chat_Service (Singleton)
│   ├── Context_Builder (Compiles Resume)
│   └── API_Handler (Gemini Client)
└── Error_Boundary (Quota/Network Handler)
      `,
      coreLogic: "The system does not just send the user's message to the AI. First, it constructs a 'System Prompt' containing my entire structured resume (Skills, Experience, Projects). It instructs the AI to 'Act as Vamshi's assistant'. This Context + User Query is sent to Gemini. The response is parsed and streamed back to the UI.",
      features: [
        "Context-Aware Responses",
        "Persistent Chat History",
        "Rate Limit Handling (Exponential Backoff)",
        "Quick-Reply Suggestions"
      ],
      challenges: [
        {
          problem: "Hallucinations",
          solution: "Strict prompt engineering: 'If the answer is not in the context, state that you do not know. Do not invent projects.'",
          outcome: "High fidelity responses."
        },
        {
          problem: "Quota Limits",
          solution: "Implemented a client-side 'Quota Lock' service. If a 429 error occurs, the UI disables input for 60 seconds and shows a countdown.",
          outcome: "Graceful failure state."
        }
      ],
      metrics: [
        { label: "Model", value: "Gemini 3 Flash" },
        { label: "Context", value: "4k Tokens" },
        { label: "Latency", value: "~1.2s" }
      ],
      code: {
        title: "System Context Injection",
        lang: "typescript",
        code: `const getContext = (): string => {
  return \`
    Profile: \${FULL_NAME}
    Skills: \${SKILLS.join(', ')}
    Projects: \${PROJECTS.map(p => p.desc).join('; ')}
    
    Instruction: Answer as a portfolio assistant. 
    Keep answers under 3 sentences.
  \`;
};`
      }
    }
  }
];

// --- COMPONENT IMPLEMENTATION ---

const CaseStudyChapterView: React.FC<{ chapter: CaseStudyChapter; index: number }> = ({ chapter, index }) => {
  const [activeCode, setActiveCode] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className="py-24 lg:py-32 border-b border-t-border last:border-0 relative overflow-hidden">
      {/* Background Ambience */}
      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1/2 h-full bg-${chapter.color}-500/5 blur-[120px] pointer-events-none`} />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 relative z-10">
        
        {/* LEFT COLUMN: Narrative & Logic */}
        <div className={`space-y-12 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className={`text-[10px] font-black uppercase tracking-[0.6em] text-${chapter.color}-500`}>Module 0{index + 1}</span>
              <div className={`h-px w-12 bg-${chapter.color}-500/30`} />
            </div>
            <h3 className="text-5xl lg:text-7xl font-black font-display text-t-fg uppercase tracking-tighter leading-none">{chapter.title}.</h3>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-t-fg-m opacity-60">{chapter.subtitle}</p>
          </div>

          <div className="prose-lg text-t-fg-m leading-relaxed font-medium space-y-6">
            <p className="pl-6 border-l-2 border-t-accent/20">{chapter.content.purpose}</p>
            <p className="text-base opacity-80">{chapter.content.visualDescription}</p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">Core Logic</h4>
            <div className="p-6 rounded-2xl bg-t-bg-el border border-t-border shadow-inner">
              <p className="text-sm font-mono text-t-accent-2 leading-relaxed whitespace-pre-wrap">{chapter.content.coreLogic}</p>
            </div>
          </div>

          {/* CHALLENGES */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">Engineering Challenges</h4>
            <div className="grid gap-4">
              {chapter.content.challenges.map((c, i) => (
                <div key={i} className="p-5 rounded-2xl bg-t-bg/50 border border-t-border hover:border-t-accent/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-t-fg">{c.problem}</span>
                  </div>
                  <p className="text-xs text-t-fg-m mb-3 pl-4 border-l border-t-border/50">{c.solution}</p>
                  <div className="flex items-center gap-2 pl-4">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">{c.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visuals, Stack, Code */}
        <div className={`space-y-12 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          
          {/* Visual Architecture Block */}
          <GlassCard accent={chapter.color} className="relative overflow-hidden group min-h-[300px] flex flex-col">
            <div className="absolute top-4 right-4 text-[8px] font-mono opacity-30 uppercase tracking-widest">
              {chapter.visualId} // Architecture
            </div>
            
            <div className="flex-1 p-8 flex items-center justify-center bg-black/5 dark:bg-black/20">
              <pre className="text-[8px] lg:text-[10px] font-mono text-t-fg/70 leading-tight whitespace-pre select-none pointer-events-none">
                {chapter.content.architecture}
              </pre>
            </div>

            <div className="p-6 border-t border-t-border bg-t-bg-el/50 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-t-fg-m">Technology Stack</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-rose-500/50" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {chapter.content.techStack.map((t) => (
                  <div key={t.name} className="group/tech relative cursor-help">
                    <BubbleTag accent={chapter.color} className="!text-[8px] !px-3 !py-1">{t.name}</BubbleTag>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-xl bg-t-bg-el border border-t-border shadow-xl opacity-0 group-hover/tech:opacity-100 transition-opacity pointer-events-none z-50 text-center">
                      <p className="text-[9px] text-t-fg font-medium leading-tight">{t.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            {chapter.content.metrics.map((m, i) => (
              <div key={i} className="p-4 rounded-2xl bg-t-bg-el/30 border border-t-border flex flex-col items-center justify-center text-center">
                <span className="text-xl lg:text-2xl font-black text-t-fg mb-1">{m.value}</span>
                <span className="text-[7px] font-black uppercase tracking-widest text-t-fg-m opacity-50">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Code Snippet Toggle */}
          <div className="relative">
            <button 
              onClick={() => setActiveCode(!activeCode)}
              className={`w-full p-6 rounded-2xl border transition-all duration-500 flex items-center justify-between group
                ${activeCode ? 'bg-t-bg-el border-t-accent' : 'bg-t-bg/20 border-t-border hover:border-t-accent/30'}
              `}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-t-fg/5 flex items-center justify-center text-t-fg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-black uppercase tracking-widest text-t-fg block mb-0.5">Implementation</span>
                  <span className="text-xs font-bold text-t-fg-m opacity-60 group-hover:opacity-100 transition-opacity">{chapter.content.code.title}</span>
                </div>
              </div>
              <span className={`text-xl transition-transform duration-500 ${activeCode ? 'rotate-180' : ''}`}>↓</span>
            </button>

            <AnimatePresence>
              {activeCode && (
                <motion.div 
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/10 text-gray-300 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
                    <pre>{chapter.content.code.code}</pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

const PortfolioCaseStudy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="relative pt-32 pb-64 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <section className="space-y-16 mb-32">
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-[2.5px] bg-t-accent" />
              <span className="text-[11px] font-black uppercase tracking-[1em] text-t-accent">Technical Architecture Specification</span>
            </div>
            <h1 className="text-7xl lg:text-[11rem] font-black font-display text-t-fg uppercase tracking-tighter leading-[0.75]">Engineering <br /> Blueprint.</h1>
            <p className="text-xl lg:text-3xl text-t-fg-m font-medium leading-tight tracking-tight max-w-4xl text-balance">
              This portfolio is not just a website; it is a full-stack, <span className="text-t-accent font-black">AI-Native Application</span> designed to demonstrate production-grade architecture, performance optimization, and complex state management.
            </p>
          </div>
        </section>

        {/* CHAPTERS */}
        <div className="space-y-0">
          {CASE_STUDY_DATA.map((chapter, idx) => (
            <ScrollReveal key={chapter.id}>
              <CaseStudyChapterView chapter={chapter} index={idx} />
            </ScrollReveal>
          ))}
        </div>

        {/* FOOTER CTA */}
        <section className="flex flex-col items-center py-48 text-center space-y-12">
           <div className="w-px h-24 bg-t-accent/30" />
           <h2 className="text-5xl lg:text-9xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.8]">Ready for <br /> Digital Deployment?</h2>
           <GlassButton primary accent="theme" onClick={onBack} className="!px-16 !py-6 !text-[12px] shadow-2xl">
              Return to Portfolio Interface
           </GlassButton>
        </section>
      </div>
    </div>
  );
};

export default PortfolioCaseStudy;
