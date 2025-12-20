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

const SketchCanvas: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [sketch, setSketch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateSketch = async () => {
    setLoading(true);
    try {
      const gemini = GeminiService.getInstance();
      let locationPrompt = "";
      if (post.id === 'rishikesh-story') {
        locationPrompt = `A panoramic hand-drawn mural of Rishikesh at dusk. Features the Ganga Aarti on the river banks, Himalayan peaks, and the Ram Jhula bridge. Style: minimalist fine-line charcoal on white paper.`;
      } else if (post.id === 'coorg-story') {
        locationPrompt = `A panoramic hand-drawn mural of Coorg. Features elephants at Dubare Camp, coffee plantations, and Tibetan monastery architecture. Style: minimalist fine-line charcoal on white paper.`;
      } else {
        locationPrompt = `The panoramic architectural essence of ${post.title}.`;
      }
      const finalPrompt = `Professional architectural hand-drawn mural sketch (16:9). ${locationPrompt} Style: elegant minimalist charcoal and pencil fine lines on a pure white background. Raw artistic strokes. Wide-angle vista.`;
      const result = await gemini.generateImage(finalPrompt, undefined, "16:9");
      setSketch(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full relative group/sketch flex items-center justify-center overflow-hidden bg-white/40 border border-slate-100 rounded-[64px] min-h-[500px] shadow-inner">
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
      {sketch && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-white/80 backdrop-blur-2xl border border-white/80 p-6 px-10 rounded-full shadow-2xl text-center">
               <p className="text-[10px] font-black text-purple-600 uppercase tracking-[0.5em]">AI Memorial Synthesis</p>
            </div>
        </div>
      )}
    </div>
  );
};

const TravelStoryItem: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative w-full py-48 min-h-[900px] flex items-center">
      {/* Central Pole Year Node */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center h-full z-40 group/pole">
        <div className={`
          flex items-center justify-center w-28 h-28 rounded-full bg-white border-[6px] font-black text-sm transition-all duration-1000 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-purple-600 text-purple-600 scale-100
        `}>
          {post.date}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-24 lg:gap-48 w-full px-4">
        {/* Memory Pair - One Photo, One AI Sketch */}
        <div className={`flex justify-end transition-all duration-1000`}>
          {isEven ? (
            <GlassCard 
              className="w-full max-w-md p-10 shadow-3xl border-slate-100 hover:border-purple-400 transition-all duration-700 group bg-white ring-8 ring-white/10"
            >
               <div className="flex justify-between items-start mb-10">
                  <div className="space-y-3">
                     <p className="text-[11px] font-black uppercase tracking-[0.6em] text-purple-600">Visual Heritage</p>
                     <p className="text-[18px] text-slate-950 font-black tracking-tighter leading-none uppercase">{post.title}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple-600 shadow-[0_0_30px_rgba(124,58,237,0.8)]" />
               </div>
               <div className="aspect-[4/3] rounded-[48px] overflow-hidden bg-slate-100 mb-10 border-[10px] border-white shadow-2xl relative">
                  <img 
                    src={post.imageUrl} 
                    className="w-full h-full object-cover transition-all duration-1000 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105" 
                    alt={post.title}
                  />
               </div>
               <div className="space-y-6">
                 <p className="text-slate-600 font-medium italic text-sm leading-relaxed">"{post.summary}"</p>
                 <a href={post.url} target="_blank" className="text-[10px] font-black text-slate-400 hover:text-purple-600 uppercase tracking-widest flex items-center gap-2 transition-colors">
                   Read Travelogue <span>→</span>
                 </a>
               </div>
            </GlassCard>
          ) : (
            <div className="w-full max-w-4xl">
              <SketchCanvas post={post} />
            </div>
          )}
        </div>

        {/* Pole Connector */}
        <div className="hidden md:flex flex-col items-center h-full relative z-10">
          <div className={`h-[4px] transition-all duration-1000 shadow-2xl rounded-full w-48 lg:w-64 bg-purple-600 blur-[1px] absolute ${isEven ? 'right-[50%] -translate-x-16' : 'left-[50%] translate-x-16'}`} />
        </div>

        <div className={`flex justify-start transition-all duration-1000`}>
          {!isEven ? (
            <GlassCard 
              className="w-full max-w-md p-10 shadow-3xl border-slate-100 hover:border-purple-400 transition-all duration-700 group bg-white ring-8 ring-white/10"
            >
               <div className="flex justify-between items-start mb-10">
                  <div className="space-y-3">
                     <p className="text-[11px] font-black uppercase tracking-[0.6em] text-purple-600">Visual Heritage</p>
                     <p className="text-[18px] text-slate-950 font-black tracking-tighter leading-none uppercase">{post.title}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple-600 shadow-[0_0_30px_rgba(124,58,237,0.8)]" />
               </div>
               <div className="aspect-[4/3] rounded-[48px] overflow-hidden bg-slate-100 mb-10 border-[10px] border-white shadow-2xl relative">
                  <img 
                    src={post.imageUrl} 
                    className="w-full h-full object-cover transition-all duration-1000 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105" 
                    alt={post.title}
                  />
               </div>
               <div className="space-y-6">
                 <p className="text-slate-600 font-medium italic text-sm leading-relaxed">"{post.summary}"</p>
                 <a href={post.url} target="_blank" className="text-[10px] font-black text-slate-400 hover:text-purple-600 uppercase tracking-widest flex items-center gap-2 transition-colors">
                   Read Travelogue <span>→</span>
                 </a>
               </div>
            </GlassCard>
          ) : (
            <div className="w-full max-w-4xl">
              <SketchCanvas post={post} />
            </div>
          )}
        </div>
      </div>
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
    { label: 'Travel Stories', id: 'logs-section' },
    { label: 'Contact', id: 'handshake-section' }
  ];

  return (
    <div className="min-h-screen relative selection:bg-purple-600 selection:text-white overflow-x-hidden bg-[#f5f0ff]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-40">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-400 blur-[400px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-indigo-300 blur-[400px] rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <nav id="header-nav" className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-1000 ${scrolled ? 'scale-95 opacity-100' : 'scale-100 opacity-100'}`}>
        <div className="bg-white/90 backdrop-blur-3xl border border-slate-200 px-8 py-3.5 rounded-full flex items-center gap-10 shadow-2xl">
          <button onClick={scrollToTop} className="text-[11px] font-extrabold tracking-[0.4em] text-slate-950 uppercase whitespace-nowrap hover:text-purple-600 transition-colors">Vamshi P.</button>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="hidden lg:flex gap-8 items-center">
            {navItems.map(nav => (
              <button 
                key={nav.id} 
                onClick={(e) => scrollToSection(e, nav.id)}
                className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-500 hover:text-slate-950 transition-colors whitespace-nowrap focus:outline-none"
              >
                {nav.label}
              </button>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-slate-200 hidden lg:block" />
          <button 
            onClick={() => window.open(RESUME_URL, '_blank')}
            className="text-[9px] font-extrabold uppercase tracking-[0.4em] text-white bg-slate-950 px-6 py-2.5 rounded-full hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 whitespace-nowrap"
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
                  className={`text-[11px] font-extrabold uppercase tracking-widest pb-4 transition-all border-b-2 ${activeCategory === cat ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-400 hover:text-slate-950'}`}
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
                <GlassButton accent="purple" primary onClick={() => window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank')}>View GitHub Profile</GlassButton>
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

        {/* TRAVEL LOGS - RE-DESIGNED WITH PERMANENT PHOTO VISIBILITY */}
        <section id="logs-section" className="mb-80 scroll-mt-32 overflow-visible relative p-12 lg:p-24">
          <div className="absolute inset-0 -z-10 border-[16px] border-double border-purple-200 rounded-[120px] pointer-events-none opacity-40 shadow-[0_0_120px_rgba(124,58,237,0.1)]" />
          
          <div className="flex flex-col items-center mb-56 space-y-12 text-center">
             <div className="p-6 px-16 rounded-[40px] bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 text-white font-black uppercase tracking-[1.2em] text-[16px] shadow-[0_32px_64px_rgba(124,58,237,0.4)] border-b-8 border-purple-900">
                Heritage Diary
             </div>
             <p className="text-slate-400 font-bold uppercase tracking-[1em] text-xs">A Visual Timeline of Memories</p>
             <div className="w-[8px] h-48 bg-gradient-to-b from-purple-600 via-indigo-600 to-transparent rounded-full" />
          </div>

          <div className="relative max-w-[1400px] mx-auto">
             {/* Central Spine */}
             <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[12px] bg-slate-200 z-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-indigo-600 to-purple-600 animate-pulse opacity-50 blur-[4px]" />
             </div>
             
             <div className="space-y-0 relative z-10">
               {BLOG_POSTS.map((post, i) => (
                 <TravelStoryItem key={post.id} post={post} index={i} />
               ))}
             </div>
          </div>

          <div className="mt-64 flex justify-center">
             <div className="p-14 border-[12px] border-double border-purple-400 rounded-[80px] bg-white shadow-4xl rotate-[-3deg] relative overflow-hidden ring-1 ring-purple-100">
                <span className="text-[14px] font-black text-purple-600 uppercase tracking-[1em] block mb-5 relative z-10">Historical Record</span>
                <p className="text-4xl font-black text-slate-950 uppercase tracking-tighter relative z-10">This is my visualisation</p>
             </div>
          </div>
        </section>

        <section id="handshake-section" className="mb-64 scroll-mt-32">
          <div className="flex flex-col items-center justify-center space-y-28">
             {!contactRevealed ? (
               <div 
                 onClick={() => setContactRevealed(true)}
                 className="w-80 h-80 rounded-full bg-white border-2 border-purple-200 shadow-3xl flex flex-col items-center justify-center cursor-pointer group transition-all duration-1000 hover:scale-110 relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-orange-500/10 animate-pulse" />
                 <span className="text-[14px] font-black text-slate-950 uppercase tracking-[1em] mb-4 z-10">Get In Touch</span>
                 <p className="text-purple-600 text-[11px] font-bold uppercase tracking-widest animate-bounce z-10">Say Hello</p>
                 <div className="absolute inset-12 rounded-full border-2 border-purple-100 pointer-events-none group-hover:border-purple-300 transition-all duration-700" />
               </div>
             ) : (
               <GlassCard className="p-24 max-w-4xl w-full text-center space-y-16 animate-in zoom-in-95 duration-1000 bg-white" accent="purple">
                  <div className="space-y-12">
                     <h2 className="text-7xl font-black font-display text-slate-950 uppercase tracking-tighter leading-[0.8] mb-4">Let's Work <br /> <span className="text-purple-700">Together.</span></h2>
                     <p className="text-purple-400 font-bold text-base uppercase tracking-[0.8em]">Currently accepting new projects // 2025</p>
                  </div>
                  <div className="flex flex-col gap-12">
                     <a href="mailto:hello@vamshi.dev" className="text-5xl lg:text-6xl font-black text-slate-950 underline decoration-purple-600 decoration-[12px] underline-offset-[24px] hover:text-purple-600 transition-all uppercase tracking-tight">hello@vamshi.dev</a>
                     <div className="flex flex-wrap justify-center gap-16 pt-16">
                        <a href={LINKEDIN_URL} target="_blank" className="text-[14px] font-black text-slate-400 hover:text-purple-700 transition-all uppercase tracking-widest">LINKEDIN</a>
                        <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="text-[14px] font-black text-slate-400 hover:text-purple-700 transition-all uppercase tracking-widest">GITHUB</a>
                        <a href={INSTAGRAM_URL} target="_blank" className="text-[14px] font-black text-slate-400 hover:text-purple-700 transition-all uppercase tracking-widest">INSTAGRAM</a>
                        <a href={X_URL} target="_blank" className="text-[14px] font-black text-slate-400 hover:text-purple-700 transition-all uppercase tracking-widest">X / TWITTER</a>
                     </div>
                  </div>
               </GlassCard>
             )}
          </div>
        </section>
      </main>

      <footer className="py-32 relative bg-[#050110] backdrop-blur-3xl overflow-hidden border-t border-slate-900">
        {/* Glowing Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-gradient from-purple-900/40 via-transparent to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-radial-gradient from-orange-900/20 via-transparent to-transparent opacity-30" />
        
        <div className="max-w-[1440px] mx-auto px-16 relative z-10 flex flex-col md:flex-row justify-between items-center gap-20">
          <div className="flex flex-col items-center md:items-start gap-12 text-white">
             <button onClick={scrollToTop} className="group text-left focus:outline-none">
                <h4 className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-purple-400 transition-all">{FULL_NAME}</h4>
                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[1em] mt-3 leading-none">Software Engineer // 2025</p>
             </button>
             <div className="flex gap-12 items-center">
                <a href={LINKEDIN_URL} target="_blank" className="text-slate-400 hover:text-white transition-all transform hover:scale-125">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="text-slate-400 hover:text-white transition-all transform hover:scale-125">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.7 8.207 11.387.599.111.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" className="text-slate-400 hover:text-white transition-all transform hover:scale-125">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href={X_URL} target="_blank" className="text-slate-400 hover:text-white transition-all transform hover:scale-125">
                   <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
             </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-12">
             <button onClick={() => window.open(RESUME_URL, '_blank')} className="text-[14px] font-black text-[#050110] uppercase tracking-[0.5em] bg-white hover:bg-slate-100 px-12 py-5 rounded-3xl border border-slate-800 shadow-3xl transition-all">Download Portfolio</button>
             <div className="text-center md:text-right space-y-4">
                <p className="text-[12px] font-black text-slate-500 uppercase tracking-[2em]">Built with Passion & Swiss Precision</p>
                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[1em]">Secure Node 22U // 2025</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;