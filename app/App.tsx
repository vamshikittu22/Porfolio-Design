import React, { useState, useEffect, lazy, Suspense } from 'react';
import { GeminiService } from '../services/geminiService';
import { HeaderNav } from '../components/layout/HeaderNav';
import FooterBar from '../components/layout/FooterBar';
// TODO: Remove after verifying chapter-only navigation (sections now composed into chapters)
import { HeroSection } from '../sections/hero/HeroSection';
import { AboutSection } from '../sections/about/AboutSection';
import CareerSnapshot from '../sections/career/CareerSnapshot';
import PortfolioCaseStudy from '../sections/case-study/PortfolioCaseStudy';
import SectionLoader from '../components/ui/SectionLoader';
import { NavigationProvider, useNavigation } from '../contexts/NavigationContext';
import { ThemeProvider, useTheme } from '../src/contexts/ThemeContext';
import { ChapterSidebar } from '../components/navigation/ChapterSidebar';
import { ChapterBottomSheet } from '../components/navigation/ChapterBottomSheet';
import { ChapterTransition } from '../src/components/transitions/ChapterTransition';
import LandingPage from '../src/pages/LandingPage';
import {
  Chapter01Introduction,
  Chapter02Learner,
  Chapter03Builder,
  Chapter04Journey,
  Chapter05Explorer,
  Chapter06Thinker,
  Chapter07Connection,
  Chapter08Architecture
} from '../src/pages/chapters';
import {
  HERO_FALLBACK_DARK,
  HERO_FALLBACK_LIGHT,
  HERO_PROMPT_DARK,
  HERO_PROMPT_LIGHT,
  PHYSICAL_FALLBACKS
} from '../config/constants';
import { SEOManager } from '../components/seo/SEOManager';

// --- LAZY LOADED SECTIONS (Below the fold) ---
const ProjectsSection = lazy(() => import('../sections/projects/ProjectsSection'));
const GithubSection = lazy(() => import('../sections/github/GithubSection'));
const ResumeSection = lazy(() => import('../sections/resume/ResumeSection'));
const GameSection = lazy(() => import('../sections/game/GameSection'));
const TravelSection = lazy(() => import('../sections/travel/TravelSection'));
const ContactSection = lazy(() => import('../sections/contact/ContactSection'));

// --- LAZY LOAD CHATASSISTANT (Performance Optimization) ---
// ChatAssistant includes Google GenAI SDK (~100kB) - only load when needed
const ChatAssistant = lazy(() => import('../components/layout/ChatAssistant/ChatAssistant'));

/**
 * AppContent - Inner component that uses NavigationContext
 * Separated to allow useNavigation hook usage within NavigationProvider
 */
const AppContent: React.FC = () => {
  const { currentChapter } = useNavigation();
  const { resolvedTheme } = useTheme();
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [heroLoading, setHeroLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero-section');
  const [shouldLoadChat, setShouldLoadChat] = useState(false);

  // Derived from ThemeContext
  const isDarkMode = resolvedTheme === 'dark';

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 150); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed Navigation & Preload Observers which were tied to the old single-page architecture

  const generateHero = async () => {
    const gemini = GeminiService.getInstance();
    setHeroLoading(true);
    try {
      const prompt = isDarkMode ? HERO_PROMPT_DARK : HERO_PROMPT_LIGHT;
      const physicalFallback = isDarkMode ? PHYSICAL_FALLBACKS.HERO_DARK : PHYSICAL_FALLBACKS.HERO_LIGHT;
      const img = await gemini.generateImage(prompt, "1:1", physicalFallback);
      setHeroImage(img);
    } catch (err) {
      console.warn("Hero image generation fallback cycle activated.");
    } finally {
      setHeroLoading(false);
    }
  };

  useEffect(() => {
    generateHero();
  }, [isDarkMode]);

  // Lazy load ChatAssistant on first user interaction (idle strategy)
  useEffect(() => {
    // Preload chat after 3 seconds of idle time OR on first scroll/click
    const idleTimer = setTimeout(() => {
      setShouldLoadChat(true);
    }, 3000);

    const handleInteraction = () => {
      setShouldLoadChat(true);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    window.addEventListener('click', handleInteraction, { once: true });

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const activeHeroImage = heroImage || (isDarkMode ? HERO_FALLBACK_DARK : HERO_FALLBACK_LIGHT);

  return (
    <div className="min-h-screen relative selection:bg-t-accent selection:text-t-bg bg-t-bg transition-colors duration-500 overflow-x-hidden">
      {/* SEO Manager - Dynamically updates meta tags based on current chapter */}
      <SEOManager />

      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-15 dark:opacity-20 print:hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[60%] h-[60%] bg-t-accent-s/40 blur-[200px] rounded-full" />
      </div>

      {/* Mobile bottom sheet navigation */}
      <ChapterBottomSheet />

      {/* Top header navigation */}
      <HeaderNav
        scrolled={scrolled}
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        onScrollToSection={scrollToSection}
        onScrollToTop={handleScrollToTop}
        onToggleTheme={() => { }}
      />

      <main className="print:p-0">
          <ChapterTransition>
            {currentChapter === null ? (
              // No chapter selected - show landing page with all chapter cards
              <div className="w-full max-w-[min(1600px,94vw)] mx-auto px-4 sm:px-8 lg:px-12 pt-32 pb-20">
                <LandingPage />
              </div>
            ) : (
              // Chapter selected - route to appropriate chapter component
              <>
                {currentChapter === '01-introduction' && <Chapter01Introduction />}
                {currentChapter === '02-learner' && <Chapter02Learner />}
                {currentChapter === '03-builder' && <Chapter03Builder />}
                {currentChapter === '04-journey' && <Chapter04Journey />}
                {currentChapter === '05-explorer' && <Chapter05Explorer />}
                {currentChapter === '06-thinker' && <Chapter06Thinker />}
                {currentChapter === '07-connection' && <Chapter07Connection />}
                {currentChapter === '08-architecture' && <Chapter08Architecture />}
              </>
            )}
          </ChapterTransition>
      </main>

      <FooterBar onScrollToTop={handleScrollToTop} />

      {/* ChatAssistant - Lazy loaded on first interaction for performance */}
      {shouldLoadChat && (
        <Suspense fallback={null}>
          <ChatAssistant />
        </Suspense>
      )}
    </div>
  );
};

/**
 * App - Root component with NavigationProvider and ThemeProvider wrappers
 * Provides chapter navigation and theme context to all child components
 */
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  );
};

export default App;
