const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      // PRIMARY
      white: "#FFFCF2",
      black: "#252422",
      silver: "#CCC5B9",
      olive: "#403D39",
      orange: "#EB5E28",

      // AUXILIARY
      transparent: "transparent",
    },

    extend: {
      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "360px",
          lg: "360px",
          xl: "360px",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")(),

    plugin(function ({ addVariant }) {
      addVariant("child", "& > *");
    }),

    plugin(function ({ addUtilities, theme }) {
      const base = ".size";

      addUtilities({
        [`${base}-sm`]: {
          width: theme("width.6"),
          height: theme("width.6"),
        },
        [`${base}-md`]: {
          width: theme("width.8"),
          height: theme("width.8"),
        },
        [`${base}-lg`]: {
          width: theme("width.12"),
          height: theme("width.12"),
        },
      });
    }),

    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".layout-main": {
          display: "grid",
          gridTemplateRows: "1fr auto",
        },
      });
    }),
  ],
};
