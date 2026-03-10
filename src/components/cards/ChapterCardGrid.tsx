/**
 * ChapterCardGrid Component
 * 
 * Responsive layout that displays all 6 chapters with Framer Motion stagger animations.
 * Fixed to a balanced layout:
 * - Even count: Divided equally into 2 centered rows
 * - Odd count: Divided into n and n+1 centered rows
 */

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CHAPTERS } from '../../../data/chapters';
import useReducedMotion from '../../hooks/useReducedMotion';
import { ChapterCard } from './ChapterCard';
import '../../styles/landing.css';
import '../../styles/glass-cards.css';

export function ChapterCardGrid() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Defer animations until after initial paint
  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Calculate split rows based on count
   * even -> half and half
   * odd -> n and n+1
   */
  const rows = useMemo(() => {
    const total = CHAPTERS.length;
    const splitPoint = Math.floor(total / 2);
    return [
      CHAPTERS.slice(0, splitPoint),
      CHAPTERS.slice(splitPoint)
    ];
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <motion.div
      className="chapter-grid-container"
      variants={!prefersReducedMotion && shouldAnimate ? containerVariants : {}}
      initial={shouldAnimate ? "hidden" : false}
      animate={shouldAnimate ? "visible" : {}}
    >
      {rows.map((row, rowIdx) => (
        <motion.div
          key={rowIdx}
          className="chapter-row"
          variants={!prefersReducedMotion && shouldAnimate ? {
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          } : {}}
        >
          {row.map(chapter => (
            <motion.div
              key={chapter.id}
              className="chapter-card-wrapper"
              variants={!prefersReducedMotion && shouldAnimate ? cardVariants : {}}
            >
              <ChapterCard chapter={chapter} />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}
