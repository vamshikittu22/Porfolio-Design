import React from 'react';

interface TimelineNodeProps {
  item: any;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  type: 'edu' | 'exp';
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({ item, index, isExpanded, onToggle, type }) => (
  <div 
    onClick={onToggle}
    className={`group/node relative transition-all duration-500 cursor-pointer border-b border-t-border/50 py-10 last:border-0 px-6 -mx-6 rounded-3xl
    ${isExpanded ? 'bg-t-bg-el/60 shadow-sm border-t-accent/20' : 'hover:bg-t-accent-s/10'}`}
  >
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black text-t-accent uppercase tracking-[0.4em]">{item.period}</span>
          <span className={`text-[8px] font-black px-2.5 py-1 rounded-full border uppercase tracking-widest border-t-accent/30 bg-t-accent-s/30 text-t-accent`}>
            {type === 'edu' ? 'Academic' : 'Corporate'}
          </span>
        </div>
        <div>
          <h4 className={`text-xl lg:text-3xl font-black text-t-fg uppercase tracking-tighter leading-tight transition-colors duration-500 
            ${isExpanded ? 'text-t-accent/60' : 'group-hover/node:text-t-accent'}`}>
            {item.title}
          </h4>
          <p className="text-[10px] font-black text-t-accent-2 uppercase tracking-[0.2em] mt-2 opacity-90">{item.subtitle} // {item.location}</p>
        </div>
        
        {type === 'edu' && item.coursework && (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-[8px] font-black uppercase text-t-fg-m opacity-40 mr-1">Focus:</span>
            {item.coursework.map((course: string, i: number) => (
              <span key={i} className="text-[8px] font-bold text-t-fg-m opacity-70 tracking-tight">
                {course}{i < item.coursework.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        )}

        {!isExpanded && (
          <p className="text-sm font-medium text-t-fg-m opacity-60 group-hover/node:opacity-100 transition-opacity truncate max-w-2xl mt-4">
            {item.description[0]}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <button className={`flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] transition-all hover:underline underline-offset-4 decoration-t-accent ${isExpanded ? 'text-t-accent' : 'text-t-fg opacity-30 group-hover/node:opacity-100'}`}>
          {isExpanded ? 'Collapse' : 'Detailed Log'}
          <svg className={`w-3 h-3 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>

    <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-h-[800px] opacity-100 mt-10' : 'max-h-0 opacity-0'}`}>
      <ul className="space-y-4 pt-8 border-t border-t-border/50">
        {item.description.map((desc: string, i: number) => (
          <li key={i} className="flex gap-4 text-sm lg:text-base font-medium text-t-fg leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-t-accent mt-2.5 flex-shrink-0" />
            <span className="opacity-80">{desc}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default TimelineNode;