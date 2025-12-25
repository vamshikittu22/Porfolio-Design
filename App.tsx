import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GlassCard, BubbleTag, GlassButton } from './components/GlassUI';
import { GITHUB_USERNAME, LINKEDIN_URL, X_URL, FULL_NAME, BLOG_POSTS, EDUCATION, EXPERIENCE, SKILLS_RESUME, AWARDS, EMAIL, PHONE, BLOG_URL, INSTAGRAM_URL, RESUME_URL } from './constants';
import { BlogPost } from './types';
import GitHubStats from './components/GitHubStats';
import { GeminiService } from './services/geminiService';
import { TicTacToe } from './components/TicTacToe';
import { HeroSection } from './sections/hero/HeroSection';
import { AboutSection } from './sections/AboutSection';
import ProjectsSection from './sections/projects/ProjectsSection';

const HERO_FALLBACK_DARK = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200";
const HERO_FALLBACK_LIGHT = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200";

type SwissAccent = 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange';

const VIBRANT_ACCENTS: SwissAccent[] = ['purple', 'orange', 'indigo', 'emerald', 'rose', 'amber'];

export const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
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

const SkillProgress: React.FC<{ label: string; percentage: number }> = ({ label, percentage }) => (
  <div className="group/skill w-full">
    <div className="flex justify-between items-end mb-1.5">
      <span className="text-[9px] font-black uppercase tracking-widest text-t-fg group-hover/skill:text-t-accent transition-colors">{label}</span>
      <span className="text-[8px] font-mono text-t-fg-m opacity-60">{percentage}%</span>
    </div>
    <div className="h-[1px] w-full bg-t-border relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-t-accent transform origin-left transition-transform duration-[1500ms] ease-out" 
        style={{ transform: `scaleX(${percentage / 100})` }}
      />
    </div>
  </div>
);

const TimelineNode: React.FC<{ 
  item: any; 
  index: number; 
  isExpanded: boolean; 
  onToggle: () => void;
  type: 'edu' | 'exp';
}> = ({ item, index, isExpanded, onToggle, type }) => (
  <div 
    onClick={onToggle}
    className={`group/node relative transition-all duration-500 cursor-pointer border-b border-t-border/50 py-8 last:border-0 hover:bg-t-accent-s/5 px-6 -mx-6 rounded-2xl
    ${isExpanded ? 'bg-t-bg-el/50 shadow-sm border-t-accent/20' : ''}`}
  >
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black text-t-accent uppercase tracking-[0.4em]">{item.period}</span>
          <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${type === 'edu' ? 'border-t-accent-2/30 text-t-accent-2' : 'border-t-accent/30 text-t-accent'}`}>
            {type === 'edu' ? 'Education' : 'Experience'}
          </span>
        </div>
        <div>
          <h4 className={`text-xl lg:text-3xl font-black text-t-fg uppercase tracking-tighter leading-tight transition-colors ${isExpanded ? 'text-t-accent' : 'group-hover/node:text-t-accent'}`}>
            {item.title}
          </h4>
          <p className="text-[10px] font-bold text-t-fg-m uppercase tracking-[0.2em] mt-1">{item.subtitle} // {item.location}</p>
        </div>
        
        {!isExpanded && (
          <p className="text-sm font-medium text-t-fg-m opacity-60 group-hover/node:opacity-100 transition-opacity truncate max-w-2xl">
            {item.description[0]}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <button className={`flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] transition-all ${isExpanded ? 'text-t-accent' : 'text-t-fg opacity-30 group-hover/node:opacity-100'}`}>
          {isExpanded ? 'Close Details' : 'View Details'}
          <svg className={`w-3 h-3 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-h-[800px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
      <ul className="space-y-3 pt-6 border-t border-t-border">
        {item.description.map((desc: string, i: number) => (
          <li key={i} className="flex gap-4 text-sm lg:text-base font-medium text-t-fg leading-relaxed">
            <span className="w-1 h-1 rounded-full bg-t-accent mt-2.5 flex-shrink-0" />
            <span className="opacity-80">{desc}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ResumeSection: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['exp-0']);
  const toggleId = (id: string) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const skillsWithProgress = {
    languages: [
      { name: 'C# / .NET', p: 95 },
      { name: 'JavaScript / TypeScript', p: 92 },
      { name: 'Python', p: 85 },
      { name: 'PHP', p: 88 },
      { name: 'SQL', p: 90 },
    ],
    frameworks: [
      { name: 'React', p: 95 },
      { name: 'Node.js', p: 88 },
      { name: 'ASP.NET Core', p: 92 },
    ]
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="resume-section" className="mb-[20rem] scroll-mt-32 print:block print:m-0 print:p-0">
      <ScrollReveal className="max-w-[1440px] mx-auto px-6 lg:px-20 mb-12">
        <div className="relative aspect-[21/9] rounded-[40px] border border-white/40 bg-white/30 dark:bg-white/5 backdrop-blur-3xl overflow-hidden p-10 lg:p-14 flex flex-col justify-end shadow-sm group">
            <div className="absolute top-10 right-10 flex gap-4 print:hidden">
              <GlassButton accent="theme" className="!px-6 !py-3 !text-[8px]" onClick={scrollToContact}>
                Contact Me
              </GlassButton>
              <GlassButton primary accent="theme" className="!px-6 !py-3 !text-[8px]" onClick={() => window.print()}>
                Download
              </GlassButton>
            </div>
            
            <div className="space-y-3">
              <p className="text-[9px] font-black uppercase tracking-[1em] text-t-accent opacity-80">Professional Credentials</p>
              <h2 className="text-7xl lg:text-[9rem] font-black font-display text-t-fg uppercase tracking-tighter leading-none">Resume.</h2>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 border-t border-t-border/50 pt-4 max-w-4xl">
                <p className="text-[10px] lg:text-sm font-bold text-t-fg-m uppercase tracking-[0.3em] opacity-80">
                  Full‑stack Software Engineer · C# / .NET · React · AI‑driven systems
                </p>
              </div>
            </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-20 min-h-[600px] print:grid-cols-1">
          {/* Left Sidebar: Profile & Matrix & Awards */}
          <aside className="space-y-16 sticky top-32 h-fit print:relative print:top-0">
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">Identity.</h3>
                <div className="space-y-1">
                  <h4 className="text-3xl font-black text-t-fg uppercase tracking-tighter leading-none">{FULL_NAME}</h4>
                  <p className="text-[10px] font-bold text-t-fg-m uppercase tracking-[0.2em]">Engineer / Developer</p>
                </div>
              </div>

              <div className="space-y-12 pt-12 border-t border-t-border">
                <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">Matrix.</h3>
                <div className="space-y-8">
                   <div className="space-y-5">
                      <p className="text-[9px] font-black text-t-fg-m uppercase tracking-[0.3em] opacity-50">Languages</p>
                      <div className="space-y-4">
                        {skillsWithProgress.languages.map(s => <SkillProgress key={s.name} label={s.name} percentage={s.p} />)}
                      </div>
                   </div>
                   <div className="space-y-5">
                      <p className="text-[9px] font-black text-t-fg-m uppercase tracking-[0.3em] opacity-50">Frameworks</p>
                      <div className="space-y-4">
                        {skillsWithProgress.frameworks.map(s => <SkillProgress key={s.name} label={s.name} percentage={s.p} />)}
                      </div>
                   </div>
                </div>
              </div>

              <div className="space-y-10 pt-12 border-t border-t-border">
                <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">Recognition.</h3>
                <div className="space-y-8">
                  {AWARDS.map((award, idx) => (
                    <div key={idx} className="group/award space-y-2 p-6 border border-t-border rounded-2xl hover:border-t-accent transition-all bg-t-bg-el/20">
                      <p className="text-[8px] font-black text-t-accent uppercase tracking-widest">{award.period}</p>
                      <h4 className="text-lg font-black text-t-fg leading-tight uppercase tracking-tight group-hover/award:text-t-accent transition-colors">{award.title}</h4>
                      <p className="text-[9px] font-bold text-t-fg-m uppercase tracking-widest opacity-60">{award.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content: Main Resume Feed */}
          <main className="space-y-20">
            <div className="space-y-8 border-b border-t-border pb-12">
               <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">01 // Profile Summary.</h3>
               <p className="text-xl lg:text-2xl font-medium text-t-fg leading-relaxed italic max-w-3xl">
                 "Architecting robust enterprise solutions with a focus on scalable design and intelligent automation. Committed to high-integrity engineering across the C# and React ecosystems."
               </p>
            </div>

            <div className="space-y-10">
              <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">02 // Experience.</h3>
              <div className="space-y-4">
                {EXPERIENCE.map((exp, idx) => (
                  <TimelineNode 
                    key={`exp-${idx}`} 
                    item={exp} 
                    index={idx} 
                    type="exp"
                    isExpanded={expandedIds.includes(`exp-${idx}`)} 
                    onToggle={() => toggleId(`exp-${idx}`)} 
                  />
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">03 // Education.</h3>
              <div className="space-y-4">
                {EDUCATION.map((edu, idx) => (
                  <TimelineNode 
                    key={`edu-${idx}`} 
                    item={edu} 
                    index={idx} 
                    type="edu"
                    isExpanded={expandedIds.includes(`edu-${idx}`)} 
                    onToggle={() => toggleId(`edu-${idx}`)} 
                  />
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-t-border flex justify-between items-center opacity-40">
               <div className="flex gap-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-t-accent" />
                 <p className="text-[8px] font-black text-t-fg uppercase tracking-widest">Document version 2.5</p>
               </div>
               <span className="text-[8px] font-black uppercase tracking-[0.5em] text-t-fg italic">Synchronized Portfolio Ledger</span>
            </div>
          </main>
        </div>
      </ScrollReveal>
    </section>
  );
};

const ContactSection: React.FC = () => {
  const [greeting, setGreeting] = useState("Connecting to portfolio...");
  const [isBlasted, setIsBlasted] = useState(false);
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const gemini = GeminiService.getInstance();
        const msg = await gemini.getNeuralGreeting();
        setGreeting(msg);
      } catch {
        setGreeting("Connection established. Open for collaboration and opportunities.");
      }
    };
    fetchGreeting();
  }, []);
  const handleToggle = () => setIsBlasted(!isBlasted);
  return (
    <section id="contact-section" className="mb-24 scroll-mt-32 print:hidden relative min-h-[600px] flex items-center justify-center overflow-visible px-6">
      <ScrollReveal className="w-full flex items-center justify-center">
        {!isBlasted ? (
          <div 
            onClick={handleToggle}
            onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
            role="button"
            tabIndex={0}
            className="group cursor-pointer relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-t-accent-2 rounded-full"
            aria-label="Open contact information"
          >
            <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full border border-white/80 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-12px_rgba(255,255,255,0.03)] animate-pulse hover:scale-105 transition-all duration-700 flex items-center justify-center bg-white/40 dark:bg-white/10 backdrop-blur-[80px] group-hover:border-t-accent-2">
               <div className="absolute inset-[15px] rounded-full border border-white/20 pointer-events-none" />
               <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                 <div className="w-14 h-14 rounded-full bg-t-accent-2/10 border border-t-accent-2/40 text-t-accent-2 flex items-center justify-center shadow-sm transition-all group-hover:bg-t-accent-2 group-hover:text-t-bg">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                   </svg>
                 </div>
                 <div className="space-y-0.5">
                   <span className="text-[14px] font-black uppercase tracking-[0.6em] block text-t-fg pl-[0.6em]">Contact</span>
                 </div>
               </div>
               <div className="absolute inset-[-40px] border-[2.5px] border-black/80 dark:border-t-accent-2/50 rounded-full animate-[spin_20s_linear_infinite]" />
               <div className="absolute inset-[-80px] border-[1.5px] border-black/50 dark:border-t-accent-2/30 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
               <div className="absolute inset-[-120px] border-[1px] border-black/30 dark:border-t-accent-2/15 rounded-full animate-[spin_45s_linear_infinite]" />
            </div>
            <p className="mt-32 text-[9px] font-black uppercase tracking-[1.5em] text-t-fg opacity-40 dark:opacity-70 group-hover:opacity-100 transition-opacity animate-bounce pl-[1.5em]">
              Contact / Send Message
            </p>
          </div>
        ) : (
          <div className="w-full max-w-[840px] animate-in zoom-in-95 fade-in duration-700 ease-out">
            <GlassCard className="p-10 lg:p-16 overflow-hidden border-white/60 relative shadow-[0_40px_120px_-20px_rgba(0,0,0,0.1)] bg-white/40 dark:bg-white/5 backdrop-blur-[64px]" accent="secondary">
              <div className="absolute top-0 right-0 p-8">
                <button 
                  onClick={handleToggle} 
                  className="w-12 h-12 rounded-full border border-t-border flex items-center justify-center hover:bg-t-accent hover:text-t-bg transition-all text-t-fg outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
                  aria-label="Close contact card"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[1em] text-t-accent-2">Contact Information</p>
                    <h2 className="text-4xl lg:text-6xl font-black font-display text-t-fg uppercase tracking-tighter leading-none">{FULL_NAME}</h2>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-t-accent">Software Engineer</p>
                  </div>
                  <div className="space-y-2 border-l-2 border-t-accent-2/20 pl-6">
                    <p className="text-sm font-bold text-t-fg flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Charlotte, NC // Work Authorized
                    </p>
                    <p className="text-sm font-medium text-t-fg-m italic leading-relaxed max-w-xl">
                      "{greeting}"
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-10 pt-4">
                    <div className="space-y-2">
                      <p className="text-9px font-black uppercase tracking-[0.5em] text-t-fg opacity-40">Direct Email</p>
                      <a href={`mailto:${EMAIL}`} className="text-xl lg:text-2xl font-black text-t-fg hover:text-t-accent-2 transition-colors underline decoration-t-accent-2/30 underline-offset-8 decoration-2">{EMAIL}</a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                   <GlassButton primary accent="secondary" className="w-full !py-6 !text-[10px]" onClick={() => window.open(LINKEDIN_URL, '_blank')}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn Profile
                   </GlassButton>
                   <GlassButton accent="secondary" className="w-full !py-6 !text-[10px]" onClick={() => window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank')}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub Portfolio
                   </GlassButton>
                   <GlassButton accent="secondary" className="w-full !py-6 !text-[10px]" onClick={() => window.print()}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download Resume
                   </GlassButton>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
};

const NavIcon: React.FC<{ icon: React.ReactNode; label: string; isActive?: boolean; onClick: (e: any) => void }> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e); }}
    className={`group relative flex items-center justify-center p-2.5 rounded-full transition-all duration-500 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-t-accent ${isActive ? 'bg-t-accent text-t-bg' : 'hover:bg-t-accent hover:text-t-bg'}`}
    aria-label={label}
  >
    <div className="w-5 h-5">{icon}</div>
    <div 
      role="tooltip"
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-3 py-1 bg-t-fg text-t-bg text-[8px] font-black uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[200] flex flex-col items-center shadow-lg"
    >
      <div className="w-2 h-2 bg-t-fg rotate-45 -translate-y-[8px]" />
      <span className="-translate-y-1">{label}</span>
    </div>
  </button>
);

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
  const paletteMap: Record<SwissAccent, { bg: string, text: string, accent: string, border: string }> = {
    purple: { bg: 'bg-purple-600', text: 'text-white', accent: 'bg-purple-400', border: 'border-purple-300' },
    orange: { bg: 'bg-orange-500', text: 'text-white', accent: 'bg-orange-300', border: 'border-orange-200' },
    indigo: { bg: 'bg-indigo-600', text: 'text-white', accent: 'bg-indigo-400', border: 'border-indigo-300' },
    emerald: { bg: 'bg-emerald-600', text: 'text-white', accent: 'bg-emerald-400', border: 'border-emerald-300' },
    rose: { bg: 'bg-rose-500', text: 'text-white', accent: 'bg-rose-300', border: 'border-rose-200' },
    amber: { bg: 'bg-amber-500', text: 'text-white', accent: 'bg-amber-300', border: 'border-amber-200' }
  };
  const style = paletteMap[accent];
  return (
    <ScrollReveal className="relative w-full py-48 lg:py-64 flex items-center transition-all duration-1000 border-b border-t-border print:hidden overflow-hidden">
      {illustration && (
        <div className="absolute inset-0 z-0 animate-in fade-in duration-1000 pointer-events-none">
          <img src={illustration} className="w-full h-full object-cover opacity-20 dark:opacity-10 scale-110" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-t-bg via-transparent to-t-bg" />
        </div>
      )}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-t-border z-[1]" />
      <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-t-bg z-10 ${style.bg}`} />
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 w-full items-center relative z-10 px-6 max-w-[1440px] mx-auto ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        <div className={`flex ${isEven ? 'lg:justify-end' : 'lg:order-2'}`}>
          <div className="max-w-2xl w-full">
            <div 
              onMouseEnter={() => setShowIsland(true)} 
              onMouseLeave={() => setShowIsland(false)} 
              className={`relative p-12 lg:p-16 rounded-[120px_40px_120px_40px] lg:rounded-[180px_60px_180px_60px] border shadow-2xl transition-all duration-700 cursor-pointer hover:scale-[1.02] ${style.bg} ${style.text} ${style.border}`}
            >
               <div className="flex items-center gap-6 mb-8">
                  <span className="px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.4em] bg-white/20 text-white border border-white/10">{post.date}</span>
                  <span className="text-[8px] font-black text-white/50 uppercase tracking-raw-60.6em]">{post.tag}</span>
               </div>
               <h3 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter mb-10 leading-[0.75]">{post.title}.</h3>
               <p className="text-lg lg:text-xl text-white/80 font-medium leading-relaxed italic mb-12">"{post.summary}"</p>
               <GlassButton accent="white" onClick={() => window.open(post.url, '_blank')} className="w-fit">Open Journal</GlassButton>
               <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/10 blur-2xl pointer-events-none" />
               <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-black/5 blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
        <div className={`flex ${isEven ? 'lg:order-2' : 'lg:justify-end'}`}>
          <div className="relative group w-full max-w-2xl aspect-[16/9] rounded-[40px_100px_40px_100px] overflow-hidden border border-t-border bg-t-bg-el/80 backdrop-blur-md shadow-2xl flex items-center justify-center">
             {!illustration && !loading && !error && (
               <div className="flex flex-col items-center gap-4 px-6 text-center">
                 <p className="text-[7px] lg:text-[8px] font-black text-t-fg-m uppercase tracking-[0.2em] opacity-40 leading-relaxed max-w-xs">Generate an AI illustration of this trip.</p>
                 <button onClick={generateIllustration} className="flex flex-col items-center gap-4 group/gen">
                   <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-t-border flex items-center justify-center hover:text-t-bg transition-all hover:${style.bg} shadow-lg`}>
                      <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                   </div>
                   <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.3em] text-t-fg-m">Render AI Postcard</span>
                 </button>
               </div>
             )}
             {loading && (
               <div className="flex flex-col items-center gap-4 text-center p-8">
                 <div className={`w-10 h-10 border-4 border-t-transparent rounded-full animate-spin border-t-accent-2 mb-2`} />
                 <p className="text-[10px] font-black text-t-fg-m uppercase tracking-widest leading-loose">Processing Image...</p>
               </div>
             )}
             {illustration && (
               <>
                 <img src={illustration} className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover:scale-110 saturate-[1.2]" alt={post.title} />
                 {showIsland && (
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-8 lg:p-20 text-center animate-in fade-in duration-500">
                     <div className="bg-t-bg-el/95 backdrop-blur-3xl px-8 py-6 lg:px-12 lg:py-10 rounded-[48px_16px_48px_16px] border border-t-border shadow-2xl max-md:max-w-xs">
                        <p className={`text-[7px] lg:text-[8px] font-black text-t-accent-2 uppercase tracking-[0.5em] mb-4`}>Story Context</p>
                        <p className="text-sm lg:text-lg font-bold text-t-fg leading-relaxed italic line-clamp-4">"{post.summary}"</p>
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

const App: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [heroLoading, setHeroLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 150); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['about-section', 'projects-section', 'github-section', 'resume-section', 'game-section', 'travel-section', 'contact-section'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-25% 0px -25% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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

  const scrollToSection = (e: React.MouseEvent | null, id: string) => { 
    if (e) e.preventDefault(); 
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
          <button onClick={handleScrollToTop} className="flex flex-col items-start leading-none group text-left">
            <span className="text-[10px] font-black tracking-[0.4em] text-t-fg uppercase mb-1">Vamshi Krishna</span>
            <span className="text-[6px] font-mono text-t-accent opacity-50 uppercase tracking-widest group-hover:opacity-100 transition-opacity">Portfolio v2.5</span>
          </button>
          <div className="h-4 w-px bg-t-border mx-2" />
          <div className="flex gap-2 items-center">
            <NavIcon isActive={activeSection === 'about-section'} label="About" onClick={(e) => scrollToSection(e, 'about-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
            <NavIcon isActive={activeSection === 'projects-section'} label="Projects" onClick={(e) => scrollToSection(e, 'projects-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
            <NavIcon isActive={activeSection === 'github-section'} label="GitHub" onClick={(e) => scrollToSection(e, 'github-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>} />
            <NavIcon isActive={activeSection === 'resume-section'} label="Resume" onClick={(e) => scrollToSection(e, 'resume-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
            <NavIcon isActive={activeSection === 'game-section'} label="Playlab" onClick={(e) => scrollToSection(e, 'game-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 011 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>} />
            <NavIcon isActive={activeSection === 'travel-section'} label="Travel" onClick={(e) => scrollToSection(e, 'travel-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
            <NavIcon isActive={activeSection === 'contact-section'} label="Contact" onClick={(e) => scrollToSection(e, 'contact-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>} />
          </div>
          <div className="h-4 w-px bg-t-border mx-2" />
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-full hover:bg-t-accent hover:text-t-bg transition-all duration-500 text-t-fg/60 outline-none focus-visible:ring-2 focus-visible:ring-t-accent">
              {isDarkMode ? (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>) : (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>)}
            </button>
            <button onClick={() => window.print()} className="bg-t-accent text-t-bg p-2.5 rounded-full hover:scale-110 active:scale-90 transition-all outline-none focus-visible:ring-2 focus-visible:ring-t-accent-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-[1440px] mx-auto px-10 lg:px-32 pt-80 pb-60 print:p-0">
        <HeroSection image={activeHeroImage} loading={heroLoading} onScroll={(id) => scrollToSection(null, id)} />
        <AboutSection />
        <ProjectsSection />
        <section className="mb-[40rem] print:hidden">
          <ScrollReveal>
            <GitHubStats />
          </ScrollReveal>
        </section>
        <ResumeSection />
        <section id="game-section" className="mb-[40rem] rounded-[120px] p-16 lg:p-48 bg-t-bg-el/40 border border-t-border print:hidden scroll-mt-32 relative overflow-hidden group">
           <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-20 transition-all duration-1000">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-t-accent-2/30 via-transparent to-transparent blur-[160px] scale-125" />
           </div>
           <div className="grid lg:grid-cols-2 gap-48 items-center relative z-10">
             <ScrollReveal className="space-y-16">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-[2px] bg-t-accent-2" />
                 <span className="text-[10px] font-black uppercase tracking-[1em] text-t-accent-2">Interactive Simulation</span>
               </div>
               <h2 className="text-6xl lg:text-9xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.75]">Logic <br /> Design.</h2>
               <p className="text-t-fg-m font-medium max-w-lg text-2xl leading-relaxed text-balance">Demonstrating real-time decision-making logic through a classic strategic simulation environment.</p>
               <div className="pt-10 flex items-center gap-6 opacity-40">
                 <div className="h-px flex-1 bg-t-border" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-t-fg">Decision Making Module</span>
               </div>
             </ScrollReveal>
             <ScrollReveal className="flex justify-center w-full relative group/island" delay={200}>
               <div className="absolute inset-[-40px] bg-t-accent-2/5 blur-[100px] rounded-full scale-0 group-hover/island:scale-100 transition-transform duration-1000 opacity-0 group-hover/island:opacity-100" />
               <div className="relative p-6 rounded-[64px] bg-white/20 dark:bg-white/5 border border-white/40 shadow-2xl backdrop-blur-3xl">
                 <div className="mb-8 px-4 text-center">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-accent-2 mb-2">Playlab · Tic Tac Toe</h4>
                   <p className="text-[9px] font-bold text-t-fg-m uppercase tracking-widest leading-relaxed">
                     Tiny UI and game‑logic demo built with TypeScript state management,<br /> difficulty levels, and subtle animations.
                   </p>
                 </div>
                 <TicTacToe />
               </div>
             </ScrollReveal>
           </div>
        </section>
        <section id="travel-section" className="mb-[40rem] scroll-mt-32 overflow-hidden rounded-[120px] bg-t-bg-el/40 border border-t-border print:hidden">
          <ScrollReveal className="flex flex-col items-center py-64 text-center space-y-12 bg-t-accent-s/5 border-b border-t-border">
             <div className="px-16 py-6 rounded-full bg-t-accent-2 text-t-bg font-black uppercase tracking-[2em] text-[9px] shadow-lg">Personal Adventures</div>
             <div className="space-y-10 px-6">
               <h2 className="text-8xl lg:text-[12rem] font-black text-t-fg uppercase tracking-tighter leading-none text-center">Life in <br /> Perspective.</h2>
               <p className="max-w-3xl mx-auto px-6 text-[7px] lg:text-[9px] font-black text-t-fg-m uppercase tracking-[0.3em] leading-relaxed opacity-60">
                 Long-form travel stories and AI-generated visuals that inspired my Wanderlust Trails platform — 
                 built from a genuine love for traveling and storytelling.
               </p>
             </div>
          </ScrollReveal>
          <div className="relative">
             <div className="space-y-0">
               {BLOG_POSTS.map((post, i) => {
                 let accent: SwissAccent = 'indigo';
                 if (post.id === 'rishikesh-story') accent = 'purple';
                 else if (post.id === 'coorg-story') accent = 'emerald';
                 else accent = VIBRANT_ACCENTS[(i + 3) % VIBRANT_ACCENTS.length];
                 return <TravelStoryItem key={post.id} post={post} index={i} accent={accent} />;
               })}
             </div>
          </div>
        </section>
        <ContactSection />
      </main>
      
      {/* Redesigned Compact Footer with Secondary Contrasting BG */}
      <footer className="relative py-12 lg:py-16 overflow-hidden print:hidden bg-t-accent-2-s dark:bg-t-accent-2/10 transition-colors duration-500">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-t-accent via-t-accent-2 to-t-accent opacity-60" />
        <div className="max-w-[1440px] mx-auto px-10 lg:px-32 relative z-10">
          <div className="grid md:grid-cols-[1fr_auto] items-end gap-12 lg:gap-24">
            
            {/* Identity & Designed By Tag */}
            <div className="space-y-10">
              <div className="space-y-3">
                 <h4 
                   onClick={handleScrollToTop} 
                   className="text-4xl lg:text-6xl font-black text-t-fg uppercase tracking-tighter cursor-pointer transition-all hover:text-t-accent active:scale-95 origin-left leading-none"
                 >
                   Vamshi Krishna.
                 </h4>
                 <div className="flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-t-accent" />
                   <p className="text-[9px] font-black text-t-fg uppercase tracking-[0.6em]">Full‑stack Software Architect</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-6 group/tag">
                 <div className="px-5 py-2.5 rounded-full bg-t-fg text-t-bg text-[8px] font-black uppercase tracking-[0.4em] transition-all group-hover/tag:bg-t-accent group-hover/tag:text-t-bg">
                   Designed by Vamshi Krishna // 2025 TM
                 </div>
                 <p className="text-[7px] font-bold text-t-fg-m uppercase tracking-widest opacity-40 group-hover/tag:opacity-100 transition-opacity">
                   Verified Portfolio Ledger v2.5
                 </p>
              </div>
            </div>

            {/* Social Icons & Core Philosophy */}
            <div className="flex flex-col items-start md:items-end gap-10">
              <div className="flex flex-wrap gap-3">
                {[
                  { url: LINKEDIN_URL, label: 'LinkedIn', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> },
                  { url: `https://github.com/${GITHUB_USERNAME}`, label: 'GitHub', icon: <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/> },
                  { url: X_URL, label: 'X', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
                  { url: INSTAGRAM_URL, label: 'Instagram', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> },
                ].map((link, i) => (
                  <a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-11 h-11 rounded-full border border-t-border bg-t-bg/40 flex items-center justify-center text-t-fg transition-all duration-500 hover:bg-t-accent hover:text-t-bg hover:border-t-accent hover:scale-110 active:scale-95 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
                    title={link.label}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">{link.icon}</svg>
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-4">
                 <div className="h-px w-6 bg-t-fg opacity-20" />
                 <p className="text-[8px] font-black text-t-fg uppercase tracking-[0.6em] opacity-60">
                   Scalability // Clean Code // Integrity
                 </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
