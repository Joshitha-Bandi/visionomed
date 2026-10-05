/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Healthcare blue
        secondary: '#F3F4F6', // Very light gray
        accent: '#14B8A6', // Teal
        danger: '#DC2626', // Red
        success: '#16A34A', // Green
        warning: '#D97706', // Amber
      }
    },
  },
  plugins: [],
}
