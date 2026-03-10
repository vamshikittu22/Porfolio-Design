// Type-only verification for NavigationContext
import { NavigationContextType, ChapterId } from './types/chapters';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';

// Verify the exported types match expected signatures
type ProviderType = typeof NavigationProvider;
type HookType = typeof useNavigation;

// Verify return type of useNavigation matches NavigationContextType
type HookReturn = ReturnType<typeof useNavigation>;
const test: HookReturn extends NavigationContextType ? true : false = true;

// Verify navigateToChapter accepts ChapterId
function testNavigation(ctx: NavigationContextType) {
  ctx.navigateToChapter('01-introduction'); // Should compile
  ctx.navigateToChapter('03-builder', 'sequential'); // Should compile
  ctx.toggleMenu();
  ctx.closeMenu();
  ctx.openMenu();
  const chapter: ChapterId | null = ctx.currentChapter;
  const open: boolean = ctx.isMenuOpen;
}

console.log('Type checking complete');
