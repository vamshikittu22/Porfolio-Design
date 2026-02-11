import React from 'react';

export const HeroStatus: React.FC = () => {
    return (
        <div className="w-full max-w-sm space-y-5 animate-in fade-in slide-in-from-right duration-1000 delay-300" role="complementary" aria-label="Status Indicators">
            <div className="h-[2px] w-full bg-t-accent/40 dark:bg-t-accent/30" />
            <div className="flex justify-between items-start gap-6">
                {[
                    { label: 'Location', val: 'Overland Park, KS' },
                    { label: 'Current', val: 'Software Engineer @ CVS Health' },
                    { label: 'Experience', val: '5+ Years' }
                ].map((meta, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-[8px] font-black uppercase tracking-widest text-t-accent whitespace-nowrap">{meta.label}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-t-fg whitespace-nowrap">{meta.val}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
