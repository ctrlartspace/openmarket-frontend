export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%": { transform: "translateX(-2px)" },
          "50%": { transform: "translateX(2px)" },
        },
      },
      animation: {
        shake: "shake 0.1s linear ",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-safe-area")],
}
