import { useState, useEffect } from 'react';

/**
 * Hook that returns `true` when the user has enabled
 * "Prefer reduced motion" in their OS / browser settings.
 * Listens for live changes so toggling mid-session works.
 */
export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    useEffect(() => {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return prefersReducedMotion;
}
