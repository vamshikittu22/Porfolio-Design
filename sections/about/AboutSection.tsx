import React, { useState, useMemo, useEffect } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SKILLS_RESUME } from '../../config/constants';
import { AnimatePresence, motion } from 'framer-motion';

// --- RICH SKILL DATA & ICON MAPPING ---
const ICON_MAP: Record<string, string> = {
  'Java (8-17)': 'java',
  'Core Java': 'java',
  'Spring Boot': 'spring',
  '.NET': 'dotnetcore',
  'React.js': 'react',
  'HTML5': 'html5',
  'CSS3': 'css3',
  'Python': 'python',
  'C': 'c',
  'PHP': 'php',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'SQL Server': 'microsoftsqlserver',
  'PostgreSQL': 'postgresql',
  'MySQL': 'mysql',
  'Oracle': 'oracle',
  'MongoDB': 'mongodb',
  'DynamoDB': 'mongodb',
  'AWS (ECS/EKS/Lambda)': 'amazonwebservices',
  'Docker': 'docker',
  'Kafka': 'kafka',
  'Jenkins': 'jenkins',
  'Terraform': 'terraform',
  'VS Code': 'vscode',
  'Git': 'git',
  'GitHub': 'github',
  'Gemini AI': 'googlecloud',
};

const SKILL_DETAILS: Record<string, { role: string; usedIn: string; exp: string; desc: string; strength: string }> = {
  'Java (8-17)': { role: 'Primary Language', usedIn: 'CVS Health, Citadel, Mphasis', exp: 'Expert · 5+ Years', desc: 'Core language for building high-concurrency enterprise services and microservices.', strength: 'JVM Tuning & Multithreading' },
  'Spring Boot': { role: 'Backend Framework', usedIn: 'CVS Health, Citadel, Mphasis', exp: 'Expert · 4+ Years', desc: 'Primary framework for developing scalable REST/GraphQL APIs and cloud-native applications.', strength: 'Dependency Injection & Microservices Architecture' },
  'AWS (ECS/EKS/Lambda)': { role: 'Cloud Infrastructure', usedIn: 'CVS Health, Citadel', exp: 'Advanced · 3 Years', desc: 'Deploying and orchestrating containerized and serverless workloads at scale.', strength: 'Container Orchestration & Serverless' },
  'Kafka': { role: 'Message Broker', usedIn: 'Citadel, Covantech', exp: 'Advanced · 2 Years', desc: 'Real-time event streaming and data synchronization across distributed systems.', strength: 'Event-Driven Design' },
  'React.js': { role: 'UI Library', usedIn: 'CVS Health, Citadel, Projects', exp: 'Expert · 4+ Years', desc: 'Building high-performance, responsive dashboards and analytics platforms.', strength: 'State Management & Reusable Components' },
  'Angular': { role: 'Frontend Framework', usedIn: 'CVS Health, Mphasis', exp: 'Expert · 4+ Years', desc: 'Developing enterprise-grade web portals for banking and healthcare claims management.', strength: 'NgRx & Large Scale Enterprise UI' },
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
      ...SKILLS_RESUME.coursework.map(s => ({ name: s, cat: 'Coursework', icon: getIconUrl(s) }))
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
    exp: 'Enterprise Grade', 
    desc: 'An essential component of my technical proficiency in distributed application systems.', 
    usedIn: 'Enterprise Production Environments', 
    strength: 'Scalability & Performance' 
  }) : null;

  return (
    <section id="about-section" className="mb-[20rem] scroll-mt-32 relative">
      <ScrollReveal>
        <div className="flex flex-col gap-6 mb-16 px-4 lg:px-0">
            <div className="flex flex-col gap-4">
              <div className="h-px w-20 bg-t-accent" />
              <span className="text-[10px] font-black uppercase tracking-[1em] text-t-accent">About Me</span>
            </div>
            <h2 className="text-6xl lg:text-8xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.85]">
              Executive <br/> <span className="text-t-fg-m opacity-40">Profile.</span>
            </h2>
            <div className="space-y-8 border-l-4 border-t-accent/20 pl-10 py-4 max-w-4xl">
              <p className="text-xl lg:text-2xl text-t-fg font-medium leading-relaxed italic">
                "Full Stack Software Engineer with 5+ years of experience building scalable, secure enterprise applications across healthcare, financial services, and banking domains."
              </p>
              <p className="text-base lg:text-lg text-t-fg-m leading-relaxed opacity-90">
                I specialize in Java/Spring Boot microservices and modern frontend architectures using Angular, React, and Vue.js. Currently at CVS Health, I engineer REST and GraphQL APIs for claims processing workflows while integrating AI-assisted analytics using OpenAI APIs. My experience spans from low-latency trading systems at Citadel to digital banking modernization at Mphasis, with a focus on cloud-native deployments, event-driven architectures, and secure authentication using OAuth 2.0 and JWT.
              </p>
              <p className="text-base lg:text-lg text-t-fg-m leading-relaxed opacity-90">
                I'm passionate about building scalable systems that solve real business problems, whether it's reducing manual review effort through AI automation or optimizing API response times through efficient database design. I'm seeking senior engineering roles where I can leverage my full-stack expertise and cloud architecture experience to drive impactful solutions. Open to opportunities nationwide and excited to contribute to innovative teams building the next generation of enterprise applications.
              </p>
            </div>
        </div>

        <div className="w-full bg-[#050505] rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row min-h-[600px] lg:h-[700px]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05)_0%,rgba(5,5,5,1)_100%)] pointer-events-none z-10" />
           <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0" />

           <div className="relative w-full lg:w-[65%] h-[450px] lg:h-full overflow-hidden group/matrix cursor-pointer" onClick={() => { setSelectedCategory('All'); setHoveredSkill(null); }}>
              {isMounted && bubbleData.map((item) => {
                 const isHovered = hoveredSkill === item.name;
                 const isFreeMode = selectedCategory === 'All';
                 const isInSelectedCategory = selectedCategory === item.cat;
                 let targetScale = isHovered ? 1.3 : (!isFreeMode && isInSelectedCategory ? 1.15 : (!isFreeMode ? 0.75 : 1));
                 let targetOpacity = isHovered ? 1 : (!isFreeMode && isInSelectedCategory ? 1 : (!isFreeMode ? 0.2 : 0.6));
                 return (
                   <motion.button key={item.name} initial={{ scale: 0, opacity: 0 }}
                     animate={{ x: [0, item.floatX, 0], y: [0, item.floatY, 0], scale: targetScale, opacity: targetOpacity }}
                     transition={{ x: { duration: item.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item.delay },
                       y: { duration: item.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item.delay },
                       scale: { duration: 0.4 }, opacity: { duration: 0.4 } }}
                     style={{ left: item.left, top: item.top, position: 'absolute' }}
                     onMouseEnter={() => setHoveredSkill(item.name)}
                     onMouseLeave={() => setHoveredSkill(null)}
                     onClick={(e) => { e.stopPropagation(); setSelectedCategory(item.cat as Category); }}
                     className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-2xl outline-none"
                   >
                     <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-[4px] shadow-[0_8px_16px_rgba(0,0,0,0.8)] transition-all duration-500 ${(isHovered || (!isFreeMode && isInSelectedCategory)) ? `bg-white/15 border-white/30` : 'hover:bg-white/10'}`} />
                     <img src={item.icon} alt="" className={`relative w-[60%] h-[60%] object-contain drop-shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                   </motion.button>
                 );
              })}
           </div>

           <div className="relative w-full lg:w-[35%] bg-white/[0.01] border-t lg:border-t-0 lg:border-l border-white/5 backdrop-blur-xl p-8 lg:p-12 flex flex-col justify-between z-20 min-h-[350px]">
              <div className="flex flex-wrap gap-2 mb-10 justify-end lg:justify-start">
                {(['All', 'Languages', 'Frameworks', 'Cloud', 'Tools', 'Coursework'] as Category[]).map(cat => (
                  <button key={cat} onClick={(e) => { e.stopPropagation(); setSelectedCategory(cat); }}
                    className={`px-3 py-1.5 rounded-lg text-[8px] font-mono font-black uppercase tracking-widest transition-all border ${selectedCategory === cat ? 'bg-t-accent text-t-bg border-t-accent shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)]' : 'bg-transparent text-white/40 border-white/5 hover:border-white/20 hover:text-white'}`}>
                    {cat}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {hoveredSkill && activeDetail ? (
                  <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <div>
                      <h3 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-2 font-display">{hoveredSkill}.</h3>
                      <p className={`text-[9px] font-mono font-black uppercase tracking-[0.2em] opacity-60`}>{activeDetail.role} // {activeDetail.exp}</p>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed font-sans italic pl-4 border-l-2 border-white/10">"{activeDetail.desc}"</p>
                    <div className="grid grid-cols-1 gap-4 font-mono">
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                         <div className="w-1 h-1 rounded-full bg-t-accent" />
                         <div>
                           <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block mb-0.5">Application</span>
                           <span className="text-xs text-white/80 font-bold">{activeDetail.usedIn}</span>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left h-full py-10">
                     <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4 opacity-40 font-display">Technical Matrix</h4>
                     <p className="text-[9px] font-mono font-bold text-white/30 uppercase tracking-[0.2em] max-w-[240px] leading-loose">Explore my 5-year stack by category or node selection.</p>
                  </div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutSection;