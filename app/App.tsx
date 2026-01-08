
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { GeminiService } from '../services/geminiService';
import { HeaderNav } from '../components/layout/HeaderNav';
import FooterBar from '../components/layout/FooterBar';
import { HeroSection } from '../sections/hero/HeroSection';
import { AboutSection } from '../sections/about/AboutSection';
import CareerSnapshot from '../sections/career/CareerSnapshot';
import ProjectsSection from '../sections/projects/ProjectsSection';
import GithubSection from '../sections/github/GithubSection';
import ChatAssistant from '../components/layout/ChatAssistant/ChatAssistant';
import PortfolioCaseStudy from '../sections/case-study/PortfolioCaseStudy';
import SectionLoader from '../components/ui/SectionLoader';
import { 
  HERO_FALLBACK_DARK, 
  HERO_FALLBACK_LIGHT, 
  HERO_PROMPT_DARK, 
  HERO_PROMPT_LIGHT 
} from '../config/constants';

// --- LAZY LOADED SECTIONS (Below the fold) ---
const ResumeSection = lazy(() => import('../sections/resume/ResumeSection'));
const GameSection = lazy(() => import('../sections/game/GameSection'));
const TravelSection = lazy(() => import('../sections/travel/TravelSection'));
const ContactSection = lazy(() => import('../sections/contact/ContactSection'));

const App: React.FC = () => {
  const [view, setView] = useState<'portfolio' | 'case-study'>('portfolio');
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

  // Navigation Observer (Active State)
  useEffect(() => {
    if (view !== 'portfolio') return;
    const sections = [
      'hero-section',
      'about-section', 
      'career-snapshot-section', 
      'projects-section', 
      'github-section', 
      'resume-section', 
      'game-section', 
      'travel-section', 
      'contact-section'
    ];
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
  }, [view]);

  // Preload Observer (Performance Optimization)
  useEffect(() => {
    if (view !== 'portfolio') return;
    const lazyIds = ['resume-section', 'game-section', 'travel-section', 'contact-section'];
    
    const preloadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            switch (entry.target.id) {
              case 'resume-section': import('../sections/resume/ResumeSection'); break;
              case 'game-section': import('../sections/game/GameSection'); break;
              case 'travel-section': import('../sections/travel/TravelSection'); break;
              case 'contact-section': import('../sections/contact/ContactSection'); break;
            }
          }
        });
      },
      { rootMargin: '1000px 0px' }
    );

    lazyIds.forEach(id => {
      const el = document.getElementById(id + '-anchor');
      if (el) preloadObserver.observe(el);
    });

    return () => preloadObserver.disconnect();
  }, [view]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const generateHero = async () => {
    const gemini = GeminiService.getInstance();
    if (gemini.isQuotaLocked()) return; 
    setHeroLoading(true);
    try {
      const prompt = isDarkMode ? HERO_PROMPT_DARK : HERO_PROMPT_LIGHT;
      const img = await gemini.generateImage(prompt);
      setHeroImage(img);
    } catch (err) {
      console.warn("Hero image generation paused.");
    } finally {
      setHeroLoading(false);
    }
  };

  useEffect(() => {
    generateHero();
  }, [isDarkMode]);

  const scrollToSection = (id: string) => { 
    if (view !== 'portfolio') {
      setView('portfolio');
      setTimeout(() => {
        const element = document.getElementById(id); 
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
      }, 100);
      return;
    }
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

      <HeaderNav 
        scrolled={scrolled} 
        activeSection={activeSection} 
        isDarkMode={isDarkMode} 
        onScrollToSection={scrollToSection} 
        onScrollToTop={handleScrollToTop} 
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onGoHome={() => setView('portfolio')}
        onOpenCaseStudy={() => setView('case-study')}
        isCaseStudyView={view === 'case-study'}
      />

      <main className="max-w-[1440px] mx-auto px-10 lg:px-32 pt-80 pb-60 print:p-0">
        {view === 'portfolio' ? (
          <>
            <HeroSection image={activeHeroImage} loading={heroLoading} onScroll={scrollToSection} />
            <div className="space-y-[30rem] lg:space-y-[40rem]">
              <AboutSection />
              <CareerSnapshot />
              <ProjectsSection />
              <GithubSection />
              
              <div id="resume-section-anchor">
                <Suspense fallback={<SectionLoader />}>
                  <ResumeSection />
                </Suspense>
              </div>

              <div id="game-section-anchor">
                <Suspense fallback={<SectionLoader />}>
                  <GameSection />
                </Suspense>
              </div>

              <div id="travel-section-anchor">
                <Suspense fallback={<SectionLoader />}>
                  <TravelSection />
                </Suspense>
              </div>

              <div id="contact-section-anchor">
                <Suspense fallback={<SectionLoader />}>
                  <ContactSection />
                </Suspense>
              </div>
            </div>
          </>
        ) : (
          <PortfolioCaseStudy onBack={() => setView('portfolio')} />
        )}
      </main>

      <FooterBar onScrollToTop={handleScrollToTop} onOpenCaseStudy={() => setView('case-study')} />
      <ChatAssistant />
    </div>
  );
};

export default App;
