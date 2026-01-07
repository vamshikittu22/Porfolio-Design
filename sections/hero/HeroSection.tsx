
import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../../components/ui/GlassUI';
import { HeroTitle } from './HeroTitle';

interface HeroProps {
  image: string | null;
  loading: boolean;
  onScroll: (id: string) => void;
}

export const HeroSection: React.FC<HeroProps> = ({ image, loading, onScroll }) => {
  return (
    <section id="hero-section" className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center mb-[40rem] min-h-[85vh] print:hidden relative">
      <div className="space-y-12 animate-in fade-in slide-in-from-left duration-1000 z-20">
        <div className="flex flex-col space-y-2">
           <div className="flex items-center gap-3">
             <span className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.6em] text-t-accent">Software Engineer</span>
             <span className="text-[10px] lg:text-[12px] font-black uppercase text-t-accent opacity-40">//</span>
             <span className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.6em] text-t-accent opacity-40">2025</span>
           </div>
           <span className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.8em] text-t-fg-m opacity-60">Portfolio Collection</span>
        </div>

        <div className="space-y-6">
          <HeroTitle />
          <p className="text-[11px] lg:text-[13px] font-bold text-t-fg-m uppercase tracking-[0.2em] opacity-90">
            Charlotte, NC · Open to Remote · Work Auth: STEM OPT
          </p>
        </div>
        
        <div className="max-w-xl">
          <p className="text-xl lg:text-2xl text-t-fg-m font-medium leading-relaxed opacity-80">
            Building scalable web applications with a focus on high-performance architecture and elegant user experiences.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 pt-4">
          <GlassButton 
            primary 
            accent="secondary" 
            className="!px-10 !py-5 !text-[11px] group" 
            onClick={() => onScroll('contact-section')}
          >
            Contact Me
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7M5 12h16" />
              </svg>
            </motion.div>
          </GlassButton>
          
          <GlassButton 
            accent="secondary" 
            className="!px-10 !py-5 !text-[11px] hover:bg-t-accent-2/10 group" 
            onClick={() => window.print()}
          >
            Download Resume
            <motion.div
              whileHover={{ y: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.div>
          </GlassButton>
        </div>
      </div>
      
      <div className="relative aspect-square lg:aspect-[4/5] w-full rounded-[100px] bg-t-bg-el overflow-hidden border border-t-border shadow-2xl group transition-all duration-1000 z-10">
          {loading ? (
            <div className="w-full h-full bg-t-accent-s/20 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-accent border-r-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <img 
                src={image || ''} 
                alt="Software Engineering" 
                className="w-full h-full object-cover transition-all duration-5000 group-hover:scale-110 mix-blend-luminosity dark:mix-blend-normal brightness-90 contrast-125" 
              />
              <div className="absolute inset-0 bg-t-accent/20 dark:bg-t-bg/40 mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-t-bg via-transparent to-transparent opacity-80 pointer-events-none" />
            </>
          )}
          <div className="absolute inset-0 border-[40px] border-white/5 pointer-events-none rounded-[100px]" />
      </div>
    </section>
  );
};
