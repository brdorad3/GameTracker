/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "prim": "#180002",
        "sec": "#f4c420"
      }
    },
  },
  plugins: [],
}

