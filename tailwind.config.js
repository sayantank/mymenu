const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#5869FF",
        secondary: "#1F2634",
        tertiary: "#1A202C",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        fancy: ["Kalam", "cursive"],
      },
      gridAutoColumns: {
        card: "minmax(30%, 2fr)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
