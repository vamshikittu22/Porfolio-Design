import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BadgeFlipper: React.FC<{ type: 'work' | 'education' }> = ({ type }) => {
    const isWork = type === 'work';
    return (
        <div className="relative h-10 w-40 mx-auto perspective-[800px]">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={type}
                    initial={{ rotateX: -90, opacity: 0, y: 5 }}
                    animate={{ rotateX: 0, opacity: 1, y: 0 }}
                    exit={{ rotateX: 90, opacity: 0, y: -5 }}
                    transition={{ duration: 0.15, type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
                    className={`
            absolute inset-0 flex items-center justify-center
            px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-lg backface-hidden
            ${isWork
                            ? 'bg-purple-500/10 text-purple-500 border-purple-500/30'
                            : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30'}
          `}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {isWork ? 'Experience' : 'Academic'}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
