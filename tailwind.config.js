/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorY: "#FFD700",
      },
      fontFamily: {
        cub: ["Cubano", "sans-serif"],
        gil: ["Gilroy", "sans-serif"],
        nun: ["Nunito", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5a00ff",

          secondary: "#af0000",

          accent: "#ffd700",

          neutral: "#000022",

          "base-100": "#292b30",

          info: "#00a5ca",

          success: "#00aa00",

          warning: "#ff3e00",

          error: "#ff0039",
        },

      },
      "light",
    ],
  },
  plugins: [require("daisyui")],
};
