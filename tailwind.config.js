// tailwind.config.js
export const content = [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['var(--font-poppins)', 'sans-serif'],
    },
  },
};
export const plugins = [];
