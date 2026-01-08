import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { HeaderNav } from '../components/layout/HeaderNav';
import FooterBar from '../components/layout/FooterBar';
import { HeroSection } from '../sections/hero/HeroSection';
import { AboutSection } from '../sections/about/AboutSection';
import CareerSnapshot from '../sections/career/CareerSnapshot';
import ProjectsSection from '../sections/projects/ProjectsSection';
import GithubSection from '../sections/github/GithubSection';
import ResumeSection from '../sections/resume/ResumeSection';
import GameSection from '../sections/game/GameSection';
import TravelSection from '../sections/travel/TravelSection';
import ContactSection from '../sections/contact/ContactSection';
import ChatAssistant from '../components/layout/ChatAssistant/ChatAssistant';
import PortfolioCaseStudy from '../sections/case-study/PortfolioCaseStudy';
import { 
  HERO_FALLBACK_DARK, 
  HERO_FALLBACK_LIGHT, 
  HERO_PROMPT_DARK, 
  HERO_PROMPT_LIGHT 
} from '../config/constants';

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
        isCaseStudyView={view === 'case-study'}
      />

      <main className="max-w-[1440px] mx-auto px-10 lg:px-32 pt-8 pb-60 print:p-0">
        {view === 'portfolio' ? (
          <>
            <HeroSection image={activeHeroImage} loading={heroLoading} onScroll={scrollToSection} />
            <div className="space-y-[30rem] lg:space-y-[40rem]">
              <AboutSection />
              <CareerSnapshot />
              <ProjectsSection />
              <GithubSection />
              <ResumeSection />
              <GameSection />
              <TravelSection />
              <ContactSection />
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