/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ["Poppins", 'sans-serif'],
        'brith-stone': ["Birthstone", 'cursive'],
        'big-shoulder-stencil': ["Big Shoulders Stencil", 'sans-serif'],
        'abel': ["Abel", 'sans-serif'],
      },
    },
  },
  plugins: [],
}

