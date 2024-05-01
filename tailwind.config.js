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
        black: "#1E2022",
        gray: {
          100: "#F0F5F9",
          200: "#C9D6DF",
          300: "#52616B",

        }
      }
    },
  },
  plugins: [],
};
