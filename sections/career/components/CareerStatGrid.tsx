import React from 'react';

export const CareerStatGrid: React.FC = () => {
    const stats = [
        { val: "5+", label: "Years Exp", accent: "purple" },
        { val: "4", label: "Companies", accent: "orange" },
        { val: "2", label: "Degrees", accent: "indigo" },
        { val: "15+", label: "Tech Stack", accent: "emerald" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, i) => (
                <div key={i} className="p-4 flex flex-col items-center justify-center text-center rounded-3xl bg-t-bg/40 border border-t-border/20 transition-transform hover:-translate-y-1">
                    <span className="text-2xl font-black text-t-accent mb-0.5">{stat.val}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-t-fg-m opacity-60">{stat.label}</span>
                </div>
            ))}
        </div>
    );
};
