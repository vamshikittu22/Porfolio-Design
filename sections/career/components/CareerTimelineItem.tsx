import React from 'react';
import { motion } from 'framer-motion';

interface CareerTimelineItemProps {
    item: any;
    isActive: boolean;
}

export const CareerTimelineItem: React.FC<CareerTimelineItemProps> = ({ item, isActive }) => {
    return (
        <motion.div
            animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.3,
                filter: isActive ? 'blur(0px)' : 'blur(1px)'
            }}
            transition={{ duration: 0.4 }}
        >
            <div
                className={`
          p-8 lg:p-10 border-l-8 transition-all duration-500 rounded-3xl bg-t-bg-el/90 border border-t-border
          ${item.type === 'work' ? 'border-l-purple-500' : 'border-l-indigo-500'}
          ${isActive ? 'shadow-2xl' : ''}
        `}
            >
                <div className="flex flex-col gap-6">
                    <span className="text-[10px] font-bold text-t-accent-2 tracking-tight">{item.period}</span>
                    <div className="space-y-1.5">
                        <h4 className="text-2xl lg:text-3xl font-black text-t-fg uppercase tracking-tighter leading-tight">
                            {item.title}
                        </h4>
                        <p className="text-sm font-bold text-t-fg opacity-80 uppercase tracking-wide">
                            {item.subtitle}
                        </p>
                        <p className="text-[9px] font-black text-t-fg-m opacity-40 uppercase tracking-widest">
                            {item.location}
                        </p>
                    </div>
                    <div className="h-px w-full bg-t-border/20" />
                    <ul className="space-y-3">
                        {item.description.slice(0, 3).map((bullet: string, bIdx: number) => (
                            <li key={bIdx} className="flex gap-3 items-start">
                                <div className="w-1 h-1 rounded-full bg-t-accent mt-1.5 flex-shrink-0" />
                                <p className="text-xs lg:text-sm font-medium text-t-fg-m leading-relaxed italic">
                                    {bullet}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};
