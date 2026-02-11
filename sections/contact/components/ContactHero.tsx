import React from 'react';

interface ContactHeroProps {
    onToggle: () => void;
}

export const ContactHero: React.FC<ContactHeroProps> = ({ onToggle }) => {
    return (
        <div
            onClick={onToggle}
            role="button"
            tabIndex={0}
            className="group cursor-pointer relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-t-accent-2 rounded-full"
            aria-label="Open contact information"
        >
            <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full border border-white/80 shadow-xl animate-pulse hover:scale-105 transition-all duration-700 flex items-center justify-center bg-white/40 dark:bg-white/10 backdrop-blur-[80px] group-hover:border-t-accent-2">
                <div className="absolute inset-[15px] rounded-full border border-white/20 pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-t-accent-2/10 border border-t-accent-2/40 text-t-accent-2 flex items-center justify-center shadow-sm transition-all group-hover:bg-t-accent-2 group-hover:text-t-bg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <span className="text-[14px] font-black uppercase tracking-[0.6em] block text-t-fg pl-[0.6em]">Contact</span>
                </div>
                <div className="absolute inset-[-40px] border-[2.5px] border-black/80 dark:border-t-accent-2/50 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-[-80px] border-[1.5px] border-black/50 dark:border-t-accent-2/30 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute inset-[-120px] border-[1px] border-black/30 dark:border-t-accent-2/15 rounded-full animate-[spin_45s_linear_infinite]" />
            </div>
            <p className="mt-32 text-[9px] font-black uppercase tracking-[1.5em] text-t-fg opacity-40 group-hover:opacity-100 transition-opacity animate-bounce pl-[1.5em]">Click to Engage</p>
        </div>
    );
};
