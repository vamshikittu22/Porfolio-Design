/**
 * Chapter 02: The Learner
 * 
 * New chapter dedicated to certifications, badges, and the learning journey.
 * Fulfills user request to separate learning details into its own narrative chapter.
 */

import React, { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';

const BadgeHighlights = lazy(() => import('../../../sections/badges/BadgeHighlights'));
const ResumeCertifications = lazy(() => import('../../../sections/resume/components/ResumeCertifications'));

/**
 * Chapter02Learner Component
 * 
 * Showcases a gallery of earned badges and a list of verified certifications.
 */
export function Chapter02Learner() {
    return (
        <ChapterContainer chapterId="02-learner">
            <article className="w-full max-w-[min(1500px,100%)] mx-auto px-4 sm:px-10 lg:px-16 py-20 space-y-24">
                <header className="mb-16">
                    <span className="inline-block text-[10px] font-mono font-black uppercase tracking-[0.5em] text-t-accent mb-4">
                        Chapter 02
                    </span>
                    <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black font-heading text-t-fg tracking-tight mb-6 leading-[1.1]">
                        The Journey of<br />
                        Continuous <span className="text-t-accent">Learning</span>
                    </h1>
                    <div className="h-1 w-20 bg-t-accent" />
                    <p className="mt-8 text-lg text-t-fg-m/80 max-w-2xl leading-relaxed">
                        Beyond the code, I am driven by an insatiable curiosity. This chapter chronicles my professional
                        growth through certifications and technical achievements from Oracle, Google, and beyond.
                    </p>
                </header>

                {/* Badge Visuals Marquee and Grid */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-t-accent/10 text-t-accent rounded-full font-mono text-[10px] font-bold tracking-widest uppercase">
                            Skills Verified
                        </span>
                    </div>
                    <Suspense fallback={<SectionLoader />}>
                        <BadgeHighlights />
                    </Suspense>
                </section>

                {/* Detailed Certs with PDF Links */}
                <Suspense fallback={<SectionLoader />}>
                    <div className="bg-t-bg-el/30 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 border border-white/5 shadow-2xl">
                        <h2 className="text-3xl font-black mb-12 text-t-fg flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-t-accent/20 flex items-center justify-center text-t-accent text-2xl shadow-inner">
                                📜
                            </span>
                            Official Certifications
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            <ResumeCertifications />
                        </div>
                    </div>
                </Suspense>
            </article>
        </ChapterContainer>
    );
}

export default Chapter02Learner;
