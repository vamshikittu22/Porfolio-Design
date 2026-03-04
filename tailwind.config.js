/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Tier 1: Body (Manrope)
        sans: ['Manrope', 'sans-serif'],
        // Tier 2: Headings (Plus Jakarta Sans)
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        // Tier 3: Emphasis/Impact (Syne)
        emphasis: ['Syne', 'sans-serif'],
        // Tier 4: Code/Technical (IBM Plex Mono)
        mono: ['IBM Plex Mono', 'monospace'],
        technical: ['IBM Plex Mono', 'monospace'],
        cta: ['IBM Plex Mono', 'monospace'],
        // Tier 5: Accent mono (Space Mono)
        space: ['Space Mono', 'monospace'],
      },
      colors: {
        // Short tokens (used throughout the codebase)
        't-bg': 'var(--color-bg)',
        't-bg-el': 'var(--color-bg-elevated)',
        't-fg': 'var(--color-fg)',
        't-fg-m': 'var(--color-fg-muted)',
        't-accent': 'var(--color-accent)',
        't-accent-s': 'var(--color-accent-soft, var(--color-accent))',
        't-accent-2': 'var(--color-accent-secondary)',
        't-accent-2-s': 'var(--color-accent-secondary-soft, var(--color-accent-secondary))',
        't-border': 'var(--color-border-subtle)',
        // Long aliases for backward compatibility
        't-bg-elevated': 'var(--color-bg-elevated)',
        't-fg-muted': 'var(--color-fg-muted)',
        't-accent-secondary': 'var(--color-accent-secondary)',
        't-border-subtle': 'var(--color-border-subtle)',
      },
    },
  },
  plugins: [],
}
