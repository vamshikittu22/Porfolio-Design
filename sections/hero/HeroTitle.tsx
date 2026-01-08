
import React from 'react';
import { motion } from 'framer-motion';

export const HeroTitle: React.FC = () => {
  return (
    <div className="relative flex flex-col items-start leading-[0.85] select-none perspective-[2000px] z-20">
      
      {/* Line 1: VAMSHI KRISHNA - 3D Slab Tilt */}
      <motion.div
        className="group/line1 cursor-default mb-4 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.h1
          whileHover={{ 
            rotateX: 18,
            rotateY: -12,
            z: 80,
            color: "var(--color-accent)",
            transition: { duration: 0.4, ease: "easeOut" }
          }}
          className="text-6xl md:text-8xl lg:text-[9.5rem] font-black font-display text-t-fg tracking-tighter uppercase origin-center transition-all duration-700 whitespace-nowrap relative z-20"
        >
          Vamshi Krishna
        </motion.h1>
        
        {/* Underlayer Glow */}
        <motion.div 
          className="absolute inset-0 bg-t-accent/30 blur-[80px] rounded-full opacity-0 group-hover/line1:opacity-100 transition-opacity duration-700 -z-10"
          style={{ transform: 'translateZ(-40px)' }}
        />
        
        {/* Kinetic Shadow */}
        <motion.h1
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 0.15, 
            x: -25, 
            y: 15,
            transition: { duration: 0.4 }
          }}
          className="absolute inset-0 text-6xl md:text-8xl lg:text-[9.5rem] font-black font-display text-t-fg tracking-tighter uppercase whitespace-nowrap z-10 pointer-events-none select-none"
        >
          Vamshi Krishna
        </motion.h1>
      </motion.div>

      {/* Line 2: PULLAIAHGARI - Sonic Drift */}
      <motion.div
        className="group/line2 relative"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h2
          whileHover={{ 
            scale: 1.08,
            x: 25,
            color: "var(--color-accent-secondary)",
            transition: { type: "spring", stiffness: 400, damping: 12 }
          }}
          className="text-4xl md:text-7xl lg:text-8xl font-black font-display text-t-fg-m opacity-80 uppercase tracking-tighter transition-all duration-500 whitespace-nowrap relative z-30"
        >
          Pullaiahgari
        </motion.h2>

        {/* Sonic Trails */}
        <motion.h2
          whileHover={{ 
            opacity: [0, 0.4, 0],
            x: -60,
            filter: "blur(12px)",
            transition: { duration: 0.5, repeat: Infinity }
          }}
          className="absolute inset-0 text-4xl md:text-7xl lg:text-8xl font-black font-display text-cyan-400 uppercase tracking-tighter whitespace-nowrap z-10 pointer-events-none opacity-0"
        >
          Pullaiahgari
        </motion.h2>

        <motion.h2
          whileHover={{ 
            opacity: [0, 0.3, 0],
            x: 80,
            filter: "blur(16px)",
            transition: { duration: 0.7, repeat: Infinity, delay: 0.1 }
          }}
          className="absolute inset-0 text-4xl md:text-7xl lg:text-8xl font-black font-display text-orange-400 uppercase tracking-tighter whitespace-nowrap z-10 pointer-events-none opacity-0"
        >
          Pullaiahgari
        </motion.h2>
      </motion.div>

      {/* Role Label */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-14 flex items-center gap-8"
      >
        <div className="w-20 h-[3px] bg-gradient-to-r from-t-accent to-t-accent-2" />
        <p className="text-[11px] lg:text-[15px] font-black text-t-fg uppercase tracking-[0.6em] opacity-80">
          Senior Software Engineer <span className="mx-4 text-t-accent-2">/</span> AI Architect
        </p>
      </motion.div>
    </div>
  );
};
