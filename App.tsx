
import React, { useState, useEffect, useRef } from 'react';
import { GlassCard, BubbleTag, GlassButton } from './components/GlassUI';
import { PROJECTS, GITHUB_USERNAME, LINKEDIN_URL, X_URL, FULL_NAME, BLOG_POSTS, EDUCATION, EXPERIENCE, SKILLS_RESUME, AWARDS, EMAIL, PHONE, BLOG_URL, INSTAGRAM_URL } from './constants';
import { Project, BlogPost } from './types';
import GitHubStats from './components/GitHubStats';
import { GeminiService } from './services/geminiService';
import { TicTacToe } from './components/TicTacToe';
import AIPlayground from './components/AIPlayground';

const HERO_FALLBACK_DARK = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200";
const HERO_FALLBACK_LIGHT = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200";

type SwissAccent = 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange';

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const NavIcon: React.FC<{ icon: React.ReactNode; label: string; onClick: (e: any) => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="group relative flex items-center justify-center p-2.5 rounded-full hover:bg-t-accent hover:text-t-bg transition-all duration-500 active:scale-90"
  >
    <div className="w-5 h-5">{icon}</div>
    <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-3 py-1 bg-t-fg text-t-bg text-[8px] font-black uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[200] flex flex-col items-center">
      <div className="w-2 h-2 bg-t-fg rotate-45 -translate-y-[8px]" />
      <span className="-translate-y-1">{label}</span>
    </div>
  </button>
);

const ProjectItem: React.FC<{ 
  project: Project; 
  index: number; 
  isExpanded: boolean; 
  onToggle: () => void;
  accent: SwissAccent;
}> = ({ project, index, isExpanded, onToggle, accent }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { 
      if (entry.isIntersecting) setIsVisible(true); 
    }, { threshold: 0.1 });
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  const slideClass = index % 2 === 0 ? 'animate-slide-dock-right' : 'animate-slide-dock-left';

  return (
    <div ref={itemRef} className={`w-full relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} z-10 print:hidden`}>
      <style>{`
        @keyframes slideDockRight { 
          from { transform: translateX(50%); opacity: 0; } 
          to { transform: translateX(0); opacity: 1; } 
        }
        @keyframes slideDockLeft { 
          from { transform: translateX(-50%); opacity: 0; } 
          to { transform: translateX(0); opacity: 1; } 
        }
        .animate-slide-dock-right { animation: slideDockRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-dock-left { animation: slideDockLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .project-glow:hover {
          box-shadow: 0 0 30px rgba(var(--color-${accent}-rgb, 159, 134, 255), 0.3);
        }
      `}</style>
      
      <div 
        onClick={(e) => { e.stopPropagation(); onToggle(); }} 
        className={`group cursor-pointer relative w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015] project-glow ${isExpanded ? 'mb-10' : 'h-24 lg:h-28'}`}
      >
        <GlassCard accent={accent} className={`h-full px-8 lg:px-14 flex items-center gap-10 ${isExpanded ? `bg-t-bg border-t-accent border-[1px]` : 'border-t-border'}`}>
          <div className="relative w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0">
             <img 
               src={project.thumbnailUrl} 
               className={`w-full h-full object-cover rounded-full border border-t-border transition-all duration-1000 shadow-sm ${isVisible ? 'grayscale-0 saturate-150 scale-100' : 'grayscale saturate-50 scale-95 opacity-50'}`} 
               alt="" 
             />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`text-[8px] font-black uppercase tracking-[0.6em] text-t-accent opacity-70 mb-1 block`}>Project // 0{index + 1}</span>
            <h3 className="text-2xl lg:text-3xl font-black text-t-fg uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-2">{project.title}.</h3>
          </div>
          <div className={`hidden md:flex w-10 h-10 rounded-full border border-t-border items-center justify-center transition-all duration-500 group-hover:bg-t-accent group-hover:text-t-bg ${isExpanded ? `rotate-45 bg-t-accent text-t-bg` : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
          </div>
        </GlassCard>
      </div>

      {isExpanded && (
        <div className={`w-full overflow-hidden ${slideClass} mb-20`}>
          <GlassCard accent={accent} className={`relative w-full overflow-hidden flex flex-col shadow-sm border-t-border bg-t-accent-s/5 backdrop-blur-3xl`}>
            <div className="absolute inset-0 bg-t-accent/5 pointer-events-none" />
            
            <div className="max-h-[85vh] overflow-y-auto scrollbar-hide p-8 lg:p-20 space-y-32 relative z-10">
              <div className="grid lg:grid-cols-[1.3fr_1fr] gap-20 lg:gap-32 items-start">
                <div className="space-y-16">
                   <div className="relative aspect-[21/9] rounded-[40px] border border-white/40 bg-white/30 dark:bg-white/5 backdrop-blur-3xl overflow-hidden p-10 flex flex-col justify-between shadow-sm">
                      <div className={`absolute top-10 left-10 w-12 h-12 rounded-full border border-white/50 bg-white/20 flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-1000 bg-${accent}-500/20`}>
                        <img src={project.thumbnailUrl} className="w-8 h-8 object-cover rounded-full saturate-150" alt="Logo" />
                      </div>
                      <div className="absolute top-10 right-10 flex flex-col items-end">
                        <span className="text-[8px] font-black uppercase tracking-widest text-t-accent opacity-50">TM</span>
                        <h4 className="text-xl font-black text-t-fg uppercase tracking-tighter leading-none">{project.title}.</h4>
                      </div>
                      <div className="mt-auto space-y-2">
                        <p className={`text-[9px] font-black uppercase tracking-[0.8em] text-t-accent`}>Project Case Study</p>
                      </div>
                   </div>

                   <div className="space-y-8 px-2">
                      <p className="text-xl lg:text-2xl text-t-fg-m font-medium leading-relaxed max-w-2xl italic">"{project.tagline}"</p>
                      <p className="text-base text-t-fg leading-relaxed opacity-80">{project.overview}</p>
                      <div className="w-32 h-32 rounded-2xl overflow-hidden border border-t-border mt-4">
                        <img src={project.secondaryImageUrl} className="w-full h-full object-cover saturate-125" alt="Detail View" />
                      </div>
                   </div>
                   
                   <div className="space-y-6">
                      <h5 className="text-[9px] font-black uppercase tracking-[0.6em] text-t-fg-m opacity-50 px-2">Technology Stack</h5>
                      <div className="flex gap-3 flex-wrap">{project.tech.map(t => <BubbleTag key={t} accent={accent}>{t}</BubbleTag>)}</div>
                   </div>
                   
                   <div className="pt-16 border-t border-t-border space-y-12 px-2">
                      <h5 className="text-[9px] font-black uppercase tracking-[0.6em] text-t-fg-m opacity-50">Engineering Highlights</h5>
                      <div className="grid sm:grid-cols-2 gap-10">
                        {project.useCases.map((use, idx) => (
                          <div key={idx} className="space-y-3 group/use">
                            <span className={`text-t-accent-2 font-black text-[10px] tracking-widest`}>Node 0{idx + 1}</span>
                            <p className="text-t-fg font-bold uppercase text-xs leading-snug transition-transform group-hover/use:translate-x-1">{use}</p>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-6 pt-8">
                      <GlassButton primary accent="theme" className="flex-1" onClick={() => window.open(project.liveUrl, '_blank')}>View Live Site</GlassButton>
                      <GlassButton accent="theme" className="flex-1" onClick={() => window.open(project.repoUrl, '_blank')}>Source Code</GlassButton>
                   </div>
                </div>
                
                <div className="w-full flex flex-col gap-12 relative">
                   <div className="relative rounded-[40px] overflow-hidden border border-t-border bg-t-bg-el/60 aspect-[4/5] shadow-sm">
                      <img src={project.secondaryImageUrl} className="w-full h-full object-cover opacity-90 saturate-125" alt="" />
                      <div className="absolute bottom-10 left-10 right-10 z-20">
                         <div className="bg-t-bg-el/95 backdrop-blur-xl px-10 py-8 rounded-[24px] border border-t-border shadow-sm">
                            <p className={`text-[8px] font-black text-t-accent uppercase tracking-[0.6em] mb-3`}>Technical Architecture</p>
                            <p className="text-sm font-bold text-t-fg leading-relaxed">{project.description}</p>
                            <div className="mt-8 rounded-2xl overflow-hidden border border-t-border/50 aspect-video group/inner">
                               <img src={project.thumbnailUrl} className="w-full h-full object-cover grayscale-0 saturate-125 transition-transform duration-700 group-hover/inner:scale-110" alt="Architectural Node" />
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="p-10 rounded-[40px] bg-t-bg-el/80 border border-t-border shadow-sm backdrop-blur-md">
                      <div className="flex items-center gap-4 mb-4"><div className={`w-1.5 h-1.5 rounded-full bg-t-accent-2`} /><p className={`text-[9px] font-black text-t-accent-2 uppercase tracking-[0.5em]`}>Architecture Overview</p></div>
                      <p className="text-sm font-medium text-t-fg-m leading-relaxed italic mb-8">"{project.architecture}"</p>
                   </div>

                   <div className="p-10 rounded-[40px] bg-t-bg-el/80 border border-t-border shadow-sm backdrop-blur-md">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-1.5 h-1.5 rounded-full bg-t-accent-2`} />
                        <h5 className="text-[9px] font-black uppercase tracking-[0.6em] text-t-accent-2">Role & Impact</h5>
                      </div>
                      <div className="space-y-4">
                         {project.roleHighlights.map((hl, i) => (
                           <div key={i} className="flex gap-4 items-start text-sm text-t-fg-m font-medium leading-relaxed">
                              <span className="text-t-accent-2 font-black select-none">•</span>
                              <p>{hl}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

const TravelStoryItem: React.FC<{ post: BlogPost; index: number; accent: SwissAccent }> = ({ post, index, accent }) => {
  const isEven = index % 2 === 0;
  const [illustration, setIllustration] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showIsland, setShowIsland] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateIllustration = async () => {
    setLoading(true);
    setError(null);
    try {
      const gemini = GeminiService.getInstance();
      let specificPrompt = `Panoramic high-fidelity watercolor illustration of ${post.title}. Professional Swiss minimalist art style. Aspect ratio 16:9.`;
      if (post.id === 'rishikesh-story') {
        specificPrompt = "Panoramic hand-drawn watercolor illustration in a monochrome indigo palette. Depict the sacred Ganges river, the Ram Jhula suspension bridge, white water rafting boats, and symbolic yoga icons. Overlapping artistic elements, Swiss minimalist style, clean compositions.";
      } else if (post.id === 'coorg-story') {
        specificPrompt = "Panoramic hand-drawn watercolor illustration. Depict lush emerald coffee plantations, majestic elephants, and misty rolling hills of Coorg. Overlapping artistic elements, soft atmospheric lighting, Swiss minimalist style, serene nature.";
      }
      const img = await gemini.generateImage(specificPrompt, undefined, "16:9");
      setIllustration(img);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const accentBgMap = {
    purple: 'bg-purple-600', orange: 'bg-orange-600', indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-600', rose: 'bg-rose-600', amber: 'bg-amber-600'
  };

  return (
    <ScrollReveal className={`relative w-full py-64 flex items-center transition-all duration-1000 border-b border-t-border print:hidden overflow-hidden`}>
      {illustration && (
        <div className="absolute inset-0 z-0 animate-in fade-in duration-1000 pointer-events-none">
          <img src={illustration} className="w-full h-full object-cover opacity-15 dark:opacity-10 scale-110" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-t-bg via-transparent to-t-bg" />
        </div>
      )}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-t-border z-[1]" />
      <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-t-bg z-10 ${accentBgMap[accent]}`} />
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-40 w-full items-center relative z-10 ${isEven ? '' : 'md:flex-row-reverse'}`}>
        <div className={`flex ${isEven ? 'justify-end md:pr-20' : 'order-2 md:pl-20'}`}>
          <div className="max-w-xl w-full">
            <div onMouseEnter={() => setShowIsland(true)} onMouseLeave={() => setShowIsland(false)} className={`p-12 lg:p-14 rounded-[32px] border border-t-border shadow-2xl transition-all duration-700 cursor-pointer text-t-bg hover:scale-[1.02] ${accentBgMap[accent]}`}>
               <div className="flex items-center gap-6 mb-10">
                  <span className="px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.4em] bg-t-bg/10 text-t-bg">{post.date}</span>
                  <span className="text-[8px] font-black text-t-bg/40 uppercase tracking-[0.6em]">{post.tag}</span>
               </div>
               <h3 className="text-5xl lg:text-7xl font-black text-t-bg uppercase tracking-tighter mb-10 leading-[0.8]">{post.title}.</h3>
               <p className="text-xl text-t-bg/80 font-medium leading-relaxed italic mb-14">"{post.summary}"</p>
               <GlassButton accent="white" onClick={() => window.open(post.url, '_blank')} className="w-fit">Read Travel Log</GlassButton>
            </div>
          </div>
        </div>
        <div className={`flex ${isEven ? 'order-2 md:pl-20' : 'justify-end md:pr-20'}`}>
          <div className="relative group w-full max-w-2xl aspect-[16/9] rounded-[40px] overflow-hidden border border-t-border bg-t-bg-el/80 backdrop-blur-md shadow-2xl flex items-center justify-center">
             {!illustration && !loading && !error && (
               <button onClick={generateIllustration} className="flex flex-col items-center gap-4 group/gen">
                 <div className={`w-16 h-16 rounded-full border border-t-border flex items-center justify-center hover:text-t-bg transition-all hover:${accentBgMap[accent]}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-t-fg-m">Generate AI Concept Art</span>
               </button>
             )}
             {loading && (
               <div className="flex flex-col items-center gap-4">
                 <div className={`w-8 h-8 border border-t-2 rounded-full animate-spin border-t-accent-2`} />
                 <p className="text-[9px] font-black text-t-fg-m uppercase tracking-widest">Rendering Cinematic Story...</p>
               </div>
             )}
             {illustration && (
               <>
                 <img src={illustration} className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105" alt={post.title} />
                 {showIsland && (
                   <div className="absolute top-8 left-8 right-8 animate-in fade-in slide-in-from-top-2 duration-500">
                     <div className={`bg-t-bg-el/95 backdrop-blur-xl px-10 py-6 rounded-[24px] border border-t-border shadow-sm`}>
                        <p className={`text-[8px] font-black text-t-accent-2 uppercase tracking-[0.5em] mb-2`}>Story Insight</p>
                        <p className="text-sm font-bold text-t-fg leading-relaxed">{post.summary}</p>
                     </div>
                   </div>
                 )}
               </>
             )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const ResumeSection: React.FC = () => {
  return (
    <section id="resume-section" className="mb-[40rem] scroll-mt-32 print:block print:m-0 print:p-0">
      <ScrollReveal className="max-w-[1200px] mx-auto mb-20">
        <div className="relative aspect-[21/9] rounded-[40px] border border-white/40 bg-white/30 dark:bg-white/5 backdrop-blur-3xl overflow-hidden p-12 flex flex-col justify-end shadow-sm">
            <div className="absolute top-12 right-12 w-32 h-32 rounded-full border border-white/50 bg-white/10 flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-t-accent-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[1em] text-t-accent opacity-80">Professional Background</p>
              <h2 className="text-7xl lg:text-[9rem] font-black font-display text-t-fg uppercase tracking-tighter leading-none">Resume.</h2>
            </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <GlassCard 
          className="max-w-[1200px] mx-auto overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.1)] border-white/40 bg-white/20 dark:bg-black/5 backdrop-blur-3xl print:shadow-none print:border-none print:bg-white print:p-0" 
          accent="theme"
        >
          <div className="grid lg:grid-cols-[1fr_2.5fr] min-h-[800px] print:grid-cols-1">
            <aside className="p-10 lg:p-16 bg-t-accent-s/20 dark:bg-white/5 border-r border-t-border print:bg-white print:p-8 print:border-b">
              <div className="space-y-16">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-t-accent animate-pulse" />
                    <span className="text-[10px] font-black text-t-accent uppercase tracking-[0.4em]">Available for Opportunities</span>
                  </div>
                  <h1 className="text-4xl font-black text-t-fg tracking-tighter uppercase leading-none">{FULL_NAME}</h1>
                  <p className="text-[11px] font-bold text-t-fg-m uppercase tracking-[0.2em]">Full Stack Software Engineer</p>
                </div>

                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[0.8em] opacity-60">Contact.</h3>
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-t-fg">{EMAIL}</p>
                      <p className="text-sm font-bold text-t-fg">{PHONE}</p>
                      <p className="text-sm font-bold text-t-fg">Charlotte, NC // Remote Ready</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[0.8em] opacity-60">Education.</h3>
                    <div className="space-y-8">
                      {EDUCATION.map((edu, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-[9px] font-black text-t-fg-m uppercase tracking-widest">{edu.period}</p>
                          <h4 className="text-sm font-black text-t-fg leading-tight uppercase tracking-tight">{edu.title}</h4>
                          <p className="text-[10px] font-bold text-t-fg-m uppercase tracking-widest">{edu.subtitle}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[0.8em] opacity-60">Technical Skills.</h3>
                    <div className="space-y-10">
                      <div>
                        <p className="text-[9px] font-black text-t-fg-m uppercase tracking-[0.3em] mb-4">Programming Languages</p>
                        <div className="flex flex-wrap gap-2">
                          {SKILLS_RESUME.languages.map(s => <BubbleTag key={s} accent="theme" className="!px-3 !py-1 print:text-black print:border-black/10">{s}</BubbleTag>)}
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-t-fg-m uppercase tracking-[0.3em] mb-4">Cloud & Storage</p>
                        <div className="flex flex-wrap gap-2">
                          {SKILLS_RESUME.cloud_db.map(s => <BubbleTag key={s} accent="theme" className="!px-3 !py-1 print:text-black print:border-black/10">{s}</BubbleTag>)}
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-t-fg-m uppercase tracking-[0.3em] mb-4">Core Utilities</p>
                        <div className="flex flex-wrap gap-2">
                          {SKILLS_RESUME.tools.map(s => <BubbleTag key={s} accent="theme" className="!px-3 !py-1 print:text-black print:border-black/10">{s}</BubbleTag>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <main className="p-10 lg:p-20 space-y-24 bg-white/40 dark:bg-transparent print:bg-white print:p-12">
              <div className="space-y-8 pb-16 border-b border-t-border">
                 <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-60">01 // Profile Summary.</h3>
                 <p className="text-xl lg:text-2xl font-medium text-t-fg leading-relaxed max-w-3xl italic">
                   "Developing high-performance digital solutions with a focus on intuitive interfaces, clean code, and advanced technology integration. Passionate about problem-solving and delivering business value."
                 </p>
              </div>

              <div className="space-y-16 py-12">
                <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-60">02 // Experience.</h3>
                <div className="space-y-20">
                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="grid lg:grid-cols-[1fr_3fr] gap-10 lg:gap-20 group print:grid-cols-1">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-t-fg uppercase tracking-widest">{exp.period}</p>
                        <p className="text-[9px] font-bold text-t-accent uppercase tracking-widest opacity-60">{exp.location}</p>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-1">
                          <h4 className="text-2xl font-black text-t-fg uppercase tracking-tighter group-hover:text-t-accent transition-colors">{exp.title}</h4>
                          <p className="text-sm font-bold text-t-fg-m uppercase tracking-widest">{exp.subtitle}</p>
                        </div>
                        <ul className="space-y-4">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="flex gap-4 text-sm font-medium text-t-fg-m leading-relaxed">
                              <span className="text-t-accent font-black select-none">•</span>
                              <span className="opacity-80 group-hover:opacity-100 transition-opacity">{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-20 pt-16 border-t border-t-border print:grid-cols-1">
                <div className="space-y-12">
                  <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-60">03 // Achievements.</h3>
                  <div className="space-y-10">
                    {AWARDS.map((award, idx) => (
                      <div key={idx} className="space-y-2">
                        <p className="text-[9px] font-black text-t-fg-m uppercase tracking-widest">{award.period}</p>
                        <h4 className="text-lg font-black text-t-fg leading-tight uppercase tracking-tight">{award.title}</h4>
                        <p className="text-[11px] font-bold text-t-fg-m uppercase tracking-widest">{award.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div className="p-12 lg:p-16 bg-t-bg-el/40 border-t border-t-border flex flex-col sm:flex-row justify-center items-center gap-10 print:hidden">
             <div className="flex flex-col items-center sm:items-start gap-1">
                <p className="text-[9px] font-black text-t-fg-m uppercase tracking-widest">Profile Verification</p>
                <p className="text-[10px] font-bold text-t-fg opacity-60">Original Content // {FULL_NAME} // 2025</p>
             </div>
             <GlassButton primary accent="theme" className="min-w-[280px] shadow-2xl" onClick={() => window.print()}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download Resume (PDF)
             </GlassButton>
          </div>
        </GlassCard>
      </ScrollReveal>
    </section>
  );
};

const App: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [heroLoading, setHeroLoading] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 150); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
  }, [isDarkMode]);

  const generateHero = async () => {
    const gemini = GeminiService.getInstance();
    if (gemini.isQuotaLocked()) return; 
    setHeroLoading(true);
    try {
      const prompt = isDarkMode 
        ? "Hyper-clean architectural workspace, deep navy midnight atmosphere, electric aqua mint accents, high-end Swiss minimalist design."
        : "Hyper-clean architectural workspace, dreamy ocean breeze lighting, soft lilac and pale grey tones, high-end Swiss minimalist design.";
      const img = await gemini.generateImage(prompt);
      setHeroImage(img);
    } catch (err) {
      console.warn("Hero image generation paused.");
    } finally {
      setHeroLoading(false);
    }
  };

  useEffect(() => { generateHero(); }, []);

  const vibrantAccents: SwissAccent[] = ['purple', 'orange', 'indigo', 'emerald', 'rose', 'amber'];
  const toggleProject = (id: string) => setExpandedProjectId(prev => prev === id ? null : id);
  const scrollToSection = (e: React.MouseEvent, id: string) => { 
    e.preventDefault(); 
    const element = document.getElementById(id); 
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
  };
  const handleScrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const activeHeroImage = heroImage || (isDarkMode ? HERO_FALLBACK_DARK : HERO_FALLBACK_LIGHT);

  return (
    <div className="min-h-screen relative selection:bg-t-accent selection:text-t-bg bg-t-bg transition-colors duration-500 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-15 dark:opacity-20 print:hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[60%] h-[60%] bg-t-accent-s/40 blur-[200px] rounded-full" />
      </div>

      <nav className={`fixed top-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit print:hidden transition-all duration-500`}>
        <div className={`border border-t-border px-6 lg:px-10 py-2.5 rounded-full flex items-center gap-8 transition-all duration-500 shadow-xl ${scrolled ? 'bg-t-bg-el/98 backdrop-blur-[48px] scale-95 border-t-accent/30' : 'bg-t-bg-el/85 backdrop-blur-2xl'}`}>
          <button onClick={handleScrollToTop} className="flex flex-col items-start leading-none group">
            <span className="text-[10px] font-black tracking-[0.4em] text-t-fg uppercase mb-1">V.KRISHNA</span>
            <span className="text-[6px] font-mono text-t-accent opacity-50 uppercase tracking-widest group-hover:opacity-100 transition-opacity">SYS_ADMIN.v2.5</span>
          </button>
          <div className="h-4 w-px bg-t-border mx-2" />
          <div className="flex gap-2 items-center">
            <NavIcon label="Projects" onClick={(e) => scrollToSection(e, 'projects-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
            <NavIcon label="Resume" onClick={(e) => scrollToSection(e, 'resume-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
            <NavIcon label="AI Lab" onClick={(e) => scrollToSection(e, 'ai-lab-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
            <NavIcon label="Game" onClick={(e) => scrollToSection(e, 'game-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 011 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>} />
            <NavIcon label="Travel" onClick={(e) => scrollToSection(e, 'travel-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
          </div>
          <div className="h-4 w-px bg-t-border mx-2" />
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-full hover:bg-t-accent hover:text-t-bg transition-all duration-500 text-t-fg/60">
              {isDarkMode ? (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>) : (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>)}
            </button>
            <button onClick={() => window.print()} className="bg-t-accent text-t-bg p-2.5 rounded-full hover:scale-110 active:scale-90 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-10 lg:px-32 pt-80 pb-60 print:p-0">
        <section id="hero-section" className="grid lg:grid-cols-2 gap-40 items-center mb-[40rem] min-h-[60vh] print:hidden">
          <div className="space-y-20 animate-in fade-in slide-in-from-left duration-1000">
             <span className="text-[9px] font-black uppercase tracking-[2em] text-t-accent">Software Engineer // 2025 Portfolio</span>
            <h1 className="text-8xl lg:text-[13rem] font-black font-display text-t-fg tracking-tighter leading-[0.65] uppercase">Vamshi <br /><span className="text-t-fg-m opacity-20">Krishna.</span></h1>
            <p className="text-2xl text-t-fg-m max-w-xl leading-relaxed font-medium">Building scalable web applications with a focus on high-performance architecture and elegant user experiences.</p>
            <div className="flex gap-10">
              <GlassButton primary accent="theme" onClick={(e: any) => scrollToSection(e, 'projects-section')}>View My Projects</GlassButton>
              <GlassButton accent="theme" onClick={(e: any) => scrollToSection(e, 'resume-section')}>Open Resume</GlassButton>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-[64px] bg-t-bg-el overflow-hidden border border-t-border shadow-2xl">
              {heroLoading ? (
                <div className="w-full h-full bg-t-accent-s/20 animate-pulse flex items-center justify-center">
                  <p className="text-[8px] font-black uppercase tracking-widest text-t-accent">Initializing Experience...</p>
                </div>
              ) : (
                <img src={activeHeroImage} alt="Professional Workspace Illustration" className="w-full h-full object-cover grayscale opacity-90 dark:opacity-50" />
              )}
          </div>
        </section>

        <section id="projects-section" className="mb-[40rem] scroll-mt-32 print:hidden">
          <ScrollReveal className="flex flex-col items-center mb-48 text-center">
             <h2 className="text-7xl lg:text-[10rem] font-black font-display text-t-fg uppercase tracking-tighter leading-none">Featured <br /> Projects.</h2>
             <div className="w-40 h-px bg-t-accent-2 mt-20 opacity-20" />
          </ScrollReveal>
          <div className="flex flex-col gap-8">
            {PROJECTS.map((project, i) => (
              <ProjectItem key={project.id} project={project} index={i} isExpanded={expandedProjectId === project.id} onToggle={() => toggleProject(project.id)} accent={vibrantAccents[i % vibrantAccents.length]} />
            ))}
          </div>
        </section>

        <ResumeSection />

        <section id="ai-lab-section" className="mb-[40rem] scroll-mt-32 print:hidden">
          <ScrollReveal className="max-w-[1200px] mx-auto mb-20">
            <div className="relative aspect-[21/9] rounded-[40px] border border-white/40 bg-white/30 dark:bg-white/5 backdrop-blur-3xl overflow-hidden p-12 flex flex-col justify-end shadow-sm">
                <div className="absolute top-12 right-12 w-32 h-32 rounded-full border border-white/50 bg-white/10 flex items-center justify-center shadow-lg">
                    <svg className="w-16 h-16 text-t-accent-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[1em] text-t-accent-2 opacity-80">Research & Development</p>
                  <h2 className="text-7xl lg:text-[9rem] font-black font-display text-t-fg uppercase tracking-tighter leading-none">AI Studio.</h2>
                </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <AIPlayground />
          </ScrollReveal>
        </section>

        <section className="mb-[40rem] print:hidden">
          <ScrollReveal>
            <GitHubStats />
          </ScrollReveal>
        </section>

        <section id="game-section" className="mb-[40rem] rounded-[120px] p-16 lg:p-48 bg-t-bg-el/40 border border-t-border print:hidden scroll-mt-32 relative overflow-hidden group">
           <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-20 transition-all duration-1000">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-t-accent-2/30 via-transparent to-transparent blur-[160px] scale-125" />
           </div>
           
           <div className="grid lg:grid-cols-2 gap-48 items-center relative z-10">
             <ScrollReveal className="space-y-16">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-[2px] bg-t-accent-2" />
                 <span className="text-[10px] font-black uppercase tracking-[1em] text-t-accent-2">Interactive Strategy</span>
               </div>
               <h2 className="text-6xl lg:text-9xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.75]">Game <br /> Logic.</h2>
               <p className="text-t-fg-m font-medium max-w-lg text-2xl leading-relaxed">Demonstrating real-time AI decision-making through a classic strategic simulation.</p>
               <div className="pt-10 flex items-center gap-6 opacity-40">
                 <div className="h-px flex-1 bg-t-border" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-t-fg">AI-Powered Interaction Module</span>
               </div>
             </ScrollReveal>
             
             <ScrollReveal className="flex justify-center w-full relative group/island" delay={200}>
               <div className="absolute inset-[-40px] bg-t-accent-2/5 blur-[100px] rounded-full scale-0 group-hover/island:scale-100 transition-transform duration-1000 opacity-0 group-hover/island:opacity-100" />
               <div className="relative p-6 rounded-[64px] bg-white/20 dark:bg-white/5 border border-white/40 shadow-2xl backdrop-blur-3xl">
                 <TicTacToe />
               </div>
             </ScrollReveal>
           </div>
        </section>

        <section id="travel-section" className="mb-[40rem] scroll-mt-32 overflow-hidden rounded-[120px] bg-t-bg-el/40 border border-t-border print:hidden">
          <ScrollReveal className="flex flex-col items-center py-64 text-center space-y-24 bg-t-accent-s/5 border-b border-t-border">
             <div className="px-16 py-6 rounded-full bg-t-accent-2 text-t-bg font-black uppercase tracking-[2em] text-[9px]">Personal Stories</div>
             <h2 className="text-8xl lg:text-[12rem] font-black text-t-fg uppercase tracking-tighter leading-none text-center">Life in <br /> Motion.</h2>
          </ScrollReveal>
          <div className="relative">
             <div className="space-y-0">
               {BLOG_POSTS.map((post, i) => {
                 let accent: SwissAccent = 'indigo';
                 if (post.id === 'rishikesh-story') accent = 'purple';
                 else if (post.id === 'coorg-story') accent = 'emerald';
                 else accent = vibrantAccents[(i + 3) % vibrantAccents.length];
                 return <TravelStoryItem key={post.id} post={post} index={i} accent={accent} />;
               })}
             </div>
          </div>
        </section>
      </main>

      <footer className="relative py-28 overflow-hidden print:hidden">
        <div className="absolute inset-0 bg-white/[0.03] dark:bg-white/[0.02] backdrop-blur-3xl z-0" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-t-accent-2 via-t-accent to-t-accent-2 opacity-90 shadow-[0_0_20px_rgba(159,134,255,0.3)]" />
        <div className="max-w-[1440px] mx-auto px-12 lg:px-32 flex flex-col md:flex-row justify-between items-center gap-16 relative z-10">
          <div className="flex flex-col items-center md:items-start space-y-4">
             <h4 onClick={handleScrollToTop} className="text-4xl lg:text-5xl font-black text-t-fg uppercase tracking-tighter cursor-pointer transition-all hover:text-t-accent active:scale-95 origin-left">
               {FULL_NAME}.
             </h4>
             <p className="text-[10px] font-black text-t-fg uppercase tracking-[1.4em] opacity-80">Software Engineering // 2025</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-12">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
              {[
                { url: LINKEDIN_URL, label: 'LinkedIn', color: 'hover:text-blue-500', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> },
                { url: `https://github.com/${GITHUB_USERNAME}`, label: 'GitHub', color: 'hover:text-purple-400', icon: <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/> },
                { url: X_URL, label: 'X', color: 'hover:text-orange-400', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
                { url: INSTAGRAM_URL, label: 'Instagram', color: 'hover:text-rose-500', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> }
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noreferrer" className={`w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center ${link.color} hover:bg-white/10 hover:scale-110 active:scale-95 transition-all shadow-xl text-t-fg`} title={link.label}>
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">{link.icon}</svg>
                </a>
              ))}
            </div>
            <p className="text-[9px] font-black text-t-fg uppercase tracking-[0.8em] opacity-40">Clean Code // Performance // Design</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
