/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002C54', // Deep Navy Blue
        'primary-dark': '#001a33', // Darker Navy
        'primary-light': '#003d73', // Lighter Navy
        accent: '#C5001A', // Bold Red
        'accent-dark': '#a00015', // Darker Red
        'accent-light': '#e6001f', // Lighter Red
        cream: '#FDF6F6', // Soft Pink/Cream
        secondary: '#6b7280',
        dark: '#0f172a',
        surface: '#f9fafb',
        border: '#e5e7eb',
      },
    },
  },
  plugins: [],
}
