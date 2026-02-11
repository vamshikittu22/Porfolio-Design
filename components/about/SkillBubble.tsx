import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface SkillBubbleProps {
    item: {
        name: string;
        icon: string;
        cat: string;
        left: string;
        top: string;
        duration: number;
        delay: number;
        floatX: number;
        floatY: number;
    };
    isHovered: boolean;
    isInSelectedCategory: boolean;
    isFreeMode: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: (cat: string) => void;
}

const SkillBubbleComponent: React.FC<SkillBubbleProps> = ({
    item,
    isHovered,
    isInSelectedCategory,
    isFreeMode,
    onMouseEnter,
    onMouseLeave,
    onClick
}) => {
    let targetScale = isHovered ? 1.3 : (!isFreeMode && isInSelectedCategory ? 1.15 : (!isFreeMode ? 0.75 : 1));
    let targetOpacity = isHovered ? 1 : (!isFreeMode && isInSelectedCategory ? 1 : (!isFreeMode ? 0.2 : 0.6));

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                x: [0, item.floatX * 1.5, 0],
                y: [0, item.floatY * 1.5, 0],
                scale: targetScale,
                opacity: targetOpacity
            }}
            transition={{
                x: { duration: item.duration * 1.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item.delay },
                y: { duration: item.duration * 1.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item.delay },
                scale: { duration: 0.4 },
                opacity: { duration: 0.4 }
            }}
            style={{ left: item.left, top: item.top, position: 'absolute' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={(e) => {
                e.stopPropagation();
                onClick(item.cat);
            }}
            className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-2xl outline-none"
        >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-[4px] shadow-[0_8px_16px_rgba(0,0,0,0.8)] transition-all duration-500 ${(isHovered || (!isFreeMode && isInSelectedCategory)) ? `bg-white/15 border-white/30` : 'hover:bg-white/10'}`} />
            <img
                src={item.icon}
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"%3E%3Cpath d="M16 18L22 12L16 6M8 6L2 12L8 18"/%3E%3C/svg%3E';
                }}
                className={`relative w-[60%] h-[60%] object-contain drop-shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
            />
        </motion.button>
    );
};

export const SkillBubble = memo(SkillBubbleComponent, (prev, next) => {
    return (
        prev.isHovered === next.isHovered &&
        prev.isInSelectedCategory === next.isInSelectedCategory &&
        prev.isFreeMode === next.isFreeMode &&
        prev.item.name === next.item.name
    );
});
