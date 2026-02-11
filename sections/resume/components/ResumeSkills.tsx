import React from 'react';
import { RESUME_CONTENT } from '../data/ResumeData';

export const ResumeSkills: React.FC = () => {
    return (
        <section className="break-avoid">
            <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-3 print:section-hdr">Technical Skills</h3>
            <div className="grid grid-cols-1 gap-1 print:txt-body">
                <p><strong>Languages:</strong> {RESUME_CONTENT.technicalSkills.languages.join(', ')}</p>
                <p><strong>Frontend:</strong> {RESUME_CONTENT.technicalSkills.frontend.join(', ')}</p>
                <p><strong>Backend:</strong> {RESUME_CONTENT.technicalSkills.backend.join(', ')}</p>
                <p><strong>Databases:</strong> {RESUME_CONTENT.technicalSkills.databases.join(', ')}</p>
                <p><strong>Cloud/DevOps:</strong> {RESUME_CONTENT.technicalSkills.cloud.join(', ')}, {RESUME_CONTENT.technicalSkills.devops.join(', ')}</p>
                <p><strong>AI & Tools:</strong> {RESUME_CONTENT.technicalSkills.ai.join(', ')}, {RESUME_CONTENT.technicalSkills.tools.join(', ')}</p>
            </div>
        </section>
    );
};
