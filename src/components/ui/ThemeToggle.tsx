/**
 * ThemeToggle - Manual Theme Mode Switcher
 * 
 * 3-state toggle button cycling through Light → Dark → System theme modes.
 * Matches ChapterSidebar glass morphism styling for visual consistency.
 * 
 * Features:
 * - Cycles through light, dark, and system modes
 * - Glass morphism styling matching navigation buttons
 * - Icons: ☀️ (light), 🌙 (dark), 🖥️ (system)
 * - Framer Motion transitions for smooth icon changes
 * - Hover label showing current mode
 * 
 * Usage:
 * ```tsx
 * import { ThemeToggle } from './components/ui/ThemeToggle';
 * 
 * function App() {
 *   return <ThemeToggle />;
 * }
 * ```
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, ThemeMode } from '../../contexts/ThemeContext';

/**
 * Theme mode configuration
 */
const THEME_CONFIG: Record<ThemeMode, { icon: string; label: string }> = {
  light: { icon: '☀️', label: 'Light Mode' },
  dark: { icon: '🌙', label: 'Dark Mode' },
  system: { icon: '🖥️', label: 'System Theme' }
};

/**
 * Cycle to next theme mode
 */
function getNextMode(current: ThemeMode): ThemeMode {
  const cycle: ThemeMode[] = ['light', 'dark', 'system'];
  const currentIndex = cycle.indexOf(current);
  const nextIndex = (currentIndex + 1) % cycle.length;
  return cycle[nextIndex];
}

/**
 * ThemeToggle Component
 * 
 * Glass morphism button that cycles through theme modes.
 * Matches ChapterSidebar button styling (~44px touch target).
 */
export function ThemeToggle() {
  const { themeMode, setThemeMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const currentConfig = THEME_CONFIG[themeMode];

  const handleToggle = () => {
    const nextMode = getNextMode(themeMode);
    setThemeMode(nextMode);
  };

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover label - appears on right */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.2 }}
            className="absolute left-16 whitespace-nowrap pointer-events-none"
          >
            <div className="bg-t-bg-el/95 backdrop-blur-xl border border-t-border px-4 py-2 rounded-xl shadow-2xl">
              <span className="text-[10px] font-bold text-t-fg uppercase tracking-tight">
                {currentConfig.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative w-12 h-12 rounded-full border-2 flex items-center justify-center
          transition-all duration-300 outline-none
          ${
            isHovered
              ? 'bg-t-bg-el/50 border-t-accent/50 text-t-fg scale-105'
              : 'bg-t-bg-el/50 border-t-border/30 text-t-fg/50 hover:border-t-border/50'
          }
          backdrop-blur-xl
        `}
        aria-label={`Switch theme (current: ${themeMode})`}
      >
        {/* Theme icon with transition */}
        <motion.span
          key={themeMode}
          initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="text-lg"
        >
          {currentConfig.icon}
        </motion.span>
      </motion.button>
    </div>
  );
}
