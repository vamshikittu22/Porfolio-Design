import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface HeroTitleProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export const HeroTitle: React.FC<HeroTitleProps> = ({ mouseX, mouseY }) => {
  const ghostX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const ghostY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  return (
    <div className="relative flex flex-col items-start leading-[0.85] select-none perspective-[2000px] z-20">
      
      {/* Line 1: VAMSHI */}
      <motion.div
        className="group/line1 cursor-default relative mb-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.h1
          whileHover={{ 
            rotateX: 12,
            rotateY: -8,
            z: 40,
            transition: { duration: 0.3 }
          }}
          className="text-7xl md:text-9xl lg:text-[11rem] font-black font-display text-t-fg hover:text-t-accent tracking-tighter uppercase origin-left transition-colors duration-500 whitespace-nowrap relative z-20"
        >
          Vamshi
        </motion.h1>
        
        {/* Ghost Shadow - Reactive to Mouse */}
        <motion.h1
          style={{ x: ghostX, y: ghostY }}
          className="absolute inset-0 text-7xl md:text-9xl lg:text-[11rem] font-black font-display text-t-fg opacity-[0.03] dark:opacity-[0.05] tracking-tighter uppercase whitespace-nowrap z-10 pointer-events-none select-none transition-colors duration-500"
        >
          Vamshi
        </motion.h1>
      </motion.div>

      {/* Line 2: KRISHNA */}
      <motion.div
        className="group/line2 cursor-default relative ml-12 lg:ml-24"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.h1
          whileHover={{ 
            rotateX: -12, 
            rotateY: 8, 
            z: 40, 
            transition: { duration: 0.3 }
          }}
          className="text-7xl md:text-9xl lg:text-[11rem] font-black font-display text-t-fg hover:text-t-accent-2 tracking-tighter uppercase origin-right transition-colors duration-500 whitespace-nowrap relative z-20"
        >
          Krishna
        </motion.h1>

        {/* Ghost Shadow - Reactive to Mouse */}
        <motion.h1
          style={{ x: useTransform(mouseX, [-0.5, 0.5], [15, -15]), y: useTransform(mouseY, [-0.5, 0.5], [15, -15]) }}
          className="absolute inset-0 text-7xl md:text-9xl lg:text-[11rem] font-black font-display text-t-fg opacity-[0.03] dark:opacity-[0.05] tracking-tighter uppercase whitespace-nowrap z-10 pointer-events-none select-none transition-colors duration-500"
        >
          Krishna
        </motion.h1>
      </motion.div>

      {/* Role Label - Using SYNE for emphasis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-8 flex items-center gap-6"
      >
        <div className="w-16 h-1 bg-t-accent-2 transition-colors duration-500" />
        <p className="text-[14px] lg:text-[18px] font-extrabold font-emphasis text-t-fg uppercase tracking-[0.6em] transition-colors duration-500">
          Software <span className="text-t-accent font-black">Engineer</span>
        </p>
      </motion.div>
    </div>
  );
};