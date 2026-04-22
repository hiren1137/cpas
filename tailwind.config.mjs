/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2ff',
          100: '#dde5ff',
          200: '#c3cfff',
          300: '#9fb3ff',
          400: '#7a8fff',
          500: '#5a6bff',
          600: '#3d47f5',
          700: '#2d35d8',
          800: '#1e3a8a',
          900: '#1a2f6e',
          950: '#111d45',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
