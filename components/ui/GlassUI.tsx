
import React from 'react';
import { motion } from 'framer-motion';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  accent?: 'theme' | 'secondary' | 'white';
  primary?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

export const GlassButton: React.FC<GlassProps> = ({ 
  children, 
  className = '', 
  accent = 'theme', 
  primary = false,
  onClick,
  disabled = false
}) => {
  const themes = {
    theme: primary ? 'bg-t-accent text-white border-t-accent' : 'bg-t-bg-el/50 text-t-accent border-t-border hover:border-t-accent',
    secondary: primary ? 'bg-t-accent-2 text-white border-t-accent-2' : 'bg-t-bg-el/50 text-t-accent-2 border-t-border hover:border-t-accent-2',
    white: 'bg-white text-black border-white'
  };

  return (
    <motion.button 
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`
        px-8 py-4 font-black text-[10px] uppercase tracking-[0.4em] border-b-2 rounded-full
        flex items-center justify-center gap-3 transition-colors
        ${themes[accent]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export const GlassCard: React.FC<GlassProps> = ({ children, className = '', accent = 'theme' }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-t-bg-el/80 backdrop-blur-xl border border-t-border rounded-[40px] transition-all duration-500 ${className}`}
  >
    {children}
  </motion.div>
);

export const BubbleTag: React.FC<GlassProps> = ({ children, className = '', accent = 'theme' }) => (
  <span className={`px-4 py-1.5 rounded-full border border-t-border bg-t-bg-el/40 text-[9px] font-black uppercase tracking-widest ${className}`}>
    {children}
  </span>
);
