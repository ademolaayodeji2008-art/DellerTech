/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#05060a",
          900: "#0b0f19",
          800: "#111726",
          700: "#1a2236",
        },
        accent: {
          cyan: "#22d3ee",
          violet: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #22d3ee 0%, #8b5cf6 100%)",
        "glow-radial": "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(139,92,246,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(34, 211, 238, 0.25)",
      },
    },
  },
  plugins: [],
};
