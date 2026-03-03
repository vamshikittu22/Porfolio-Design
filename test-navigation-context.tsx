// Integration test for NavigationContext
import React from 'react';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';

// Test component that uses the navigation context
function TestComponent() {
  const { currentChapter, navigateToChapter, isMenuOpen, toggleMenu } = useNavigation();
  
  // Type checking - these should all be properly typed
  const chapterId: string | null = currentChapter;
  const menuState: boolean = isMenuOpen;
  
  return null; // Simplified for type check
}

// Usage example
function App() {
  return React.createElement(NavigationProvider, null, React.createElement(TestComponent));
}

// Type check passes if this compiles
export default App;
