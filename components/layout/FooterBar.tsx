
import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  FULL_NAME, 
  GITHUB_USERNAME, 
  LINKEDIN_URL, 
  X_URL, 
  INSTAGRAM_URL, 
  EMAIL 
} from '../../config/constants';

interface SocialOrbData {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: string;
  gradient: [string, string, string];
  shadows: { light: string; dark: string };
}

const SOCIAL_PLATFORMS: SocialOrbData[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: GITHUB_USERNAME,
    url: `https://github.com/${GITHUB_USERNAME}`,
    icon: '⚡',
    gradient: ['#4B5563', '#1F2937', '#111827'],
    shadows: { light: 'rgba(255,255,255,0.1)', dark: 'rgba(0,0,0,0.4)' }
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'vamshi-krishna',
    url: LINKEDIN_URL,
    icon: '◆',
    gradient: ['#3B82F6', '#2563EB', '#1E40AF'],
    shadows: { light: 'rgba(59,130,246,0.3)', dark: 'rgba(0,0,0,0.5)' }
  },
  {
    id: 'x',
    label: 'X',
    handle: 'ki22u__',
    url: X_URL,
    icon: '✕',
    gradient: ['#334155', '#1E293B', '#020617'],
    shadows: { light: 'rgba(255,255,255,0.05)', dark: 'rgba(0,0,0,0.7)' }
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: 'vamshi._.ki22u',
    url: INSTAGRAM_URL,
    icon: '◉',
    gradient: ['#F43F5E', '#D946EF', '#FB923C'],
    shadows: { light: 'rgba(244,63,94,0.3)', dark: 'rgba(0,0,0,0.5)' }
  },
  {
    id: 'email',
    label: 'Email',
    handle: EMAIL,
    url: `mailto:${EMAIL}`,
    icon: '✉',
    gradient: ['#EF4444', '#DC2626', '#991B1B'],
    shadows: { light: 'rgba(239,68,68,0.3)', dark: 'rgba(0,0,0,0.5)' }
  }
];

interface FooterBarProps {
  onScrollToTop: () => void;
}

export const FooterBar: React.FC<FooterBarProps> = ({ onScrollToTop }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const flipTimerRef = useRef<number | null>(null);
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
      return;
    }

    setFlippedId(id);
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    flipTimerRef.current = window.setTimeout(() => {
      setFlippedId(null);
    }, 3000);
  };

  const handleMouseLeave = () => {
    setFlippedId(null);
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
  };

  return (
    <footer 
      className="relative py-12 px-6 lg:px-20 print:hidden overflow-hidden"
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-48 h-48 bg-t-accent/10 blur-[80px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-t-accent-2/10 blur-[80px] rounded-full" />
      </div>

      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto bg-t-bg-el/40 backdrop-blur-3xl border border-t-border rounded-[32px] overflow-hidden shadow-2xl p-6 lg:p-10"
      >
        {/* Compact Header & Socials Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Left Side: Clickable Name */}
          <div 
            className="group cursor-pointer flex flex-col items-center md:items-start" 
            onClick={onScrollToTop}
            role="button"
            aria-label="Scroll to top of page"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onScrollToTop()}
          >
            <h4 className="text-xl lg:text-2xl font-black font-display text-t-fg uppercase tracking-tighter leading-none transition-colors group-hover:text-t-accent">
              {FULL_NAME}.
            </h4>
            <div className="h-0.5 w-0 bg-t-accent transition-all duration-500 group-hover:w-full mt-1" />
          </div>

          {/* Right Side: Social Icons Row */}
          <div 
            className="flex flex-wrap justify-center md:justify-end gap-5 lg:gap-6 perspective-[2000px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
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

        {/* Bottom Meta Section */}
        <div className="pt-6 mt-6 border-t border-t-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-t-fg-m opacity-50">
            © 2026 <span className="text-t-fg font-bold ml-1">{FULL_NAME}</span>
          </div>
          
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-t-fg-m opacity-50">
            Built with <span className="text-t-accent">React 19</span> + <span className="text-t-accent-2">Gemini AI</span>
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
  containerRef: React.RefObject<HTMLDivElement>;
  isFlipped: boolean;
  onClick: () => void;
  reducedMotion: boolean;
}> = ({ data, index, mousePos, containerRef, isFlipped, onClick, reducedMotion }) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion || window.innerWidth < 768 || !orbRef.current) return;

    const calculateMagnetic = () => {
      const rect = orbRef.current!.getBoundingClientRect();
      const parentRect = containerRef.current!.getBoundingClientRect();
      
      const orbCenter = {
        x: rect.left + rect.width / 2 - parentRect.left,
        y: rect.top + rect.height / 2 - parentRect.top
      };

      const dx = mousePos.x - orbCenter.x;
      const dy = mousePos.y - orbCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const power = 1 - distance / 150;
        setMagneticPos({
          x: (dx / distance) * power * 12,
          y: (dy / distance) * power * 12
        });
      } else {
        setMagneticPos({ x: 0, y: 0 });
      }
    };

    calculateMagnetic();
  }, [mousePos, containerRef, reducedMotion]);

  return (
    <div className="flex flex-col items-center gap-2 group">
      <motion.div
        ref={orbRef}
        className="relative w-10 h-10 lg:w-14 lg:h-14 cursor-pointer outline-none perspective-[1000px]"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
        aria-label={`Visit my ${data.label} profile`}
        animate={{
          x: magneticPos.x,
          y: magneticPos.y,
          scale: isFlipped ? 1.05 : 1
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.8 }}
      >
        <motion.div
          className="w-full h-full relative transition-transform duration-700"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Face */}
          <motion.div
            className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${data.gradient[0]}, ${data.gradient[1]}, ${data.gradient[2]})`,
              boxShadow: `
                inset 2px 2px 4px ${data.shadows.light},
                inset -2px -2px 4px ${data.shadows.dark},
                4px 8px 16px -4px ${data.shadows.dark}
              `,
              backfaceVisibility: 'hidden'
            }}
            animate={reducedMotion ? {} : {
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2
            }}
            whileHover={{ 
              scale: 1.1,
              rotateX: 10,
              rotateZ: -5,
              boxShadow: `0 10px 20px -5px ${data.shadows.dark}`
            }}
          >
            <div className="absolute top-2 left-2 w-1/3 h-1/3 rounded-full bg-white/20 blur-lg pointer-events-none" />
            <span className="text-lg lg:text-2xl text-white drop-shadow-md z-10 select-none">
              {data.icon}
            </span>
          </motion.div>

          {/* Back Face */}
          <motion.div
            className="absolute inset-0 rounded-full bg-t-bg-el/90 backdrop-blur-xl border border-t-accent/40 flex flex-col items-center justify-center p-2 text-center shadow-inner"
            style={{ 
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden'
            }}
          >
            <span className="text-[6px] font-black uppercase tracking-[0.1em] text-t-fg-m mb-0.5 truncate w-full">
              {data.label}
            </span>
            <span className="text-[8px] font-bold text-t-fg truncate w-full mb-1">
              {data.handle.split('.')[0]}
            </span>
            <span className="text-t-accent text-xs">→</span>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <span className="text-[7px] font-black uppercase tracking-[0.2em] text-t-fg-m opacity-30 group-hover:opacity-100 transition-opacity">
        {data.label}
      </span>
    </div>
  );
};

export default FooterBar;
