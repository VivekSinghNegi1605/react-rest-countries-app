/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mv: "375px",
        dv: "1440px",
      },
      colors: {
        "Dark-Blue": {
          1: "hsl(200, 15%, 8%)",
          2: "hsl(207, 26%, 17%)",
          3: "hsl(209, 23%, 22%)",
        },
        "Dark-Gray": "hsl(0, 0%, 52%)",
        "Light-Gray": "hsl(0, 0%, 98%)",
        "White": "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        "Nunito-Sans": ["Nunito Sans", "sans-serif"],
      },
      fontWeight: {
        normal: "300",
        bold: "600",
        bolder: "800",
      },
    },
  },
  plugins: [],
};
