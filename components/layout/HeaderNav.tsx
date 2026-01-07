
import React from 'react';
import { motion } from 'framer-motion';

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  hover: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  active: { pathLength: 1, opacity: 1 }
};

interface NavIconProps {
  children: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavIconProps> = ({ children, label, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    initial="initial"
    whileHover="hover"
    animate={isActive ? "active" : "initial"}
    className={`p-3 rounded-full relative group transition-colors ${isActive ? 'text-t-accent' : 'text-t-fg/40 hover:text-t-accent'}`}
  >
    <div className="w-5 h-5 relative z-10">{children}</div>
    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-t-fg text-t-bg text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
      {label}
    </div>
  </motion.button>
);

export const HeaderNav: React.FC<any> = ({ scrolled, activeSection, onScrollToSection, onScrollToTop, onToggleTheme, isDarkMode }) => (
  <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500">
    <div className={`flex items-center gap-6 px-8 py-3 rounded-full border border-t-border backdrop-blur-2xl transition-all ${scrolled ? 'bg-t-bg-el/95 shadow-xl scale-95' : 'bg-t-bg-el/40'}`}>
      <button onClick={onScrollToTop} className="text-[10px] font-black uppercase tracking-[0.3em] mr-4">VK.</button>
      <div className="flex gap-2">
        <NavItem label="About" isActive={activeSection === 'about-section'} onClick={() => onScrollToSection('about-section')}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><motion.path variants={pathVariants} strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </NavItem>
        <NavItem label="Projects" isActive={activeSection === 'projects-section'} onClick={() => onScrollToSection('projects-section')}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><motion.path variants={pathVariants} strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </NavItem>
        <NavItem label="Resume" isActive={activeSection === 'resume-section'} onClick={() => onScrollToSection('resume-section')}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><motion.path variants={pathVariants} strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </NavItem>
      </div>
      <div className="w-px h-6 bg-t-border mx-2" />
      <button onClick={onToggleTheme} className="p-2 hover:text-t-accent transition-colors">
        {isDarkMode ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z" /></svg> : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>}
      </button>
    </div>
  </nav>
);
