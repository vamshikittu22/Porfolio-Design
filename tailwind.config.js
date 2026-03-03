/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // SATOSHI substitute (Plus Jakarta Sans is the closest Google Font)
        display: ['Plus Jakarta Sans', 'sans-serif'],
        // SYNE for emphasis
        emphasis: ['Syne', 'sans-serif'],
        // MANROPE for body
        sans: ['Manrope', 'sans-serif'],
        // IBM PLEX MONO for technicals
        mono: ['IBM Plex Mono', 'monospace'],
        // SPACE MONO for interactive/CTA
        cta: ['Space Mono', 'monospace'],
      },
      colors: {
        't-bg': 'var(--color-bg)',
        't-bg-el': 'var(--color-bg-elevated)',
        't-fg': 'var(--color-fg)',
        't-fg-m': 'var(--color-fg-muted)',
        't-accent': 'var(--color-accent)',
        't-accent-s': 'var(--color-accent-soft)',
        't-accent-2': 'var(--color-accent-secondary)',
        't-accent-2-s': 'var(--color-accent-secondary-soft)',
        't-border': 'var(--color-border-subtle)',
        't-secondary': 'var(--color-fg-muted)',
        't-foreground': 'var(--color-fg)',
      }
    },
  },
  plugins: [],
}
