import { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import {
  getPageTitle,
  getPageDescription,
  getPageKeywords,
  getCanonicalUrl,
  getOgImage,
  getPersonStructuredData,
  getProfilePageStructuredData,
  getWebSiteStructuredData,
  getBreadcrumbStructuredData,
  SITE_CONFIG,
} from '../../config/seo';

/**
 * SEOManager Component
 * 
 * Dynamically updates document head meta tags based on current chapter.
 * Handles title, description, keywords, Open Graph, Twitter Cards, and JSON-LD.
 * 
 * Usage: Place once at root level of App component.
 */
export const SEOManager: React.FC = () => {
  const { currentChapter } = useNavigation();

  useEffect(() => {
    // Update title
    document.title = getPageTitle(currentChapter);

    // Update or create meta tags
    updateMetaTag('name', 'description', getPageDescription(currentChapter));
    updateMetaTag('name', 'keywords', getPageKeywords(currentChapter));
    updateMetaTag('name', 'author', SITE_CONFIG.author.name);

    // Update canonical URL
    updateLinkTag('canonical', getCanonicalUrl(currentChapter));

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', getPageTitle(currentChapter));
    updateMetaTag('property', 'og:description', getPageDescription(currentChapter));
    updateMetaTag('property', 'og:url', getCanonicalUrl(currentChapter));
    updateMetaTag('property', 'og:image', getOgImage(currentChapter));
    updateMetaTag('property', 'og:type', 'website');

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:creator', SITE_CONFIG.author.twitter);
    updateMetaTag('name', 'twitter:title', getPageTitle(currentChapter));
    updateMetaTag('name', 'twitter:description', getPageDescription(currentChapter));
    updateMetaTag('name', 'twitter:image', getOgImage(currentChapter));

    // Update structured data
    updateStructuredData('person-schema', getPersonStructuredData());
    updateStructuredData('profile-schema', getProfilePageStructuredData());
    updateStructuredData('website-schema', getWebSiteStructuredData());
    updateStructuredData('breadcrumb-schema', getBreadcrumbStructuredData(currentChapter));
  }, [currentChapter]);

  return null; // This component only manages head tags
};

/**
 * Helper: Update or create meta tag
 */
function updateMetaTag(
  attribute: 'name' | 'property',
  value: string,
  content: string
): void {
  let element = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Helper: Update or create link tag
 */
function updateLinkTag(rel: string, href: string): void {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

/**
 * Helper: Update or create JSON-LD structured data script
 */
function updateStructuredData(id: string, data: any): void {
  let script = document.getElementById(id) as HTMLScriptElement;

  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data, null, 2);
}
