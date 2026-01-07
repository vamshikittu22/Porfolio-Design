
import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterBar } from '../components/layout/FooterBar';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import CareerSnapshot from '../sections/career/CareerSnapshot';
import ProjectsSection from '../sections/projects/ProjectsSection';
import GithubSection from '../sections/github/GithubSection';
import ResumeSection from '../sections/resume/ResumeSection';
import GameSection from '../sections/game/GameSection';
import TravelSection from '../sections/travel/TravelSection';
import ContactSection from '../sections/contact/ContactSection';
import ChatAssistant from '../components/layout/ChatAssistant/ChatAssistant';

const HERO_FALLBACK_DARK = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200";
const HERO_FALLBACK_LIGHT = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200";

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
  }, []);

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
      const prompt = isDarkMode 
        ? "Hyper-clean architectural workspace, deep navy midnight atmosphere, electric aqua mint accents, high-end Swiss minimalist design."
        : "Hyper-clean architectural workspace, dreamy ocean breeze lighting, soft lilac and pale grey tones, high-end Swiss minimalist design.";
      const img = await gemini.generateImage(prompt);
      setHeroImage(img);
    } catch (err) {
      console.warn("Hero image generation paused or failed.");
    } finally {
      setHeroLoading(false);
    }
  };

  useEffect(() => { 
    generateHero(); 
  }, [isDarkMode]);

  const scrollToSection = (id: string) => { 
    const element = document.getElementById(id); 
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
  };

  const handleScrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const activeHeroImage = heroImage || (isDarkMode ? HERO_FALLBACK_DARK : HERO_FALLBACK_LIGHT);

  return (
    <div className="min-h-screen relative selection:bg-t-accent selection:text-t-bg bg-t-bg transition-colors duration-500 overflow-x-hidden">
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-15 dark:opacity-20 print:hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[60%] h-[60%] bg-t-accent-s/40 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-t-accent-2-s/30 blur-[200px] rounded-full" />
      </div>

      <HeaderNav 
        scrolled={scrolled} 
        activeSection={activeSection} 
        isDarkMode={isDarkMode} 
        onScrollToSection={scrollToSection} 
        onScrollToTop={handleScrollToTop} 
        onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />

      <main className="max-w-[1440px] mx-auto px-10 lg:px-32 pt-80 pb-60 print:p-0">
        <HeroSection image={activeHeroImage} loading={heroLoading} onScroll={scrollToSection} />
        
        <div className="space-y-[40rem] print:space-y-0">
          <AboutSection />
          <CareerSnapshot />
          <ProjectsSection />
          <GithubSection />
          <ResumeSection />
          <GameSection />
          <TravelSection />
          <ContactSection />
        </div>
      </main>

      <FooterBar onScrollToTop={handleScrollToTop} />
      <ChatAssistant />
    </div>
  );
};

export default App;
