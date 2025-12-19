
import React from 'react';
import { AccentColor } from '../types';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  accent?: AccentColor;
  // Fixed: Updated onClick to accept React.MouseEvent to allow stopPropagation and resolve type mismatch in App.tsx
  onClick?: (e: React.MouseEvent) => void;
}

export const GlassCard: React.FC<GlassProps> = ({ children, className = '', accent, onClick }) => {
  const accentClasses = {
    blue: 'hover:border-blue-400/50 hover:shadow-blue-500/10',
    green: 'hover:border-green-400/50 hover:shadow-green-500/10',
    red: 'hover:border-red-400/50 hover:shadow-red-500/10',
  };

  return (
    <div 
      onClick={onClick}
      className={`
      relative group
      bg-white/60 glass-blur 
      border border-slate-200/60 
      rounded-[12px] 
      shadow-[0_4px_24px_rgba(0,0,0,0.03)]
      transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
      ${accent ? accentClasses[accent] : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export const BubbleTag: React.FC<GlassProps> = ({ children, className = '', accent = 'blue' }) => {
  const themes = {
    blue: 'bg-blue-600 text-white border-blue-700 shadow-[2px_2px_0px_#1d4ed8]',
    green: 'bg-green-600 text-white border-green-700 shadow-[2px_2px_0px_#15803d]',
    red: 'bg-red-600 text-white border-red-700 shadow-[2px_2px_0px_#b91c1c]',
  };

  return (
    <span className={`
      px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.15em] border
      transition-all duration-300 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_currentColor]
      ${themes[accent]}
      ${className}
    `}>
      {children}
    </span>
  );
};

export const GlassButton: React.FC<GlassProps & { primary?: boolean; disabled?: boolean }> = ({ 
  children, 
  className = '', 
  accent = 'blue', 
  primary = false,
  onClick,
  disabled = false
}) => {
  const base = primary 
    ? {
        blue: 'bg-blue-600 text-white shadow-[4px_4px_0px_#1d4ed8] border-blue-700 hover:bg-blue-700',
        green: 'bg-green-600 text-white shadow-[4px_4px_0px_#15803d] border-green-700 hover:bg-green-700',
        red: 'bg-red-600 text-white shadow-[4px_4px_0px_#b91c1c] border-red-700 hover:bg-red-700',
      }
    : {
        blue: 'bg-white text-blue-600 border-blue-600 shadow-[4px_4px_0px_#2563eb] hover:bg-blue-50',
        green: 'bg-white text-green-600 border-green-600 shadow-[4px_4px_0px_#16a34a] hover:bg-green-50',
        red: 'bg-white text-red-600 border-red-600 shadow-[4px_4px_0px_#dc2626] hover:bg-green-50',
      };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-2.5 font-black text-[11px] uppercase tracking-widest border
        transition-all duration-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
        flex items-center justify-center gap-2
        ${base[accent]}
        ${disabled ? 'opacity-40 cursor-not-allowed scale-100' : 'hover:translate-x-[-2px] hover:translate-y-[-2px]'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
