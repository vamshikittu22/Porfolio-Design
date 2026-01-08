
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

  return (
    <motion.div 
      whileHover={{ x: 4, scale: 1.02 }}
      className={`
        p-5 rounded-2xl border-l-4 bg-t-bg-el/50 backdrop-blur-sm border-t-border
        shadow-sm hover:shadow-md transition-all duration-300
        border-l-${accent}-500
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0
          bg-${accent}-500/10 border border-${accent}-500/20
        `}>
          {iconMap[type]}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-[8px] font-black uppercase tracking-widest text-${accent}-500`}>
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
