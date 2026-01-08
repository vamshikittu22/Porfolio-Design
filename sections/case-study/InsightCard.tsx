
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
    challenge: 'Architectural Debt',
    solution: 'Resolution',
    metric: 'Data Point',
  };

  const borderColors: Record<string, string> = {
    indigo: 'border-l-indigo-500',
    emerald: 'border-l-emerald-500',
    rose: 'border-l-rose-500',
    amber: 'border-l-amber-500',
    purple: 'border-l-purple-500',
    cyan: 'border-l-cyan-500',
  };

  return (
    <motion.div 
      whileHover={{ x: 6 }}
      className={`
        p-6 rounded-[24px] border-l-4 bg-t-bg-el/40 backdrop-blur-md border-t-border
        shadow-sm hover:shadow-lg transition-all duration-500
        ${borderColors[accent] || 'border-l-t-accent'}
      `}
    >
      <div className="flex items-start gap-4">
        <div className="text-xl shrink-0 grayscale opacity-60 group-hover:grayscale-0 transition-all">
          {iconMap[type]}
        </div>
        <div className="space-y-1.5">
          <span className="text-[7px] font-black uppercase tracking-[0.3em] text-t-fg-m opacity-40">
            {typeLabels[type]}
          </span>
          <h5 className="text-[12px] font-black uppercase tracking-tight text-t-fg leading-snug">
            {title}
          </h5>
          <p className="text-[11px] font-medium text-t-fg-m opacity-70 leading-relaxed italic">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
