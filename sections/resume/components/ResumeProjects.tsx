import React from 'react';
import { RESUME_CONTENT } from '../data/ResumeData';

export const ResumeProjects: React.FC = () => {
    return (
        <section>
            <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-4 print:section-hdr">Key Projects</h3>
            <div className="space-y-6 print:space-y-4">
                {RESUME_CONTENT.projects.map((proj, idx) => (
                    <div key={idx} className="break-avoid">
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-lg font-black text-t-fg print:item-hdr">{proj.title}</h4>
                            <span className="text-[10px] font-bold text-t-fg print:text-[9.5pt] font-mono">{proj.period}</span>
                        </div>
                        <p className="text-[10px] font-black uppercase text-t-accent-2 mb-2 print:text-[9pt] print:mb-1 print:italic">{proj.subtitle}</p>
                        <ul className="space-y-1 print:list-disc print:ml-6">
                            {proj.description.map((bullet, bIdx) => (
                                <li key={bIdx} className="text-sm text-t-fg leading-relaxed flex items-start gap-2 print:txt-body">
                                    <span className="text-t-accent print:hidden mt-1">•</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};
