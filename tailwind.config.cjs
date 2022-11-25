/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: false,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-red": "#e3170a",
        "accent-blue": "#0c57f7",
        "accent-yellow": "#fcba04",
        "accent-green": "#43f70c",
        "primary-text": "#042c23",
      },
    },
  },
  plugins: [],
};
