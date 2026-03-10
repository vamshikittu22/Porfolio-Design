/**
 * Chapter Navigation System Types
 * 
 * Defines the type system for the chapter-based navigation architecture.
 * Used throughout the portfolio to ensure type safety for chapter IDs,
 * navigation state, and chapter metadata.
 */

/**
 * ChapterId - Literal union type for all 6 chapters
 * Ensures only valid chapter IDs can be used throughout the app
 */
export type ChapterId =
  | '01-introduction'
  | '02-learner'
  | '03-builder'
  | '04-journey'
  | '05-explorer'
  | '06-thinker'
  | '07-connection';

/**
 * NavigationType - Determines scroll behavior on chapter transition
 * - 'sequential': Preserve scroll position (for next/previous navigation)
 * - 'jump': Reset to top (for menu-based navigation)
 */
export type NavigationType = 'sequential' | 'jump';

/**
 * Chapter - Complete metadata for a single chapter
 * Single source of truth for chapter properties
 */
export interface Chapter {
  /** Unique identifier matching URL hash */
  id: ChapterId;

  /** Chapter number (1-6) for sequential ordering */
  number: number;

  /** Display title (e.g., "The Introduction", "The Builder") */
  title: string;

  /** URL hash value (same as id for consistency) */
  hash: string;

  /** Path to chapter icon/illustration SVG */
  icon: string;

  /** Short functional subtitle (e.g., "Bio, Skills & Executive Profile") */
  subtitle?: string;

  /** Short tagline describing the chapter theme */
  description: string;
}

/**
 * NavigationState - Core navigation state shape
 * Managed by NavigationContext provider
 */
export interface NavigationState {
  /** Currently active chapter, null when on landing page */
  currentChapter: ChapterId | null;

  /** Menu open/closed state (sidebar on desktop, bottom sheet on mobile) */
  isMenuOpen: boolean;

  /** Transition animation in progress - prevents double navigation */
  isTransitioning: boolean;

  /** Navigation type for current transition - controls scroll behavior */
  navigationType: NavigationType;
}

/**
 * NavigationContextType - Full context API shape
 * Combines state with navigation methods
 */
export interface NavigationContextType extends NavigationState {
  /**
   * Navigate to a specific chapter
   * @param chapterId - Target chapter ID
   * @param type - Navigation type (controls scroll behavior)
   */
  navigateToChapter: (chapterId: ChapterId, type?: NavigationType) => void;

  /**
   * Toggle menu open/closed state
   */
  toggleMenu: () => void;

  /**
   * Close the chapter menu
   */
  closeMenu: () => void;

  /**
   * Open the chapter menu
   */
  openMenu: () => void;
}
