/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Standardized maroon - single consistent shade
        maroon: {
          DEFAULT: "#8B2635", // Primary maroon from your design
          50: "#fdf2f3",
          100: "#fce7e8",
          200: "#f9d0d2",
          300: "#f4a8ac",
          400: "#ec737a",
          500: "#e0444f",
          600: "#cc2938",
          700: "#ab1f2e",
          800: "#8B2635", // Main maroon - matches your design
          900: "#6d1e28",
          950: "#3d0d14",
        },
        khaki: {
          50: "#fefef9",
          100: "#fefcf0",
          200: "#fcf6d9",
          300: "#f9edb8",
          400: "#f4dd85",
          500: "#edc55f",
          600: "#d4a744",
          700: "#b1853a",
          800: "#8f6835",
          900: "#75552f",
        },
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        wedding: {
          primary: "#8B2635", // Standardized maroon
          secondary: "#edc55f",
          accent: "#f43f5e",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
