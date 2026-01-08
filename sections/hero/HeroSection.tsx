
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);
  const imageTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const imageTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

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
      {/* BACKGROUND DATA LAYER (Lower Z-Index) */}
      <div className="absolute inset-0 z-0">
        <NameBackground />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center w-full relative z-20">
        
        {/* TEXT CONTENT */}
        <div className="space-y-16 animate-in fade-in slide-in-from-left duration-1000">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-t-accent" />
              <span className="text-[10px] font-black uppercase tracking-[1em] text-t-accent">Systems Architect</span>
            </div>
            <HeroTitle />
          </div>
          
          <div className="max-w-xl space-y-8">
            <p className="text-xl lg:text-3xl text-t-fg font-medium leading-tight tracking-tight text-balance">
              Architecting <span className="text-t-accent">high-performance</span> digital ecosystems with Swiss precision and AI integration.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 pt-6">
              <GlassButton 
                primary 
                accent="theme" 
                className="!px-12 !py-5 !text-[11px] group shadow-2xl" 
                onClick={() => onScroll('projects-section')}
              >
                Launch Projects
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path d="M14 5l7 7-7 7M5 12h16" />
                </svg>
              </GlassButton>
              
              <GlassButton 
                accent="secondary" 
                className="!px-10 !py-5 !text-[11px] hover:bg-t-accent-2/5" 
                onClick={() => window.print()}
              >
                Technical CV
              </GlassButton>
            </div>
          </div>

          {/* HUD METADATA */}
          <div className="flex gap-12 pt-12 border-t border-t-border/30 w-fit">
            {[
              { label: 'Location', val: 'Charlotte, USA' },
              { label: 'Status', val: 'Active // OPT' },
              { label: 'Protocol', val: 'REST / GraphQL' }
            ].map((meta, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-t-fg-m opacity-40">{meta.label}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-t-fg">{meta.val}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* HERO IMAGE PORTAL */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative aspect-[4/5] w-full max-w-sm rounded-[60px] bg-t-bg-el overflow-hidden border border-t-border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group transition-all duration-1000 z-10 perspective-[2000px] preserve-3d"
          >
              {loading ? (
                <div className="w-full h-full bg-t-accent-s/20 animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-t-accent border-r-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  <motion.img 
                    style={{ x: imageTranslateX, y: imageTranslateY }}
                    src={image || ''} 
                    alt="Vamshi Krishna Portfolio Hero" 
                    className="w-[120%] h-[120%] max-w-none object-cover transition-all duration-300 group-hover:saturate-[1.2]" 
                  />
                  
                  {/* GLASS SCANLINES */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-t-bg/90 via-transparent to-transparent pointer-events-none" />
                  
                  {/* HUD OVERLAY ELEMENTS */}
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <div className="w-8 h-1 bg-t-accent-2" />
                      <p className="text-[7px] font-black text-white/40 uppercase tracking-widest">Visual Input // 01</p>
                    </div>
                    <div className="px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[8px] font-black text-white uppercase tracking-widest">
                      Live Render
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex justify-between items-end">
                       <div className="space-y-1">
                         <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">VK-PULLAIAHGARI</p>
                         <p className="text-[7px] font-black text-white/40 uppercase tracking-[0.2em]">Engineering Specification // v2.5</p>
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
