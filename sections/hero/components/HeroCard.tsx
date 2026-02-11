import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface HeroCardProps {
    image: string | null;
    loading: boolean;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

export const HeroCard: React.FC<HeroCardProps> = ({ image, loading, mouseX, mouseY }) => {
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

    const imageTranslateX = useTransform(mouseX, [-0.5, 0.5], [-45, 45]);
    const imageTranslateY = useTransform(mouseY, [-0.5, 0.5], [-45, 45]);

    const getOptimizedUrl = (url: string | null) => {
        if (!url) return '';
        return url.includes('unsplash.com') ? `${url}&fm=webp&q=75` : url;
    };

    return (
        <div className="relative flex flex-col gap-10 items-center lg:items-end justify-center perspective-[2000px]">
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative aspect-[4/5] w-full max-w-sm rounded-[60px] bg-t-bg-el border border-t-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group transition-all duration-1000 z-10 overflow-hidden"
            >
                {loading && !image ? (
                    <div className="w-full h-full bg-t-accent-s/20 animate-pulse flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-t-accent border-r-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        <motion.div
                            style={{ x: imageTranslateX, y: imageTranslateY }}
                            className="absolute inset-[-20%] z-0"
                        >
                            <img
                                src={getOptimizedUrl(image)}
                                loading="eager"
                                alt="Engineering precision visual"
                                className="w-full h-full object-cover transition-all duration-700 brightness-[0.9] dark:brightness-100"
                            />
                        </motion.div>

                        {/* Overlay Grid Elements */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-t-bg/90 via-transparent to-transparent pointer-events-none z-10" />

                        {/* UI Metadata Overlays */}
                        <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
                            <div className="flex flex-col gap-1">
                                <div className="w-8 h-1.5 bg-t-accent-2 shadow-[0_0_15px_rgba(var(--color-accent-secondary-rgb),0.6)]" />
                                <p className="text-[8px] font-black text-white uppercase tracking-widest bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">Visual Input // 01</p>
                            </div>
                        </div>

                        <div className="absolute bottom-10 left-10 right-10 z-20">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1.5">
                                    <p className="text-[11px] font-black text-white uppercase tracking-[0.4em] drop-shadow-lg">VK-PULLAIAHGARI</p>
                                    <p className="text-[8px] font-black text-white/90 uppercase tracking-[0.2em] drop-shadow-md">Enterprise Full Stack Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -inset-20 bg-t-accent/30 dark:bg-t-accent/20 blur-[100px] rounded-full -z-10"
            />
        </div>
    );
};
