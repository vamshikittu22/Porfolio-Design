import React, { useState, useEffect, useRef } from 'react';
import { GlassCard, BubbleTag, GlassButton } from './components/GlassUI';
import { PROJECTS, GITHUB_USERNAME, LINKEDIN_URL, BLOG_URL, X_HANDLE, FULL_NAME, RESUME_URL, BLOG_POSTS } from './constants';
import { ProjectCategory, Project } from './types';
import AIPlayground from './components/AIPlayground';
import GitHubStats from './components/GitHubStats';
import { GeminiService } from './services/geminiService';
import { TicTacToe } from './components/TicTacToe';

const ProjectItem: React.FC<{ 
  project: Project; 
  index: number; 
  isExpanded: boolean; 
  onToggle: () => void;
  accent: 'blue' | 'green' | 'red' | 'orange' | 'purple';
}> = ({ project, index, isExpanded, onToggle, accent }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px' 
      }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  const accentColors = {
    blue: 'blue-600',
    green: 'green-600',
    red: 'red-600',
    orange: 'orange-500',
    purple: 'purple-600'
  };

  return (
    <div 
      ref={itemRef}
      className={`w-full relative transition-all duration-1000 ${isExpanded ? 'z-[60]' : 'z-10'}`}
    >
      <GlassCard 
        accent={accent}
        className={`relative w-full overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? 'bg-white shadow-2xl border-purple-200' : 'bg-white/70 hover:border-purple-300 shadow-sm cursor-pointer'}`}
        onClick={onToggle}
      >
        <div className={`relative w-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? 'h-[80px] bg-purple-50/40' : 'h-[520px]'}`}>
          <div className={`
            absolute transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] z-20 overflow-hidden
            ${isExpanded 
              ? 'top-4 left-6 w-12 h-12 rounded-full shadow-sm' 
              : 'inset-0 w-full h-full'}
            ${!isVisible && !isExpanded ? 'grayscale blur-[2px] scale-105 opacity-80' : 'grayscale-0 blur-0 scale-100 opacity-100'}
          `}>
            <img 
              src={project.thumbnailUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-1000" 
            />
            <div className={`absolute inset-0 bg-${accentColors[accent]} mix-blend-color transition-opacity duration-1000 ${isVisible || isExpanded ? 'opacity-0' : 'opacity-40'}`} />
          </div>

          <div className={`
            absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] z-30
            ${isExpanded 
              ? 'top-6 right-10 text-right' 
              : 'bottom-16 left-16 text-left pointer-events-none'}
          `}>
            <h3 className={`font-black font-display text-slate-950 uppercase tracking-tighter transition-all duration-1000 leading-none ${isExpanded ? 'text-lg' : 'text-6xl lg:text-8xl drop-shadow-2xl text-white'}`}>
              {project.title}.
            </h3>
            {isExpanded && (
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] block mt-1">Project ID // {project.id}</span>
            )}
          </div>
        </div>

        <div className={`
          transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isExpanded ? 'max-h-[5000px] opacity-100 p-8 lg:p-14 bg-white' : 'max-h-0 opacity-0 overflow-hidden'}
        `}>
          <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-start ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
             <div className="lg:w-[35%] w-full flex-shrink-0">
                <div className="relative overflow-hidden rounded-[32px] bg-white border-4 border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group/img">
                  <img 
                    src={project.secondaryImageUrl} 
                    alt={project.title}
                    className="w-full aspect-[4/5] lg:aspect-[3.5/4] object-cover transition-transform duration-1000 group-hover/img:scale-110" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${accentColors[accent]}/20 to-transparent pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity`} />
                </div>
             </div>
             
             <div className="flex-1 min-w-0 space-y-10">
                <div className="space-y-4">
                   <div className="flex items-center gap-6">
                      <div className={`h-[2px] w-12 bg-${accentColors[accent]}`} />
                      <p className={`text-[10px] font-black uppercase tracking-[0.6em] text-${accentColors[accent]}`}>Project Overview</p>
                   </div>
                   <h4 className="text-4xl lg:text-5xl font-black text-slate-950 leading-[0.95] uppercase tracking-tighter">{project.tagline}</h4>
                   <p className="text-slate-600 leading-relaxed text-lg lg:text-xl font-medium max-w-2xl">{project.overview}</p>
                </div>

                <div className="space-y-3">
                   <h5 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Tech Stack</h5>
                   <div className="flex gap-2.5 flex-wrap">
                      {project.tech.map(t => <BubbleTag key={t} accent={accent as any}>{t}</BubbleTag>)}
                   </div>
                </div>

                <div className="space-y-6 pt-8 border-t-2 border-slate-50">
                   <h5 className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400">Key Features</h5>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {project.useCases.map((use, idx) => (
                        <li key={idx} className="flex gap-3 items-start group/li">
                          <span className={`text-${accentColors[accent]} font-black text-lg pt-0.5 opacity-30 group-hover/li:opacity-100 transition-all duration-300`}>0{idx + 1}</span>
                          <span className="text-slate-700 font-bold uppercase tracking-tight leading-snug text-sm group-hover/li:text-slate-950 transition-colors">{use}</span>
                        </li>
                      ))}
                   </ul>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-5">
                   <GlassButton accent={accent as any} className="flex-1 py-3" onClick={(e: React.MouseEvent) => { e.stopPropagation(); window.open(project.repoUrl, '_blank'); }}>View Code</GlassButton>
                   {project.liveUrl && (
                     <GlassButton primary accent={accent as any} className="flex-1 py-3" onClick={(e: React.MouseEvent) => { e.stopPropagation(); window.open(project.liveUrl, '_blank'); }}>Live Demo</GlassButton>
                   )}
                </div>
             </div>
          </div>
          <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center">
             <button 
               onClick={(e) => { e.stopPropagation(); onToggle(); }} 
               className="text-[9px] font-black uppercase text-slate-400 hover:text-slate-950 transition-all tracking-[0.5em] flex items-center gap-6 group"
             >
               <span className="w-12 h-[2px] bg-slate-200 group-hover:w-20 group-hover:bg-slate-950 transition-all" />
               Close Project
             </button>
             <span className="text-[8px] font-black text-slate-300 uppercase tracking-[1.5em]">© 2025 Vamshi Krishna Pullaiahgari</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [contactRevealed, setContactRevealed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const generateHero = async () => {
      try {
        const gemini = GeminiService.getInstance();
        const prompt = "A ultra-premium Swiss minimalist design studio with deep violet and lavender tints, high-end glass architectural elements, soft purple neon glow.";
        const img = await gemini.generateImage(prompt);
        setHeroImage(img);
      } catch (err) {
        console.error("Failed to generate hero image", err);
      } finally {
        setHeroLoading(false);
      }
    };
    generateHero();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  const toggleProject = (id: string) => {
    setExpandedProjectId(prev => prev === id ? null : id);
  };

  const projectColorMap: Record<string, 'blue' | 'green' | 'red' | 'orange'> = {
    'future-job-fit': 'blue',
    'wanderlust-trails': 'green',
    'movie-booking': 'red',
    'ticket-sales': 'orange',
  };

  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { label: 'Work', id: 'portfolio-section' },
    { label: 'Games', id: 'logic-section' },
    { label: 'AI Lab', id: 'ai-section' },
    { label: 'Blog', id: 'logs-section' },
    { label: 'Contact', id: 'handshake-section' }
  ];

  return (
    <div className="min-h-screen relative selection:bg-purple-600 selection:text-white overflow-x-hidden bg-[#f0e7ff]">
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-50">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-300 blur-[300px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-indigo-200 blur-[300px] rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <nav id="header-nav" className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-1000 ${scrolled ? 'scale-95 opacity-100' : 'scale-100 opacity-100'}`}>
        <div className="bg-purple-200/95 backdrop-blur-3xl border border-purple-400/30 px-8 py-3.5 rounded-full flex items-center gap-10 shadow-2xl">
          <button onClick={scrollToTop} className="text-[11px] font-extrabold tracking-[0.4em] text-purple-950 uppercase whitespace-nowrap hover:text-purple-600 transition-colors">Vamshi P.</button>
          <div className="h-4 w-[1px] bg-purple-300" />
          <div className="hidden lg:flex gap-8 items-center">
            {navItems.map(nav => (
              <button 
                key={nav.id} 
                onClick={(e) => scrollToSection(e, nav.id)}
                className="text-[9px] font-bold uppercase tracking-[0.4em] text-purple-700 hover:text-purple-950 transition-colors whitespace-nowrap focus:outline-none"
              >
                {nav.label}
              </button>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-purple-300 hidden lg:block" />
          <button 
            onClick={() => window.open(RESUME_URL, '_blank')}
            className="text-[9px] font-extrabold uppercase tracking-[0.4em] text-white bg-purple-700 px-6 py-2.5 rounded-full hover:bg-purple-800 transition-all shadow-xl shadow-purple-200 whitespace-nowrap"
          >
            CV
          </button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-28 pt-56 pb-32">
        <section id="hero-section" className="grid lg:grid-cols-2 gap-32 items-center mb-80 min-h-[70vh] relative z-10 scroll-mt-32">
          <div className="space-y-14 animate-in fade-in slide-in-from-left duration-1000">
            <div className="space-y-10">
              <div className="flex items-center gap-8">
                 <div className="h-[2px] w-24 bg-purple-600" />
                 <span className="text-[11px] font-bold uppercase tracking-[0.9em] text-purple-500">Software Engineer</span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black font-display text-slate-950 tracking-tighter leading-[0.8] uppercase">
                {FULL_NAME.split(' ').slice(0, 2).join(' ')} <br />
                <span className="text-purple-700">{FULL_NAME.split(' ').slice(2).join(' ')}.</span>
              </h1>
              <p className="text-2xl text-slate-700 max-w-lg pt-10 leading-relaxed font-medium">
                Building performant, aesthetic, and functional digital experiences.
                <span className="text-purple-600 block mt-10 font-bold tracking-[0.6em] text-[11px] uppercase">Available for new opportunities // 2025</span>
              </p>
            </div>
            
            <div className="flex gap-8 items-center">
              <GlassButton primary accent="purple" onClick={(e: any) => scrollToSection(e, 'portfolio-section')}>
                Explore My Projects
              </GlassButton>
              <GlassButton accent="orange" onClick={() => window.open(RESUME_URL, '_blank')}>
                Download CV
              </GlassButton>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right duration-1000 z-0">
            <div className="relative w-full max-w-[600px] ml-auto">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-[64px] shadow-3xl bg-white border border-purple-200">
                  {heroLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-purple-200 border-t-purple-600 animate-spin rounded-full" />
                    </div>
                  ) : (
                    <img 
                      src={heroImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
                      alt="Hero" 
                      className="w-full h-full object-cover" 
                    />
                  )}
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio-section" className="mb-80 scroll-mt-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-48 gap-20">
            <div className="space-y-8">
              <h2 className="text-6xl lg:text-7xl font-bold font-display text-slate-950 uppercase tracking-tighter">My Work.</h2>
              <p className="text-purple-400 font-bold text-[11px] tracking-[0.6em] uppercase border-l-[6px] border-orange-500 pl-8">V3.0 // SELECTED PROJECTS</p>
            </div>
            <div className="flex gap-12 flex-wrap">
              {['All', ...Object.values(ProjectCategory)].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`text-[11px] font-extrabold uppercase tracking-widest pb-4 transition-all border-b-2 ${activeCategory === cat ? 'border-purple-600 text-purple-700' : 'border-transparent text-purple-400 hover:text-purple-950'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-24">
            {filteredProjects.map((project, i) => (
              <ProjectItem 
                key={project.id}
                project={project}
                index={i}
                isExpanded={expandedProjectId === project.id}
                onToggle={() => toggleProject(project.id)}
                accent={projectColorMap[project.id] || 'purple'}
              />
            ))}
          </div>
        </section>

        <section id="logic-section" className="mb-80 scroll-mt-32 border-4 border-purple-200 rounded-[48px] p-12 lg:p-24 bg-white/30 backdrop-blur-sm shadow-xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-14">
              <div className="inline-block px-6 py-2.5 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-purple-200">Interactive Lab</div>
              <h2 className="text-5xl lg:text-6xl font-bold font-display text-slate-950 uppercase tracking-tighter leading-tight">Can you beat <br /> our AI?</h2>
              <p className="text-slate-700 font-medium max-w-lg leading-relaxed text-xl">
                Test your skills in this classic Tic-Tac-Toe game. Use the AI Hint system to discover the optimal strategy for every move.
              </p>
              <div className="pt-12">
                <GlassButton accent="purple" primary onClick={() => window.open('https://github.com/vamshikittu22', '_blank')}>View GitHub Profile</GlassButton>
              </div>
            </div>
            <div className="flex justify-center w-full overflow-visible">
              <TicTacToe />
            </div>
          </div>
        </section>

        <section id="ai-section" className="mb-80 scroll-mt-32">
          <div className="max-w-3xl mx-auto text-center mb-28 space-y-8">
             <h2 className="text-6xl font-bold font-display text-slate-950 uppercase tracking-tighter">AI Playground.</h2>
             <p className="text-purple-600/70 font-medium text-2xl leading-relaxed">
               Experiments in visual synthesis using the latest Gemini and Veo models from Google.
             </p>
          </div>
          <AIPlayground />
        </section>

        <section className="mb-80">
          <GitHubStats />
        </section>

        <section id="logs-section" className="mb-80 scroll-mt-32">
          <div className="flex justify-between items-end mb-24 border-b border-purple-200 pb-12">
            <div className="space-y-4">
              <h2 className="text-6xl font-bold font-display text-slate-950 uppercase tracking-tighter">Recent Blog.</h2>
              <p className="text-purple-400 font-bold uppercase tracking-[0.4em] text-[11px]">Thoughts on tech, design, and building things.</p>
            </div>
            <button 
              onClick={() => window.open(BLOG_URL, '_blank')}
              className="text-[11px] font-extrabold uppercase tracking-widest text-purple-700 hover:text-purple-900 transition-colors pb-2 border-b-2 border-purple-700"
            >
              Access Blog Archive
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="space-y-8 bg-purple-50/50 p-8 rounded-[40px] border border-purple-100 hover:bg-white hover:shadow-2xl transition-all duration-700">
                  <div className="flex items-center justify-between border-b border-purple-100 pb-6">
                    <span className="text-[9px] font-bold text-white bg-purple-600 px-4 py-1.5 uppercase tracking-widest rounded-full">{post.tag}</span>
                    <span className="text-[9px] font-bold text-purple-300 uppercase tracking-widest">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-black font-display text-slate-950 uppercase tracking-tight leading-snug group-hover:translate-x-2 transition-transform duration-700">{post.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium line-clamp-2">{post.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="handshake-section" className="mb-64 scroll-mt-32">
          <div className="flex flex-col items-center justify-center space-y-28">
             {!contactRevealed ? (
               <div 
                 onClick={() => setContactRevealed(true)}
                 className="w-72 h-72 rounded-full bg-white border border-purple-200 shadow-2xl flex flex-col items-center justify-center cursor-pointer group transition-all duration-1000 hover:scale-110 relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-orange-500/10 animate-pulse" />
                 <span className="text-[12px] font-bold text-slate-950 uppercase tracking-[1em] mb-4 z-10">Get In Touch</span>
                 <p className="text-purple-600 text-[10px] font-bold uppercase tracking-widest animate-bounce z-10">Say Hello</p>
                 <div className="absolute inset-10 rounded-full border border-purple-200 pointer-events-none group-hover:border-purple-400 transition-all duration-700" />
               </div>
             ) : (
               <GlassCard className="p-24 max-w-3xl w-full text-center space-y-14 animate-in zoom-in-95 duration-1000 bg-white" accent="purple">
                  <div className="space-y-10">
                     <h2 className="text-6xl font-black font-display text-slate-950 uppercase tracking-tighter leading-[0.85]">Let's Work <br /> Together.</h2>
                     <p className="text-purple-400 font-bold text-sm uppercase tracking-[0.6em]">Currently accepting new projects</p>
                  </div>
                  <div className="flex flex-col gap-10">
                     <a href="mailto:hello@vamshi.dev" className="text-4xl lg:text-5xl font-black text-slate-950 underline decoration-purple-600 decoration-[8px] underline-offset-[16px] hover:text-purple-600 transition-all uppercase tracking-tight">hello@vamshi.dev</a>
                     <div className="flex justify-center gap-16 pt-12">
                        <a href={LINKEDIN_URL} target="_blank" className="text-[12px] font-bold text-purple-400 hover:text-purple-700 transition-all uppercase tracking-tight">LINKEDIN</a>
                        <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="text-[12px] font-bold text-purple-400 hover:text-purple-700 transition-all uppercase tracking-tight">GITHUB</a>
                     </div>
                  </div>
               </GlassCard>
             )}
          </div>
        </section>
      </main>

      <footer className="py-24 relative bg-purple-950/95 backdrop-blur-3xl overflow-hidden border-t border-purple-800">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-500/10 to-transparent" />
        
        <div className="max-w-[1440px] mx-auto px-12 relative z-10 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center md:items-start gap-10">
             <button onClick={scrollToTop} className="group text-left focus:outline-none">
                <h4 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-purple-400 transition-all">{FULL_NAME}</h4>
                <p className="text-[11px] font-bold text-purple-400 uppercase tracking-[0.8em] mt-2 leading-none">Software Engineer // 2025</p>
             </button>
             <div className="flex gap-10 items-center">
                <a href={LINKEDIN_URL} target="_blank" className="text-purple-200 hover:text-white transition-all transform hover:scale-125">
                   <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="text-purple-200 hover:text-white transition-all transform hover:scale-125">
                   <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.7 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href={`https://x.com/${X_HANDLE}`} target="_blank" className="text-purple-200 hover:text-white transition-all transform hover:scale-125">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
             </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-10">
             <button onClick={() => window.open(RESUME_URL, '_blank')} className="text-[13px] font-black text-white uppercase tracking-[0.4em] bg-purple-700 hover:bg-purple-600 px-10 py-4 rounded-2xl border border-purple-500/50 shadow-2xl transition-all">Download Resume</button>
             <div className="text-center md:text-right space-y-3">
                <p className="text-[11px] font-extrabold text-purple-300 uppercase tracking-[1.5em]">Built with Passion & Swiss Precision</p>
                <p className="text-[9px] font-bold text-purple-600 uppercase tracking-[0.8em]">Secure Node 22U // 2025</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;