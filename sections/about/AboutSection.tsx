
import React, { useState, useMemo } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { TechIcon } from '../../components/ui/TechIcon';
import { SKILLS_RESUME } from '../../config/constants';
import { AnimatePresence, motion } from 'framer-motion';

// --- DATA ENRICHMENT ---
// In a real app, this might come from a CMS or the constants file.
// Mapping simple names to rich details for the new UI.
const SKILL_DETAILS: Record<string, { role: string; usedIn: string; exp: string; desc: string }> = {
  // Core Stack
  'C#': { role: 'Backend Core', usedIn: 'Ticket Sales, Enterprise ERP', exp: 'Expert', desc: 'High-performance backend architecture and microservices.' },
  '.NET Core': { role: 'Framework', usedIn: 'Event Node Pro', exp: 'Expert', desc: 'Scalable REST APIs and cloud-native system design.' },
  'React': { role: 'Frontend Library', usedIn: 'Mini Metro, Future Job Fit', exp: 'Expert', desc: 'Component-driven UI architecture with complex state management.' },
  'TypeScript': { role: 'Language', usedIn: 'All Modern Projects', exp: 'Advanced', desc: 'Type-safe development for robust enterprise applications.' },
  'SQL Server': { role: 'Database', usedIn: 'Inventory Systems', exp: 'Advanced', desc: 'Complex relational modeling and stored procedure optimization.' },
  'Gemini AI': { role: 'GenAI Model', usedIn: 'Portfolio, Resume Builder', exp: 'Intermediate', desc: 'Integrating LLMs for content synthesis and reasoning.' },
  
  // Languages
  'Python': { role: 'Scripting', usedIn: 'Data Analysis', exp: 'Intermediate', desc: 'Automation scripts and data processing pipelines.' },
  'Java': { role: 'Language', usedIn: 'Legacy Systems', exp: 'Intermediate', desc: 'Object-oriented programming and enterprise maintenance.' },
  'JavaScript': { role: 'Language', usedIn: 'Frontend Interactivity', exp: 'Expert', desc: 'Core web technologies and DOM manipulation.' },
  'PHP': { role: 'Backend', usedIn: 'Wanderlust Trails', exp: 'Advanced', desc: 'Server-side logic for dynamic web applications.' },
  
  // Frameworks & Tools
  'Node.js': { role: 'Runtime', usedIn: 'Serverless Functions', exp: 'Advanced', desc: 'Asynchronous event-driven backend services.' },
  'Tailwind': { role: 'CSS Framework', usedIn: 'Portfolio v2', exp: 'Expert', desc: 'Utility-first styling for rapid UI development.' },
  'Bootstrap': { role: 'UI Kit', usedIn: 'Legacy Admin Panels', exp: 'Advanced', desc: 'Responsive grid layouts and pre-built components.' },
  'Azure': { role: 'Cloud Platform', usedIn: 'Deployment', exp: 'Intermediate', desc: 'CI/CD pipelines, App Services, and Blob Storage.' },
  'MySQL': { role: 'Database', usedIn: 'Wanderlust Trails', exp: 'Advanced', desc: 'Relational database management and optimization.' },
  'PostgreSQL': { role: 'Database', usedIn: 'Mini Metro', exp: 'Intermediate', desc: 'Advanced object-relational database systems.' },
  'Git': { role: 'Version Control', usedIn: 'All Projects', exp: 'Expert', desc: 'Distributed version control and team collaboration workflows.' },
  'VS Code': { role: 'IDE', usedIn: 'Daily Driver', exp: 'Expert', desc: 'Primary development environment with custom extensions.' },
  'Visual Studio': { role: 'IDE', usedIn: '.NET Development', exp: 'Expert', desc: 'Enterprise-grade development for C# ecosystems.' },
};

type ViewCategory = 'Core Stack' | 'Languages' | 'Frameworks' | 'Cloud & Tools';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewCategory>('Core Stack');
  const [selectedSkillName, setSelectedSkillName] = useState<string>('C#');

  // Constructing the view lists dynamically
  const views = useMemo(() => {
    const coreNames = ['C#', '.NET Core', 'React', 'TypeScript', 'SQL Server'];
    
    // Helper to find icon URL from the main constants
    const findIcon = (name: string) => {
       const all = [...SKILLS_RESUME.languages, ...SKILLS_RESUME.frameworks, ...SKILLS_RESUME.cloud_db, ...SKILLS_RESUME.tools];
       return all.find(s => s.name === name)?.icon || '';
    };

    return {
      'Core Stack': coreNames.map(name => ({ name, icon: findIcon(name) })),
      'Languages': SKILLS_RESUME.languages.filter(s => !coreNames.includes(s.name)),
      'Frameworks': SKILLS_RESUME.frameworks.filter(s => !coreNames.includes(s.name)),
      'Cloud & Tools': [...SKILLS_RESUME.cloud_db, ...SKILLS_RESUME.tools].filter(s => !coreNames.includes(s.name)),
    };
  }, []);

  const currentSkills = views[activeTab];
  const selectedDetail = SKILL_DETAILS[selectedSkillName] || { role: 'Technology', usedIn: 'Various Projects', exp: 'Proficient', desc: 'A key part of my technical toolkit.' };
  
  // Determine accent color based on tab
  const getAccent = () => {
    switch (activeTab) {
      case 'Core Stack': return 'indigo';
      case 'Languages': return 'emerald';
      case 'Frameworks': return 'rose';
      case 'Cloud & Tools': return 'amber';
      default: return 'indigo';
    }
  };

  return (
    <section id="about-section" className="mb-[20rem] scroll-mt-32 relative">
      <ScrollReveal>
        {/* 1. Header Text - Focused & Minimal */}
        <div className="flex flex-col gap-6 mb-16 px-4 lg:px-0">
            <h2 className="text-6xl lg:text-8xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.85]">
              Engineered <br/> <span className="text-t-fg-m opacity-40">Precision.</span>
            </h2>
            <div className="h-1 w-24 bg-t-accent" />
            <p className="text-lg lg:text-xl text-t-fg font-medium leading-relaxed max-w-2xl">
              Full‑stack engineer specializing in high‑performance .NET, React, and AI systems.
            </p>
        </div>

        {/* 2. The Tech Stack Console */}
        <div className="w-full relative group perspective-[2000px]">
             {/* Main Glass Container */}
             <div className="relative bg-[#0a0a0a] dark:bg-black rounded-[32px] border border-white/10 shadow-2xl overflow-hidden min-h-[500px] flex flex-col transition-all duration-500">
                
                {/* Vignette & Spotlight Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-t-accent/5 blur-[120px] rounded-full pointer-events-none" />

                {/* Top Control Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-white/10 bg-white/5 gap-6 z-20">
                    {/* Status Indicator */}
                    <div className="flex items-center gap-3">
                         <div className="flex gap-1.5">
                             <div className="w-2 h-2 rounded-full bg-rose-500" />
                             <div className="w-2 h-2 rounded-full bg-amber-500" />
                             <div className="w-2 h-2 rounded-full bg-emerald-500" />
                         </div>
                         <div className="h-4 w-px bg-white/10 mx-2" />
                         <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">
                           Now Viewing: <span className="text-white font-bold">{selectedSkillName}</span>
                         </span>
                    </div>

                    {/* Segmented Control Tabs */}
                    <div className="flex p-1 bg-black/40 rounded-lg border border-white/5">
                        {Object.keys(views).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat as ViewCategory)}
                                className={`
                                    relative px-4 py-2 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all duration-300
                                    ${activeTab === cat ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area: Grid + Info Panel */}
                <div className="flex-1 grid lg:grid-cols-[1fr_320px] relative z-20">
                    
                    {/* LEFT: Icon Grid */}
                    <div className="relative p-8 lg:p-16 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                         {/* Spotlight behind active item */}
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[300px] h-[300px] bg-t-accent/10 rounded-full blur-[80px]" />
                         </div>

                         <motion.div 
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className={`
                              flex flex-wrap justify-center gap-6 lg:gap-10
                              ${activeTab === 'Core Stack' ? 'items-center' : 'content-start'}
                            `}
                         >
                            {currentSkills.map((skill, idx) => (
                                <TechIcon 
                                  key={skill.name}
                                  name={skill.name}
                                  iconUrl={skill.icon}
                                  isActive={selectedSkillName === skill.name}
                                  isHero={activeTab === 'Core Stack'}
                                  accent={getAccent()}
                                  index={idx}
                                  onInteraction={() => setSelectedSkillName(skill.name)}
                                />
                            ))}
                         </motion.div>
                    </div>

                    {/* RIGHT: Info Panel (Desktop) / Bottom (Mobile) */}
                    <div className="border-t lg:border-t-0 lg:border-l border-white/10 bg-[#050505] p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-t-accent/5 opacity-20 pointer-events-none" />
                        
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedSkillName}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8 relative z-10"
                          >
                             {/* Header */}
                             <div>
                               <div className="flex items-center gap-3 mb-2">
                                 <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest bg-${getAccent()}-500/20 text-${getAccent()}-400 border border-${getAccent()}-500/30`}>
                                   {selectedDetail.exp}
                                 </span>
                                 <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{selectedDetail.role}</span>
                               </div>
                               <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none">
                                 {selectedSkillName}
                               </h3>
                             </div>

                             {/* Description */}
                             <div>
                               <p className="text-sm font-medium text-white/70 leading-relaxed border-l-2 border-white/10 pl-4">
                                 "{selectedDetail.desc}"
                               </p>
                             </div>

                             {/* Used In */}
                             <div className="pt-8 border-t border-white/5">
                               <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 mb-3">Deployed In</p>
                               <p className="text-xs font-bold text-white tracking-wide">
                                 {selectedDetail.usedIn}
                               </p>
                             </div>
                          </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer Status */}
                <div className="bg-black/80 p-3 border-t border-white/10 flex justify-between items-center text-[8px] font-mono text-white/30 uppercase tracking-widest">
                   <span>System.Stack.v2</span>
                   <span className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-t-accent animate-pulse" />
                     Online
                   </span>
                </div>
             </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
