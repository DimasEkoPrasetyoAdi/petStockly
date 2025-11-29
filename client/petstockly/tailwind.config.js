/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
         fontFamily: {
        // ini jadi default font untuk class "font-sans"
        sans: ["Nunito", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
