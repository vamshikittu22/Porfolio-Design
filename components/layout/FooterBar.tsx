
import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  FULL_NAME,
  GITHUB_USERNAME,
  LINKEDIN_URL,
  X_URL,
  INSTAGRAM_URL,
  EMAIL,
  X_HANDLE,
  INSTAGRAM_HANDLE
} from '../../config/constants';
import { GlassButton } from '../ui/GlassUI';

interface SocialOrbData {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: React.ReactNode;
  gradient: [string, string, string];
  shadows: { light: string; dark: string };
}

const SOCIAL_PLATFORMS: SocialOrbData[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: GITHUB_USERNAME,
    url: `https://github.com/${GITHUB_USERNAME}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.362.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    gradient: ['#24292e', '#1a1e22', '#010409'],
    shadows: { light: 'rgba(255,255,255,0.1)', dark: 'rgba(0,0,0,0.9)' }
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'v-pullaiahgari',
    url: LINKEDIN_URL,
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    gradient: ['#0A66C2', '#004182', '#002c59'],
    shadows: { light: 'rgba(10,102,194,0.4)', dark: 'rgba(0,0,0,0.8)' }
  },
  {
    id: 'x',
    label: 'X',
    handle: X_HANDLE,
    url: X_URL,
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
      </svg>
    ),
    gradient: ['#14171A', '#000000', '#000000'],
    shadows: { light: 'rgba(255,255,255,0.05)', dark: 'rgba(0,0,0,0.95)' }
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: INSTAGRAM_HANDLE,
    url: INSTAGRAM_URL,
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    gradient: ['#833ab4', '#fd1d1d', '#fcb045'],
    shadows: { light: 'rgba(253,29,29,0.4)', dark: 'rgba(0,0,0,0.8)' }
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'hello@vamshi',
    url: `mailto:${EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" />
      </svg>
    ),
    gradient: ['#EA4335', '#C5221F', '#B31412'],
    shadows: { light: 'rgba(234,67,53,0.4)', dark: 'rgba(0,0,0,0.8)' }
  }
];

interface FooterBarProps {
  onScrollToTop: () => void;
  onOpenCaseStudy?: () => void;
}

const AnimatedName: React.FC<{ name: string; isHovered: boolean }> = ({ name, isHovered }) => {
  const characters = name.split('');
  return (
    <span className="inline-flex">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={{
            y: isHovered ? [0, -3, 0] : [0, 1.5, 0],
            color: isHovered ? 'var(--color-accent)' : 'var(--color-fg)',
          }}
          transition={{
            y: {
              duration: isHovered ? 0.6 : 3,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut"
            },
            color: { duration: 0.3 }
          }}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export const FooterBar: React.FC<FooterBarProps> = ({ onScrollToTop, onOpenCaseStudy }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || window.innerWidth < 768) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleOrbClick = (id: string, url: string) => {
    if (flippedId === id) {
      window.open(url, '_blank');
      setFlippedId(null);
    } else {
      setFlippedId(id);
      setTimeout(() => setFlippedId(null), 8000);
    }
  };

  return (
    <footer className="relative py-12 px-6 lg:px-20 print:hidden overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[50%] h-px bg-gradient-to-r from-transparent via-t-accent/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute -bottom-24 left-0 w-96 h-96 bg-t-accent/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 right-0 w-96 h-96 bg-t-accent-2/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto bg-t-bg-el/40 backdrop-blur-[32px] border border-t-border rounded-[48px] p-6 lg:p-12 relative z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12 mb-10">
          <motion.div
            className="group cursor-pointer flex flex-col items-center md:items-start text-center md:text-left relative"
            onClick={onScrollToTop}
            onMouseEnter={() => setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
            role="button"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-4 mb-2 relative">
              <motion.div
                className="w-8 h-8 rounded-xl bg-t-accent flex items-center justify-center text-white font-black text-xs shadow-md z-10"
                animate={isTitleHovered ? {
                  rotate: 12,
                  scale: 1.1,
                  backgroundColor: 'var(--color-accent-secondary)',
                  boxShadow: '0 0 20px rgba(var(--color-accent-secondary-rgb), 0.4)'
                } : {
                  rotate: 0,
                  scale: 1,
                  boxShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.2)'
                }}
              >
                VK
              </motion.div>

              <div className="relative">
                <h4 className="text-2xl lg:text-3xl font-black font-display text-t-fg uppercase tracking-tighter leading-none relative z-20">
                  <AnimatedName name={`${FULL_NAME}.`} isHovered={isTitleHovered} />
                </h4>

                <AnimatePresence>
                  {isTitleHovered && (
                    <motion.h4
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{ opacity: 0.15, x: 3, y: 2 }}
                      exit={{ opacity: 0, x: 0, y: 0 }}
                      className="absolute inset-0 text-2xl lg:text-3xl font-black font-display text-t-accent uppercase tracking-tighter leading-none z-10 select-none pointer-events-none"
                    >
                      {FULL_NAME}.
                    </motion.h4>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.p
              className="text-[7px] font-black text-t-fg-m uppercase tracking-[0.5em] mt-1 relative"
              animate={isTitleHovered ? { opacity: 0.9, x: 4 } : { opacity: 0.5, x: 0 }}
            >
              Fullstack software developer
              <motion.span
                className="absolute -bottom-1 left-0 h-[1.5px] bg-t-accent-2"
                initial={{ width: 0 }}
                animate={isTitleHovered ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.6 }}
              />
            </motion.p>
          </motion.div>

          <div className="flex flex-wrap justify-center md:justify-end gap-6 lg:gap-10 perspective-[1500px]">
            {SOCIAL_PLATFORMS.map((orb, index) => (
              <SocialOrb
                key={orb.id}
                data={orb}
                index={index}
                mousePos={mousePos}
                containerRef={containerRef}
                isFlipped={flippedId === orb.id}
                onClick={() => handleOrbClick(orb.id, orb.url)}
                reducedMotion={prefersReducedMotion || false}
              />
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-t-border/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-t-fg-m opacity-60">
                © 2025 <span className="text-t-fg font-bold tracking-widest">{FULL_NAME}</span>
              </div>
            </div>
            {onOpenCaseStudy && (
              <button
                onClick={onOpenCaseStudy}
                className="flex items-center gap-2 group outline-none"
              >
                <div className="w-8 h-8 rounded-lg bg-t-accent/10 border border-t-accent/20 flex items-center justify-center text-t-accent transition-all group-hover:bg-t-accent group-hover:text-t-bg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-t-fg-m hover:text-t-accent transition-colors">Engineering Blueprint</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-[8px] font-black uppercase tracking-[0.2em] text-t-fg-m opacity-50">
            <span className="hover:text-t-accent transition-colors cursor-help">Built with Precision</span>
            <div className="w-0.5 h-0.5 rounded-full bg-t-border" />
            <span className="hover:text-t-accent-2 transition-colors cursor-help">Gemini Integrated</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

const SocialOrb: React.FC<{
  data: SocialOrbData;
  index: number;
  mousePos: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
  isFlipped: boolean;
  onClick: () => void;
  reducedMotion: boolean;
}> = ({ data, index, mousePos, containerRef, isFlipped, onClick, reducedMotion }) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion || window.innerWidth < 768 || !orbRef.current || !containerRef.current) return;

    const updateMagnetic = () => {
      const rect = orbRef.current!.getBoundingClientRect();
      const parentRect = containerRef.current!.getBoundingClientRect();

      const orbCenter = {
        x: rect.left + rect.width / 2 - parentRect.left,
        y: rect.top + rect.height / 2 - parentRect.top
      };

      const dx = mousePos.x - orbCenter.x;
      const dy = mousePos.y - orbCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 200) {
        const power = Math.pow(1 - distance / 200, 1.5);
        setMagneticPos({
          x: (dx / distance) * power * 25,
          y: (dy / distance) * power * 25
        });
      } else {
        setMagneticPos({ x: 0, y: 0 });
      }
    };

    const frameId = requestAnimationFrame(updateMagnetic);
    return () => cancelAnimationFrame(frameId);
  }, [mousePos, containerRef, reducedMotion]);

  return (
    <div className="flex flex-col items-center gap-4 group">
      <motion.div
        ref={orbRef}
        className="relative w-12 h-12 lg:w-16 lg:h-16 cursor-pointer perspective-[1200px]"
        onClick={onClick}
        animate={{
          x: magneticPos.x,
          y: magneticPos.y,
          scale: isFlipped ? 1.1 : 1
        }}
        transition={{ type: "spring", stiffness: 220, damping: 15, mass: 0.6 }}
      >
        <motion.div
          className="w-full h-full relative transition-transform duration-[1000ms]"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden p-3 lg:p-4"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${data.gradient[0]}, ${data.gradient[1]} 60%, ${data.gradient[2]})`,
              boxShadow: `
                inset 8px 8px 16px -4px rgba(255,255,255,0.15),
                inset -8px -8px 24px -4px rgba(0,0,0,0.5),
                0 15px 30px -8px ${data.shadows.dark}
              `,
              backfaceVisibility: 'hidden',
              transform: 'translateZ(15px)',
              color: 'white'
            }}
          >
            <div className="absolute top-1.5 left-3 w-1/2 h-1/3 bg-white/20 blur-xl rounded-full pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

            <div className="w-full h-full drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] z-10">
              {data.icon}
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-full bg-t-bg-el/98 backdrop-blur-2xl border-2 border-t-accent/60 flex flex-col items-center justify-center p-3 text-center shadow-inner overflow-hidden"
            style={{
              transform: 'rotateY(180deg) translateZ(15px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-t-accent/10 to-transparent pointer-events-none" />
            <span className="text-[5px] font-black uppercase tracking-[0.1em] text-t-accent-2 mb-0.5 relative z-10">
              {data.label}
            </span>
            <span className="text-[8px] font-bold text-t-fg break-all leading-tight w-full px-0.5 relative z-10 tracking-tight">
              @{data.handle}
            </span>
            <div className="mt-1.5 w-3.5 h-3.5 rounded-full bg-t-accent/20 flex items-center justify-center">
              <svg className="w-2 h-2 text-t-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7M5 12h16" /></svg>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <span className="text-[7px] font-black uppercase tracking-[0.3em] text-t-fg-m opacity-60 group-hover:opacity-100 group-hover:text-t-accent transition-all duration-500 group-hover:translate-y-1">
        {data.handle}
      </span>
    </div>
  );
};

export default FooterBar;
