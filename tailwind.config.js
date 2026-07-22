/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        noir: "#0c0a08",
        espresso: "#1e150e",
        "espresso-2": "#2b1d12",
        cream: "#f2ead6",
        "cream-dim": "#cfc3a4",
        brass: "#c9a24b",
        "brass-light": "#e6c878",
        ember: "#d9622b",
        line: "rgba(201,162,75,0.28)",
      },
      fontFamily: {
        rye: ["Rye", "serif"],
        jost: ["Jost", "sans-serif"],
        cormorant: ["Cormorant_Garamond", "serif"],
      },
    },
  },
  plugins: [],
};
