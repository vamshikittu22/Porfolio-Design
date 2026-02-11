import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface HeroCardProps {
    image: string | null;
    loading: boolean;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

export const HeroCard: React.FC<HeroCardProps> = ({ image, loading, mouseX, mouseY }) => {
    // --- PHYSICS ENGINE ---
    // Using passed springs for global parallax

    // Map mouse position (-0.5 to 0.5) to 3D Rotation (7 degrees)
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

    // Map mouse position to Layer Translation (45px movement)
    const imageTranslateX = useTransform(mouseX, [-0.5, 0.5], [-45, 45]);
    const imageTranslateY = useTransform(mouseY, [-0.5, 0.5], [-45, 45]);

    // --- ASSET OPTIMIZER ---
    const getOptimizedUrl = (url: string | null) => {
        if (!url) return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=75&w=1200&fm=webp'; // Hard fallback
        return url.includes('unsplash.com') ? `${url}&fm=webp&q=75` : url;
    };

    return (
        <div
            className="relative flex justify-center perspective-[2000px]"
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative aspect-[4/5] w-full max-w-sm min-h-[500px] rounded-[60px] bg-zinc-900/90 border border-t-border shadow-2xl z-10 overflow-hidden"
            >
                {loading && !image ? (
                    <div className="w-full h-full bg-zinc-900 animate-pulse flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-t-accent border-r-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        {/* Inner Kinetic Image Layer */}
                        <motion.div
                            style={{ x: imageTranslateX, y: imageTranslateY }}
                            className="absolute inset-[-20%] z-0"
                        >
                            <img
                                src={getOptimizedUrl(image)}
                                alt="Engineering visual"
                                className="w-full h-full object-cover transition-all duration-700"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=75&w=1200&fm=webp';
                                }}
                            />
                        </motion.div>

                        {/* Visual Overlays (Scanlines & Vignette) */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />

                        {/* UI Metadata Overlays */}
                        <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
                            <div className="flex flex-col gap-1">
                                <div className="w-8 h-1.5 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
                                <p className="text-[8px] font-black text-white uppercase tracking-widest bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">Visual Input // 01</p>
                            </div>
                        </div>

                        {/* Technical Labels */}
                        <div className="absolute bottom-10 left-10 z-20">
                            <p className="text-[11px] font-black text-white uppercase tracking-[0.4em]">VK-PULLAIAHGARI</p>
                            <p className="text-[8px] font-black text-white/90 uppercase tracking-[0.2em]">Enterprise Full Stack Engineer</p>
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
                className="absolute -inset-20 bg-indigo-500/20 blur-[100px] rounded-full -z-10"
            />
        </div>
    );
};
