
import React from 'react';
import { AccentColor } from '../types';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  accent?: AccentColor;
}

export const GlassCard: React.FC<GlassProps> = ({ children, className = '', accent }) => {
  const accentClasses = {
    blue: 'hover:border-blue-300/50 hover:shadow-blue-500/10',
    green: 'hover:border-green-300/50 hover:shadow-green-500/10',
    red: 'hover:border-red-300/50 hover:shadow-red-500/10',
  };

  return (
    <div className={`
      relative group
      bg-white/40 glass-blur 
      border border-white/40 
      rounded-[24px] 
      shadow-[0_8px_32px_rgba(0,0,0,0.05)]
      transition-all duration-300
      ${accent ? accentClasses[accent] : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export const BubbleTag: React.FC<GlassProps> = ({ children, className = '', accent = 'blue' }) => {
  const themes = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <span className={`
      px-3 py-1 rounded-full text-[12px] font-medium border
      transition-all duration-200 hover:scale-105
      ${themes[accent]}
      ${className}
    `}>
      {children}
    </span>
  );
};

// Added disabled prop to GlassButton to handle loading states in AIPlayground
export const GlassButton: React.FC<GlassProps & { onClick?: () => void; primary?: boolean; disabled?: boolean }> = ({ 
  children, 
  className = '', 
  accent = 'blue', 
  primary = false,
  onClick,
  disabled = false
}) => {
  const base = primary 
    ? {
        blue: 'bg-blue-600 text-white shadow-blue-500/25',
        green: 'bg-green-600 text-white shadow-green-500/25',
        red: 'bg-red-600 text-white shadow-red-500/25',
      }
    : {
        blue: 'bg-white/80 text-blue-600 border-blue-100',
        green: 'bg-white/80 text-green-600 border-green-100',
        red: 'bg-white/80 text-red-600 border-red-100',
      };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-xl font-medium shadow-lg 
        transition-all duration-200 active:scale-95
        flex items-center justify-center gap-2
        ${base[accent]}
        ${disabled ? 'opacity-50 cursor-not-allowed scale-100 active:scale-100 grayscale-[0.2]' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
