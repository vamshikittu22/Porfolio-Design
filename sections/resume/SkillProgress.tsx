import React from 'react';

interface SkillProgressProps {
  label: string;
  percentage: number;
}

export const SkillProgress: React.FC<SkillProgressProps> = ({ label, percentage }) => (
  <div className="group/skill w-full flex items-center justify-between gap-4 py-1.5 border-b border-t-border/10 hover:border-t-accent/30 transition-all">
    <div className="flex items-center gap-2">
      <div className="w-1 h-1 rounded-full bg-t-accent-2 opacity-40 group-hover/skill:opacity-100 transition-opacity" />
      <span className="text-[10px] font-bold text-t-fg-m group-hover/skill:text-t-fg transition-colors">{label}</span>
    </div>
    
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((step) => {
        const isFilled = (percentage / 20) >= step;
        return (
          <div 
            key={step} 
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isFilled ? 'bg-t-accent' : 'bg-t-border/20'}`} 
            style={{ 
              transitionDelay: `${step * 100}ms`,
              opacity: isFilled ? 1 : 0.3
            }}
          />
        );
      })}
    </div>
  </div>
);

export default SkillProgress;