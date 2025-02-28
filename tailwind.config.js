export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "60%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
          "100%": { transform: "translateX(0)" },
        },
        popIn: {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0)" },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        shake: "shake 0.3s ease-in-out",
        popIn: "popIn 0.2s ease-out",
        fade: "fade 0.1s ease-in-out",
        "fade-in": "fadeIn 1s ease-in-out forwards",
        "fade-out": "fadeOut 0.2s ease-in-out forwards",
      },
      colors: {
        gray: {
          100: "#EDF1F3",
        },
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
