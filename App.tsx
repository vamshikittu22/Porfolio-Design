
import React, { useState, useEffect } from 'react';
import { GlassCard, BubbleTag, GlassButton } from './components/GlassUI';
import { PROJECTS, BLOG_POSTS, GITHUB_USERNAME, INSTAGRAM_HANDLE, X_HANDLE, LINKEDIN_URL, BLOG_URL } from './constants.tsx';
import { ProjectCategory, Project } from './types';
import AIPlayground from './components/AIPlayground';
import GitHubStats from './components/GitHubStats';
import SocialFeed from './components/SocialFeed';
import { GeminiService } from './services/geminiService';
import { TicTacToe } from './components/TicTacToe';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
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
        const prompt = "A high-end software engineer workspace, dual monitors with code, bright airy studio, Swiss minimalist style, realistic photo.";
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

  return (
    <div className="min-h-screen relative selection:bg-slate-900 selection:text-white overflow-x-hidden bg-[#fcfcfc]">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/10 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-100/10 rounded-full blur-[120px] opacity-40" />
      </div>

      {/* Nav */}
      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ${scrolled ? 'scale-90 opacity-90' : 'scale-100 opacity-100'}`}>
        <GlassCard className="px-6 py-3 flex items-center gap-10 border-slate-900/10">
          <a href="#home" className="text-sm font-black tracking-tighter text-slate-900 uppercase">VK_SYSTEM.v2</a>
          <div className="h-4 w-[1px] bg-slate-300" />
          <div className="flex gap-8">
            {['Home', 'Projects', 'AI Lab', 'Writing', 'Contact'].map(link => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </GlassCard>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-32 pb-24">
        {/* HERO */}
        <section id="home" className="grid lg:grid-cols-2 gap-20 items-center mb-48 min-h-[70vh] relative z-10">
          <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                 <div className="h-[2px] w-12 bg-slate-900" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Senior Full-Stack // AI Specialist</span>
              </div>
              <h1 className="text-7xl lg:text-[110px] font-black font-display text-slate-900 tracking-tighter leading-[0.8] uppercase">
                Vamshi <br />
                Krishna.
              </h1>
              <p className="text-lg text-slate-500 max-w-md pt-6 leading-relaxed font-medium">
                Designing systems that bridge the gap between human intuition and machine intelligence. 
                <span className="text-slate-900 block mt-2">Available for high-impact partnerships.</span>
              </p>
            </div>
            
            <div className="flex gap-6">
              <GlassButton primary accent="blue" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                System_Work
              </GlassButton>
              <GlassButton accent="blue" onClick={() => window.open(BLOG_URL, '_blank')}>
                Case_Stories
              </GlassButton>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right duration-1000 z-0">
            <GlassCard className="aspect-[4/5] w-full max-w-[500px] ml-auto overflow-hidden p-0 border-none rounded-none shadow-2xl" accent="blue">
                {heroLoading ? (
                  <div className="w-full h-full relative overflow-hidden bg-slate-100 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent animate-spin" />
                  </div>
                ) : (
                  <div className="w-full h-full relative group">
                    <img 
                      src={heroImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
                      alt="Vamshi Workspace" 
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 border-[24px] border-white/5 pointer-events-none" />
                  </div>
                )}
            </GlassCard>
          </div>
        </section>

        {/* GITHUB STATS */}
        <section className="mb-48">
          <GitHubStats />
        </section>

        {/* FEATURED PROJECTS */}
        <section id="projects" className="mb-48 scroll-mt-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
            <div className="space-y-3">
              <h2 className="text-5xl font-black font-display text-slate-900 uppercase tracking-tighter">Selected Case Studies.</h2>
              <p className="text-slate-400 font-medium text-sm tracking-tight uppercase tracking-[0.2em]">Engineering modules v2.5</p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {['All', ...Object.values(ProjectCategory)].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`text-[10px] font-black uppercase tracking-widest pb-1 transition-all border-b-2 ${activeCategory === cat ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-300 hover:text-slate-500'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-16">
            {filteredProjects.map((project, i) => {
              const isExpanded = expandedProjectId === project.id;
              const accent = i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'green' : 'red';
              // 1st/3rd (index 0, 2): slide description from right, image on left
              // 2nd/4th (index 1, 3): slide description from left, image on right
              const isEven = i % 2 === 0; 
              
              return (
                <div key={project.id} className={`w-full relative transition-all duration-700 ${isExpanded ? 'z-[60]' : 'z-10'}`}>
                  <GlassCard 
                    accent={accent}
                    className={`relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? 'bg-white shadow-3xl border-slate-900/30' : 'hover:border-slate-900/20'}`}
                    onClick={() => toggleProject(project.id)}
                  >
                    {/* Header Transition */}
                    <div className={`relative w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? 'h-[100px] bg-slate-50/50' : 'h-[450px]'}`}>
                      
                      {/* Logo-Shrink */}
                      <div className={`
                        absolute transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 overflow-hidden
                        ${isExpanded 
                          ? 'top-6 left-8 w-10 h-10 rounded-sm shadow-md border border-slate-200 grayscale-0' 
                          : 'inset-0 w-full h-full grayscale-[0.8]'}
                      `}>
                        <img 
                          src={project.thumbnailUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      {/* Trademark Title */}
                      <div className={`
                        absolute transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-30
                        ${isExpanded 
                          ? 'top-6 right-8 text-right' 
                          : 'bottom-12 left-12 text-left pointer-events-none'}
                      `}>
                        <h3 className={`font-black font-display text-slate-900 uppercase tracking-tighter transition-all duration-700 leading-none ${isExpanded ? 'text-xl' : 'text-6xl drop-shadow-2xl text-white'}`}>
                          {project.title}.
                        </h3>
                        {isExpanded && (
                          <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em] block mt-1">SYS_REF // {project.id}</span>
                        )}
                      </div>
                    </div>

                    {/* Lower Deck / Side-by-Side Detailed Logic View */}
                    <div className={`
                      transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden
                      ${isExpanded ? 'max-h-[3500px] opacity-100 p-8 lg:p-16' : 'max-h-0 opacity-0'}
                    `}>
                      <div className={`flex flex-col lg:flex-row gap-12 items-start max-h-[85vh] overflow-y-auto pr-4 scrollbar-hide ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                         
                         {/* Description Header */}
                         <div className={`flex-1 space-y-12 animate-in fade-in duration-700 ${isEven ? 'slide-in-from-right' : 'slide-in-from-left'}`}>
                            <div className="space-y-6">
                               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Architecture_Report</p>
                               <h4 className="text-4xl font-black text-slate-900 leading-[1.1] uppercase tracking-tighter">{project.tagline}</h4>
                               <p className="text-slate-500 leading-loose text-lg font-medium max-w-2xl">{project.overview}</p>
                            </div>

                            <div className="flex gap-3 flex-wrap">
                               {project.tech.map(t => <BubbleTag key={t} accent={accent}>{t}</BubbleTag>)}
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 pt-4">
                               <div className="space-y-6">
                                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 border-b border-slate-100 pb-3 italic">Functionality_Flow</h4>
                                  <ul className="space-y-4">
                                     {project.useCases.map((use, idx) => (
                                       <li key={idx} className="flex gap-4 text-xs text-slate-500 font-bold leading-relaxed">
                                         <span className="text-slate-900 font-black tabular-nums">0{idx+1}</span>
                                         <span className="uppercase tracking-wide">{use}</span>
                                       </li>
                                     ))}
                                  </ul>
                               </div>
                               <div className="space-y-6">
                                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 border-b border-slate-100 pb-3 italic">Stack_Context</h4>
                                  <p className="text-[11px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight">{project.architecture}</p>
                                  <div className="pt-8 flex flex-col gap-3">
                                     <GlassButton accent={accent} className="w-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); window.open(project.repoUrl, '_blank'); }}>Source Code</GlassButton>
                                     {project.liveUrl && (
                                       <GlassButton primary accent={accent} className="w-full" onClick={(e: React.MouseEvent) => { e.stopPropagation(); window.open(project.liveUrl, '_blank'); }}>Live Deployment</GlassButton>
                                     )}
                                  </div>
                               </div>
                            </div>
                         </div>

                         {/* Single Main Detailed Image with Light Background Shade */}
                         <div className={`flex-1 w-full bg-slate-50/80 p-6 lg:p-10 rounded-xl animate-in fade-in duration-700 delay-200 ${isEven ? 'slide-in-from-left' : 'slide-in-from-right'}`}>
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 block mb-6 text-center">Technical Component Visualization // Alpha_Prime</span>
                            <div className="w-full aspect-video lg:aspect-square rounded-lg overflow-hidden shadow-xl border border-white/40 group/sub">
                               <img 
                                 src={project.secondaryImageUrl} 
                                 alt="Main technical highlight" 
                                 className="w-full h-full object-cover transition-all duration-1000 group-hover/sub:scale-105" 
                               />
                            </div>
                         </div>
                      </div>

                      <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
                         <button 
                           onClick={(e) => { e.stopPropagation(); toggleProject(project.id); }} 
                           className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 transition-all tracking-widest flex items-center gap-4 group"
                         >
                           <span className="w-10 h-[1px] bg-slate-200 group-hover:w-16 group-hover:bg-slate-900 transition-all" />
                           Terminate Logic Module
                         </button>
                         <span className="text-[8px] font-black text-slate-200 uppercase tracking-[1em]">TRANSMISSION_COMPLETE</span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE BREAK: PLAYLAB */}
        <section className="mb-48 scroll-mt-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="inline-block px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.3em] mb-4 shadow-[4px_4px_0px_#1d4ed8]">PLAYGROUND_STATION</div>
              <h2 className="text-4xl font-black font-display text-slate-900 uppercase tracking-tighter">The Playlab.</h2>
              <p className="text-slate-500 font-medium max-w-md leading-loose">
                A dedicated space for experimental interaction. Here I test game-UI physics and logic flow outside the constraints of enterprise architecture.
                <span className="text-slate-900 block mt-4 font-bold italic">"Good design is a game of logic."</span>
              </p>
              <div className="pt-8">
                <GlassButton accent="blue" onClick={() => window.open('https://github.com/vamshikittu22', '_blank')}>Explore Lab Source</GlassButton>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <TicTacToe />
            </div>
          </div>
        </section>

        {/* SOCIAL STREAM */}
        <section className="mb-48">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-4xl font-black font-display text-slate-900 uppercase tracking-tighter">Live Transmission.</h2>
             <p className="text-slate-400 font-medium">Synced pulses from digital and physical workspaces.</p>
          </div>
          <SocialFeed />
        </section>

        {/* AI LAB SECTION */}
        <section id="ai-lab" className="mb-48 scroll-mt-32">
          <div className="max-w-xl mx-auto text-center mb-16 space-y-4">
             <h2 className="text-4xl font-black font-display text-slate-900 uppercase tracking-tighter">Synthesis Module.</h2>
             <p className="text-slate-400 font-medium leading-relaxed">
               Leveraging Gemini 2.5 Flash Image and Veo-3.1 to automate visual narrative generation.
             </p>
          </div>
          <AIPlayground />
        </section>

        {/* WRITING */}
        <section id="writing" className="mb-48 scroll-mt-32">
          <div className="flex justify-between items-end mb-20 border-b border-slate-100 pb-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-black font-display text-slate-900 uppercase tracking-tighter">Chronicles.</h2>
              <p className="text-slate-400 font-medium">Technical deep-dives and travel insights.</p>
            </div>
            <button 
              onClick={() => setIsBlogModalOpen(true)}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors pb-1 border-b-2 border-transparent hover:border-slate-900"
            >
              System_Logs_Full
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-900 bg-slate-100 px-2 py-1 uppercase tracking-widest">{post.tag}</span>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-black font-display text-slate-900 uppercase tracking-tight leading-snug group-hover:translate-x-2 transition-transform">{post.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">{post.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION WITH LIGHT GLASS BUBBLE */}
        <section id="contact" className="mb-24 scroll-mt-32">
          <div className="flex flex-col items-center justify-center space-y-12">
             {!contactRevealed ? (
               <div 
                 onClick={() => setContactRevealed(true)}
                 className="w-64 h-64 rounded-full bg-white/20 backdrop-blur-3xl border border-slate-200/50 flex flex-col items-center justify-center cursor-pointer group transition-all duration-700 hover:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.05)] relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-transparent" />
                 <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] mb-2 z-10">System_Link</span>
                 <p className="text-slate-600 text-xs font-bold uppercase tracking-widest animate-bounce z-10">Tap to Reveal</p>
                 <div className="absolute bottom-12 w-10 h-[1px] bg-slate-300/50" />
                 
                 {/* Decorative inner glass ring */}
                 <div className="absolute inset-4 rounded-full border border-white/60 pointer-events-none" />
               </div>
             ) : (
               <GlassCard className="p-16 max-w-2xl w-full text-center space-y-10 animate-in zoom-in-95 duration-700" accent="blue">
                  <div className="space-y-4">
                     <h2 className="text-5xl font-black font-display text-slate-900 uppercase tracking-tighter leading-[0.9]">Connection <br /> Established.</h2>
                     <p className="text-slate-500 font-medium">Currently reviewing senior roles & AI consulting.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                     <a href="mailto:hello@example.com" className="text-2xl font-black text-slate-900 underline hover:text-blue-600 transition-colors uppercase tracking-tight">hello@vamshi.dev</a>
                     <div className="flex justify-center gap-8 pt-6">
                        <a href={LINKEDIN_URL} target="_blank" className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.3em]">LinkedIn</a>
                        <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.3em]">GitHub</a>
                     </div>
                  </div>
                  <div className="pt-10 border-t border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Want to play instead?</p>
                     <GlassButton accent="blue" onClick={() => document.getElementById('ai-lab')?.scrollIntoView({ behavior: 'smooth' })}>Visit AI Playground →</GlassButton>
                  </div>
               </GlassCard>
             )}
             
             {!contactRevealed && (
               <button onClick={() => setContactRevealed(true)} className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">
                 View contacts directly
               </button>
             )}
          </div>
        </section>
      </main>

      {/* MODAL ARCHIVE */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="bg-white max-w-4xl w-full max-h-[85vh] overflow-y-auto p-16 relative shadow-3xl border-slate-900">
            <button onClick={() => setIsBlogModalOpen(false)} className="absolute top-10 right-10 text-slate-400 hover:text-slate-900 transition-colors">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="mb-16 border-b border-slate-100 pb-12">
                <h2 className="text-6xl font-black font-display text-slate-900 uppercase tracking-tighter">Full Archive_Log.</h2>
                <p className="text-slate-400 mt-4 font-bold tracking-[0.4em] text-[11px] uppercase">Permission level: Admin</p>
            </div>
            <div className="space-y-20">
              {BLOG_POSTS.map((post) => (
                <div key={post.id} className="group">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest bg-slate-100 px-3 py-1">{post.tag}</span>
                    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{post.date}</span>
                  </div>
                  <h3 className="text-4xl font-black font-display text-slate-900 mb-6 uppercase tracking-tight group-hover:text-blue-600 transition-colors leading-none">{post.title}</h3>
                  <p className="text-slate-500 leading-loose text-xl font-medium mb-8">{post.summary}</p>
                  <a href={BLOG_URL} target="_blank" className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 flex items-center gap-4 group/l">
                    Open Entry_Node
                    <svg className="w-5 h-5 group-hover/l:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="py-24 border-t border-slate-100 bg-white/50">
        <div className="max-w-[1440px] mx-auto px-16 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex gap-16">
             <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="text-[10px] font-black text-slate-300 hover:text-slate-900 transition-colors uppercase tracking-[0.4em]">GH_SYS</a>
             <a href={LINKEDIN_URL} target="_blank" className="text-[10px] font-black text-slate-300 hover:text-slate-900 transition-colors uppercase tracking-[0.4em]">LI_CON</a>
             <a href={`https://x.com/${X_HANDLE}`} target="_blank" className="text-[10px] font-black text-slate-300 hover:text-slate-900 transition-colors uppercase tracking-[0.4em]">X_NET</a>
          </div>
          <p className="text-[9px] font-black text-slate-200 uppercase tracking-[0.6em]">
            ENGINEERED BY VK // SYNC_2025
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default App;
