/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,cjs,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f0ff",
          100: "#e6dbff",
          200: "#cbb8ff",
          300: "#b396f7",
          400: "#9c75f0",
          500: "#8358d4",  // main purple
          600: "#6b45ac",
          700: "#543485",
          800: "#3d245e",
          900: "#281637",
        },
        secondary: "#f3f4f6",  // light gray backgrounds
        surface: "#ffffff",    // cards / panels
        accent: "#9B59B6",     // highlight purple
        neutral: "#4B5563",    // readable text gray
        highlight: "#7C3AED",  // hover / CTA glow
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.4)",
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        neon: "0 0 10px rgba(155, 89, 182, 0.8), 0 0 20px rgba(131, 88, 212, 0.6)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #8358d4 0%, #9B59B6 100%)",
        "panel-gradient": "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
        "brand-gradient": "linear-gradient(135deg, #6b45ac 0%, #9B59B6 50%, #8358d4 100%)",
        "dark-gradient": "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        // ✨ futuristic gradient
        "futuristic": "linear-gradient(to bottom right, #1e3a8a, #000000, #6d28d9)",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      backgroundColor: {
        glass: "rgba(255, 255, 255, 0.15)",
        "glass-dark": "rgba(0, 0, 0, 0.25)",
      },
      borderColor: {
        glass: "rgba(255, 255, 255, 0.3)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(131, 88, 212, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(131, 88, 212, 0.8)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 2s infinite ease-in-out",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".ease-in-expo": {
          "transition-timing-function": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        },
        ".ease-out-expo": {
          "transition-timing-function": "cubic-bezier(0.19, 1, 0.22, 1)",
        },
      });
    },
  ],
};
