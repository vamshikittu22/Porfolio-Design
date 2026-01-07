
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence, useAnimation } from 'framer-motion';

// --- TYPES & INTERFACES ---
interface CrazyNavIconProps {
  name: string;
  isActive: boolean;
  isHovered: boolean;
}

// --- CRAZY ICON COMPONENTS (SVG + Framer Motion) ---

const VKIcon = ({ isHovered, isActive }: { isHovered: boolean; isActive: boolean }) => (
  <div className="relative w-8 h-8 flex items-center justify-center overflow-visible">
    <motion.div
      animate={isHovered ? {
        x: [0, -4, 4, -2, 0],
        filter: [
          'none',
          'drop-shadow(-2px 0px 0px #7C3AED) drop-shadow(2px 0px 0px #F97316)',
          'drop-shadow(2px 0px 0px #7C3AED) drop-shadow(-2px 0px 0px #F97316)',
          'none'
        ]
      } : { x: 0, filter: 'none' }}
      transition={{ duration: 0.2, repeat: isHovered ? Infinity : 0 }}
      className="relative z-10 font-black text-xs tracking-widest text-t-fg"
    >
      <motion.span 
        animate={isHovered ? { y: [-1, 1, -1] } : { y: 0 }}
        className="inline-block"
      >V</motion.span>
      <motion.span 
        animate={isHovered ? { y: [1, -1, 1] } : { y: 0 }}
        className="inline-block"
      >K</motion.span>
    </motion.div>
    
    <motion.div 
      initial={false}
      animate={isHovered || isActive ? { scale: 1.2, opacity: 0.1 } : { scale: 1, opacity: 0.05 }}
      className="absolute inset-0 bg-t-accent rounded-lg"
    />
    
    {/* Glitch fragments */}
    <AnimatePresence>
      {isHovered && (
        <>
          <motion.div 
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 0.5, x: -15 }}
            exit={{ opacity: 0, x: 0 }}
            className="absolute h-px w-4 bg-t-accent top-2 left-0"
          />
          <motion.div 
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 0.5, x: 15 }}
            exit={{ opacity: 0, x: 0 }}
            className="absolute h-px w-3 bg-t-accent-2 bottom-3 right-0"
          />
        </>
      )}
    </AnimatePresence>
  </div>
);

const AboutIcon = ({ isHovered, isActive }: { isHovered: boolean; isActive: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.circle 
      cx="12" cy="7" r="4"
      animate={isHovered ? {
        y: [0, -10, 0],
        scale: [1, 0.5, 1],
        opacity: [1, 0, 1]
      } : { y: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    />
    <motion.path 
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" 
      animate={isHovered ? {
        pathLength: [1, 0, 1],
        rotate: [0, 10, -10, 0]
      } : { pathLength: 1, rotate: 0 }}
    />
  </svg>
);

const ProjectsIcon = ({ isHovered, isActive }: { isHovered: boolean; isActive: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
    {[
      { x: 3, y: 3, dx: -5, dy: -5 }, { x: 13, y: 3, dx: 5, dy: -5 },
      { x: 3, y: 13, dx: -5, dy: 5 }, { x: 13, y: 13, dx: 5, dy: 5 }
    ].map((pos, i) => (
      <motion.rect 
        key={i}
        x={pos.x} y={pos.y} width="8" height="8" rx="1"
        animate={isHovered ? {
          x: [pos.x, pos.x + pos.dx, pos.x],
          y: [pos.y, pos.y + pos.dy, pos.y],
          rotate: [0, 90, 0],
          scale: [1, 1.2, 1]
        } : { x: pos.x, y: pos.y, rotate: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: i * 0.05 }}
      />
    ))}
  </svg>
);

const GitHubIcon = ({ isHovered, isActive }: { isHovered: boolean; isActive: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
    <motion.path 
      d="M16 18l6-6-6-6" 
      animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
    />
    <motion.path 
      d="M8 6l-6 6 6 6" 
      animate={isHovered ? { x: [0, -5, 0] } : { x: 0 }}
    />
    <motion.path 
      d="M13 4l-2 16"
      animate={isHovered ? {
        opacity: [1, 0, 1],
        y: [-2, 2, -2],
        rotate: [0, 360, 0]
      } : { opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.5 }}
    />
  </svg>
);

const CareerIcon = ({ isHovered, isActive }: { isHovered: boolean; isActive: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
    <motion.rect 
      x="2" y="7" width="20" height="14" rx="2"
      animate={isHovered ? {
        scaleY: [1, 0.8, 1.1, 1],
        y: [0, 2, -2, 0]
      } : { scaleY: 1, y: 0 }}
    />
    <motion.path 
      d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
      animate={isHovered ? {
        y: [0, -8, 0],
        opacity: [1, 0.5, 1]
      } : { y: 0, opacity: 1 }}
    />
    {isHovered && [1, 2, 3].map(i => (
      <motion.circle 
        key={i}
        cx={12} cy={14} r="1"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: -20, x: (i - 2) * 10 }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
        fill="currentColor"
        stroke="none"
      />
    ))}
  </svg>
);

const PlaylabIcon = ({ isHovered, isActive }: { isHovered: boolean; isActive: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
    <motion.path 
      d="M10 2v7.5M14 2v7.5"
      animate={isHovered ? { y: [0, -2, 0] } : { y: 0 }}
    />
    <motion.path 
      d="M8.5 2h7M7 9.5h10l3 11H4l3-11z"
      animate={isHovered ? {
        scale: [1, 1.1, 0.9, 1],
        rotate: [0, 5, -5, 0]
      } : { scale: 1, rotate: 0 }}
    />
    {isHovered && [1, 2, 3].map(i => (
      <motion.circle 
        key={i}
        cx={8 + i * 3} cy={16} r="1.5"
        animate={{
          y: [-2, -8, -12],
          opacity: [0, 1, 0],
          scale: [0.5, 1.2, 0.8]
        }}
        transition={{ repeat: Infinity, duration: 1, delay: i * 0.3 }}
        fill="currentColor"
        stroke="none"
      />
    ))}
  </svg>
);

const TravelIcon = ({ isHovered, isActive }: { isHovered: boolean; isActive: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
    <motion.path 
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
      animate={isHovered ? {
        scale: [1, 0.8, 1],
        y: [0, -5, 0]
      } : { scale: 1, y: 0 }}
    />
    <motion.circle 
      cx="12" cy="10" r="3"
      animate={isHovered ? {
        scale: [1, 2, 0, 1],
        opacity: [1, 0.5, 0, 1]
      } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
    {isHovered && (
      <motion.path 
        d="M12 10l8-8" 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0], x: 20, y: -20 }}
        transition={{ duration: 0.6 }}
      />
    )}
  </svg>
);

const ResumeIcon = ({ isHovered, isActive }: { isHovered: boolean; isActive: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
    <motion.path 
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      animate={isHovered ? {
        skewX: [0, 10, -10, 0],
        scale: [1, 0.9, 1.1, 1]
      } : { skewX: 0, scale: 1 }}
    />
    <motion.path 
      d="M14 2v6h6"
      animate={isHovered ? {
        rotate: [0, 90, 0],
        scale: [1, 1.5, 1]
      } : { rotate: 0, scale: 1 }}
    />
  </svg>
);

const ContactIcon = ({ isHovered, isActive }: { isHovered: boolean; isActive: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2">
    <AnimatePresence mode="wait">
      {isHovered ? (
        <motion.path
          key="plane"
          initial={{ pathLength: 0, x: -10, y: 10, opacity: 0 }}
          animate={{ pathLength: 1, x: 20, y: -20, opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          d="M3 21l18-18M3 21l8-2M3 21l2-8"
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ) : (
        <motion.rect
          key="mail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          x="2" y="4" width="20" height="16" rx="2"
        />
      )}
    </AnimatePresence>
    {!isHovered && (
      <motion.path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    )}
  </svg>
);

const CrazyNavIcon = ({ name, isActive, isHovered }: CrazyNavIconProps) => {
  const iconProps = { isHovered, isActive };
  
  switch (name) {
    case 'About': return <AboutIcon {...iconProps} />;
    case 'Career': return <CareerIcon {...iconProps} />;
    case 'Projects': return <ProjectsIcon {...iconProps} />;
    case 'GitHub': return <GitHubIcon {...iconProps} />;
    case 'Playlab': return <PlaylabIcon {...iconProps} />;
    case 'Travel': return <TravelIcon {...iconProps} />;
    case 'Resume': return <ResumeIcon {...iconProps} />;
    case 'Contact': return <ContactIcon {...iconProps} />;
    default: return null;
  }
};

interface NavItemProps {
  name: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ name, label, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.button 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileTap={{ scale: 0.96 }}
      className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-500 outline-none z-20
        ${isActive ? 'text-t-accent-2 opacity-100' : isHovered ? 'text-t-accent opacity-100' : 'text-t-fg/20 dark:text-white/20'}`}
      aria-label={label}
    >
      <div className="relative w-5 h-5 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <CrazyNavIcon name={name} isActive={isActive} isHovered={!reducedMotion && isHovered} />
      </div>

      <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-500">
        {label}
      </span>

      <AnimatePresence>
        {(isHovered || isActive) && (
          <motion.div 
            layoutId="nav-bg-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 rounded-xl -z-10 border ${isActive ? 'bg-t-accent-2/5 border-t-accent-2/10' : 'bg-t-accent/5 border-t-accent/10'}`}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

interface HeaderNavProps {
  scrolled: boolean;
  activeSection: string;
  isDarkMode: boolean;
  onScrollToSection: (id: string) => void;
  onScrollToTop: () => void;
  onToggleTheme: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ 
  scrolled, activeSection, isDarkMode, onScrollToSection, onScrollToTop, onToggleTheme 
}) => {
  const [logoHovered, setLogoHovered] = useState(false);

  return (
    <nav className="fixed top-6 lg:top-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-fit print:hidden px-4">
      <motion.div 
        layout
        className={`border px-2.5 lg:px-4 py-1.5 rounded-[28px] flex items-center gap-1 transition-all duration-1000 shadow-2xl
          ${scrolled 
            ? 'bg-t-bg-el/95 dark:bg-t-bg-el/90 backdrop-blur-3xl border-t-border scale-95 shadow-black/10' 
            : 'bg-t-bg-el/60 dark:bg-t-bg-el/50 backdrop-blur-2xl border-t-border/30 shadow-none'}`}
      >
        {/* LOGO AREA (VK) with Glitch/Split Animation */}
        <motion.button 
          onClick={() => onScrollToSection('hero-section')} 
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          whileHover={{ scale: 1.05 }}
          className="flex items-center px-2 hidden sm:flex outline-none group relative overflow-visible"
        >
          <VKIcon isHovered={logoHovered} isActive={activeSection === 'hero-section'} />
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-t-accent/10 to-transparent pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>

        <div className="h-6 w-px bg-t-border/20 mx-1 hidden sm:block" />

        <div className="flex items-center gap-0.5">
          <NavItem name="About" label="About" isActive={activeSection === 'about-section'} onClick={() => onScrollToSection('about-section')} />
          <NavItem name="Career" label="Career" isActive={activeSection === 'career-snapshot-section'} onClick={() => onScrollToSection('career-snapshot-section')} />
          <NavItem name="Projects" label="Projects" isActive={activeSection === 'projects-section'} onClick={() => onScrollToSection('projects-section')} />
          <NavItem name="GitHub" label="GitHub" isActive={activeSection === 'github-section'} onClick={() => onScrollToSection('github-section')} />
          <NavItem name="Playlab" label="Playlab" isActive={activeSection === 'game-section'} onClick={() => onScrollToSection('game-section')} />
          <NavItem name="Travel" label="Travel" isActive={activeSection === 'travel-section'} onClick={() => onScrollToSection('travel-section')} />
          <NavItem name="Resume" label="Resume" isActive={activeSection === 'resume-section'} onClick={() => onScrollToSection('resume-section')} />
          <NavItem name="Contact" label="Contact" isActive={activeSection === 'contact-section'} onClick={() => onScrollToSection('contact-section')} />
        </div>

        <div className="h-6 w-px bg-t-border/20 mx-1" />

        <div className="flex items-center gap-1.5 px-1">
          <motion.button 
            onClick={onToggleTheme} 
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="p-2.5 rounded-xl transition-all duration-500 text-t-fg/30 hover:text-t-accent"
          >
            {isDarkMode ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </motion.button>
          
          <motion.button 
            onClick={() => window.print()} 
            whileHover={{ scale: 1.1, y: -2 }}
            className="bg-t-accent text-t-bg p-2.5 rounded-xl transition-all shadow-lg"
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
