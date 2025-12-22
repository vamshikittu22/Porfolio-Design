
import React from 'react';
import { AccentColor } from '../types';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  accent?: AccentColor | 'purple' | 'orange';
  dark?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const GlassCard: React.FC<GlassProps> = ({ children, className = '', accent, dark = false, onClick }) => {
  const accentClasses = {
    blue: 'hover:border-blue-400/50 hover:shadow-blue-500/20',
    green: 'hover:border-green-400/50 hover:shadow-green-500/20',
    red: 'hover:border-red-400/50 hover:shadow-red-500/20',
    purple: 'hover:border-purple-400/50 hover:shadow-purple-500/20',
    orange: 'hover:border-orange-400/50 hover:shadow-orange-500/20',
  };

  const baseClasses = dark 
    ? 'bg-slate-800/60 border-slate-600/30 text-white shadow-2xl shadow-purple-900/5' 
    : 'bg-white/95 border-slate-200 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)]';

  return (
    <div 
      onClick={onClick}
      className={`
      relative group
      backdrop-blur-3xl 
      border
      rounded-[40px]
      transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
      ${baseClasses}
      ${accent ? accentClasses[accent as keyof typeof accentClasses] : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export const BubbleTag: React.FC<GlassProps> = ({ children, className = '', accent = 'purple' }) => {
  const themes = {
    blue: 'bg-blue-600 text-white border-blue-700 shadow-blue-200',
    green: 'bg-emerald-600 text-white border-emerald-700 shadow-emerald-200',
    red: 'bg-rose-600 text-white border-rose-700 shadow-rose-200',
    purple: 'bg-indigo-600 text-white border-indigo-700 shadow-indigo-200',
    orange: 'bg-orange-600 text-white border-orange-700 shadow-orange-200',
  };

  return (
    <span className={`
      px-5 py-2
      text-[10px] font-black uppercase tracking-[0.15em] border-b-2
      rounded-full transition-all duration-300 shadow-sm
      hover:-translate-y-0.5 hover:shadow-md
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
  const themes = {
    blue: {
      primary: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700',
      outline: 'bg-white/50 text-blue-700 border-blue-200 hover:border-blue-500'
    },
    green: {
      primary: 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700',
      outline: 'bg-white/50 text-emerald-700 border-emerald-200 hover:border-emerald-500'
    },
    red: {
      primary: 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700',
      outline: 'bg-white/50 text-rose-700 border-rose-200 hover:border-rose-500'
    },
    purple: {
      primary: 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700',
      outline: 'bg-white/50 text-indigo-700 border-indigo-200 hover:border-indigo-500'
    },
    orange: {
      primary: 'bg-orange-600 text-white border-orange-700 hover:bg-orange-700',
      outline: 'bg-white/50 text-orange-700 border-orange-200 hover:border-orange-500'
    },
  };

  const themeSet = themes[accent as keyof typeof themes] || themes.purple;
  const styleClass = primary ? themeSet.primary : themeSet.outline;

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-3.5 font-black text-[11px] uppercase tracking-[0.2em] border-b-[3px]
        transition-all duration-500 rounded-full
        flex items-center justify-center gap-3
        ${styleClass}
        ${disabled ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:shadow-xl active:scale-95 active:translate-y-0.5 active:border-b-0'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
