
import React, { useState, useMemo, useEffect } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SKILLS_RESUME } from '../../config/constants';
import { AnimatePresence, motion } from 'framer-motion';

// --- RICH SKILL DATA & ICON MAPPING ---
const ICON_MAP: Record<string, string> = {
  'C#': 'csharp',
  'Core Java': 'java',
  '.NET': 'dotnetcore',
  'Reactjs': 'react',
  'HTML5': 'html5',
  'CSS3': 'css3',
  'Python': 'python',
  'C': 'c',
  'PHP': 'php',
  'JavaScript': 'javascript',
  'SQL Server': 'microsoftsqlserver',
  'PostgreSQL': 'postgresql',
  'MySQL': 'mysql',
  'Azure': 'azure',
  '.NET MVC CORE Framework': 'dotnetcore',
  '.NET MVC Entity Framework': 'dotnetcore',
  'VSCode': 'vscode',
  'Visual Studio': 'visualstudio',
  'Xampp': 'php',
  'Putty': 'linux',
  'Git': 'git',
  'Github': 'github',
  'Tomcat': 'tomcat',
  'Eclipse': 'eclipse',
  'ServiceNow': 'visualstudio',
  'Gemini AI': 'googlecloud',
  'Prompt Engineering': 'googlecloud',
  'Data Structures & Algorithms': 'codepen',
  'Software Engineering': 'visualstudio',
  'Advance Analysis & Design': 'github',
  'Internet for Enterprise': 'javascript',
  'Serverside Internet Resource': 'dotnetcore',
  'Datacom and Distributed Data Processing': 'azure',
  'Object Oriented Programming': 'java',
  'Operating Systems': 'linux',
  'Advance Systems Project': 'react'
};

const SKILL_DETAILS: Record<string, { role: string; usedIn: string; exp: string; desc: string; strength: string }> = {
  'C#': { role: 'Core Language', usedIn: 'Event Node Pro, Enterprise ERP', exp: 'Expert · 5+ Years', desc: 'Primary language for high-performance backend architecture.', strength: 'Memory management & Async patterns' },
  'Python': { role: 'Scripting', usedIn: 'Data Analysis, AI Pipelines', exp: 'Intermediate · 3 Years', desc: 'Automation scripting and data processing.', strength: 'Data libraries & Scripting' },
  'Core Java': { role: 'Language', usedIn: 'Legacy Systems', exp: 'Proficient · 4 Years', desc: 'Object-oriented enterprise application development.', strength: 'Strong typing & OOP' },
  'JavaScript': { role: 'Language', usedIn: 'Frontend Interactions', exp: 'Expert · 6+ Years', desc: 'Universal language for web interactivity and logic.', strength: 'ES6+ & DOM Manipulation' },
  'PHP': { role: 'Backend', usedIn: 'Wanderlust Trails', exp: 'Advanced · 4 Years', desc: 'Server-side logic for dynamic web applications.', strength: 'CMS & API integration' },
  'HTML5': { role: 'Markup', usedIn: 'All Web Projects', exp: 'Expert · 7+ Years', desc: 'Semantic structure for modern web accessibility.', strength: 'Semantic Tags & SEO' },
  'CSS3': { role: 'Styling', usedIn: 'All Web Projects', exp: 'Expert · 7+ Years', desc: 'Responsive design and animation systems.', strength: 'Flexbox, Grid & Animations' },
  'Reactjs': { role: 'UI Library', usedIn: 'Mini Metro, Future Job Fit', exp: 'Expert · 5+ Years', desc: 'Component-driven architecture and state management.', strength: 'Hooks & Custom Reusability' },
  '.NET MVC CORE Framework': { role: 'Framework', usedIn: 'Event Node Pro', exp: 'Expert · 5+ Years', desc: 'Cross-platform high-performance backend framework.', strength: 'Dependency Injection & Middleware' },
  'Azure': { role: 'Cloud', usedIn: 'Enterprise Deployments', exp: 'Intermediate · 3 Years', desc: 'Cloud computing services for building and managing apps.', strength: 'App Services & CI/CD' },
  'MySQL': { role: 'Database', usedIn: 'Wanderlust Trails', exp: 'Advanced · 4 Years', desc: 'Open-source relational database management.', strength: 'Schema Design' },
  'VSCode': { role: 'IDE', usedIn: 'Daily Driver', exp: 'Expert', desc: 'Extensible code editor for modern web development.', strength: 'Extensions & Debugging' },
  'Visual Studio': { role: 'IDE', usedIn: '.NET Development', exp: 'Expert', desc: 'Integrated development environment for .NET.', strength: 'Profiling & Memory Tools' },
  'Git': { role: 'Version Control', usedIn: 'All Projects', exp: 'Expert', desc: 'Distributed version control for team collaboration.', strength: 'Branching & Merging strategies' },
  'Github': { role: 'Platform', usedIn: 'Social Dev', exp: 'Expert', desc: 'Central repository management and collaboration.', strength: 'Pull Requests & Actions' },
  'ServiceNow': { role: 'ITSM', usedIn: 'Mphasis Ops', exp: 'Advanced', desc: 'Enterprise service management and automation.', strength: 'Workflow Orchestration' },
  'Data Structures & Algorithms': { role: 'Core Theory', usedIn: 'Logic Optimization', exp: 'UCM Coursework', desc: 'Learnt the basics of DSA including complexity analysis and memory optimization.', strength: 'Algorithmic Reasoning' },
  'Software Engineering': { role: 'Methodology', usedIn: 'SDLC Management', exp: 'UCM Coursework', desc: 'Learnt Software Engineering related coursework including Agile and testing.', strength: 'SDLC Lifecycle' },
  'Advance Analysis & Design': { role: 'Architecture', usedIn: 'System Modeling', exp: 'UCM Coursework', desc: 'Learnt design patterns and software architecture principles.', strength: 'Architectural Design' },
  'Internet for Enterprise': { role: 'Web Stack', usedIn: 'Wanderlust Trails', exp: 'UCM Coursework', desc: 'Advanced PHP and JavaScript web development for enterprise scale.', strength: 'Enterprise Web' },
  'Serverside Internet Resource': { role: 'Backend Stack', usedIn: 'ASP.NET Logic', exp: 'UCM Coursework', desc: 'ASP.NET class focusing on basic OOPS and server-side resources.', strength: 'Server Logic' },
  'Datacom and Distributed Data Processing': { role: 'Cloud/Infra', usedIn: 'Distributed Apps', exp: 'UCM Coursework', desc: 'Azure, distributed systems, and SQL database management.', strength: 'System Scaling' },
  'Object Oriented Programming': { role: 'Foundational', usedIn: 'Code Structure', exp: 'MIST Coursework', desc: 'Core OOPS principles like inheritance, polymorphism, and abstraction.', strength: 'Modular Code' },
  'Operating Systems': { role: 'Systems', usedIn: 'Resource Control', exp: 'MIST Coursework', desc: 'Memory management, process scheduling, and kernel abstractions.', strength: 'System Internals' },
  'Advance Systems Project': { role: 'Capstone', usedIn: 'Wanderlust Trails', exp: 'UCM Coursework', desc: 'Built Wanderlust Trails using coursework learning and technical research.', strength: 'Full Stack Delivery' },
  'Gemini AI': { role: 'GenAI', usedIn: 'Portfolio Assistant', exp: 'Intermediate', desc: 'Integrating LLMs for content synthesis and reasoning.', strength: 'Prompt Engineering' },
};

type Category = 'All' | 'Languages' | 'Frameworks' | 'Cloud' | 'Tools' | 'AI' | 'Coursework';

const CATEGORY_COLORS: Record<string, string> = {
  'Languages': 'purple',
  'Frameworks': 'cyan',
  'Cloud': 'blue',
  'Tools': 'emerald',
  'AI': 'rose',
  'Coursework': 'amber'
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Languages': 'The core syntax and logic layers driving my applications. From low-level systems to high-level scripting.',
  'Frameworks': 'Structural foundations that accelerate development, focusing on React and .NET Core architectures.',
  'Cloud': 'Infrastructure and data persistence layers including Azure and relational database management.',
  'Tools': 'Development environments and operational utilities used to ensure high performance and reliability.',
  'AI': 'Advanced intelligence integration using Google Gemini for content reasoning and automation.',
  'Coursework': 'Theoretical academic foundation in Distributed Systems, Algorithms, and Software Design.'
};

export const AboutSection: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const bubbleData = useMemo(() => {
    const getIconUrl = (name: string) => {
      const slug = ICON_MAP[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
    };

    const items = [
      ...SKILLS_RESUME.languages.map(s => ({ name: s, cat: 'Languages', icon: getIconUrl(s) })),
      ...SKILLS_RESUME.frameworks.map(s => ({ name: s, cat: 'Frameworks', icon: getIconUrl(s) })),
      ...SKILLS_RESUME.cloud_db.map(s => ({ name: s, cat: 'Cloud', icon: getIconUrl(s) })),
      ...SKILLS_RESUME.tools.map(s => ({ name: s, cat: 'Tools', icon: getIconUrl(s) })),
      ...SKILLS_RESUME.coursework.map(s => ({ name: s, cat: 'Coursework', icon: getIconUrl(s) })),
      { name: 'Gemini AI', cat: 'AI', icon: getIconUrl('Gemini AI') },
      { name: 'Prompt Engineering', cat: 'AI', icon: getIconUrl('Gemini AI') }
    ];

    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const cols = 6;
    const rows = Math.ceil(shuffled.length / cols);
    
    return shuffled.map((item, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const jitterX = Math.random() * 10 - 5;
      const jitterY = Math.random() * 10 - 5;
      
      const left = (col * (100/cols) + (100/cols/2)) + jitterX;
      const top = (row * (100/rows) + (100/rows/2)) + jitterY;

      return {
        ...item,
        left: `${Math.max(5, Math.min(95, left))}%`,
        top: `${Math.max(5, Math.min(95, top))}%`,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * -5,
        floatX: Math.random() * 12 - 6,
        floatY: Math.random() * 12 - 6,
        color: CATEGORY_COLORS[item.cat as keyof typeof CATEGORY_COLORS] || 'gray'
      };
    });
  }, []);

  const activeDetail = hoveredSkill ? (SKILL_DETAILS[hoveredSkill] || { 
    role: 'Technology Node', 
    exp: 'Core Knowledge', 
    desc: 'An essential component of my technical proficiency and architectural decisions.', 
    usedIn: 'Enterprise & Personal Projects', 
    strength: 'Technical Versatility' 
  }) : null;

  return (
    <section id="about-section" className="mb-[20rem] scroll-mt-32 relative">
      <ScrollReveal>
        <div className="flex flex-col gap-6 mb-16 px-4 lg:px-0">
            <h2 className="text-6xl lg:text-8xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.85]">
              Skills & <br/> <span className="text-t-fg-m opacity-40">Expertise.</span>
            </h2>
            <div className="h-1 w-24 bg-t-accent" />
            <p className="text-lg lg:text-xl text-t-fg font-medium leading-relaxed max-w-2xl">
              Mapping my technical landscape across backend systems, user interfaces, and AI automation.
            </p>
        </div>

        <div className="w-full bg-[#050505] rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row min-h-[600px] lg:h-[700px]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05)_0%,rgba(5,5,5,1)_100%)] pointer-events-none z-10" />
           <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0" />

           {/* LEFT: INTERACTIVE SKILL CLOUD */}
           <div 
             className="relative w-full lg:w-[65%] h-[450px] lg:h-full overflow-hidden group/matrix cursor-pointer"
             onClick={() => {
                setSelectedCategory('All');
                setHoveredSkill(null);
             }}
           >
              {isMounted && bubbleData.map((item) => {
                 const isHovered = hoveredSkill === item.name;
                 const isFreeMode = selectedCategory === 'All';
                 const isInSelectedCategory = selectedCategory === item.cat;

                 let targetScale = 1;
                 let targetOpacity = 0.6;
                 let targetGrayscale = 0.4;
                 let targetBlur = 0;
                 let targetZ = 20;

                 if (isHovered) {
                   targetScale = 1.3;
                   targetOpacity = 1;
                   targetGrayscale = 0;
                   targetZ = 50;
                 } else if (!isFreeMode && isInSelectedCategory) {
                   targetScale = 1.15;
                   targetOpacity = 1;
                   targetGrayscale = 0;
                   targetZ = 40;
                 } else if (!isFreeMode && !isInSelectedCategory) {
                   targetScale = 0.75;
                   targetOpacity = 0.2;
                   targetGrayscale = 1;
                   targetBlur = 2;
                   targetZ = 10;
                 }

                 return (
                   <motion.button
                     key={item.name}
                     initial={{ scale: 0, opacity: 0 }}
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
                       scale: { duration: 0.4, ease: "easeOut" },
                       opacity: { duration: 0.4 },
                       filter: { duration: 0.4 }
                     }}
                     style={{ left: item.left, top: item.top, position: 'absolute' }}
                     onMouseEnter={() => setHoveredSkill(item.name)}
                     onMouseLeave={() => setHoveredSkill(null)}
                     onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(item.cat as Category);
                     }}
                     className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-2xl outline-none"
                   >
                     <div className={`
                       absolute inset-0 rounded-2xl 
                       bg-gradient-to-br from-white/10 to-transparent 
                       border border-white/10 
                       backdrop-blur-[4px] 
                       shadow-[0_8px_16px_rgba(0,0,0,0.8)]
                       transition-all duration-500
                       ${(isHovered || (!isFreeMode && isInSelectedCategory)) ? `bg-white/15 border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.15)]` : 'hover:bg-white/10'}
                     `} />

                     <img 
                       src={item.icon} 
                       alt={item.name} 
                       className={`relative w-[60%] h-[60%] object-contain drop-shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
                       onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg';
                       }}
                     />
                     
                     {isHovered && (
                       <motion.div 
                         layoutId="activeGlow"
                         className={`absolute inset-0 rounded-2xl ring-2 ring-white/50 opacity-50`} 
                         animate={{ scale: [1, 1.2, 1] }}
                         transition={{ repeat: Infinity, duration: 2 }}
                       />
                     )}
                   </motion.button>
                 );
               })}
           </div>

           {/* RIGHT: ANALYSIS PANEL */}
           <div className="relative w-full lg:w-[35%] bg-white/[0.01] border-t lg:border-t-0 lg:border-l border-white/5 backdrop-blur-xl p-8 lg:p-12 flex flex-col justify-between z-20 min-h-[350px]">
              
              <div className="flex flex-wrap gap-2 mb-10 justify-end lg:justify-start">
                {(['All', 'Languages', 'Frameworks', 'Cloud', 'Tools', 'AI', 'Coursework'] as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(cat);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all border
                      ${selectedCategory === cat 
                        ? 'bg-t-accent text-t-bg border-t-accent shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)]' 
                        : 'bg-transparent text-white/40 border-white/5 hover:border-white/20 hover:text-white'}
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {hoveredSkill && activeDetail ? (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-2">{hoveredSkill}.</h3>
                      <p className={`text-[9px] font-black uppercase tracking-[0.2em] text-${CATEGORY_COLORS[bubbleData.find(i => i.name === hoveredSkill)?.cat || 'Languages']}-400 opacity-60`}>
                        {activeDetail.role} // {activeDetail.exp}
                      </p>
                    </div>
                    
                    <p className="text-base text-white/70 leading-relaxed font-medium pl-4 border-l-2 border-white/10 italic">
                      "{activeDetail.desc}"
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                         <div className="w-1 h-1 rounded-full bg-t-accent" />
                         <div>
                           <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block mb-0.5">Application</span>
                           <span className="text-xs text-white/80 font-bold">{activeDetail.usedIn}</span>
                         </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                         <div className="w-1 h-1 rounded-full bg-t-accent-2" />
                         <div>
                           <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block mb-0.5">Core Strength</span>
                           <span className="text-xs text-white/80 font-bold">{activeDetail.strength}</span>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ) : selectedCategory !== 'All' ? (
                  <motion.div
                    key="category"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                     <div className="w-16 h-16 rounded-2xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center">
                        <div className={`w-8 h-8 rounded-full bg-${CATEGORY_COLORS[selectedCategory]}-500/30 animate-pulse`} />
                     </div>
                     <div>
                       <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                         {selectedCategory}.
                       </h3>
                       <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                         Category Breakdown
                       </p>
                     </div>
                     <p className="text-sm text-white/60 leading-relaxed pl-4 border-l-2 border-white/5">
                       {CATEGORY_DESCRIPTIONS[selectedCategory]}
                     </p>
                  </motion.div>
                ) : (
                  <motion.div
                     key="idle"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex flex-col items-center lg:items-start text-center lg:text-left h-full py-10"
                  >
                     <div className="w-20 h-20 rounded-full border border-dashed border-white/10 animate-[spin_15s_linear_infinite] flex items-center justify-center mb-8">
                        <div className="w-10 h-10 rounded-full bg-white/[0.02] animate-pulse" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4 opacity-40">
                        Skill Insights
                     </h4>
                     <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] max-w-[240px] leading-loose">
                       Hover over a tech node or select a category to view proficiency and experience details.
                     </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 pt-6 border-t border-white/5 opacity-40">
                <p className="text-[8px] font-mono text-white/50 uppercase tracking-[0.3em]">
                  <span className="text-t-accent font-black">Core:</span> C# · .NET · React · SQL · Azure · Gemini
                </p>
              </div>
           </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutSection;
