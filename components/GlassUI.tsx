
import React from 'react';
import { AccentColor } from '../types';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  accent?: AccentColor | 'purple' | 'orange';
  onClick?: (e: React.MouseEvent) => void;
}

export const GlassCard: React.FC<GlassProps> = ({ children, className = '', accent, onClick }) => {
  const accentClasses = {
    blue: 'hover:border-blue-400/50 hover:shadow-blue-500/10',
    green: 'hover:border-green-400/50 hover:shadow-green-500/10',
    red: 'hover:border-red-400/50 hover:shadow-red-500/10',
    purple: 'hover:border-purple-400/50 hover:shadow-purple-500/10',
    orange: 'hover:border-orange-400/50 hover:shadow-orange-500/10',
  };

  return (
    <div 
      onClick={onClick}
      className={`
      relative group
      bg-white/90 backdrop-blur-xl 
      border border-slate-200
      rounded-3xl
      shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
      transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
      ${accent ? accentClasses[accent as keyof typeof accentClasses] : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export const BubbleTag: React.FC<GlassProps> = ({ children, className = '', accent = 'purple' }) => {
  const themes = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
  };

  return (
    <span className={`
      px-3 py-1 text-[9px] font-bold uppercase tracking-widest border
      rounded-full transition-all duration-500
      ${themes[accent as keyof typeof themes]}
      ${className}
    `}>
      {children}
    </span>
  );
};

export const GlassButton: React.FC<GlassProps & { primary?: boolean; disabled?: boolean }> = ({ 
  children, 
  className = '', 
  accent = 'purple', 
  primary = false,
  onClick,
  disabled = false
}) => {
  const base = primary 
    ? {
        blue: 'bg-blue-600 text-white hover:bg-blue-700 border-blue-500',
        green: 'bg-green-600 text-white hover:bg-green-700 border-green-500',
        red: 'bg-red-600 text-white hover:bg-red-700 border-red-500',
        purple: 'bg-purple-600 text-white hover:bg-purple-700 border-purple-500',
        orange: 'bg-orange-500 text-white hover:bg-orange-600 border-orange-400',
      }
    : {
        blue: 'bg-white text-blue-600 border-slate-200 hover:border-blue-400',
        green: 'bg-white text-green-600 border-slate-200 hover:border-green-400',
        red: 'bg-white text-red-600 border-slate-200 hover:border-red-400',
        purple: 'bg-white text-purple-600 border-slate-200 hover:border-purple-400',
        orange: 'bg-white text-orange-600 border-slate-200 hover:border-orange-400',
      };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-3.5 font-bold text-[10px] uppercase tracking-widest border
        transition-all duration-500 rounded-xl
        flex items-center justify-center gap-3
        ${base[accent as keyof typeof base]}
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-xl active:scale-95'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
