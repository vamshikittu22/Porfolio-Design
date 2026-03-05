/**
 * LandingPage Component
 * 
 * Entry point for the portfolio - displays all 6 chapters in a card grid.
 * Serves as the home view when no chapter is active (currentChapter === null).
 * 
 * Features:
 * - Semantic HTML structure for accessibility
 * - Responsive container layout with Tailwind
 * - Chapter card grid rendering via ChapterCardGrid component
 * 
 * Navigation:
 * - Rendered when user is at root URL (no hash)
 * - Hidden when user navigates to a specific chapter
 */

import { ChapterCardGrid } from '../components/cards/ChapterCardGrid';

export default function LandingPage() {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-t-bg"
      role="main"
      aria-label="Portfolio chapters landing page"
    >
      <div className="container max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-t-fg mb-4">
            Choose Your Chapter
          </h1>
          <p className="text-lg sm:text-xl text-t-fg-m max-w-2xl mx-auto">
            Explore the story through six immersive chapters
          </p>
        </header>

        {/* Chapter grid */}
        <ChapterCardGrid />
      </div>
    </main>
  );
}
