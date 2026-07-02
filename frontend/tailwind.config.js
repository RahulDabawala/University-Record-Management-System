/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0F172A', 800: '#1E293B', 700: '#273548' },
        teal: { DEFAULT: '#0EA5E9', dark: '#0284C7' },
        slate: { 400: '#94A3B8', 600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
