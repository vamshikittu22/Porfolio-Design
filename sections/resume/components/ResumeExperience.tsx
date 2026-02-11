import React from 'react';
import { RESUME_CONTENT } from '../data/ResumeData';

export const ResumeExperience: React.FC = () => {
    return (
        <section>
            <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-4 print:section-hdr">Professional Experience</h3>
            <div className="space-y-8 print:space-y-5">
                {RESUME_CONTENT.experience.map((exp, idx) => (
                    <div key={idx} className="break-avoid">
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-lg font-black text-t-fg print:item-hdr">{exp.subtitle} | <span className="italic font-medium">{exp.title}</span></h4>
                            <span className="text-[10px] font-bold text-t-fg print:text-[9.5pt] font-mono">{exp.period}</span>
                        </div>
                        <ul className="space-y-1.5 print:list-disc print:ml-6">
                            {exp.description.map((bullet, bIdx) => (
                                <li key={bIdx} className="text-sm lg:text-base text-t-fg leading-relaxed flex items-start gap-2 print:txt-body print:bullet">
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
