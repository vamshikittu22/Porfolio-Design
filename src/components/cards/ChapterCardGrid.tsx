/**
 * ChapterCardGrid Component
 * 
 * Responsive layout that displays all 6 chapters with Framer Motion stagger animations.
 * Fixed to a balanced layout:
 * - Even count: Divided equally into 2 centered rows (e.g., 3 + 3)
 * - Odd count: Divided into n and n+1 centered rows (e.g., 2 + 3)
 */

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CHAPTERS } from '../../../data/chapters';
import useReducedMotion from '../../hooks/useReducedMotion';
import { ChapterCard } from './ChapterCard';
import '../../styles/landing.css';
import '../../styles/glass-cards.css';

interface ChapterCardGridProps {
  chapters?: any[]; // Using any to avoid complex type import for this quick fix
}

export function ChapterCardGrid({ chapters: propChapters }: ChapterCardGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const displayChapters = propChapters || CHAPTERS;

  // Defer animations until after initial paint
  useEffect(() => {
    const timer = setTimeout(() => setShouldAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const total = displayChapters.length;
  // We want the smaller or equal number on top if odd (n)
  // and the larger or equal number on bottom (n+1)
  const firstRowSize = Math.floor(total / 2);

  const rows = total <= 3
    ? [displayChapters]
    : [
      displayChapters.slice(0, firstRowSize),
      displayChapters.slice(firstRowSize)
    ];

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
