const tailwindScrollbar = require("tailwind-scrollbar");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./imports/ui/**/*.{vue,js,ts,jsx,tsx}", "./client/*.html"],
  theme: {
    extend: {
      animation: {
        "button-shine": "shine .6s linear forwards",
      },
      keyframes: {
        shine: {
          "0%": {
            backgroundPosition: "0 0",
            opacity: "0",
          },
          "1%": {
            backgroundPosition: "0 0",
            opacity: "1",
          },
          "80%": {
            backgroundPosition: "180% 0",
            opacity: "1",
          },
          "85%": {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
};
