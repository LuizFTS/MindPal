/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: "var(--font-lilita-one)"
      },
      colors: {
        veryeasy: "rgb(74, 222, 128)",
        easy: "rgb(22, 163, 74)",
        medium: "rgb(250, 204, 21)",
        hard: "rgb(185, 28, 28)",
      }
    },
  },
  plugins: [],
}
