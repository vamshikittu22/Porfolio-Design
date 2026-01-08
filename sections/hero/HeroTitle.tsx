import React from 'react';
import { motion } from 'framer-motion';

export const HeroTitle: React.FC = () => {
  return (
    <div className="relative flex flex-col items-start leading-[0.85] select-none perspective-[2000px] z-20">
      
      {/* Line 1: VAMSHI - Staggered Left */}
      <motion.div
        className="group/line1 cursor-default relative mb-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.h1
          whileHover={{ 
            rotateX: 15,
            rotateY: -10,
            z: 50,
            color: "var(--color-accent)",
            transition: { duration: 0.3 }
          }}
          className="text-7xl md:text-9xl lg:text-[11rem] font-black font-display text-t-fg tracking-tighter uppercase origin-left transition-all duration-500 whitespace-nowrap relative z-20"
        >
          Vamshi
        </motion.h1>
        
        {/* Ghost Shadow */}
        <motion.h1
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 0.1, 
            x: -20, 
            y: 10,
            transition: { duration: 0.3 }
          }}
          className="absolute inset-0 text-7xl md:text-9xl lg:text-[11rem] font-black font-display text-t-fg tracking-tighter uppercase whitespace-nowrap z-10 pointer-events-none select-none"
        >
          Vamshi
        </motion.h1>
      </motion.div>

      {/* Line 2: KRISHNA - Shifted Right */}
      <motion.div
        className="group/line2 cursor-default relative ml-12 lg:ml-24"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          whileHover={{ 
            rotateX: -15, 
            rotateY: 10,
            z: 50,
            color: "var(--color-accent-secondary)",
            transition: { duration: 0.3 }
          }}
          className="text-7xl md:text-9xl lg:text-[11rem] font-black font-display text-t-fg tracking-tighter uppercase origin-right transition-all duration-500 whitespace-nowrap relative z-20"
        >
          Krishna
        </motion.h1>

        {/* Scanline Effect on Hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-0 group-hover/line2:opacity-100 z-30"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Role Label - Staggered Bottom (Removed // v2.5) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-4 flex items-center gap-6"
      >
        <div className="w-12 h-0.5 bg-t-accent-2" />
        <p className="text-[12px] lg:text-[16px] font-black text-t-fg-m uppercase tracking-[0.8em]">
          Software <span className="text-t-fg">Engineer</span>
        </p>
      </motion.div>
    </div>
  );
};