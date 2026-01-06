
import React, { useState, useMemo, useEffect } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SKILLS_RESUME } from '../../config/constants';
import { AnimatePresence, motion } from 'framer-motion';

// --- RICH SKILL DATA ---
const SKILL_DETAILS: Record<string, { role: string; usedIn: string; exp: string; desc: string; strength: string }> = {
  // Languages (Purple)
  'C#': { role: 'Core Language', usedIn: 'Event Node Pro, Enterprise ERP', exp: 'Expert · 5+ Years', desc: 'Primary language for high-performance backend architecture.', strength: 'Memory management & Async patterns' },
  'TypeScript': { role: 'Language', usedIn: 'Portfolio, Mini Metro', exp: 'Advanced · 4+ Years', desc: 'Type-safe development for robust scalable frontends.', strength: 'Generics & Union Types' },
  'JavaScript': { role: 'Language', usedIn: 'Frontend Interactions', exp: 'Expert · 6+ Years', desc: 'Universal language for web interactivity and logic.', strength: 'ES6+ & DOM Manipulation' },
  'Python': { role: 'Scripting', usedIn: 'Data Analysis, AI Pipelines', exp: 'Intermediate · 3 Years', desc: 'Automation scripting and data processing.', strength: 'Data libraries & Scripting' },
  'Java': { role: 'Language', usedIn: 'Legacy Systems', exp: 'Proficient · 4 Years', desc: 'Object-oriented enterprise application development.', strength: 'Strong typing & OOP' },
  'PHP': { role: 'Backend', usedIn: 'Wanderlust Trails', exp: 'Advanced · 4 Years', desc: 'Server-side logic for dynamic web applications.', strength: 'CMS & API integration' },
  'HTML5': { role: 'Markup', usedIn: 'All Web Projects', exp: 'Expert · 7+ Years', desc: 'Semantic structure for modern web accessibility.', strength: 'Semantic Tags & SEO' },
  'CSS3': { role: 'Styling', usedIn: 'All Web Projects', exp: 'Expert · 7+ Years', desc: 'Responsive design and animation systems.', strength: 'Flexbox, Grid & Animations' },

  // Frameworks (Cyan)
  'React': { role: 'UI Library', usedIn: 'Mini Metro, Future Job Fit', exp: 'Expert · 5+ Years', desc: 'Component-driven architecture and state management.', strength: 'Hooks & Custom Reusability' },
  '.NET Core': { role: 'Framework', usedIn: 'Event Node Pro', exp: 'Expert · 5+ Years', desc: 'Cross-platform high-performance backend framework.', strength: 'Dependency Injection & Middleware' },
  'Node.js': { role: 'Runtime', usedIn: 'Serverless Functions', exp: 'Advanced · 4 Years', desc: 'Event-driven JavaScript runtime for scalable network apps.', strength: 'Async I/O & Event Loop' },
  'Tailwind': { role: 'CSS Framework', usedIn: 'Portfolio v2', exp: 'Expert · 3 Years', desc: 'Utility-first CSS for rapid UI development.', strength: 'Design Systems & Config' },
  'Bootstrap': { role: 'UI Kit', usedIn: 'Legacy Admin Panels', exp: 'Advanced · 4 Years', desc: 'Responsive grid system and pre-built components.', strength: 'Grid Layouts' },

  // Cloud & DB (Blue)
  'Azure': { role: 'Cloud', usedIn: 'Enterprise Deployments', exp: 'Intermediate · 3 Years', desc: 'Cloud computing services for building and managing apps.', strength: 'App Services & CI/CD' },
  'SQL Server': { role: 'Database', usedIn: 'Inventory Systems', exp: 'Advanced · 5 Years', desc: 'Relational database management and optimization.', strength: 'Stored Procedures & Indexing' },
  'PostgreSQL': { role: 'Database', usedIn: 'Mini Metro', exp: 'Intermediate · 3 Years', desc: 'Advanced object-relational database system.', strength: 'JSONB & Complex Queries' },
  'MySQL': { role: 'Database', usedIn: 'Wanderlust Trails', exp: 'Advanced · 4 Years', desc: 'Open-source relational database management.', strength: 'Schema Design' },

  // Tools & AI (Orange)
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

export const AboutSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string>('C#');
  const [filter, setFilter] = useState<Category>('All');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prepare Floating Bubble Data
  const bubbleData = useMemo(() => {
    const items = [
      ...SKILLS_RESUME.languages.map(s => ({ ...s, cat: 'Languages' })),
      ...SKILLS_RESUME.frameworks.map(s => ({ ...s, cat: 'Frameworks' })),
      ...SKILLS_RESUME.cloud_db.map(s => ({ ...s, cat: 'Cloud' })),
      ...SKILLS_RESUME.tools.map(s => {
        const isAI = s.name.includes('AI') || s.name.includes('Gemini');
        return { ...s, cat: isAI ? 'AI' : 'AI' };
      }),
    ];

    // Seeded-like shuffle to ensure consistency during hydration if this were SSR, 
    // but simple random sort is fine for client-side only.
    const shuffled = [...items].sort(() => Math.random() - 0.5);

    // Distribution Grid Logic to prevent clumping
    // We have ~21 items. A 5x5 grid (25 slots) works well.
    const cols = 5;
    const rows = 5;
    
    return shuffled.map((item, i) => {
      // Calculate grid slot
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Calculate percentage positions with Jitter
      // Base cell size is ~20% width/height
      // Center of cell is (col * 20 + 10)
      // Add random jitter of +/- 8%
      const jitterX = Math.random() * 16 - 8;
      const jitterY = Math.random() * 16 - 8;
      
      const left = (col * (100/cols) + (100/cols/2)) + jitterX;
      const top = (row * (100/rows) + (100/rows/2)) + jitterY;

      // Float Animation Parameters
      const duration = 4 + Math.random() * 4; // 4s to 8s
      const delay = Math.random() * -5; // Negative delay to start mid-animation
      const floatX = Math.random() * 15 - 7.5; // Drift X
      const floatY = Math.random() * 15 - 7.5; // Drift Y

      return {
        ...item,
        left: `${Math.max(5, Math.min(95, left))}%`,
        top: `${Math.max(5, Math.min(95, top))}%`,
        duration,
        delay,
        floatX,
        floatY,
        color: CATEGORY_COLORS[item.cat] || 'gray'
      };
    });
  }, []);

  const activeDetail = SKILL_DETAILS[activeSkill] || { role: 'Tech', exp: 'Proficient', desc: 'Technology stack item.', usedIn: 'General Development', strength: 'General Usage' };
  
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
           <div className="relative w-full lg:w-[60%] h-[400px] lg:h-full overflow-hidden">
              {isMounted && bubbleData.map((item) => {
                 const isActive = activeSkill === item.name;
                 const matchesFilter = filter === 'All' || filter === item.cat || (filter === 'AI' && item.cat === 'Tools'); 
                 const isDimmed = !matchesFilter;

                 return (
                   <motion.button
                     key={item.name}
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ 
                       opacity: isDimmed ? 0.2 : 1, 
                       scale: isActive ? 1.3 : (isDimmed ? 0.8 : 1),
                       x: [0, item.floatX, 0],
                       y: [0, item.floatY, 0],
                       filter: isDimmed ? 'grayscale(100%) blur(1px)' : 'grayscale(0%) blur(0px)'
                     }}
                     transition={{ 
                       opacity: { duration: 0.5 },
                       scale: { duration: 0.3 },
                       filter: { duration: 0.5 },
                       x: { duration: item.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item.delay },
                       y: { duration: item.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item.delay }
                     }}
                     style={{ 
                       left: item.left, 
                       top: item.top,
                       position: 'absolute',
                     }}
                     onClick={() => setActiveSkill(item.name)}
                     onFocus={() => setActiveSkill(item.name)}
                     onMouseEnter={() => setActiveSkill(item.name)}
                     className={`
                       z-20 w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-full outline-none
                       ${isActive ? 'z-50' : 'hover:z-40'}
                     `}
                     aria-label={`Select ${item.name}`}
                   >
                     {/* 3D Glass Orb Background */}
                     <div className={`
                       absolute inset-0 rounded-full 
                       bg-gradient-to-br from-white/10 to-transparent 
                       border border-white/20 
                       backdrop-blur-[1px] 
                       shadow-[0_4px_8px_rgba(0,0,0,0.5)]
                       transition-all duration-300
                       ${isActive ? `bg-white/20 border-white/50 shadow-[0_0_20px_rgba(var(--color-${item.color}-rgb),0.6)]` : 'hover:bg-white/15'}
                     `} />

                     {/* The Icon Image */}
                     <img 
                       src={item.icon} 
                       alt={item.name} 
                       className={`relative w-[60%] h-[60%] object-contain drop-shadow-md transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
                     />

                     {/* Active Ping Effect */}
                     {isActive && !isDimmed && (
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
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border
                      ${filter === cat 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'}
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Center: Active Skill Detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill}
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
                           src={bubbleData.find(i => i.name === activeSkill)?.icon} 
                           className="w-10 h-10 object-contain drop-shadow-lg" 
                           alt="" 
                         />
                       </div>
                       <div>
                         <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-none">{activeSkill}</h3>
                         <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mt-1 text-${CATEGORY_COLORS[bubbleData.find(i => i.name === activeSkill)?.cat || 'Languages']}-400`}>
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
          {bubbleData.filter(i => filter === 'All' || filter === i.cat || (filter === 'AI' && i.cat === 'Tools')).map(item => (
            <button
              key={item.name}
              onClick={() => setActiveSkill(item.name)}
              className={`
                flex-shrink-0 snap-center px-4 py-2 rounded-full border flex items-center gap-2 transition-all
                ${activeSkill === item.name ? `bg-${item.color}-500/20 border-${item.color}-500 text-white` : 'bg-white/5 border-white/10 text-white/50'}
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
