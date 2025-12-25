import React from 'react';

interface SkillProgressProps {
  label: string;
  percentage: number;
}

export const SkillProgress: React.FC<SkillProgressProps> = ({ label, percentage }) => (
  <div className="group/skill w-full">
    <div className="flex justify-between items-end mb-1.5">
      <span className="text-[9px] font-black uppercase tracking-widest text-t-fg group-hover/skill:text-t-accent transition-colors">{label}</span>
      <span className="text-[8px] font-mono text-t-fg-m opacity-60">{percentage}%</span>
    </div>
    <div className="h-[1px] w-full bg-t-border relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-t-accent transform origin-left transition-transform duration-[1500ms] ease-out" 
        style={{ transform: `scaleX(${percentage / 100})` }}
      />
    </div>
  </div>
);

export default SkillProgress;