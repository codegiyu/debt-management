/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        body: "#ECFBEC",
        highlight: "#C1EED6",
        primary: "#417B13",
        darkPrimary: "#2e570d",
        muted: "#7F7979",
        red: "#E45F5F",
        dark: "#303030",
        darkFaded: "#8A8A8A",
        darkBlack: "#1B1B1B"
      },
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        mono: ["'Roboto Mono'", "monospace"]
      },
      spacing: {
        homeMain: "calc(100vh - 164px)",
        homeMainTab: "calc(100vh - 139px)",
        homeMainMob: "calc(100vh - 90px)",
        fullMob: "calc(100% - 32px)",
        fullTab: "calc(100% - 64px)",
        alert: "calc(50% - 200px)",
        toggler: "calc(50% - 8px)",
        arrowMob: "calc(50% - 28px)",
        arrow: "calc(50% - 40px)",
      }
    },
  },
  plugins: [],
}
