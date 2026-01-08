import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, GlassButton, BubbleTag } from '../../components/ui/GlassUI';
import { ScrollReveal } from '../../components/ui/ScrollReveal';

interface CaseStudySectionProps {
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  functionalities: string[];
  visualId: string;
  index: number;
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ title, subtitle, description, techStack, functionalities, visualId, index }) => {
  const isEven = index % 2 === 0;

  return (
    <ScrollReveal className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-center py-32 border-b border-t-border last:border-0 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
      <div className="flex-1 space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-t-accent">Section 0{index + 1}</span>
            <div className="h-px w-12 bg-t-accent/30" />
          </div>
          <h3 className="text-5xl lg:text-7xl font-black font-display text-t-fg uppercase tracking-tighter leading-none">{title}.</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-t-accent-2 opacity-80">{subtitle}</p>
        </div>

        <p className="text-lg lg:text-xl text-t-fg-m leading-relaxed font-medium pl-6 border-l-2 border-t-accent/20">
          {description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">Tech Infrastructure</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map(tech => <BubbleTag key={tech} accent="theme" className="!text-[8px] !px-3 !py-1">{tech}</BubbleTag>)}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">Core Functionality</h4>
            <ul className="space-y-2">
              {functionalities.map(func => (
                <li key={func} className="flex items-center gap-3 text-xs font-bold text-t-fg-m">
                  <div className="w-1 h-1 rounded-full bg-t-accent-2" />
                  {func}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-xl">
        <GlassCard accent="theme" className="aspect-video relative overflow-hidden flex items-center justify-center bg-t-bg-el group">
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          <div className="relative z-10 flex flex-col items-center gap-6">
             <div className="w-24 h-24 rounded-[32px] bg-t-bg border border-t-border flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                <span className="text-3xl font-black text-t-accent">{visualId}</span>
             </div>
             <div className="text-center space-y-2">
               <p className="text-[9px] font-black uppercase tracking-[0.5em] text-t-fg-m opacity-50">Schematic View</p>
               <div className="h-0.5 w-12 bg-t-accent/20 mx-auto" />
             </div>
          </div>
          
          <div className="absolute top-4 left-4 flex gap-2">
             <div className="w-2 h-2 rounded-full bg-red-400" />
             <div className="w-2 h-2 rounded-full bg-amber-400" />
             <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="absolute bottom-4 right-4 text-[8px] font-mono opacity-20 text-t-fg uppercase">
            blueprint.sys.v2
          </div>
        </GlassCard>
      </div>
    </ScrollReveal>
  );
};

const PortfolioCaseStudy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const SECTIONS = [
    {
      title: "Hero Architecture",
      subtitle: "Dynamic Entry & Identity",
      description: "The Hero section is designed as a 'high-density typographic blueprint'. It uses a procedural background that generates hundreds of industry-relevant keywords, creating an architectural texture that is interactive and theme-aware.",
      techStack: ["React 19", "Framer Motion", "Tailwind CSS", "CSS Variables"],
      functionalities: ["Theme-aware real-time coloring", "Procedural element distribution", "Parallax tilt effects", "Kinetic typographic wall"],
      visualId: "H.01"
    },
    {
      title: "Interactive Skills Cloud",
      subtitle: "Full-Stack Visualization",
      description: "Moving away from boring bullet points, the Skills section features an interactive 'Physics Bubble' matrix. Each node represents a tech competency, providing detailed contextual analysis on hover.",
      techStack: ["Framer Motion", "Math.random() Jitter", "React Hooks", "SVG Node Icons"],
      functionalities: ["Category filtering & state sync", "Adaptive detailed analysis panel", "Kinetic 'floating' animations", "Dynamic Z-index management"],
      visualId: "S.02"
    },
    {
      title: "GitHub Pulse Tracker",
      subtitle: "Real-Time Dev Intelligence",
      description: "A live window into my productivity. This component fetches data from the GitHub Search & GraphQL APIs to render a custom commit visualization and featured repository dashboard.",
      techStack: ["GitHub REST API", "GitHub GraphQL", "sessionStorage Cache", "AnimatePresence"],
      functionalities: ["Live contribution tallying", "Repo activity carousel", "Dynamic 'Pulse' equalizer", "API Rate-limit fallback logic"],
      visualId: "G.03"
    },
    {
      title: "Case Study Explorer",
      subtitle: "Project Deep-Dives",
      description: "The projects section follows a 'Progressive Disclosure' pattern. Interactive cards expand into high-fidelity technical journals that detail architecture, roles, and impact.",
      techStack: ["React Layout Groups", "Glassmorphism Primitives", "Vite Assets", "AnimatePresence"],
      functionalities: ["Filterable project categories", "Expanded modal detail views", "Interactive action buttons", "Visual hierarchy management"],
      visualId: "P.04"
    },
    {
      title: "Strategic AI Playlab",
      subtitle: "Minimax Logic Demonstration",
      description: "A functional Tic-Tac-Toe engine that demonstrates both state management and advanced game theory. It includes an AI 'Hint' system powered by the Gemini 3 Flash model for strategic advice.",
      techStack: ["Minimax Algorithm", "Gemini 3 Flash API", "React State", "CSS Animations"],
      functionalities: ["Multi-difficulty AI logic", "Neural strategy hints", "Global score tracking", "Win-state pulse detection"],
      visualId: "A.05"
    },
    {
      title: "AI Neural Postcards",
      subtitle: "Vision-AI Integration",
      description: "Part of the Travel section, this feature uses Gemini's multi-modal capabilities to generate custom watercolor 'postcards' based on travel narrative descriptions.",
      techStack: ["Gemini 2.5 Flash Image", "Base64 Media Stream", "URL Object Cache", "Loading States"],
      functionalities: ["Prompt engineering templates", "Dynamic image generation", "Contextual story overlay", "Asset scaling & persistence"],
      visualId: "V.06"
    },
    {
      title: "Cognitive Chat Assistant",
      subtitle: "Contextual RAG Assistant",
      description: "A floating 'Neural Core' that acts as an intelligent proxy for recruiters. It provides human-like answers about my experience, projects, and work authorization.",
      techStack: ["Gemini 3 Flash", "System Instructions", "Chat History Management", "Framer Motion"],
      functionalities: ["Context-aware portfolio querying", "Floating kinetic UI launcher", "Message streaming simulation", "Quick-action suggestion chips"],
      visualId: "C.07"
    }
  ];

  return (
    <div className="relative pt-32 pb-64 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-32">
        <section className="space-y-16">
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-[2px] bg-t-accent" />
              <span className="text-[11px] font-black uppercase tracking-[1em] text-t-accent">Technical Portfolio Case Study</span>
            </div>
            <h1 className="text-7xl lg:text-9xl font-black font-display text-t-fg uppercase tracking-tighter leading-none">Engineering <br /> Blueprint.</h1>
            <p className="text-xl lg:text-3xl text-t-fg-m font-medium leading-tight tracking-tight max-w-4xl text-balance">
              This portfolio is more than a resume—it's a production-grade <span className="text-t-accent font-black">AI-Native Web Application</span> architected with Swiss precision and future-ready logic.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <GlassCard className="p-10 space-y-6" accent="theme">
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-accent">Core Stack</h4>
               <p className="text-sm font-bold text-t-fg-m leading-relaxed">
                 React 19 + TypeScript + Vite. Built for 60fps animations and low-latency interaction.
               </p>
            </GlassCard>
            <GlassCard className="p-10 space-y-6" accent="secondary">
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-accent-2">AI Intelligence</h4>
               <p className="text-sm font-bold text-t-fg-m leading-relaxed">
                 Powered by Google Gemini models for image synthesis, text reasoning, and real-time analysis.
               </p>
            </GlassCard>
            <GlassCard className="p-10 space-y-6" accent="theme">
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-accent">Visual Philosophy</h4>
               <p className="text-sm font-bold text-t-fg-m leading-relaxed">
                 Swiss-Minimalism. High contrast, aggressive grid systems, and glassmorphism primitives.
               </p>
            </GlassCard>
          </div>
        </section>

        <div className="space-y-0">
          {SECTIONS.map((section, idx) => (
            <CaseStudySection key={idx} {...section} index={idx} />
          ))}
        </div>

        <section className="flex flex-col items-center py-48 text-center space-y-12">
           <div className="w-px h-24 bg-t-accent/30" />
           <h2 className="text-5xl lg:text-8xl font-black font-display text-t-fg uppercase tracking-tighter leading-none">Ready for <br /> Exploration?</h2>
           <GlassButton primary accent="theme" onClick={onBack} className="!px-16 !py-6 !text-[12px]">
              Return to Portfolio
           </GlassButton>
        </section>
      </div>
    </div>
  );
};

export default PortfolioCaseStudy;