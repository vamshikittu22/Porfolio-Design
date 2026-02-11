import React from 'react';
import { GlassButton } from '../../../components/ui/GlassUI';
import { RESUME_CONTENT } from '../data/ResumeData';

interface ResumeHeaderProps {
    onDownload: () => void;
    onPrint: () => void;
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({ onDownload, onPrint }) => {
    return (
        <header className="flex flex-col items-center mb-8 text-center print:mb-6">
            <h2 className="text-4xl lg:text-5xl font-black font-display tracking-tight text-t-fg print:text-[24pt] print:font-extrabold print:mb-1">
                {RESUME_CONTENT.name}
            </h2>
            <div className="text-sm font-bold text-t-fg print:text-[12pt] print:font-bold uppercase tracking-widest">
                {RESUME_CONTENT.role} | {RESUME_CONTENT.contact.location}
            </div>
            <div className="mt-4 text-xs lg:text-sm font-medium text-t-fg-m print:text-black print:text-[10pt] print:mt-2 font-mono flex flex-wrap justify-center gap-4">
                <span>{RESUME_CONTENT.contact.phone}</span>
                <span className="opacity-30 print:inline">|</span>
                <span className="font-bold underline">{RESUME_CONTENT.contact.email}</span>
                <span className="opacity-30 print:inline">|</span>
                <span>LinkedIn</span>
                <span className="opacity-30 print:inline">|</span>
                <span>GitHub</span>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 print:hidden">
                <GlassButton primary accent="theme" onClick={onDownload} className="!px-10 !py-5 !text-[10px] shadow-xl">
                    Download Official PDF
                </GlassButton>
                <GlassButton accent="theme" onClick={onPrint} className="!px-10 !py-5 !text-[10px]">
                    Print Live Snapshot
                </GlassButton>
            </div>

            <p className="mt-4 text-[9px] font-bold text-t-fg-m uppercase tracking-widest opacity-40 print:hidden">
                The "Official PDF" button downloads your uploaded resume file.
            </p>
        </header>
    );
};
