/**
 * ChapterHeader - Sticky header for chapter pages
 * 
 * Displays chapter title and description with glass morphism styling.
 * Remains visible while scrolling for context awareness.
 * 
 * Features:
 * - Sticky positioning at top of viewport
 * - Glass morphism background effect
 * - Responsive typography
 * - Backdrop blur with progressive enhancement
 */

interface ChapterHeaderProps {
  /** Chapter title (e.g., "The Introduction", "The Builder") */
  title: string;
  
  /** Chapter description/tagline */
  description: string;
}

/**
 * ChapterHeader Component
 * 
 * Sticky header with glass morphism effect.
 * Uses backdrop-filter with @supports fallback for browser compatibility.
 */
export function ChapterHeader({ title, description }: ChapterHeaderProps) {
  return (
    <header 
      className="chapter-header sticky top-0 z-100 glass-morphism"
      style={{
        background: 'rgba(var(--background-rgb), 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Chapter Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-t-foreground mb-2">
          {title}
        </h1>
        
        {/* Chapter Description */}
        <p className="text-base sm:text-lg text-t-secondary">
          {description}
        </p>
      </div>
      
      {/* Bottom border for visual separation */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-t-accent/20 to-transparent" />
    </header>
  );
}
