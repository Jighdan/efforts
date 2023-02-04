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
      minHeight: {
        "screen-1/2": "50vh",
      },

      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "360px",
          lg: "360px",
          xl: "360px",
        },
      },

      animation: {
        "fade-in": "fade-in 250ms ease forwards",
        "fade-out": "fade-out 250ms ease forwards",
        "fade-down": "fade-down 250ms ease forwards",
        "fade-up": "fade-up 250ms linear forwards",
      },

      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "fade-out": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        "fade-down": {
          "0%": {
            opacity: 0,
            translateY: "-100%",
          },
          "100%": {
            opacity: 1,
            translateY: 0,
          },
        },
        "fade-up": {
          "0%": {
            opacity: 1,
            translateY: 0,
          },
          "100%": {
            opacity: 0,
            translateY: "-100%",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")(),
    require("@tailwindcss/line-clamp"),

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
          gridTemplateRows: "minmax(0, 1fr) auto",
        },
      });
    }),
  ],
};
