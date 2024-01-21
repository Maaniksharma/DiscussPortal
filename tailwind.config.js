/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a202c", // Replace with your primary color
        secondary: "#e2e8f0", // Replace with your secondary color
      },
    },
    fontFamily: {
      sans: "Roboto",
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
