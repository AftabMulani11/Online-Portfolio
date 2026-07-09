/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      // numeric aliases so font-600 / font-700 resolve to real weights
      fontWeight: {
        600: "600",
        700: "700",
        800: "800",
      },
      colors: {
        // Cinematic Cloud palette — warm-neutral base, teal/amber/violet grade
        ink: {
          900: "#070707",
          800: "#0b0b0e",
          700: "#111013",
          600: "#17161b",
          500: "#211f27",
        },
        sky: {
          glow: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        // warm amber accent — the counterweight to all the blue
        amber: {
          glow: "#fcd9a0",
          400: "#fbbf24",
          500: "#f59e0b",
        },
        // violet accent
        iris: {
          glow: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
        },
        // neutral-warm text (was blue-gray → now near-neutral to kill the cast)
        mist: {
          100: "#f2f0ee",
          300: "#c9c6c2",
          400: "#98938d",
          500: "#6b665f",
        },
      },
      backgroundImage: {
        // tri-hue aurora: violet top-left, warm amber right, teal bottom
        "aurora":
          "radial-gradient(1100px 560px at 12% -8%, rgba(139,92,246,0.13), transparent 58%), radial-gradient(950px 520px at 102% 8%, rgba(245,158,11,0.10), transparent 55%), radial-gradient(800px 760px at 50% 122%, rgba(20,184,166,0.10), transparent 60%), radial-gradient(700px 500px at 78% 60%, rgba(56,189,248,0.06), transparent 55%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(56,189,248,0.15), 0 20px 60px -20px rgba(2,132,199,0.35)",
        "glow-sm": "0 0 30px -8px rgba(56,189,248,0.45)",
        "glow-amber": "0 0 0 1px rgba(245,158,11,0.18), 0 20px 60px -20px rgba(245,158,11,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};
