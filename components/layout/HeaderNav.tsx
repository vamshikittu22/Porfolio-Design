import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../contexts/NavigationContext';
import type { ChapterId } from '../../types/chapters';

// --- TYPES & INTERFACES ---
interface CrazyNavIconProps {
  name: string;
  isActive: boolean;
  isHovered: boolean;
}

// --- ENHANCED LIVE VK MONOGRAM ---
const VKIcon = ({ isHovered, isActive }: { isHovered: boolean; isActive: boolean }) => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center overflow-visible perspective-[1000px]">
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-t-accent to-transparent"
        animate={{ top: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        animate={{
          y: isHovered ? -2 : [0, -2, 0],
          rotateY: isHovered ? [0, 15, -15, 0] : 0,
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 0.5 }
        }}
        className="relative z-10 font-black text-sm tracking-[0.2em] flex items-center justify-center"
      >
        <div className="relative">
          <motion.span
            className="absolute inset-0 text-[#00FFFF] mix-blend-screen opacity-50"
            animate={isHovered ? { x: [-2, 2, -1, 0], y: [1, -1, 0] } : { x: [-0.5, 0.5, -0.5], transition: { duration: 2, repeat: Infinity } }}
          >VK</motion.span>
          <motion.span
            className="absolute inset-0 text-[#FF00FF] mix-blend-screen opacity-50"
            animate={isHovered ? { x: [2, -2, 1, 0], y: [-1, 1, 0] } : { x: [0.5, -0.5, 0.5], transition: { duration: 2.5, repeat: Infinity } }}
          >VK</motion.span>
          <span className="relative text-t-fg font-black">VK</span>
        </div>
      </motion.div>
      <motion.div
        initial={false}
        animate={{ scale: isHovered ? 1.4 : [1, 1.1, 1], opacity: isHovered ? 0.3 : 0.1, rotate: isHovered ? 180 : 0 }}
        transition={{ duration: isHovered ? 0.5 : 3, repeat: isHovered ? 0 : Infinity }}
        className={`absolute inset-0 rounded-xl border-2 ${isActive ? 'bg-t-accent-2 border-t-accent-2' : 'bg-t-accent border-t-accent'}`}
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="absolute inset-[-8px] pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-t-accent-2 rounded-full shadow-[0_0_10px_rgba(var(--color-accent-secondary-rgb),1)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- CHAPTER ICONS (reusing existing animated icons) ---
const AboutIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.circle cx="12" cy="7" r="4" animate={isHovered ? { y: [0, -2, 0], scale: [1, 1.1, 1] } : { y: 0, scale: 1 }} transition={{ duration: 0.4 }} />
    <motion.path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" animate={isHovered ? { pathLength: [1, 0.8, 1] } : { pathLength: 1 }} />
  </svg>
);

const ProjectsIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    {[{ x: 3, y: 3 }, { x: 13, y: 3 }, { x: 3, y: 13 }, { x: 13, y: 13 }].map((pos, i) => (
      <motion.rect key={i} x={pos.x} y={pos.y} width="8" height="8" rx="1.5"
        animate={isHovered ? { scale: [1, 0.8, 1.2, 1], opacity: [1, 0.6, 1] } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: i * 0.1 }}
      />
    ))}
  </svg>
);

const CareerIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <motion.rect x="2" y="7" width="20" height="13" rx="2" animate={isHovered ? { rotateX: [0, -10, 0], y: -1 } : { rotateX: 0, y: 0 }} />
    <motion.path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" animate={isHovered ? { y: -2, scale: 1.05 } : { y: 0, scale: 1 }} />
  </svg>
);

const TravelIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" animate={isHovered ? { y: [0, -2, 0] } : { y: 0 }} />
    <motion.circle cx="12" cy="10" r="3" animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: 1 }} />
  </svg>
);

const PlaylabIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path d="M10 2v7.5M14 2v7.5" animate={isHovered ? { y: [-1, 1, -1] } : { y: 0 }} />
    <motion.path d="M8.5 2h7M7 9.5h10l3 11H4l3-11z" animate={isHovered ? { scale: [1, 1.05, 1] } : { scale: 1 }} />
  </svg>
);

const ContactIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <motion.rect x="2" y="4" width="20" height="16" rx="2" animate={isHovered ? { scale: [1, 1.05, 1] } : {}} />
    <motion.path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" animate={isHovered ? { pathLength: [1, 0.8, 1] } : { pathLength: 1 }} />
  </svg>
);

const HomeIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <motion.path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" animate={isHovered ? { y: [-1, 0, -1] } : { y: 0 }} />
    <motion.polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CrazyNavIcon = ({ name, isActive, isHovered }: CrazyNavIconProps) => {
  const iconProps = { isHovered, isActive };
  switch (name) {
    case 'About': return <AboutIcon {...iconProps} />;
    case 'Career': return <CareerIcon {...iconProps} />;
    case 'Projects': return <ProjectsIcon {...iconProps} />;
    case 'Playlab': return <PlaylabIcon {...iconProps} />;
    case 'Travel': return <TravelIcon {...iconProps} />;
    case 'Contact': return <ContactIcon {...iconProps} />;
    case 'Home': return <HomeIcon {...iconProps} />;
    default: return null;
  }
};

// --- CHAPTER NAV CONFIG ---
interface ChapterNavConfig {
  chapterId: ChapterId;
  icon: string;
  label: string;
  sections: string[];
}

const CHAPTER_NAV: ChapterNavConfig[] = [
  { chapterId: '01-introduction', icon: 'About', label: 'Intro', sections: ['Hero', 'About & Skills'] },
  { chapterId: '02-builder', icon: 'Projects', label: 'Builder', sections: ['Projects', 'GitHub'] },
  { chapterId: '03-journey', icon: 'Career', label: 'Journey', sections: ['Career', 'Resume'] },
  { chapterId: '04-explorer', icon: 'Travel', label: 'Explorer', sections: ['Travel'] },
  { chapterId: '05-thinker', icon: 'Playlab', label: 'Thinker', sections: ['Game', 'AI Playground'] },
  { chapterId: '06-connection', icon: 'Contact', label: 'Connect', sections: ['Contact', 'Social'] },
];

// --- CHAPTER NAV ITEM WITH DROPDOWN ---
interface ChapterNavItemProps {
  config: ChapterNavConfig;
  isActive: boolean;
  onNavigate: (chapterId: ChapterId) => void;
}

const ChapterNavItem: React.FC<ChapterNavItemProps> = ({ config, isActive, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        onClick={() => onNavigate(config.chapterId)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        whileTap={{ scale: 0.92 }}
        aria-pressed={isActive}
        aria-label={`Navigate to ${config.label} chapter`}
        className={`group relative flex items-center justify-center w-11 h-11 lg:w-12 lg:h-12 rounded-xl transition-all duration-500 outline-none z-20 cursor-pointer
          focus-visible:ring-4 focus-visible:ring-t-accent focus-visible:ring-offset-2 focus-visible:ring-offset-t-bg
          ${isActive
            ? 'text-t-accent-2 opacity-100 shadow-[0_0_20px_rgba(var(--color-accent-secondary-rgb),0.2)]'
            : isHovered
              ? 'text-t-accent opacity-100'
              : 'text-t-fg/50 dark:text-white/50'
          }`}
      >
        <div className="relative w-5 h-5 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <CrazyNavIcon name={config.icon} isActive={isActive} isHovered={!reducedMotion && isHovered} />
        </div>

        <AnimatePresence>
          {(isHovered || isActive) && (
            <motion.div
              layoutId="nav-bg-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`absolute inset-0 rounded-xl -z-10 border ${isActive ? 'bg-t-accent-2/10 border-t-accent-2/20' : 'bg-t-accent/5 border-t-accent/10'}`}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hover dropdown: chapter label + section sub-items */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 pointer-events-none z-50"
          >
            <div className="bg-t-fg text-t-bg px-4 py-3 rounded-xl shadow-2xl border border-white/10 min-w-[130px]">
              <span className="text-[9px] font-black uppercase tracking-[0.25em] whitespace-nowrap leading-none pl-[0.25em] block mb-2">
                {config.label}
              </span>
              <div className="border-t border-white/10 pt-2 space-y-1.5">
                {config.sections.map((section) => (
                  <div key={section} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-t-accent opacity-60 shrink-0" />
                    <span className="text-[8px] font-mono uppercase tracking-wider opacity-60 whitespace-nowrap">{section}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-t-fg rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN HEADER NAV ---
interface HeaderNavProps {
  scrolled: boolean;
  activeSection: string;
  isDarkMode: boolean;
  onScrollToSection: (id: string) => void;
  onScrollToTop: () => void;
  onToggleTheme: () => void;
  onGoHome?: () => void;
  onOpenCaseStudy?: () => void;
  isCaseStudyView?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  scrolled,
  isDarkMode,
  onToggleTheme,
  onGoHome,
  isCaseStudyView
}) => {
  const [logoHovered, setLogoHovered] = useState(false);
  const { currentChapter, navigateToChapter } = useNavigation();

  const handleDownloadResumeFile = () => {
    const link = document.createElement('a');
    link.href = '/assets/downloads/Vamshi_Krishna_Resume.pdf';
    link.download = 'Vamshi_Krishna_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogoClick = () => {
    if (isCaseStudyView) {
      onGoHome?.();
    } else {
      onGoHome?.();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 lg:top-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-fit print:hidden px-4">
      <motion.div
        layout
        className={`border px-2 lg:px-4 py-1.5 rounded-[32px] flex items-center gap-1 transition-all duration-1000 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]
          ${scrolled
            ? 'bg-t-bg-el/95 dark:bg-t-bg-el/90 backdrop-blur-3xl border-t-border scale-95'
            : 'bg-t-bg-el/60 dark:bg-t-bg-el/50 backdrop-blur-2xl border-t-border/30'}`}
      >
        {/* VK Logo — returns to landing page */}
        <motion.button
          onClick={handleLogoClick}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          whileHover={{ scale: 1.05 }}
          aria-label="Return to landing page"
          className="flex items-center outline-none group relative overflow-visible mr-1 cursor-pointer focus-visible:ring-4 focus-visible:ring-t-accent focus-visible:ring-offset-2 focus-visible:ring-offset-t-bg focus-visible:rounded-xl"
        >
          <VKIcon isHovered={logoHovered} isActive={currentChapter === null && !isCaseStudyView} />
        </motion.button>

        <div className="h-6 w-px bg-t-border/20 mx-2" />

        {/* Chapter navigation icons */}
        <div className="flex items-center gap-1" role="tablist" aria-label="Chapter navigation">
          {isCaseStudyView ? (
            <ChapterNavItem
              config={{ chapterId: '01-introduction', icon: 'Home', label: 'Home', sections: ['Return to Portfolio'] }}
              isActive={false}
              onNavigate={() => onGoHome?.()}
            />
          ) : (
            CHAPTER_NAV.map((chapter) => (
              <ChapterNavItem
                key={chapter.chapterId}
                config={chapter}
                isActive={currentChapter === chapter.chapterId}
                onNavigate={(id) => navigateToChapter(id, 'jump')}
              />
            ))
          )}
        </div>

        <div className="h-6 w-px bg-t-border/20 mx-2" />

        {/* Theme toggle + Resume download */}
        <div className="flex items-center gap-2 px-1">
          <motion.button
            onClick={onToggleTheme}
            whileHover={{ scale: 1.15, rotate: 20 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            className="p-3 rounded-xl transition-all duration-500 text-t-fg/30 hover:text-t-accent hover:bg-t-accent/10 outline-none cursor-pointer focus-visible:ring-4 focus-visible:ring-t-accent focus-visible:ring-offset-2 focus-visible:ring-offset-t-bg"
          >
            {isDarkMode ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </motion.button>

          <motion.button
            onClick={handleDownloadResumeFile}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Export technical CV as PDF"
            className="bg-t-accent text-t-bg p-3 rounded-xl transition-all shadow-xl hover:shadow-t-accent/20 outline-none cursor-pointer focus-visible:ring-4 focus-visible:ring-t-accent focus-visible:ring-offset-2 focus-visible:ring-offset-t-bg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </nav>
  );
};