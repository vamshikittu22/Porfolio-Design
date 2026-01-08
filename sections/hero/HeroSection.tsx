import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GlassButton } from '../../components/ui/GlassUI';
import { HeroTitle } from './HeroTitle';
import { NameBackground } from './NameBackground';

interface HeroProps {
  image: string | null;
  loading: boolean;
  onScroll: (id: string) => void;
}

export const HeroSection: React.FC<HeroProps> = ({ image, loading, onScroll }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  // Subtle tilt for the container
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);
  
  // Parallax movement for the image inside the frame
  const imageTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]);
  const imageTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen flex items-center justify-center py-20 mb-[20rem] lg:mb-[30rem] print:hidden overflow-visible"
      onMouseMove={handleMouseMove}
    >
      {/* BACKGROUND DATA LAYER */}
      <div className="absolute inset-0 z-0">
        <NameBackground />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-12 lg:gap-24 items-center w-full relative z-20">
        
        {/* TEXT CONTENT (LEFT COLUMN) */}
        <div className="space-y-16 animate-in fade-in slide-in-from-left duration-1000">
          
          {/* Header Row: Title and Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-t-accent" />
              <span className="text-[10px] font-black uppercase tracking-[1em] text-t-accent">Systems Architect</span>
            </div>
            <HeroTitle />
          </div>
          
          <div className="grid lg:grid-cols-[1fr_0.7fr] gap-12 items-start">
            {/* Description Column */}
            <div className="max-w-xl space-y-8">
              <p className="text-xl lg:text-3xl text-t-fg font-medium leading-tight tracking-tight text-balance">
                Architecting <span className="text-t-accent">high-performance</span> digital ecosystems with Swiss precision and AI integration.
              </p>
            </div>
            
            {/* CTA Column */}
            <div className="flex flex-col gap-6 relative">
              {/* STAGGERED BUTTONS (Steps Design) */}
              <motion.div whileHover={{ x: 5 }}>
                <GlassButton 
                  primary 
                  accent="theme" 
                  className="!px-8 !py-4 !text-[10px] group shadow-2xl w-full" 
                  onClick={() => onScroll('projects-section')}
                >
                  Launch Projects
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path d="M14 5l7 7-7 7M5 12h16" />
                  </svg>
                </GlassButton>
              </motion.div>
              
              <motion.div whileHover={{ x: 5 }} className="lg:ml-10">
                <GlassButton 
                  accent="secondary" 
                  className="!px-8 !py-4 !text-[10px] hover:bg-t-accent-2/5 w-full whitespace-nowrap" 
                  onClick={() => window.print()}
                >
                  Technical CV
                </GlassButton>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="lg:ml-20">
                <GlassButton 
                  accent="theme" 
                  className="!px-8 !py-4 !text-[10px] hover:bg-t-accent/5 w-full whitespace-nowrap" 
                  onClick={() => onScroll('contact-section')}
                >
                  Contact Me
                </GlassButton>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* HERO IMAGE PORTAL (RIGHT COLUMN) */}
        <div className="relative flex flex-col gap-10 items-center lg:items-end justify-center perspective-[2000px]">
          
          {/* HUD METADATA */}
          <div className="w-full max-w-sm space-y-4 animate-in fade-in slide-in-from-right duration-1000 delay-300">
            <div className="h-[1.5px] w-full bg-t-accent/30" />
            <div className="flex justify-between items-start gap-6">
              {[
                { label: 'Location', val: 'Charlotte, USA' },
                { label: 'Status', val: 'Active // STEM OPT' },
                { label: 'Target Roles', val: 'Software Engineer' }
              ].map((meta, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[7px] font-black uppercase tracking-widest text-t-accent opacity-60 whitespace-nowrap">{meta.label}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-t-fg whitespace-nowrap">{meta.val}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative aspect-[4/5] w-full max-w-sm rounded-[60px] bg-t-bg-el border border-t-border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group transition-all duration-1000 z-10 overflow-hidden"
          >
              {loading ? (
                <div className="w-full h-full bg-t-accent-s/20 animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-t-accent border-r-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {/* Image with Parallax Internal Move - Uses absolute positioning and oversized dimensions to hide edges */}
                  <motion.div
                    style={{ x: imageTranslateX, y: imageTranslateY }}
                    className="absolute inset-[-15%] z-0"
                  >
                    <img 
                      src={image || ''} 
                      alt="Vamshi Krishna Portfolio Hero" 
                      className="w-full h-full object-cover transition-all duration-300 group-hover:saturate-[1.2]" 
                    />
                  </motion.div>
                  
                  {/* GLASS SCANLINES */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-t-bg/90 via-transparent to-transparent pointer-events-none z-10" />
                  
                  {/* HUD OVERLAY ELEMENTS */}
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
                    <div className="flex flex-col gap-1">
                      <div className="w-8 h-1 bg-t-accent-2" />
                      <p className="text-[7px] font-black text-white/40 uppercase tracking-widest">Visual Input // 01</p>
                    </div>
                    <div className="px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[8px] font-black text-white uppercase tracking-widest">
                      Live Render
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 z-20">
                    <div className="flex justify-between items-end">
                       <div className="space-y-1">
                         <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">VK-PULLAIAHGARI</p>
                         <p className="text-[7px] font-black text-white/40 uppercase tracking-[0.2em]">Engineering Specification</p>
                       </div>
                       <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center">
                          <div className="w-1 h-1 bg-t-accent-2 animate-ping" />
                       </div>
                    </div>
                  </div>
                </div>
              )}
          </motion.div>

          {/* AMBIENT BACKGROUND GLOWS */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -inset-20 bg-t-accent/30 blur-[120px] rounded-full -z-10" 
          />
        </div>
      </div>

      {/* DECORATIVE GRID LINES */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.07]">
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-t-fg" />
        <div className="absolute top-0 bottom-0 left-2/4 w-px bg-t-fg" />
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-t-fg" />
        <div className="absolute left-0 right-0 top-1/4 h-px bg-t-fg" />
        <div className="absolute left-0 right-0 top-2/4 h-px bg-t-fg" />
        <div className="absolute left-0 right-0 top-3/4 h-px bg-t-fg" />
      </div>
    </section>
  );
};

export default HeroSection;