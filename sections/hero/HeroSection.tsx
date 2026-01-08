
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

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
      className="relative min-h-screen flex items-center justify-center py-20 mb-[30rem] lg:mb-[40rem] print:hidden overflow-visible"
      onMouseMove={handleMouseMove}
    >
      {/* Typrographic Swiss Background */}
      <NameBackground />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full relative z-10">
        <div className="space-y-12 animate-in fade-in slide-in-from-left duration-1000">
          <HeroTitle />
          
          <div className="flex flex-wrap items-center gap-8 pt-6">
            <GlassButton 
              primary 
              accent="theme" 
              className="!px-12 !py-5 !text-[11px] group shadow-2xl" 
              onClick={() => onScroll('projects-section')}
            >
              Explore Portfolio
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path d="M14 5l7 7-7 7M5 12h16" />
              </svg>
            </GlassButton>
            
            <GlassButton 
              accent="secondary" 
              className="!px-12 !py-5 !text-[11px] hover:bg-t-accent-2/5" 
              onClick={() => window.print()}
            >
              Curriculum Vitae
            </GlassButton>

            <button 
              onClick={() => onScroll('contact-section')}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg-m hover:text-t-accent transition-colors flex items-center gap-3 group ml-4"
            >
              Open for opportunities
              <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
            </button>
          </div>
        </div>
        
        {/* High-Fidelity 3D Image Frame */}
        <motion.div 
          style={{ rotateX, rotateY }}
          className="relative aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto rounded-[80px] bg-t-bg-el overflow-hidden border border-t-border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group transition-all duration-1000 z-10 perspective-[1500px]"
        >
            {loading ? (
              <div className="w-full h-full bg-t-accent-s/20 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-t-accent border-r-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img 
                  src={image || ''} 
                  alt="Engineering Concept" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-t-bg/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Frame Overlays */}
                <div className="absolute inset-0 border-[30px] border-white/5 pointer-events-none rounded-[80px]" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-t-accent/20 to-transparent pointer-events-none" />
                
                {/* Visual Label */}
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="h-px w-full bg-white/20 mb-4" />
                   <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] opacity-40">Synthetic Production Frame // VK-01</p>
                </div>
              </div>
            )}
            
            {/* Dynamic Ambient Glow */}
            <div className="absolute -inset-10 bg-t-accent/20 blur-[100px] opacity-0 group-hover:opacity-60 transition-opacity -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
