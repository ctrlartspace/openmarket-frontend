export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media", // или удалите эту строку
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
  future: {
    hoverOnlyWhenSupported: true,
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-safe-area")],
}
