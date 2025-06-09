/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-night': '#063b61',
        'blue-deep': '#0d5d90',
        'blue-bright': '#3ea7d4',
        'blue-light': '#6ec1e4',
        'blue-marine': '#0a4975',
      },
    },
  },
  plugins: [],
};
