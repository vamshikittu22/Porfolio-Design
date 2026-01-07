
import React, { useState, useMemo, useEffect } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SKILLS_RESUME } from '../../config/constants';
import { AnimatePresence, motion } from 'framer-motion';

// --- RICH SKILL DATA ---
const SKILL_DETAILS: Record<string, { role: string; usedIn: string; exp: string; desc: string; strength: string }> = {
  // Languages
  'C#': { role: 'Core Language', usedIn: 'Event Node Pro, Enterprise ERP', exp: 'Expert · 5+ Years', desc: 'Primary language for high-performance backend architecture.', strength: 'Memory management & Async patterns' },
  'Python': { role: 'Scripting', usedIn: 'Data Analysis, AI Pipelines', exp: 'Intermediate · 3 Years', desc: 'Automation scripting and data processing.', strength: 'Data libraries & Scripting' },
  'Java': { role: 'Language', usedIn: 'Legacy Systems', exp: 'Proficient · 4 Years', desc: 'Object-oriented enterprise application development.', strength: 'Strong typing & OOP' },
  'JavaScript': { role: 'Language', usedIn: 'Frontend Interactions', exp: 'Expert · 6+ Years', desc: 'Universal language for web interactivity and logic.', strength: 'ES6+ & DOM Manipulation' },
  'TypeScript': { role: 'Language', usedIn: 'Portfolio, Mini Metro', exp: 'Advanced · 4+ Years', desc: 'Type-safe development for robust scalable frontends.', strength: 'Generics & Union Types' },
  'PHP': { role: 'Backend', usedIn: 'Wanderlust Trails', exp: 'Advanced · 4 Years', desc: 'Server-side logic for dynamic web applications.', strength: 'CMS & API integration' },
  'HTML5': { role: 'Markup', usedIn: 'All Web Projects', exp: 'Expert · 7+ Years', desc: 'Semantic structure for modern web accessibility.', strength: 'Semantic Tags & SEO' },
  'CSS3': { role: 'Styling', usedIn: 'All Web Projects', exp: 'Expert · 7+ Years', desc: 'Responsive design and animation systems.', strength: 'Flexbox, Grid & Animations' },

  // Frameworks
  'React': { role: 'UI Library', usedIn: 'Mini Metro, Future Job Fit', exp: 'Expert · 5+ Years', desc: 'Component-driven architecture and state management.', strength: 'Hooks & Custom Reusability' },
  '.NET Core': { role: 'Framework', usedIn: 'Event Node Pro', exp: 'Expert · 5+ Years', desc: 'Cross-platform high-performance backend framework.', strength: 'Dependency Injection & Middleware' },
  'Node.js': { role: 'Runtime', usedIn: 'Serverless Functions', exp: 'Advanced · 4 Years', desc: 'Event-driven JavaScript runtime for scalable network apps.', strength: 'Async I/O & Event Loop' },
  'Tailwind': { role: 'CSS Framework', usedIn: 'Portfolio v2', exp: 'Expert · 3 Years', desc: 'Utility-first CSS for rapid UI development.', strength: 'Design Systems & Config' },
  'Bootstrap': { role: 'UI Kit', usedIn: 'Legacy Admin Panels', exp: 'Advanced · 4 Years', desc: 'Responsive grid system and pre-built components.', strength: 'Grid Layouts' },

  // Cloud & DB
  'Azure': { role: 'Cloud', usedIn: 'Enterprise Deployments', exp: 'Intermediate · 3 Years', desc: 'Cloud computing services for building and managing apps.', strength: 'App Services & CI/CD' },
  'SQL Server': { role: 'Database', usedIn: 'Inventory Systems', exp: 'Advanced · 5 Years', desc: 'Relational database management and optimization.', strength: 'Stored Procedures & Indexing' },
  'PostgreSQL': { role: 'Database', usedIn: 'Mini Metro', exp: 'Intermediate · 3 Years', desc: 'Advanced object-relational database system.', strength: 'JSONB & Complex Queries' },
  'MySQL': { role: 'Database', usedIn: 'Wanderlust Trails', exp: 'Advanced · 4 Years', desc: 'Open-source relational database management.', strength: 'Schema Design' },

  // Tools & AI
  'Gemini AI': { role: 'GenAI', usedIn: 'Portfolio Assistant', exp: 'Intermediate', desc: 'Integrating LLMs for content synthesis and reasoning.', strength: 'Prompt Engineering' },
  'VS Code': { role: 'IDE', usedIn: 'Daily Driver', exp: 'Expert', desc: 'Extensible code editor for modern web development.', strength: 'Extensions & Debugging' },
  'Visual Studio': { role: 'IDE', usedIn: '.NET Development', exp: 'Expert', desc: 'Integrated development environment for .NET.', strength: 'Profiling & Memory Tools' },
  'Git': { role: 'Version Control', usedIn: 'All Projects', exp: 'Expert', desc: 'Distributed version control for team collaboration.', strength: 'Branching & Merging strategies' },
};

type Category = 'All' | 'Languages' | 'Frameworks' | 'Cloud' | 'AI';

const CATEGORY_COLORS: Record<string, string> = {
  'Languages': 'purple',
  'Frameworks': 'cyan',
  'Cloud': 'blue',
  'AI': 'orange'
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Languages': 'The core syntax and logic layers driving my applications. From low-level memory management in C# to high-level scripting in Python.',
  'Frameworks': 'Structural foundations that accelerate development. Focusing on React for reactive UIs and .NET Core for robust microservices.',
  'Cloud': 'Infrastructure and data persistence layers. Leveraging Azure for scalable deployments and SQL/NoSQL for reliable data integrity.',
  'AI': 'Next-generation tooling including LLM integration, prompt engineering, and modern development environments like VS Code.'
};

export const AboutSection: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prepare Floating Bubble Data
  const bubbleData = useMemo(() => {
    // Helper to resolve icon URLs for string-based skill identifiers
    const getIconUrl = (name: string) => {
      const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
    };

    // Fix: create structured objects from strings instead of spreading them (which caused spread type errors)
    const items = [
      ...SKILLS_RESUME.languages.map(s => ({ name: s, cat: 'Languages', icon: getIconUrl(s) })),
      ...SKILLS_RESUME.frameworks.map(s => ({ name: s, cat: 'Frameworks', icon: getIconUrl(s) })),
      ...SKILLS_RESUME.cloud_db.map(s => ({ name: s, cat: 'Cloud', icon: getIconUrl(s) })),
      ...SKILLS_RESUME.tools.map(s => ({ name: s, cat: 'AI', icon: getIconUrl(s) })),
    ];

    // Shuffle for layout variety
    const shuffled = [...items].sort(() => Math.random() - 0.5);

    // Grid Layout
    const cols = 5;
    const rows = 5;
    
    return shuffled.map((item, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const jitterX = Math.random() * 16 - 8;
      const jitterY = Math.random() * 16 - 8;
      
      const left = (col * (100/cols) + (100/cols/2)) + jitterX;
      const top = (row * (100/rows) + (100/rows/2)) + jitterY;

      return {
        ...item,
        left: `${Math.max(5, Math.min(95, left))}%`,
        top: `${Math.max(5, Math.min(95, top))}%`,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * -5,
        floatX: Math.random() * 15 - 7.5,
        floatY: Math.random() * 15 - 7.5,
        color: CATEGORY_COLORS[item.cat] || 'gray'
      };
    });
  }, []);

  // Determine what to show in the info panel
  const activeDetail = hoveredSkill ? (SKILL_DETAILS[hoveredSkill] || { 
    role: 'Technology', 
    exp: 'Proficient', 
    desc: 'Essential tool in my development stack.', 
    usedIn: 'Various Projects', 
    strength: 'Versatility' 
  }) : null;

  return (
    <section id="about-section" className="mb-[20rem] scroll-mt-32 relative">
      <ScrollReveal>
        {/* Header */}
        <div className="flex flex-col gap-6 mb-16 px-4 lg:px-0">
            <h2 className="text-6xl lg:text-8xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.85]">
              Signal <br/> <span className="text-t-fg-m opacity-40">Matrix.</span>
            </h2>
            <div className="h-1 w-24 bg-t-accent" />
            <p className="text-lg lg:text-xl text-t-fg font-medium leading-relaxed max-w-2xl">
              Full‑stack engineer specializing in high‑performance .NET, React, and AI systems.
            </p>
        </div>

        {/* SIGNAL MATRIX CONTAINER */}
        <div className="w-full bg-[#030712] rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row min-h-[600px] lg:h-[650px]">
           {/* Vignette & Ambient Background */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,25,0)_0%,rgba(3,7,18,1)_100%)] pointer-events-none z-10" />
           <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0" />

           {/* LEFT: FLOATING BUBBLE MATRIX */}
           {/* Click background to reset to "Free Mode" */}
           <div 
             className="relative w-full lg:w-[60%] h-[400px] lg:h-full overflow-hidden group/matrix cursor-pointer"
             onClick={() => {
                setSelectedCategory('All');
                setHoveredSkill(null);
             }}
           >
              {isMounted && bubbleData.map((item) => {
                 const isHovered = hoveredSkill === item.name;
                 const isFreeMode = selectedCategory === 'All';
                 const isInSelectedCategory = selectedCategory === item.cat;

                 // --- 4-STATE VISUAL LOGIC ---
                 let targetScale = 1;
                 let targetOpacity = 1;
                 let targetGrayscale = 0;
                 let targetBlur = 0;
                 let targetZ = 20;

                 if (isHovered) {
                   // 1. HOVERED (Highest Priority)
                   targetScale = 1.25;
                   targetOpacity = 1;
                   targetGrayscale = 0;
                   targetBlur = 0;
                   targetZ = 50;
                 } else if (!isFreeMode && isInSelectedCategory) {
                   // 2. SELECTED CATEGORY (High Priority)
                   targetScale = 1.1;
                   targetOpacity = 1;
                   targetGrayscale = 0;
                   targetBlur = 0;
                   targetZ = 30;
                 } else if (!isFreeMode && !isInSelectedCategory) {
                   // 3. DIMMED (Low Priority) - Never fully hidden!
                   targetScale = 0.85;
                   targetOpacity = 0.4;
                   targetGrayscale = 1;
                   targetBlur = 1;
                   targetZ = 10;
                 } else {
                   // 4. NEUTRAL / FREE MODE
                   targetScale = 1;
                   targetOpacity = 0.7;
                   targetGrayscale = 0.3;
                   targetBlur = 0;
                   targetZ = 20;
                 }

                 return (
                   <motion.button
                     key={item.name}
                     initial={{ scale: 0 }} // Start small but don't set opacity to 0 here to avoid stuck state
                     animate={{ 
                       x: [0, item.floatX, 0],
                       y: [0, item.floatY, 0],
                       scale: targetScale,
                       opacity: targetOpacity,
                       filter: `grayscale(${targetGrayscale}) blur(${targetBlur}px)`,
                       zIndex: targetZ
                     }}
                     transition={{ 
                       x: { duration: item.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item.delay },
                       y: { duration: item.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item.delay },
                       scale: { duration: 0.3, ease: "easeOut" },
                       opacity: { duration: 0.3 },
                       filter: { duration: 0.3 }
                     }}
                     style={{ 
                       left: item.left, 
                       top: item.top,
                       position: 'absolute',
                     }}
                     // Interaction Handlers
                     onMouseEnter={() => setHoveredSkill(item.name)}
                     onMouseLeave={() => setHoveredSkill(null)}
                     onFocus={() => setHoveredSkill(item.name)}
                     onBlur={() => setHoveredSkill(null)}
                     onClick={(e) => {
                        e.stopPropagation(); // Prevent background reset
                        setSelectedCategory(item.cat as Category);
                        // Clicking icon selects category, but we keep the hover state active for visual feedback
                     }}
                     
                     className={`
                       w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-full outline-none
                     `}
                     aria-label={`Inspect ${item.name}`}
                   >
                     {/* 3D Glass Orb Background */}
                     <div className={`
                       absolute inset-0 rounded-full 
                       bg-gradient-to-br from-white/10 to-transparent 
                       border border-white/20 
                       backdrop-blur-[2px] 
                       shadow-[0_4px_8px_rgba(0,0,0,0.5)]
                       transition-all duration-300
                       ${isHovered || (!isFreeMode && isInSelectedCategory) ? `bg-white/20 border-white/50 shadow-[0_0_20px_rgba(var(--color-${item.color}-rgb),0.6)]` : 'hover:bg-white/15'}
                     `} />

                     {/* The Icon Image */}
                     <img 
                       src={item.icon} 
                       alt={item.name} 
                       className={`relative w-[60%] h-[60%] object-contain drop-shadow-md`}
                     />

                     {/* Active Ping Effect (Only on specific hover) */}
                     {isHovered && (
                       <span className={`absolute inset-0 rounded-full ring-2 ring-${item.color}-400 opacity-50 animate-ping`} />
                     )}
                   </motion.button>
                 );
               })}
           </div>

           {/* RIGHT: INFO PANEL */}
           <div className="relative w-full lg:w-[40%] bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5 backdrop-blur-sm p-8 lg:p-12 flex flex-col justify-between z-20 min-h-[300px]">
              
              {/* Top: Filters */}
              <div className="flex flex-wrap gap-2 mb-8 justify-end">
                {(['All', 'Languages', 'Frameworks', 'Cloud', 'AI'] as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent bubble click handlers if overlapping
                        if (cat === 'All') {
                           setSelectedCategory('All');
                           setHoveredSkill(null);
                        } else {
                           setSelectedCategory(cat);
                           // Preserve hoveredSkill so user doesn't lose context if they are hovering an icon while clicking logic
                        }
                    }}
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border
                      ${selectedCategory === cat 
                        ? 'bg-white text-black border-white scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                        : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'}
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Center: Dynamic Content */}
              <AnimatePresence mode="wait">
                {hoveredSkill && activeDetail ? (
                  // STATE 1: Hovering a specific skill (Shows Deep Details)
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                         <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md">
                           <img 
                             src={bubbleData.find(i => i.name === hoveredSkill)?.icon} 
                             className="w-10 h-10 object-contain drop-shadow-lg" 
                             alt="" 
                           />
                         </div>
                         <div>
                           <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-none">{hoveredSkill}</h3>
                           <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mt-1 text-${CATEGORY_COLORS[bubbleData.find(i => i.name === hoveredSkill)?.cat || 'Languages']}-400`}>
                              {activeDetail.role} · {activeDetail.exp}
                           </p>
                         </div>
                      </div>
                      
                      <p className="text-base text-white/80 leading-relaxed font-medium pl-2 border-l-2 border-white/10">
                        "{activeDetail.desc}"
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
                         <div>
                           <span className="text-[9px] font-black text-white/30 uppercase tracking-widest block mb-1">Deployment</span>
                           <span className="text-xs text-indigo-300 font-bold">{activeDetail.usedIn}</span>
                         </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                         <div>
                           <span className="text-[9px] font-black text-white/30 uppercase tracking-widest block mb-1">Key Strength</span>
                           <span className="text-xs text-emerald-300 font-bold">{activeDetail.strength}</span>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ) : selectedCategory !== 'All' ? (
                  // STATE 2: Category Selected (Shows Category Overview)
                  <motion.div
                    key="category"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                     <div className="w-16 h-16 rounded-full border border-dashed border-white/30 flex items-center justify-center">
                        <div className={`w-8 h-8 rounded-full bg-${CATEGORY_COLORS[selectedCategory]}-500/50 animate-pulse`} />
                     </div>
                     <div>
                       <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                         {selectedCategory}.
                       </h3>
                       <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
                         Protocol Group Active
                       </p>
                     </div>
                     <p className="text-sm text-white/70 leading-relaxed border-l-2 border-white/10 pl-4">
                       {CATEGORY_DESCRIPTIONS[selectedCategory]}
                     </p>
                  </motion.div>
                ) : (
                  // STATE 3: System Idle / Free Mode (Default)
                  <motion.div
                     key="idle"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex flex-col items-center justify-center text-center h-full py-10 opacity-50"
                  >
                     <div className="w-24 h-24 rounded-full border border-dashed border-white/30 animate-[spin_10s_linear_infinite] flex items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-widest mb-2">
                        System Idle
                     </h4>
                     <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] max-w-[200px]">
                       Hover over a signal node to analyze technical data.
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom: Static Snapshot */}
              <div className="mt-8 pt-6 border-t border-white/10 opacity-50">
                <p className="text-[8px] font-mono text-white/60 uppercase tracking-widest">
                  <span className="text-t-accent">CORE SIGNAL:</span> C# · .NET Core · React · TypeScript · SQL · Azure
                </p>
              </div>
           </div>
        </div>

        {/* Mobile List View (Below Radar) */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-4 lg:hidden snap-x scrollbar-hide">
          {bubbleData.filter(i => selectedCategory === 'All' || selectedCategory === i.cat).map(item => (
            <button
              key={item.name}
              onClick={() => {
                setSelectedCategory(item.cat as Category);
                setHoveredSkill(item.name);
              }}
              className={`
                flex-shrink-0 snap-center px-4 py-2 rounded-full border flex items-center gap-2 transition-all
                ${hoveredSkill === item.name ? `bg-${item.color}-500/20 border-${item.color}-500 text-white` : 'bg-white/5 border-white/10 text-white/50'}
              `}
            >
              <img src={item.icon} className="w-4 h-4 object-contain" alt="" />
              <span className="text-xs font-bold uppercase tracking-wide">{item.name}</span>
            </button>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};
