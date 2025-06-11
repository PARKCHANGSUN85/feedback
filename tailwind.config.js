/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        dark: {
          DEFAULT: '#1a1a1a',
          lighter: '#2a2a2a',
          darker: '#0a0a0a',
        },
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
} 