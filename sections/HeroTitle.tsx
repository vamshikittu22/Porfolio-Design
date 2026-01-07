
import React from 'react';
import { motion } from 'framer-motion';

export const HeroTitle: React.FC = () => {
  const shadowLayer = "0px 1px 2px rgba(0,0,0,0.05), 0px 4px 8px rgba(0,0,0,0.05), 0px 8px 16px rgba(0,0,0,0.05)";
  const hoverShadow = "0px 10px 20px rgba(0,0,0,0.1), 0px 20px 40px rgba(0,0,0,0.05)";

  return (
    <div className="relative flex flex-col items-start leading-none select-none perspective-[1000px]">
      <div className="relative">
        <motion.h1
          initial={{ y: 20, opacity: 0, rotateX: 10 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            textShadow: hoverShadow,
            rotateX: 5
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ textShadow: shadowLayer, transformStyle: "preserve-3d" }}
          className="text-8xl md:text-[10rem] lg:text-[13rem] font-black font-display text-t-fg tracking-tighter cursor-default uppercase relative z-20 origin-bottom"
        >
          Vamshi
        </motion.h1>

        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ 
            opacity: 1, 
            y: -4,
            scale: 1.05,
            color: "var(--color-accent)",
            textShadow: "0 0 40px var(--color-accent-soft)"
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
          className="absolute top-1/2 left-0 text-8xl md:text-[10rem] lg:text-[13rem] font-black font-display text-t-fg opacity-10 dark:opacity-20 tracking-tighter uppercase z-10 translate-y-4 lg:translate-y-8 cursor-default"
        >
          Krishna
        </motion.h2>
      </div>
    </div>
  );
};
