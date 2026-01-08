
import React from 'react';
import { motion } from 'framer-motion';
import { InsightType } from './types';

interface InsightCardProps {
  type: InsightType;
  title: string;
  description: string;
  accent: string; // Tailwind color name
}

export const InsightCard: React.FC<InsightCardProps> = ({ type, title, description, accent }) => {
  const iconMap: Record<InsightType, string> = {
    optimization: '💡',
    challenge: '⚠️',
    solution: '✅',
    metric: '📊',
  };

  const typeLabels: Record<InsightType, string> = {
    optimization: 'Optimization',
    challenge: 'Challenge',
    solution: 'Solution',
    metric: 'Metric',
  };

  const borderColors: Record<string, string> = {
    indigo: 'border-l-indigo-500',
    emerald: 'border-l-emerald-500',
    rose: 'border-l-rose-500',
    amber: 'border-l-amber-500',
    purple: 'border-l-purple-500',
    cyan: 'border-l-cyan-500',
  };

  const textColors: Record<string, string> = {
    indigo: 'text-indigo-500',
    emerald: 'text-emerald-500',
    rose: 'text-rose-500',
    amber: 'text-amber-500',
    purple: 'text-purple-500',
    cyan: 'text-cyan-500',
  };

  const bgColors: Record<string, string> = {
    indigo: 'bg-indigo-500/10',
    emerald: 'bg-emerald-500/10',
    rose: 'bg-rose-500/10',
    amber: 'bg-amber-500/10',
    purple: 'bg-purple-500/10',
    cyan: 'bg-cyan-500/10',
  };

  return (
    <motion.div 
      whileHover={{ x: 4, scale: 1.02 }}
      className={`
        p-5 rounded-2xl border-l-4 bg-t-bg-el/50 backdrop-blur-sm border-t-border
        shadow-sm hover:shadow-md transition-all duration-300
        ${borderColors[accent] || 'border-l-t-accent'}
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0
          ${bgColors[accent] || 'bg-t-accent/10'} border border-white/5
        `}>
          {iconMap[type]}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-[8px] font-black uppercase tracking-widest ${textColors[accent] || 'text-t-accent'}`}>
              {typeLabels[type]}
            </span>
          </div>
          <h5 className="text-[11px] font-black uppercase tracking-tight text-t-fg leading-none">
            {title}
          </h5>
          <p className="text-[10px] font-medium text-t-fg-m opacity-70 leading-relaxed italic">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
