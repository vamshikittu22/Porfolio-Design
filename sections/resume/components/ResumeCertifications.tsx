import React from 'react';
import { RESUME_CONTENT } from '../data/ResumeData';

export const ResumeCertifications: React.FC = () => {
    if (!RESUME_CONTENT.certifications || RESUME_CONTENT.certifications.length === 0) return null;

    return (
        <section className="break-avoid">
            <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-6 print:section-hdr">Certifications & Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 print:grid-cols-3 print:gap-4">
                {RESUME_CONTENT.certifications.map((cert, idx) => (
                    <div
                        key={idx}
                        className="group relative flex flex-col items-center p-4 rounded-2xl bg-t-fg/[0.03] dark:bg-white/[0.03] border border-t-border/10 hover:border-t-accent/30 transition-all duration-300 hover:scale-[1.05] print:border-0 print:bg-transparent print:p-2"
                    >
                        {/* Glass background glow on hover */}
                        <div className="absolute inset-0 bg-t-accent/0 group-hover:bg-t-accent/5 rounded-2xl transition-colors duration-300 -z-1" />

                        <div className="w-14 h-14 mb-3 relative flex items-center justify-center">
                            <img
                                src={cert.image}
                                alt={cert.name}
                                className="z-10 w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.2)] group-hover:drop-shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.4)] transition-all duration-300"
                                loading="lazy"
                            />
                        </div>

                        <h4 className="z-10 text-[9px] font-black uppercase tracking-wider text-center text-t-fg leading-tight mb-1 print:text-[8pt] line-clamp-2">
                            {cert.name}
                        </h4>

                        {cert.earned && (
                            <span className="z-10 text-[8px] font-mono font-bold text-t-fg-m/40 uppercase tracking-[0.1em] print:text-[6.5pt]">
                                {cert.earned}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};
