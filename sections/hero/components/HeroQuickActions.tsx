import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../../../components/ui/GlassUI';

interface HeroQuickActionsProps {
    onScroll: (id: string) => void;
}

export const HeroQuickActions: React.FC<HeroQuickActionsProps> = ({ onScroll }) => {
    const handleDownloadResumeFile = () => {
        const link = document.createElement('a');
        link.href = '/assets/downloads/Vamshi_Krishna_Resume.pdf';
        link.download = 'Vamshi_Krishna_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col gap-6 relative" role="group" aria-label="Quick Actions">
            <motion.div whileHover={{ x: 5 }}>
                <GlassButton
                    primary
                    accent="theme"
                    aria-label="View projects"
                    className="!px-8 !py-5 !text-[10px] group shadow-xl dark:shadow-2xl w-full"
                    onClick={() => onScroll('projects-section-anchor')}
                >
                    Explore Portfolio
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} aria-hidden="true">
                        <path d="M14 5l7 7-7 7M5 12h16" />
                    </svg>
                </GlassButton>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} className="lg:ml-10">
                <GlassButton
                    accent="secondary"
                    aria-label="Download resume"
                    className="!px-8 !py-5 !text-[10px] hover:bg-t-accent-2/10 w-full whitespace-nowrap border-t-accent-2/40"
                    onClick={handleDownloadResumeFile}
                >
                    Technical CV (PDF)
                </GlassButton>
            </motion.div>

            <motion.div whileHover={{ x: 5 }} className="lg:ml-20">
                <GlassButton
                    accent="theme"
                    aria-label="Contact me"
                    className="!px-8 !py-5 !text-[10px] hover:bg-t-accent/10 w-full whitespace-nowrap border-t-accent/40"
                    onClick={() => onScroll('contact-section-anchor')}
                >
                    Get In Touch
                </GlassButton>
            </motion.div>
        </div>
    );
};
