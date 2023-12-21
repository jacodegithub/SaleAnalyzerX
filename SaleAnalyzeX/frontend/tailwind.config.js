/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-gray': 'rgb(100 119 119)', // Replace with your custom color code
      },
    },
  },
  plugins: [],
}