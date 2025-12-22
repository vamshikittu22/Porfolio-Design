
import React, { useState, useEffect, useRef } from 'react';
import { GlassCard, BubbleTag, GlassButton } from './components/GlassUI';
import { PROJECTS, GITHUB_USERNAME, LINKEDIN_URL, BLOG_URL, X_URL, FULL_NAME, RESUME_URL, BLOG_POSTS, INSTAGRAM_URL } from './constants';
import { ProjectCategory, Project, BlogPost } from './types';
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
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
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
        dark
        className={`relative w-full overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? 'shadow-2xl border-purple-500/20' : 'hover:border-purple-400/40 shadow-sm cursor-pointer'}`}
        onClick={onToggle}
      >
        <div className={`relative w-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? 'h-[80px] bg-purple-900/10' : 'h-[520px]'}`}>
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
            <h3 className={`font-black font-display uppercase tracking-tighter transition-all duration-1000 leading-none ${isExpanded ? 'text-lg text-white' : 'text-6xl lg:text-8xl drop-shadow-2xl text-white'}`}>
              {project.title}.
            </h3>
            {isExpanded && (
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] block mt-1">Project ID // {project.id}</span>
            )}
          </div>
        </div>

        <div className={`
          transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isExpanded ? 'max-h-[5000px] opacity-100 p-8 lg:p-14' : 'max-h-0 opacity-0 overflow-hidden'}
        `}>
          <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-start ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
             <div className="lg:w-[35%] w-full flex-shrink-0">
                <div className="relative overflow-hidden rounded-[32px] bg-slate-700/50 border-4 border-slate-600/30 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] group/img">
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
                   <h4 className="text-4xl lg:text-5xl font-black text-white leading-[0.95] uppercase tracking-tighter">{project.tagline}</h4>
                   <p className="text-slate-300 leading-relaxed text-lg lg:text-xl font-medium max-w-2xl">{project.overview}</p>
                </div>

                <div className="space-y-3">
                   <h5 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Tech Stack</h5>
                   <div className="flex gap-2.5 flex-wrap">
                      {project.tech.map(t => <BubbleTag key={t} accent={accent as any}>{t}</BubbleTag>)}
                   </div>
                </div>

                <div className="space-y-6 pt-8 border-t-2 border-slate-700/30">
                   <h5 className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400">Key Features</h5>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {project.useCases.map((use, idx) => (
                        <li key={idx} className="flex gap-3 items-start group/li">
                          <span className={`text-${accentColors[accent]} font-black text-lg pt-0.5 opacity-30 group-hover/li:opacity-100 transition-all duration-300`}>0{idx + 1}</span>
                          <span className="text-slate-200 font-bold uppercase tracking-tight leading-snug text-sm group-hover/li:text-white transition-colors">{use}</span>
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
          <div className="mt-12 pt-6 border-t border-slate-700/30 flex justify-between items-center">
             <button 
               onClick={(e) => { e.stopPropagation(); onToggle(); }} 
               className="text-[9px] font-black uppercase text-slate-400 hover:text-white transition-all tracking-[0.5em] flex items-center gap-6 group"
             >
               <span className="w-12 h-[2px] bg-slate-600 group-hover:w-20 group-hover:bg-white transition-all" />
               Close Project
             </button>
             <span className="text-[8px] font-black text-slate-500 uppercase tracking-[1.5em]">© 2025 Vamshi Krishna Pullaiahgari</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const SketchCanvas: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [sketch, setSketch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateSketch = async () => {
    setLoading(true);
    try {
      const gemini = GeminiService.getInstance();
      let locationPrompt = "";
      if (post.id === 'rishikesh-story') {
        locationPrompt = `A panoramic hand-drawn mural of Rishikesh at dusk. Style: minimalist fine-line charcoal on white paper.`;
      } else if (post.id === 'coorg-story') {
        locationPrompt = `A panoramic hand-drawn mural of Coorg. Style: minimalist fine-line charcoal on white paper.`;
      }
      const finalPrompt = `Professional architectural mural sketch (16:9). ${locationPrompt} Style: elegant minimalist charcoal and pencil fine lines on a pure white background. Raw artistic strokes. Wide-angle vista.`;
      const result = await gemini.generateImage(finalPrompt, undefined, "16:9");
      setSketch(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full relative group/sketch flex items-center justify-center overflow-hidden bg-white/40 border border-slate-100 rounded-[64px] min-h-[500px] shadow-inner transition-all hover:bg-white/60">
      <div className="absolute inset-0 transition-all duration-1000 opacity-90">
        {sketch ? (
          <img src={sketch} alt="Memory Mural" className="w-full h-full object-cover mix-blend-multiply animate-in fade-in duration-1000" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-white/20 backdrop-blur-sm">
            <button 
              onClick={generateSketch} 
              disabled={loading} 
              className="px-10 py-5 rounded-full bg-white border border-slate-200 shadow-2xl text-[12px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-purple-600 transition-all hover:scale-105 active:scale-95"
            >
              {loading ? '✎ Creating Mural...' : '✎ Sketch Memory Panorama'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const TravelStoryItem: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative w-full py-48 min-h-[900px] flex items-center">
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center h-full z-40">
        <div className={`
          flex items-center justify-center w-28 h-28 rounded-full bg-slate-700/80 border-[6px] font-black text-sm transition-all duration-1000 shadow-2xl border-purple-600 text-purple-400
        `}>
          {post.date}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-24 lg:gap-48 w-full px-4">
        <div className={`flex justify-end transition-all duration-1000`}>
          {isEven ? (
            <GlassCard 
              dark
              className="w-full max-w-md p-10 shadow-3xl border-slate-600/20 hover:border-purple-600/40 transition-all duration-700 group ring-8 ring-white/5"
            >
               <div className="flex justify-between items-start mb-10 text-left">
                  <div className="space-y-3">
                     <p className="text-[11px] font-black uppercase tracking-[0.6em] text-purple-400">Visual Heritage</p>
                     <p className="text-[18px] text-white font-black tracking-tighter leading-none uppercase">{post.title}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple-600 shadow-[0_0_30px_rgba(124,58,237,0.8)]" />
               </div>
               <div className="aspect-[4/3] rounded-[48px] overflow-hidden bg-slate-700/30 mb-10 border-[10px] border-slate-600/20 shadow-2xl relative">
                  <img src={post.imageUrl} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" alt={post.title} />
               </div>
               <p className="text-slate-300 font-medium italic text-sm leading-relaxed text-left">"{post.summary}"</p>
            </GlassCard>
          ) : (
            <div className="w-full max-w-4xl"><SketchCanvas post={post} /></div>
          )}
        </div>

        <div className="hidden md:flex flex-col items-center h-full relative z-10">
          <div className={`h-[4px] transition-all duration-1000 shadow-2xl rounded-full w-48 lg:w-64 bg-purple-600 absolute ${isEven ? 'right-[50%] -translate-x-16' : 'left-[50%] translate-x-16'}`} />
        </div>

        <div className={`flex justify-start transition-all duration-1000`}>
          {!isEven ? (
            <GlassCard 
              dark
              className="w-full max-w-md p-10 shadow-3xl border-slate-600/20 hover:border-purple-600/40 transition-all duration-700 group ring-8 ring-white/5"
            >
               <div className="flex justify-between items-start mb-10 text-left">
                  <div className="space-y-3">
                     <p className="text-[11px] font-black uppercase tracking-[0.6em] text-purple-400">Visual Heritage</p>
                     <p className="text-[18px] text-white font-black tracking-tighter leading-none uppercase">{post.title}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple-600 shadow-[0_0_30px_rgba(124,58,237,0.8)]" />
               </div>
               <div className="aspect-[4/3] rounded-[48px] overflow-hidden bg-slate-700/30 mb-10 border-[10px] border-slate-600/20 shadow-2xl relative">
                  <img src={post.imageUrl} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" alt={post.title} />
               </div>
               <p className="text-slate-300 font-medium italic text-sm leading-relaxed text-left">"{post.summary}"</p>
            </GlassCard>
          ) : (
            <div className="w-full max-w-4xl"><SketchCanvas post={post} /></div>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
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
        const prompt = "A ultra-premium Swiss minimalist design studio with deep violet tints, high-end glass architectural elements, cinematic lighting.";
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

  const toggleProject = (id: string) => setExpandedProjectId(prev => prev === id ? null : id);

  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen relative selection:bg-purple-600 selection:text-white overflow-x-hidden bg-[#f3edff]">
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-400 blur-[400px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-indigo-300 blur-[400px] rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700`}>
        <div className="bg-white/90 backdrop-blur-3xl border border-slate-200 px-8 py-3.5 rounded-full flex items-center gap-10 shadow-2xl">
          <button onClick={scrollToTop} className="text-[11px] font-extrabold tracking-[0.4em] text-slate-950 uppercase whitespace-nowrap hover:text-purple-600 transition-colors">Vamshi P.</button>
          <div className="hidden lg:flex gap-8 items-center">
            {['Work', 'Games', 'AI Lab', 'Travel Stories', 'Contact'].map(label => (
              <button 
                key={label} 
                onClick={(e) => scrollToSection(e, label.toLowerCase().replace(' ', '-') + '-section')} 
                className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-500 hover:text-slate-950 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
          <button onClick={() => window.open(RESUME_URL, '_blank')} className="text-[9px] font-extrabold uppercase tracking-[0.4em] text-white bg-slate-950 px-6 py-2.5 rounded-full hover:bg-purple-700 transition-all shadow-xl shadow-purple-200">CV</button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-28 pt-56 pb-32">
        <section id="hero-section" className="grid lg:grid-cols-2 gap-32 items-center mb-80 min-h-[70vh]">
          <div className="space-y-14 animate-in fade-in slide-in-from-left duration-1000">
            <h1 className="text-6xl lg:text-8xl font-black font-display text-slate-950 tracking-tighter leading-[0.8] uppercase">
              {FULL_NAME.split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-purple-700">{FULL_NAME.split(' ').slice(2).join(' ')}.</span>
            </h1>
            <p className="text-2xl text-slate-700 max-w-lg leading-relaxed font-medium">Building performant, aesthetic, and functional digital experiences.</p>
            <div className="flex gap-8 items-center">
              <GlassButton primary accent="purple" onClick={(e: any) => scrollToSection(e, 'work-section')}>Explore My Projects</GlassButton>
              <GlassButton primary accent="orange" onClick={() => window.open(RESUME_URL, '_blank')}>Download CV</GlassButton>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[64px] shadow-3xl bg-white border border-purple-200 transition-transform hover:scale-[1.02] duration-700 animate-in fade-in slide-in-from-right duration-1000">
              {heroLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent animate-spin rounded-full" />
                </div>
              ) : (
                <img src={heroImage || ""} alt="Hero" className="w-full h-full object-cover" />
              )}
          </div>
        </section>

        <section id="work-section" className="mb-80 scroll-mt-32">
          <h2 className="text-6xl lg:text-7xl font-bold font-display text-slate-950 uppercase tracking-tighter mb-24">My Work.</h2>
          <div className="flex flex-col gap-24">
            {PROJECTS.map((project, i) => (
              <ProjectItem 
                key={project.id}
                project={project}
                index={i}
                isExpanded={expandedProjectId === project.id}
                onToggle={() => toggleProject(project.id)}
                accent={'purple'}
              />
            ))}
          </div>
        </section>

        <section id="games-section" className="mb-80 border-4 border-purple-200 rounded-[48px] p-12 lg:p-24 bg-white/30 backdrop-blur-sm shadow-xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-14">
              <h2 className="text-5xl lg:text-6xl font-bold font-display text-slate-950 uppercase tracking-tighter leading-tight">Can you beat <br /> our AI?</h2>
              <p className="text-slate-700 font-medium max-w-lg text-xl">Test your skills in this classic Tic-Tac-Toe challenge with real-time AI hinting logic.</p>
            </div>
            <div className="flex justify-center w-full"><TicTacToe /></div>
          </div>
        </section>

        <section id="ai-lab-section" className="mb-80 scroll-mt-32">
          <h2 className="text-6xl font-bold font-display text-slate-950 uppercase tracking-tighter text-center mb-28">AI Playground.</h2>
          <AIPlayground />
        </section>

        <section className="mb-80">
          <GitHubStats />
        </section>

        <section id="travel-stories-section" className="mb-80 scroll-mt-32 relative">
          <div className="flex flex-col items-center mb-56 text-center space-y-12">
             <div className="p-6 px-16 rounded-[40px] bg-purple-700 text-white font-black uppercase tracking-[1.2em] text-[16px] shadow-2xl">Heritage Diary</div>
             <div className="w-[8px] h-48 bg-gradient-to-b from-purple-600 to-transparent rounded-full shadow-lg" />
          </div>
          <div className="relative max-w-[1400px] mx-auto">
             <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[12px] bg-slate-200 z-0 rounded-full shadow-inner" />
             <div className="space-y-0 relative z-10">
               {BLOG_POSTS.map((post, i) => <TravelStoryItem key={post.id} post={post} index={i} />)}
             </div>
          </div>
        </section>

        <section id="contact-section" className="mb-64 scroll-mt-32">
          <div className="flex flex-col items-center justify-center space-y-28">
             {!contactRevealed ? (
               <div onClick={() => setContactRevealed(true)} className="w-80 h-80 rounded-full bg-white border-2 border-purple-200 shadow-3xl flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform group relative overflow-hidden">
                 <div className="absolute inset-0 bg-purple-50/50 scale-0 group-hover:scale-100 transition-transform duration-1000 rounded-full" />
                 <span className="text-[14px] font-black text-slate-950 uppercase tracking-[1em] group-hover:text-purple-600 transition-colors z-10">Get In Touch</span>
               </div>
             ) : (
               <GlassCard className="p-24 max-w-4xl w-full text-center space-y-16 animate-in zoom-in-95 bg-white border-purple-100 shadow-[0_64px_128px_-32px_rgba(124,58,237,0.15)]">
                  <h2 className="text-7xl font-black text-slate-950 uppercase tracking-tighter leading-[0.8]">Let's Work <br /> <span className="text-purple-700">Together.</span></h2>
                  <div className="flex flex-col gap-12">
                    <a href="mailto:hello@vamshi.dev" className="text-5xl lg:text-6xl font-black text-slate-950 underline decoration-purple-600 decoration-[12px] underline-offset-[24px] uppercase hover:text-purple-600 transition-all">hello@vamshi.dev</a>
                    <div className="flex gap-8 justify-center pt-8">
                       <GlassButton accent="purple" onClick={() => window.open(LINKEDIN_URL, '_blank')}>LinkedIn</GlassButton>
                       <GlassButton accent="orange" onClick={() => window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank')}>GitHub</GlassButton>
                    </div>
                  </div>
               </GlassCard>
             )}
          </div>
        </section>
      </main>

      <footer className="py-40 relative bg-[#050110] overflow-hidden border-t border-slate-900">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] footer-glow-purple -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] footer-glow-orange translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-16 relative z-10 flex flex-col md:flex-row justify-between items-center gap-20">
          <div className="flex flex-col items-center md:items-start gap-10">
             <button onClick={scrollToTop} className="group text-left">
                <h4 className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-purple-400 transition-all">{FULL_NAME}</h4>
                <p className="text-[12px] font-bold text-slate-500 uppercase tracking-[1em] mt-3 leading-none">Software Engineer // 2025</p>
             </button>
             <div className="flex gap-12 items-center">
                <a href={LINKEDIN_URL} target="_blank" className="text-slate-400 hover:text-white transition-all transform hover:scale-125">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="text-slate-400 hover:text-white transition-all transform hover:scale-125">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.7 8.207 11.387.599.111.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
             </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-12">
             <GlassButton primary accent="purple" onClick={() => window.open(RESUME_URL, '_blank')} className="py-4 px-12 text-[12px] shadow-2xl shadow-purple-500/20">Download CV</GlassButton>
             <div className="text-center md:text-right space-y-4">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[2em]">Architected in 2025</p>
                <p className="text-[9px] font-bold text-slate-800 uppercase tracking-[1em]">Vamshi Krishna Pullaiahgari</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
