import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../../components/ui/GlassUI';
import { Project } from '../../../config/types';

interface FeaturedProjectCardProps {
    project: Project;
    onViewDetails: () => void;
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project, onViewDetails }) => {
    const getOptimizedUrl = (url: string) =>
        url.includes('unsplash.com') ? `${url}&fm=webp&q=75` : url;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
        >
            <GlassCard
                accent="theme"
                className="relative overflow-hidden p-0 bg-t-bg-el/40 backdrop-blur-3xl border-t-border shadow-2xl group cursor-pointer"
            >
                <button
                    onClick={onViewDetails}
                    className="w-full text-left outline-none focus-visible:ring-4 focus-visible:ring-t-accent focus-visible:ring-offset-4 focus-visible:ring-offset-t-bg"
                    aria-label={`View details for ${project.title}`}
                >
                    <div className="grid lg:grid-cols-[1.2fr_1fr] min-h-[380px]">
                        {/* Left — Project Preview Image */}
                        <div className="relative overflow-hidden">
                            <img
                                src={getOptimizedUrl(project.secondaryImageUrl)}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 blur-sm"
                                onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                                alt={`${project.title} preview`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-t-bg-el/95 dark:to-t-bg-el/90" />
                            <div className="absolute inset-0 bg-gradient-to-t from-t-bg-el/80 via-transparent to-transparent" />

                            {/* Featured badge */}
                            <div className="absolute top-6 left-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-t-accent animate-pulse" />
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-t-accent bg-t-bg/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-t-accent/20">
                                    Featured Project
                                </span>
                            </div>

                            {/* Thumbnail logo overlay */}
                            <div className="absolute bottom-6 left-6 w-12 h-12 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md overflow-hidden shadow-lg">
                                <img
                                    src={getOptimizedUrl(project.thumbnailUrl)}
                                    loading="lazy"
                                    className="w-full h-full object-cover blur-sm"
                                    onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                                    alt=""
                                />
                            </div>
                        </div>

                        {/* Right — Project Info */}
                        <div className="flex flex-col justify-center p-8 lg:p-12 gap-6">
                            {/* Category + Tech */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-wider bg-t-accent/10 text-t-accent border border-t-accent/20">
                                    {project.category}
                                </span>
                                <span className="text-[8px] font-mono font-bold uppercase text-t-fg-m/50 tracking-wider">
                                    {project.tech.slice(0, 3).join(' · ')}
                                </span>
                            </div>

                            {/* Title */}
                            <div>
                                <h3 className="text-3xl lg:text-5xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.9]">
                                    {project.title}
                                </h3>
                                <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-t-accent">
                                    {project.tagline}
                                </p>
                            </div>

                            {/* Key highlights — first 3 role highlights as bullet points */}
                            <div className="space-y-2.5">
                                {project.roleHighlights.slice(0, 3).map((hl, i) => (
                                    <div key={i} className="flex items-start gap-3 group/hl">
                                        <span className="text-t-accent font-black text-[10px] mt-0.5 shrink-0">0{i + 1}</span>
                                        <p className="text-xs font-bold text-t-fg-m leading-snug transition-transform group-hover/hl:translate-x-0.5">
                                            {hl}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div className="flex items-center gap-4 pt-2">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-t-accent text-t-bg text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-lg hover:shadow-t-accent/30"
                                    >
                                        Live Demo
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" /></svg>
                                    </a>
                                )}
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-t-border text-[10px] font-black uppercase tracking-[0.2em] text-t-fg-m hover:border-t-accent hover:text-t-accent transition-all"
                                    >
                                        View Source
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </button>
            </GlassCard>
        </motion.div>
    );
};
