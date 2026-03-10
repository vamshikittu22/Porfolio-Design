/**
 * Chapter 07: The Connection
 * 
 * Seventh and final chapter in the portfolio narrative featuring contact and social links.
 */

import { lazy, Suspense } from 'react';
import { ChapterContainer } from '../../components/chapter/ChapterContainer';
import SectionLoader from '../../../components/ui/SectionLoader';

// Lazy load ContactSection for performance
const ContactSection = lazy(() => import('../../../sections/contact/ContactSection'));

/**
 * Chapter07Connection - Final chapter providing ways to connect and collaborate.
 */
export function Chapter07Connection() {
  return (
    <ChapterContainer chapterId="07-connection">
      <article className="w-full max-w-[min(1500px,100%)] mx-auto px-4 sm:px-10 lg:px-16 py-20 pb-40">
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </article>
    </ChapterContainer>
  );
}

export default Chapter07Connection;
