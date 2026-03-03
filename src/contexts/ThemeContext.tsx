/**
 * ThemeContext - Global Theme Management
 * 
 * Provides centralized theme state with light/dark/system modes.
 * Persists user preference to localStorage and syncs with OS theme changes.
 * 
 * Features:
 * - Three theme modes: 'light', 'dark', 'system'
 * - Persistent user preference via localStorage
 * - System preference detection and listening
 * - Automatic 'dark' class management on document.documentElement
 * 
 * Usage:
 * ```tsx
 * import { ThemeProvider, useTheme } from './contexts/ThemeContext';
 * 
 * // Wrap app with provider
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * // Use in components
 * function MyComponent() {
 *   const { themeMode, resolvedTheme, setThemeMode } = useTheme();
 *   return <button onClick={() => setThemeMode('dark')}>Dark Mode</button>;
 * }
 * ```
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Theme mode options
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Resolved theme (what's actually applied)
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme context type
 */
interface ThemeContextType {
  /** User's theme preference */
  themeMode: ThemeMode;
  
  /** Actual applied theme (resolved from system if mode is 'system') */
  resolvedTheme: ResolvedTheme;
  
  /** Update theme mode */
  setThemeMode: (mode: ThemeMode) => void;
}

/**
 * Context instance - use via useTheme hook, not directly
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider Props
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Get system theme preference
 */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * ThemeProvider - Global theme state provider
 * 
 * Manages:
 * - Theme mode (light/dark/system)
 * - Resolved theme (actual applied theme)
 * - localStorage persistence
 * - System preference listening
 * - document.documentElement 'dark' class
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize from localStorage or default to 'system'
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'system';
    
    // Check for existing preference (legacy 'theme' key or new 'portfolio-theme-mode')
    const legacyTheme = localStorage.getItem('theme');
    const savedMode = localStorage.getItem('portfolio-theme-mode') as ThemeMode | null;
    
    // Migrate from legacy theme if present
    if (!savedMode && legacyTheme) {
      const mode = legacyTheme === 'dark' ? 'dark' : legacyTheme === 'light' ? 'light' : 'system';
      localStorage.setItem('portfolio-theme-mode', mode);
      localStorage.removeItem('theme'); // Clean up legacy key
      return mode;
    }
    
    return savedMode || 'system';
  });

  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  /**
   * Compute resolved theme based on mode
   */
  const resolvedTheme: ResolvedTheme = themeMode === 'system' ? systemTheme : themeMode;

  /**
   * Listen to system preference changes
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Initial check
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  /**
   * Apply theme to document
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [resolvedTheme]);

  /**
   * Update theme mode and persist to localStorage
   */
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('portfolio-theme-mode', mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, resolvedTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme - Hook to access theme context
 * 
 * @throws Error if used outside ThemeProvider
 * @returns ThemeContextType
 * 
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { themeMode, resolvedTheme, setThemeMode } = useTheme();
 *   return (
 *     <button onClick={() => setThemeMode('dark')}>
 *       Current: {themeMode} (resolved: {resolvedTheme})
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
