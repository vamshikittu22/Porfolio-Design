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
        sans: ['Manrope', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        space: ['Space Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        't-bg': 'var(--color-bg)',
        't-bg-elevated': 'var(--color-bg-elevated)',
        't-fg': 'var(--color-fg)',
        't-fg-muted': 'var(--color-fg-muted)',
        't-accent': 'var(--color-accent)',
        't-accent-secondary': 'var(--color-accent-secondary)',
        't-border-subtle': 'var(--color-border-subtle)',
      },
    },
  },
  plugins: [],
}
