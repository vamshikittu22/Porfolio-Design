import React from 'react';
import { motion } from 'framer-motion';

interface NavIconProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: (e: any) => void;
}

const NavIcon: React.FC<NavIconProps> = ({ icon, label, isActive, onClick }) => (
  <motion.button 
    onClick={onClick}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e); }}
    whileHover={{ scale: 1.15, y: -2 }}
    whileTap={{ scale: 0.9 }}
    className={`group relative flex items-center justify-center p-2.5 rounded-full transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-t-accent ${isActive ? 'bg-t-accent text-t-bg' : 'hover:text-t-accent-2'}`}
    aria-label={label}
  >
    <div className="w-5 h-5">{icon}</div>
    <div 
      role="tooltip"
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-3 py-1 bg-t-fg text-t-bg text-[8px] font-black uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[200] flex flex-col items-center shadow-lg"
    >
      <div className="w-2 h-2 bg-t-fg rotate-45 -translate-y-[8px]" />
      <span className="-translate-y-1">{label}</span>
    </div>
  </motion.button>
);

interface HeaderNavProps {
  scrolled: boolean;
  activeSection: string;
  isDarkMode: boolean;
  onScrollToSection: (id: string) => void;
  onScrollToTop: () => void;
  onToggleTheme: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ 
  scrolled, 
  activeSection, 
  isDarkMode, 
  onScrollToSection, 
  onScrollToTop, 
  onToggleTheme 
}) => {
  return (
    <nav className={`fixed top-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit print:hidden transition-all duration-500`}>
      <motion.div 
        layout
        className={`border border-t-border px-6 lg:px-10 py-2.5 rounded-full flex items-center gap-8 transition-all duration-500 shadow-xl ${scrolled ? 'bg-t-bg-el/98 backdrop-blur-[48px] scale-95 border-t-accent/30' : 'bg-t-bg-el/85 backdrop-blur-2xl'}`}
      >
        <button onClick={onScrollToTop} className="flex flex-col items-start leading-none group text-left">
          <span className="text-[10px] font-black tracking-[0.4em] text-t-fg uppercase">Vamshi Krishna</span>
        </button>
        <div className="h-4 w-px bg-t-border mx-2" />
        <div className="flex gap-2 items-center">
          <NavIcon isActive={activeSection === 'about-section'} label="About" onClick={() => onScrollToSection('about-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
          <NavIcon isActive={activeSection === 'career-snapshot-section'} label="Career" onClick={() => onScrollToSection('career-snapshot-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          <NavIcon isActive={activeSection === 'projects-section'} label="Projects" onClick={() => onScrollToSection('projects-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
          <NavIcon isActive={activeSection === 'github-section'} label="GitHub" onClick={() => onScrollToSection('github-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>} />
          <NavIcon isActive={activeSection === 'resume-section'} label="Resume" onClick={() => onScrollToSection('resume-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
          <NavIcon isActive={activeSection === 'game-section'} label="Playlab" onClick={() => onScrollToSection('game-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 011 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>} />
          <NavIcon isActive={activeSection === 'travel-section'} label="Travel" onClick={() => onScrollToSection('travel-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
          <NavIcon isActive={activeSection === 'contact-section'} label="Contact" onClick={() => onScrollToSection('contact-section')} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>} />
        </div>
        <div className="h-4 w-px bg-t-border mx-2" />
        <div className="flex items-center gap-3">
          <motion.button 
            onClick={onToggleTheme} 
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-full hover:text-t-accent-2 transition-colors duration-300 text-t-fg/60 outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
          >
            {isDarkMode ? (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>) : (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>)}
          </motion.button>
          <motion.button 
            onClick={() => window.print()} 
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="bg-t-accent-2 text-t-bg p-2.5 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-t-accent-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </motion.button>
        </div>
      </motion.div>
    </nav>
  );
};
