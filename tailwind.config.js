/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-main": "#cc005e",
        "color-light": "#ffffff",
        "color-gray": "#f6f7fb",
        "color-pink": "rgb(255, 102, 160)",
        black: {
          100: "#1A202C",
        },
        blue: {
          500: "#2975FF",
        },
      },
      maxWidth: {
        pc: "1200px",
      },
      borderColor: {
        colorGray: "#f6f7fb",
      },
      keyframes: {
        showInput: {
          from: {
            transform: " translateX(50%)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        showInput: "showInput .3s linear",
      },
    },
  },
  plugins: [],
};
