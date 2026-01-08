
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
  
  const imageTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], [-45, 45]);
  const imageTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], [-45, 45]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const getOptimizedUrl = (url: string | null) => {
    if (!url) return '';
    return url.includes('unsplash.com') ? `${url}&fm=webp&q=75` : url;
  };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen flex items-center justify-center py-20 mb-[20rem] lg:mb-[30rem] print:hidden overflow-visible"
      onMouseMove={handleMouseMove}
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 z-0">
        <NameBackground />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-12 lg:gap-24 items-center w-full relative z-20">
        <div className="space-y-16 animate-in fade-in slide-in-from-left duration-1000">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-t-accent" />
              <span className="text-[12px] font-black uppercase tracking-[1em] text-t-accent">Systems Architect</span>
            </div>
            <div id="hero-title">
              <HeroTitle mouseX={mouseXSpring} mouseY={mouseYSpring} />
            </div>
          </div>
          
          <div className="grid lg:grid-cols-[1fr_0.7fr] gap-12 items-start">
            <div className="max-w-xl space-y-8">
              <p className="text-xl lg:text-3xl text-t-fg font-medium leading-tight tracking-tight text-balance">
                Architecting <span className="text-t-accent font-black">high-performance</span> digital ecosystems with Swiss precision and AI integration.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 relative" role="group" aria-label="Quick Actions">
              <motion.div whileHover={{ x: 5 }}>
                <GlassButton 
                  primary 
                  accent="theme" 
                  aria-label="View projects"
                  className="!px-8 !py-5 !text-[10px] group shadow-xl dark:shadow-2xl w-full" 
                  onClick={() => onScroll('projects-section')}
                >
                  Launch Projects
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} aria-hidden="true">
                    <path d="M14 5l7 7-7 7M5 12h16" />
                  </svg>
                </GlassButton>
              </motion.div>
              
              <motion.div whileHover={{ x: 5 }} className="lg:ml-10">
                <GlassButton 
                  accent="secondary" 
                  aria-label="Export resume"
                  className="!px-8 !py-5 !text-[10px] hover:bg-t-accent-2/10 w-full whitespace-nowrap border-t-accent-2/40" 
                  onClick={() => window.print()}
                >
                  Technical CV
                </GlassButton>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="lg:ml-20">
                <GlassButton 
                  accent="theme" 
                  aria-label="Contact me"
                  className="!px-8 !py-5 !text-[10px] hover:bg-t-accent/10 w-full whitespace-nowrap border-t-accent/40" 
                  onClick={() => onScroll('contact-section')}
                >
                  Contact Me
                </GlassButton>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="relative flex flex-col gap-10 items-center lg:items-end justify-center perspective-[2000px]">
          <div className="w-full max-w-sm space-y-5 animate-in fade-in slide-in-from-right duration-1000 delay-300" role="complementary" aria-label="Status Indicators">
            <div className="h-[2px] w-full bg-t-accent/40 dark:bg-t-accent/30" />
            <div className="flex justify-between items-start gap-6">
              {[
                { label: 'Location', val: 'Charlotte, USA' },
                { label: 'Status', val: 'Active // STEM OPT' },
                { label: 'Target Roles', val: 'Software Engineer' }
              ].map((meta, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <span className="text-[8px] font-black uppercase tracking-widest text-t-accent whitespace-nowrap">{meta.label}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-t-fg whitespace-nowrap">{meta.val}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative aspect-[4/5] w-full max-w-sm rounded-[60px] bg-t-bg-el border border-t-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group transition-all duration-1000 z-10 overflow-hidden"
          >
              {loading && !image ? (
                <div className="w-full h-full bg-t-accent-s/20 animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-t-accent border-r-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <motion.div
                    style={{ x: imageTranslateX, y: imageTranslateY }}
                    className="absolute inset-[-20%] z-0"
                  >
                    <img 
                      src={getOptimizedUrl(image)} 
                      loading="eager"
                      alt="Engineering precision visual" 
                      className="w-full h-full object-cover transition-all duration-700 brightness-[0.9] dark:brightness-100" 
                    />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-t-bg/90 via-transparent to-transparent pointer-events-none z-10" />
                  
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
                    <div className="flex flex-col gap-1">
                      <div className="w-8 h-1.5 bg-t-accent-2 shadow-[0_0_15px_rgba(var(--color-accent-secondary-rgb),0.6)]" />
                      <p className="text-[8px] font-black text-white uppercase tracking-widest bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">Visual Input // 01</p>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 z-20">
                    <div className="flex justify-between items-end">
                       <div className="space-y-1.5">
                         <p className="text-[11px] font-black text-white uppercase tracking-[0.4em] drop-shadow-lg">VK-PULLAIAHGARI</p>
                         <p className="text-[8px] font-black text-white/90 uppercase tracking-[0.2em] drop-shadow-md">Engineering Specification</p>
                       </div>
                    </div>
                  </div>
                </div>
              )}
          </motion.div>

          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -inset-20 bg-t-accent/30 dark:bg-t-accent/20 blur-[100px] rounded-full -z-10" 
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
