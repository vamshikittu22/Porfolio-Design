
import React from 'react';
import { motion } from 'framer-motion';

interface TechIconProps {
  name: string;
  iconUrl: string;
  isActive: boolean;
  isHero?: boolean;
  accent?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'cyan';
  index?: number;
  onInteraction: () => void;
}

export const TechIcon: React.FC<TechIconProps> = ({ 
  name, 
  iconUrl, 
  isActive, 
  isHero = false, 
  accent = 'indigo', 
  index = 0,
  onInteraction 
}) => {
  
  const glowColors = {
    indigo: 'shadow-[0_0_50px_-10px_rgba(99,102,241,0.5)] border-indigo-500/60',
    emerald: 'shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)] border-emerald-500/60',
    rose: 'shadow-[0_0_50px_-10px_rgba(244,63,94,0.5)] border-rose-500/60',
    amber: 'shadow-[0_0_50px_-10px_rgba(245,158,11,0.5)] border-amber-500/60',
    purple: 'shadow-[0_0_50px_-10px_rgba(168,85,247,0.5)] border-purple-500/60',
    cyan: 'shadow-[0_0_50px_-10px_rgba(6,182,212,0.5)] border-cyan-500/60',
  };

  return (
    <motion.button
      layout
      onClick={onInteraction}
      onMouseEnter={onInteraction}
      onFocus={onInteraction}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isActive ? 1.05 : 1, 
        y: isActive ? -5 : 0 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.03 }}
      className={`
        relative group/icon outline-none
        flex items-center justify-center
        transition-all duration-500 ease-out
        ${isHero ? 'w-24 h-24 lg:w-32 lg:h-32 rounded-[32px]' : 'w-16 h-16 lg:w-20 lg:h-20 rounded-[20px]'}
        ${isActive 
          ? `bg-white/10 dark:bg-white/10 backdrop-blur-md border ${glowColors[accent]} z-20` 
          : 'bg-white/5 dark:bg-white/5 border border-white/10 hover:bg-white/10 dark:hover:bg-white/10 grayscale-[0.8] hover:grayscale-0 opacity-80 hover:opacity-100'}
      `}
      aria-label={`Select ${name}`}
      aria-pressed={isActive}
    >
      {/* Active Glare */}
      {isActive && (
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-tr from-white/20 to-transparent opacity-50 pointer-events-none" />
      )}

      <img 
        src={iconUrl} 
        alt="" 
        className={`
          object-contain transition-all duration-500 drop-shadow-xl
          ${isHero ? 'w-12 h-12 lg:w-16 lg:h-16' : 'w-8 h-8 lg:w-10 lg:h-10'}
          ${isActive ? 'scale-110 rotate-0' : 'scale-100'}
        `} 
      />
      
      {/* Focus Ring for Accessibility */}
      <div className="absolute inset-0 rounded-[inherit] ring-2 ring-transparent group-focus-visible/icon:ring-t-accent transition-all duration-200" />
    </motion.button>
  );
};
