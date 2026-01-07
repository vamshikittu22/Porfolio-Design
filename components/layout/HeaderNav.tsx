
import React, { useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

interface NavIconProps {
  children: (isHovered: boolean, isActive: boolean) => React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavIconProps> = ({ children, label, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Perspective Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const getColors = () => {
    if (isActive) return 'text-t-accent-2 opacity-100';
    if (isHovered) return 'text-t-accent opacity-100';
    return 'text-t-fg/20 dark:text-white/20';
  };

  return (
    <motion.button 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-500 outline-none perspective-[800px] z-20 ${getColors()}`}
      aria-label={label}
    >
      {/* 3D Icon Container */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-5 h-5 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {children(isHovered, !!isActive)}
        </div>
      </motion.div>

      {/* Swiss Label */}
      <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-500">
        {label}
      </span>

      {/* Subtle Hover Glow Background */}
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

// --- MULTI-LAYERED 3D KINETIC ICONS ---

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "circOut" } }
};

const AboutIcon = ({ hover, active }: { hover: boolean, active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transformStyle: 'preserve-3d' }}>
    <motion.path variants={pathVariants} initial="hidden" animate="visible" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <motion.circle 
      style={{ translateZ: 15 }}
      animate={{ opacity: 1, y: (hover || active) ? -2 : 0, scale: (hover || active) ? 1.2 : 1 }}
      cx="12" cy="7" r="4" 
    />
  </svg>
);

const CareerIcon = ({ hover, active }: { hover: boolean, active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transformStyle: 'preserve-3d' }}>
    <motion.rect variants={pathVariants} initial="hidden" animate="visible" x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <motion.path 
      style={{ translateZ: 12 }}
      animate={{ opacity: 1, y: (hover || active) ? -4 : 0 }}
      d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
    />
  </svg>
);

const ProjectsIcon = ({ hover, active }: { hover: boolean, active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transformStyle: 'preserve-3d' }}>
    {[
      { x: 3, y: 3, z: 5 }, { x: 14, y: 3, z: 10 },
      { x: 14, y: 14, z: 15 }, { x: 3, y: 14, z: 20 }
    ].map((pos, i) => (
      <motion.rect 
        key={i}
        style={{ translateZ: (hover || active) ? pos.z : 0 }}
        animate={{ opacity: 1, scale: (hover || active) ? 1.1 : 1 }}
        x={pos.x} y={pos.y} width="7" height="7" 
      />
    ))}
  </svg>
);

const GithubIcon = ({ hover, active }: { hover: boolean, active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transformStyle: 'preserve-3d' }}>
    <motion.path animate={{ opacity: 1, x: (hover || active) ? 2 : 0 }} d="m18 16 4-4-4-4" />
    <motion.path animate={{ opacity: 1, x: (hover || active) ? -2 : 0 }} d="m6 8-4 4 4 4" />
    <motion.path 
      style={{ translateZ: 15 }}
      animate={{ opacity: 1, rotate: (hover || active) ? 15 : 0 }} 
      d="m14.5 4-5 16" 
    />
  </svg>
);

const PlayIcon = ({ hover, active }: { hover: boolean, active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transformStyle: 'preserve-3d' }}>
    <motion.path 
      style={{ translateZ: 15 }}
      animate={{ opacity: 1, scale: (hover || active) ? 1.3 : 1, x: (hover || active) ? 2 : 0 }} 
      d="M5 3l14 9-14 9V3z" 
    />
  </svg>
);

const TravelIcon = ({ hover, active }: { hover: boolean, active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transformStyle: 'preserve-3d' }}>
    <motion.path variants={pathVariants} initial="hidden" animate="visible" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <motion.circle 
      style={{ translateZ: 20 }}
      animate={{ opacity: 1, scale: (hover || active) ? 1.5 : 1, y: (hover || active) ? -2 : 0 }} 
      cx="12" cy="10" r="3" 
    />
  </svg>
);

const ResumeIcon = ({ hover, active }: { hover: boolean, active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transformStyle: 'preserve-3d' }}>
    <motion.path variants={pathVariants} initial="hidden" animate="visible" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <motion.path style={{ translateZ: 10 }} animate={{ opacity: 1, x: (hover || active) ? 2 : 0 }} d="M16 13H8" />
  </svg>
);

const ContactIcon = ({ hover, active }: { hover: boolean, active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transformStyle: 'preserve-3d' }}>
    <motion.rect variants={pathVariants} initial="hidden" animate="visible" x="2" y="4" width="20" height="16" rx="2" />
    <motion.path 
      style={{ translateZ: 15 }}
      animate={{ opacity: 1, y: (hover || active) ? -4 : 0, scale: (hover || active) ? 1.1 : 1 }}
      d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" 
    />
  </svg>
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
  scrolled, activeSection, isDarkMode, onScrollToSection, onScrollToTop, onToggleTheme 
}) => {
  return (
    <nav className="fixed top-6 lg:top-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-fit print:hidden px-4">
      <motion.div 
        layout
        className={`border px-2.5 lg:px-4 py-1.5 rounded-[28px] flex items-center gap-1 transition-all duration-1000 shadow-2xl
          ${scrolled 
            ? 'bg-t-bg-el/95 dark:bg-t-bg-el/90 backdrop-blur-3xl border-t-border scale-95 shadow-black/10' 
            : 'bg-t-bg-el/60 dark:bg-t-bg-el/50 backdrop-blur-2xl border-t-border/30 shadow-none'}`}
      >
        {/* LOGO AREA (VK) */}
        <motion.button 
          onClick={() => onScrollToSection('hero-section')} 
          whileHover={{ scale: 1.05 }}
          className="flex items-center px-4 hidden sm:flex outline-none group relative overflow-hidden"
        >
          <motion.span 
            animate={{ 
              opacity: [0.6, 1, 0.6],
              scale: [0.98, 1, 0.98],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-[12px] font-black tracking-[0.4em] text-t-fg uppercase group-hover:text-t-accent transition-colors relative z-10"
          >
            VK
          </motion.span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-t-accent/10 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>

        <div className="h-6 w-px bg-t-border/20 mx-1 hidden sm:block" />

        <div className="flex items-center gap-0.5">
          <NavItem isActive={activeSection === 'about-section'} label="About" onClick={() => onScrollToSection('about-section')}>
            {(hover, active) => <AboutIcon hover={hover} active={active} />}
          </NavItem>

          <NavItem isActive={activeSection === 'career-snapshot-section'} label="Career" onClick={() => onScrollToSection('career-snapshot-section')}>
            {(hover, active) => <CareerIcon hover={hover} active={active} />}
          </NavItem>

          <NavItem isActive={activeSection === 'projects-section'} label="Projects" onClick={() => onScrollToSection('projects-section')}>
            {(hover, active) => <ProjectsIcon hover={hover} active={active} />}
          </NavItem>

          <NavItem isActive={activeSection === 'github-section'} label="GitHub" onClick={() => onScrollToSection('github-section')}>
            {(hover, active) => <GithubIcon hover={hover} active={active} />}
          </NavItem>

          <NavItem isActive={activeSection === 'game-section'} label="Playlab" onClick={() => onScrollToSection('game-section')}>
            {(hover, active) => <PlayIcon hover={hover} active={active} />}
          </NavItem>

          <NavItem isActive={activeSection === 'travel-section'} label="Travel" onClick={() => onScrollToSection('travel-section')}>
            {(hover, active) => <TravelIcon hover={hover} active={active} />}
          </NavItem>

          <NavItem isActive={activeSection === 'resume-section'} label="Resume" onClick={() => onScrollToSection('resume-section')}>
            {(hover, active) => <ResumeIcon hover={hover} active={active} />}
          </NavItem>

          <NavItem isActive={activeSection === 'contact-section'} label="Contact" onClick={() => onScrollToSection('contact-section')}>
            {(hover, active) => <ContactIcon hover={hover} active={active} />}
          </NavItem>
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
