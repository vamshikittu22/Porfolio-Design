import React from 'react';
import { RESUME_CONTENT } from '../data/ResumeData';

export const ResumeEducation: React.FC = () => {
    return (
        <section className="break-avoid">
            <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-4 print:section-hdr">Education</h3>
            <div className="space-y-4 print:space-y-2">
                {RESUME_CONTENT.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-baseline">
                        <h4 className="text-base font-black text-t-fg print:item-hdr">{edu.title}, <span className="font-medium">{edu.subtitle}</span></h4>
                        <span className="text-[10px] font-bold text-t-fg print:text-[9.5pt] font-mono">{edu.period}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
