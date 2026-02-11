import React from 'react';
import { GlassButton } from '../../../components/ui/GlassUI';

interface ResumeFooterProps {
    onDownload: () => void;
}

export const ResumeFooter: React.FC<ResumeFooterProps> = ({ onDownload }) => {
    return (
        <footer className="pt-24 border-t border-t-border print:hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                <p className="text-[10px] font-black text-t-fg-m font-mono uppercase tracking-[0.4em] opacity-40">
                    Neural Export Ref: VKP-2025-v7.0
                </p>
                <div className="flex gap-4">
                    <GlassButton accent="theme" onClick={onDownload}>Get Official CV</GlassButton>
                    <GlassButton primary accent="secondary" onClick={() => document.getElementById('contact-section-anchor')?.scrollIntoView({ behavior: 'smooth' })}>
                        Hire Vamshi
                    </GlassButton>
                </div>
            </div>
        </footer>
    );
};
