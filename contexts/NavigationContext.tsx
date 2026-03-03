/**
 * NavigationContext - Chapter Navigation State Management
 * 
 * Provides global navigation state with bidirectional URL hash synchronization.
 * Manages chapter transitions, menu state, and scroll behavior.
 * 
 * Features:
 * - Bidirectional hash sync (state ↔ URL)
 * - Navigation type tracking (sequential vs jump)
 * - Transition state management
 * - Menu open/close controls
 * 
 * Usage:
 * ```tsx
 * import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
 * 
 * // Wrap app with provider
 * <NavigationProvider>
 *   <App />
 * </NavigationProvider>
 * 
 * // Use in components
 * function MyComponent() {
 *   const { currentChapter, navigateToChapter } = useNavigation();
 *   return <button onClick={() => navigateToChapter('01-introduction')}>Go</button>;
 * }
 * ```
 */

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { NavigationContextType, NavigationType, ChapterId } from '../types/chapters';
import { getChapterByHash } from '../data/chapters';

/**
 * Context instance - use via useNavigation hook, not directly
 */
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

/**
 * NavigationProvider Props
 */
interface NavigationProviderProps {
  children: ReactNode;
}

/**
 * NavigationProvider - Global navigation state provider
 * 
 * Manages:
 * - Current chapter state (synced with URL hash)
 * - Menu open/close state
 * - Transition animation state
 * - Navigation type (sequential vs jump)
 * 
 * Listens to:
 * - hashchange event (for browser back/forward and direct hash changes)
 */
export function NavigationProvider({ children }: NavigationProviderProps) {
  // Initialize state from URL hash on mount
  const [currentChapter, setCurrentChapter] = useState<ChapterId | null>(() => {
    if (typeof window === 'undefined') return null;
    
    const hash = window.location.hash.substring(1); // Remove leading #
    if (!hash) return null;
    
    const chapter = getChapterByHash(hash);
    return chapter ? chapter.id : null;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [navigationType, setNavigationType] = useState<NavigationType>('jump');

  /**
   * Hash change listener - Sync state when URL hash changes
   * Handles browser back/forward and direct hash manipulation
   */
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove leading #
      
      if (!hash) {
        // No hash - return to landing page
        setCurrentChapter(null);
        return;
      }
      
      // Validate hash against chapter registry
      const chapter = getChapterByHash(hash);
      if (chapter) {
        setCurrentChapter(chapter.id);
      } else {
        // Invalid hash - clear to landing page
        console.warn(`Invalid chapter hash: ${hash}`);
        setCurrentChapter(null);
        window.location.hash = ''; // Clear invalid hash
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  /**
   * Navigate to a specific chapter
   * Updates both state and URL hash, closes menu, manages transition
   */
  const navigateToChapter = (chapterId: ChapterId, type: NavigationType = 'jump') => {
    // Prevent navigation during transition
    if (isTransitioning) return;
    
    // Start transition
    setIsTransitioning(true);
    setNavigationType(type);
    
    // Update URL hash (this will trigger hashchange listener)
    window.location.hash = `#${chapterId}`;
    
    // Close menu on navigation
    setIsMenuOpen(false);
    
    // End transition after animation duration
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match transition duration in plan (300ms)
  };

  /**
   * Toggle menu open/closed
   */
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  /**
   * Close menu
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /**
   * Open menu
   */
  const openMenu = () => {
    setIsMenuOpen(true);
  };

  /**
   * Memoize context value to prevent unnecessary rerenders
   * Only updates when state values change
   */
  const contextValue = useMemo<NavigationContextType>(
    () => ({
      currentChapter,
      isMenuOpen,
      isTransitioning,
      navigationType,
      navigateToChapter,
      toggleMenu,
      closeMenu,
      openMenu
    }),
    [currentChapter, isMenuOpen, isTransitioning, navigationType]
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * useNavigation - Hook to access navigation context
 * 
 * @throws Error if used outside NavigationProvider
 * @returns NavigationContextType
 * 
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { currentChapter, navigateToChapter, isMenuOpen, toggleMenu } = useNavigation();
 *   // ... use navigation state and methods
 * }
 * ```
 */
export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  
  return context;
}
