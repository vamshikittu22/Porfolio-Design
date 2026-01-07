
import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../../components/ui/GlassUI';

export const HeroSection: React.FC<{ onScroll: (id: string) => void }> = ({ onScroll }) => (
  <section id="hero-section" className="min-h-[70vh] flex flex-col justify-center gap-12 relative">
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4"
      >
        <span className="w-12 h-px bg-t-accent" />
        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-t-accent">Software Engineer</span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[12vw] lg:text-[10rem] font-black font-display uppercase tracking-tighter leading-[0.8] text-t-fg"
      >
        Vamshi<br />Krishna.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-medium text-t-fg-m max-w-2xl leading-relaxed"
      >
        Building high-performance digital systems with precision engineering and a focus on scalability.
      </motion.p>
    </div>

    <div className="flex flex-wrap gap-6 pt-8">
      <GlassButton primary accent="secondary" onClick={() => onScroll('contact-section')}>
        Collaborate
        <motion.svg 
          animate={{ x: [0, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7M5 12h16" />
        </motion.svg>
      </GlassButton>

      <GlassButton accent="theme" onClick={() => window.print()}>
        Archive / PDF
        <motion.svg 
          whileHover={{ y: 3 }}
          className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </motion.svg>
      </GlassButton>
    </div>

    <div className="absolute -right-20 top-0 w-96 h-96 bg-t-accent/10 blur-[120px] rounded-full pointer-events-none" />
  </section>
);

export default HeroSection;
