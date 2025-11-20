/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#020617',
        'brand-accent': '#38bdf8',
        'brand-accent-soft': '#0f172a',
      },
      boxShadow: {
        glow: '0 0 40px rgba(56, 189, 248, 0.5)',
      },
    },
  },
  plugins: [],
};
