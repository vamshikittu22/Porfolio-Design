
import React, { useState, useEffect } from 'react';
import { GlassCard, BubbleTag, GlassButton } from './components/GlassUI';
import { PROJECTS, BLOG_POSTS, GITHUB_USERNAME, INSTAGRAM_HANDLE, X_HANDLE, LINKEDIN_URL, BLOG_URL } from './constants.tsx';
import { ProjectCategory, AccentColor } from './types';
import AIPlayground from './components/AIPlayground';
import GitHubStats from './components/GitHubStats';
import SocialFeed from './components/SocialFeed';
import { GeminiService } from './services/geminiService';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Generate AI Hero Image on mount with the requested user prompt
    const generateHero = async () => {
      try {
        const gemini = GeminiService.getInstance();
        const prompt = "A professional developer working on a system with dual monitors, enjoying the nature around, with a coffee cup beside and good weather, Swiss minimalist style, realistic photo.";
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

  return (
    <div className="min-h-screen relative selection:bg-blue-100 selection:text-blue-900">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-50 rounded-full blur-[120px] opacity-40" />
      </div>

      {/* Nav */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? 'scale-90 opacity-90' : 'scale-100 opacity-100'}`}>
        <GlassCard className="px-6 py-3 flex items-center gap-8">
          <a href="#home" className="text-sm font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors">Nexus.</a>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="flex gap-6">
            {['Home', 'Projects', 'AI Lab', 'Writing', 'Contact'].map(link => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </GlassCard>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        {/* HERO */}
        <section id="home" className="grid lg:grid-cols-2 gap-16 items-center mb-48 min-h-[70vh]">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="space-y-2">
              <BubbleTag accent="blue" className="mb-4">Full‑Stack Developer & AI Creator</BubbleTag>
              <h1 className="text-7xl lg:text-8xl font-black font-display text-slate-900 tracking-tighter leading-[0.9]">
                Vamshi <br />
                Krishna.
              </h1>
              <p className="text-xl text-slate-500 max-w-lg pt-4 leading-relaxed font-medium">
                Senior Full‑Stack Engineer specialized in React and Node.js. Architecting the future of web with generative AI integrations.
              </p>
            </div>
            
            <div className="flex gap-4">
              <GlassButton primary accent="blue" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Work
              </GlassButton>
              <GlassButton accent="blue" onClick={() => window.open(BLOG_URL, '_blank')}>
                Read Stories
              </GlassButton>
            </div>

            <div className="flex gap-6 items-center pt-8">
               <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all hover:scale-110 bg-white shadow-sm">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
               </a>
               <a href={LINKEDIN_URL} target="_blank" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all hover:scale-110 bg-white shadow-sm">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
               </a>
               <a href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all hover:scale-110 bg-white shadow-sm">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
               </a>
               <a href={`https://x.com/${X_HANDLE}`} target="_blank" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all hover:scale-110 bg-white shadow-sm">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
               </a>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right duration-1000">
            <GlassCard className="aspect-square w-full max-w-[500px] ml-auto overflow-hidden p-3" accent="blue">
              <div className="w-full h-full rounded-[18px] bg-slate-100 overflow-hidden relative group">
                {heroLoading ? (
                  <div className="w-full h-full relative overflow-hidden bg-slate-50">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest animate-pulse">Generating your AI Workspace...</p>
                    </div>
                  </div>
                ) : heroImage ? (
                  <img 
                    src={heroImage} 
                    alt="Vamshi AI Space" 
                    className="w-full h-full object-cover transition-all duration-1000 animate-in fade-in group-hover:scale-105" 
                  />
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                    alt="Engineering Workspace Fallback" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 text-white font-display font-bold text-lg drop-shadow-sm bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                  {heroLoading ? 'Architecting...' : 'AI Crafted Workspace.'}
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* GITHUB STATS */}
        <section className="mb-48">
          <GitHubStats />
        </section>

        {/* FEATURED PROJECTS */}
        <section id="projects" className="mb-48 scroll-mt-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-black font-display text-slate-900">Engineering Portfolio</h2>
              <p className="text-slate-500 font-medium">End-to-end applications designed for scale and performance.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['All', ...Object.values(ProjectCategory)].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <GlassCard 
                key={project.id} 
                accent={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'green' : 'red'}
                className="flex flex-col h-full overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative group">
                  <img 
                    src={project.thumbnailUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 px-6 text-center">
                    <p className="text-white text-sm font-medium mb-2">{project.tagline}</p>
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-lg hover:scale-110 transition-transform flex items-center gap-2">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-900 text-white border border-white/20 text-xs font-bold rounded-lg hover:scale-110 transition-transform flex items-center gap-2">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4 flex gap-2 flex-wrap">
                    {project.tech.map(t => (
                      <BubbleTag key={t} accent={i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'green' : 'red'}>
                        {t}
                      </BubbleTag>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">{project.category}</span>
                    <button className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                      View Logic →
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* SOCIAL STREAM */}
        <section className="mb-48">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-4xl font-black font-display text-slate-900">Live Stream</h2>
             <p className="text-slate-500">Real-time pulses from my Instagram & X feeds.</p>
          </div>
          <SocialFeed />
        </section>

        {/* AI LAB SECTION */}
        <section id="ai-lab" className="mb-48 scroll-mt-32">
          <div className="max-w-xl mx-auto text-center mb-16 space-y-4">
             <h2 className="text-4xl font-black font-display text-slate-900">Creative AI Studio</h2>
             <p className="text-slate-500">
               A visual engine for testing multimodal models. Upload any image and use Nano Banana to edit or Veo to animate.
             </p>
          </div>
          <AIPlayground />
        </section>

        {/* BLOG / TRAVEL STORIES */}
        <section id="writing" className="mb-48 scroll-mt-32">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl font-black font-display text-slate-900">Explorer Chronicles</h2>
              <p className="text-slate-500 font-medium">Musings on travel, tech, and the nomad life.</p>
            </div>
            <button 
              onClick={() => setIsBlogModalOpen(true)}
              className="text-sm font-bold text-blue-600 hover:underline px-4 py-2 bg-blue-50 rounded-full transition-all hover:bg-blue-100"
            >
              Read All Stories
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <GlassCard key={post.id} className="p-8 group cursor-pointer hover:bg-white/60" accent={i === 0 ? 'red' : 'blue'}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <BubbleTag accent={i === 0 ? 'red' : 'blue'}>{post.tag}</BubbleTag>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{post.summary}</p>
                  </div>
                  {post.location && (
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {post.location}
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mb-24 scroll-mt-32">
          <GlassCard className="p-12 text-center overflow-hidden relative" accent="blue">
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-5xl font-black font-display text-slate-900 tracking-tight leading-tight">Let's build the <br /> next standard.</h2>
              <p className="text-slate-500 text-lg">Accepting senior full-stack roles and high-impact AI consultations.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlassButton primary accent="blue" className="w-full sm:w-auto" onClick={() => window.location.href = `mailto:hello@example.com`}>
                  Start a Conversation
                </GlassButton>
                <GlassButton accent="blue" className="w-full sm:w-auto" onClick={() => window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank')}>
                  Fork my Boilerplate
                </GlassButton>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none opacity-40" />
          </GlassCard>
        </section>
      </main>

      {/* Blog Archive Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <GlassCard className="max-w-4xl w-full max-h-[80vh] overflow-y-auto p-12 relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsBlogModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                <div>
                    <h2 className="text-4xl font-black font-display text-slate-900">Explorer Chronicles</h2>
                    <p className="text-slate-500 mt-1">Full archive of my travel logs and tech insights.</p>
                </div>
                <GlassButton accent="blue" onClick={() => window.open(BLOG_URL, '_blank')}>Visit Blogspot</GlassButton>
            </div>
            <div className="space-y-8">
              {BLOG_POSTS.map((post) => (
                <div key={post.id} className="border-b border-slate-100 pb-8 last:border-0 hover:bg-slate-50/50 p-4 rounded-2xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <BubbleTag accent="blue">{post.tag}</BubbleTag>
                    <span className="text-sm font-bold text-slate-400">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-800 mb-2">{post.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-4">{post.summary}</p>
                  <a href={BLOG_URL} target="_blank" className="text-sm font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                    Read the full story 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      <footer className="py-12 border-t border-slate-100 text-center space-y-4 bg-white/50">
        <div className="flex justify-center gap-8">
           <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]">GitHub</a>
           <a href={LINKEDIN_URL} target="_blank" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]">LinkedIn</a>
           <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]">Instagram</a>
           <a href={`https://x.com/${X_HANDLE}`} target="_blank" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]">X / Twitter</a>
        </div>
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] pt-4">
          Built with Gemini 2.5 Flash & Veo-3.1 — 2025
        </p>
      </footer>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default App;
