
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlueprintLauncherProps {
  onOpen: () => void;
  visible: boolean;
}

export const BlueprintLauncher: React.FC<BlueprintLauncherProps> = ({ onOpen, visible }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 lg:top-8 lg:right-10 z-[300] pointer-events-none group">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-end gap-3 pointer-events-auto cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onOpen}
      >
        <div className="flex items-center gap-4 lg:gap-6">
           {/* The reveal text - Explaining "How I made this" */}
           <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                className="flex items-center gap-4"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-t-accent whitespace-nowrap">
                    Systems Architecture
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-t-fg-m opacity-60 whitespace-nowrap">
                    Discover how this site was built
                  </span>
                </div>
                <div className="w-10 h-px bg-t-accent/40" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* High-Contrast Interactive Icon Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative w-14 h-14 lg:w-16 lg:h-16 rounded-[22px] border-2 flex items-center justify-center transition-all duration-700
              ${isHovered 
                ? 'bg-t-accent border-t-accent text-t-bg shadow-[0_20px_40px_-10px_rgba(var(--color-accent-rgb),0.5)]' 
                : 'bg-t-bg-el/95 backdrop-blur-2xl border-t-border text-t-fg shadow-2xl'}
            `}
            aria-label="View technical background and engineering blueprint"
          >
            {/* Visual Background Glow */}
            <div className={`absolute inset-0 rounded-[inherit] transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
              <div className="absolute inset-0 bg-t-accent/5 rounded-[inherit]" />
              <div className="absolute -inset-2 bg-t-accent/10 blur-xl rounded-full animate-pulse" />
            </div>

            <svg viewBox="0 0 24 24" className="w-7 h-7 lg:w-8 lg:h-8 fill-none stroke-current" strokeWidth="2.2">
              <motion.path 
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                animate={isHovered ? {
                  strokeWidth: [2.2, 2.8, 2.2],
                  y: [0, -1, 0],
                  transition: { repeat: Infinity, duration: 1.2 }
                } : {}}
              />
            </svg>

            {/* Neural Pulse Indicator (Top Right of Icon) */}
            <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center">
              <div className="w-2 h-2 bg-t-accent-2 rounded-full relative z-10 border border-t-bg">
                <div className="absolute inset-0 bg-t-accent-2 rounded-full animate-ping opacity-75" />
              </div>
            </div>
          </motion.button>
        </div>

        {/* Decorative Swiss Vertical Line */}
        {!isHovered && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            className="w-[2px] bg-gradient-to-b from-t-accent/40 via-t-border to-transparent mr-[27px] lg:mr-[31px] opacity-40"
          />
        )}
      </motion.div>
    </div>
  );
};
