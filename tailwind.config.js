/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: 'var(--text-gray)',
        secondary: 'var(--secondary-color)',
      },
    },
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [],
};
