
import React from 'react';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  accent?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'slate' | 'white' | 'dark' | 'purple' | 'orange' | 'theme' | 'secondary';
  onClick?: (e: React.MouseEvent) => void;
}

export const GlassCard: React.FC<GlassProps> = ({ children, className = '', accent = 'theme', onClick }) => {
  const accentClasses = {
    indigo: 'hover:border-indigo-400 dark:hover:border-indigo-500/50',
    emerald: 'hover:border-emerald-400 dark:hover:border-emerald-500/50',
    rose: 'hover:border-rose-400 dark:hover:border-rose-500/50',
    amber: 'hover:border-amber-400 dark:hover:border-amber-500/50',
    slate: 'hover:border-slate-400 dark:hover:border-slate-500/50',
    purple: 'hover:border-purple-400 dark:hover:border-purple-500/50',
    orange: 'hover:border-orange-400 dark:hover:border-orange-500/50',
    white: 'hover:border-slate-200 dark:hover:border-slate-700',
    dark: 'hover:border-slate-700 dark:hover:border-slate-400',
    theme: 'hover:border-t-accent',
    secondary: 'hover:border-t-accent-2'
  };

  const baseClasses = 'bg-t-bg-el/80 border-t-border text-t-fg backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]';

  return (
    <div 
      onClick={onClick}
      className={`
      relative group
      border
      rounded-[32px]
      ${baseClasses}
      ${accentClasses[accent as keyof typeof accentClasses] || accentClasses.theme}
      ${className}
    `}>
      {children}
    </div>
  );
};

export const BubbleTag: React.FC<GlassProps> = ({ children, className = '', accent = 'theme' }) => {
  const themes = {
    indigo: 'bg-indigo-600/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/40 shadow-[0_4px_12px_-2px_rgba(79,70,229,0.2)]',
    emerald: 'bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 shadow-[0_4px_12px_-2px_rgba(16,185,129,0.2)]',
    rose: 'bg-rose-600/15 text-rose-700 dark:text-rose-300 border-rose-500/40 shadow-[0_4px_12px_-2px_rgba(244,63,94,0.2)]',
    amber: 'bg-amber-600/15 text-amber-700 dark:text-amber-300 border-amber-500/40 shadow-[0_4px_12px_-2px_rgba(245,158,11,0.2)]',
    slate: 'bg-slate-600/15 text-slate-700 dark:text-slate-300 border-slate-500/40 shadow-[0_4px_12px_-2px_rgba(71,85,105,0.2)]',
    purple: 'bg-purple-600/20 text-purple-700 dark:text-purple-300 border-purple-500/50 shadow-[0_4px_12px_-2px_rgba(168,85,247,0.2)]',
    orange: 'bg-orange-600/20 text-orange-700 dark:text-orange-300 border-orange-500/50 shadow-[0_4px_12px_-2px_rgba(249,115,22,0.2)]',
    white: 'bg-white/90 dark:bg-slate-800 text-slate-950 dark:text-white border-slate-300 shadow-sm',
    dark: 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-800 shadow-xl',
    theme: 'bg-t-accent/20 text-t-accent border-t-accent/40 shadow-[0_4px_12px_-2px_rgba(var(--color-accent-rgb),0.2)]',
    secondary: 'bg-t-accent-2/20 text-t-accent-2 border-t-accent-2/40 shadow-[0_4px_12px_-2px_rgba(var(--color-accent-secondary-rgb),0.2)]'
  };

  return (
    <span className={`
      px-5 py-2.5
      text-[10px] font-black uppercase tracking-[0.3em] border
      rounded-full transition-all duration-500 hover:scale-105 select-none
      ${themes[accent as keyof typeof themes] || themes.theme}
      ${className}
    `}>
      {children}
    </span>
  );
};

export const GlassButton: React.FC<GlassProps & { primary?: boolean; disabled?: boolean }> = ({ 
  children, 
  className = '', 
  accent = 'theme', 
  primary = false,
  onClick,
  disabled = false
}) => {
  const themes = {
    indigo: {
      primary: 'bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-700 dark:border-indigo-600',
      outline: 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-500/50'
    },
    emerald: {
      primary: 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-700 dark:border-emerald-600',
      outline: 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-300 dark:hover:border-emerald-500/50'
    },
    rose: {
      primary: 'bg-rose-600 dark:bg-rose-500 text-white border-rose-700 dark:border-rose-600',
      outline: 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/50 hover:border-rose-300 dark:hover:border-rose-500/50'
    },
    amber: {
      primary: 'bg-amber-600 dark:bg-amber-500 text-white border-amber-700 dark:border-amber-600',
      outline: 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50 hover:border-amber-300 dark:hover:border-amber-500/50'
    },
    purple: {
      primary: 'bg-purple-600 dark:bg-purple-500 text-white border-purple-700 dark:border-purple-600',
      outline: 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50 hover:border-purple-300 dark:hover:border-purple-500/50'
    },
    orange: {
      primary: 'bg-orange-600 dark:bg-orange-500 text-white border-orange-700 dark:border-orange-600',
      outline: 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900/50 hover:border-orange-300 dark:hover:border-orange-500/50'
    },
    slate: {
      primary: 'bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 border-slate-800 dark:border-slate-300',
      outline: 'bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-200 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
    },
    dark: {
      primary: 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-800 dark:border-slate-200',
      outline: 'bg-white/10 dark:bg-white/5 text-slate-900 dark:text-white border-slate-200 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40'
    },
    white: {
      primary: 'bg-white dark:bg-slate-100 text-slate-950 dark:text-slate-950 border-slate-50 dark:border-slate-200',
      outline: 'bg-transparent text-white dark:text-white border-white/20 dark:border-white/10 hover:border-white dark:hover:border-white/30'
    },
    theme: {
      primary: 'bg-t-accent text-t-bg border-t-accent/80',
      outline: 'bg-t-accent-s/30 text-t-accent border-t-accent/20 hover:border-t-accent/50'
    },
    secondary: {
      primary: 'bg-t-accent-2 text-t-bg border-t-accent-2/80',
      outline: 'bg-t-accent-2-s/30 text-t-accent-2 border-t-accent-2/20 hover:border-t-accent-2/50'
    }
  };

  const themeSet = themes[accent as keyof typeof themes] || themes.theme;
  const styleClass = primary ? themeSet.primary : themeSet.outline;

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        px-10 py-4 font-black text-[9px] uppercase tracking-[0.5em] border-b-[2px]
        transition-all duration-500 rounded-full
        flex items-center justify-center gap-4
        ${styleClass}
        ${disabled ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-0'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
