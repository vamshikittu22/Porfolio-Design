/**
 * Chapter 6: The Connection
 * 
 * Contact form and community engagement - the final chapter.
 * Fulfills CHAP-06 requirement: compose ContactSection into narrative chapter.
 * 
 * Content strategy:
 * - ContactSection provides contact form functionality
 * - PROJECT.md mentions "Social feed integration" as existing
 * - May include social links/feed or could be separate component
 * - Fulfills "The Connection" theme: staying in touch, community engagement
 * - Creates natural portfolio conclusion
 * 
 * Navigation behavior:
 * - This is the 6th and final chapter
 * - ChapterFooter will show "Next" button as disabled or hidden
 * - getPrevChapter returns Chapter 5, getNextChapter returns null
 * - Footer component already handles final chapter state (from Plan 03-01)
 */

import { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load ContactSection for performance (already lazy loaded in App.tsx)
const ContactSection = lazy(() => import('../../../sections/contact/ContactSection'));

/**
 * Chapter06Connection - Sixth and final chapter in the portfolio narrative
 * 
 * Theme: "The Connection" - community, staying in touch, engagement
 * 
 * Uses ChapterContainer wrapper for:
 * - Consistent header/footer navigation chrome
 * - Reading progress tracking
 * - Keyboard navigation support
 * - Accessibility features (skip links, auto-focus)
 * 
 * Final chapter behavior:
 * - No "Next" button (handled by ChapterFooter)
 * - Natural conclusion to portfolio narrative
 */
export function Chapter06Connection() {
  return (
    <ChapterContainer chapterId="06-connection">
      <section className="chapter-content py-12 md:py-16">
        {/* TODO: Verify social feed is included in ContactSection */}
        {/* If separate, add component in future enhancement */}
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </section>
    </ChapterContainer>
  );
}
