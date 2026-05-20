/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    extend: {

      colors: {

        background: "#0f0f0f",

        card: "#171717",

        surface: "#1f1f1f",

        emerald: "#10b981",
      },

      boxShadow: {

        glow:
          "0 0 20px rgba(16,185,129,0.25)",
      },

      backgroundImage: {

        "hero-gradient":
          "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(15,15,15,1))",
      },
    },
  },
};