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
        brand: {
          blue: "#2563EB",
          gold: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)",
        "gold-gradient": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        "glow-radial": "radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(37,99,235,0) 70%)",
        "dot-pattern": "radial-gradient(circle, rgba(37,99,235,0.15) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-sm": "24px 24px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(37, 99, 235, 0.35)",
        "glow-gold": "0 0 30px rgba(245, 158, 11, 0.25)",
      },
    },
  },
  plugins: [],
};
