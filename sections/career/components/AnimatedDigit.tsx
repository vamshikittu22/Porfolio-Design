import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimatedDigit: React.FC<{ digit: string }> = ({ digit }) => (
    <div className="relative inline-flex flex-col h-[1em] w-[0.6em] overflow-hidden items-center justify-center mx-[-0.02em]">
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
                key={digit}
                initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
                className="absolute inset-0 flex justify-center items-center"
            >
                {digit}
            </motion.span>
        </AnimatePresence>
        {/* Invisible placeholder for width layout */}
        <span className="invisible">{digit}</span>
    </div>
);
