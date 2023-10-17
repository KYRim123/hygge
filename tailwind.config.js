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
        main: {
          100: "#cc005e",
        },
        light: {
          100: "#ffffff",
        },
        gray: {
          100: "#f6f7fb",
        },
        pink: { 500: "rgb(255, 102, 160)" },
        black: {
          100: "#1A202C",
        },
        blue: {
          500: "#2975FF",
        },
        red: {
          500: "#ff0000",
        },
        Neutral: {
          50: "#F6F7FB",
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
            opacity: "0.5",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        rotate_main: {
          from: {
            transform: "translate(-50%, -50%) rotate(0deg)",
          },
          to: {
            transform: "translate(-50%, -50%) rotate(360deg)",
          },
        },
        spin0to180: {
          from: {
            transform: "rotate(180deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
        spin180to0: {
          from: {
            transform: "rotate(-180deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
      },
      animation: {
        showInput: "showInput .4s linear",
        loadingMain: "rotate_main 1.2s linear infinite",
        spin0to180: "spin0to180 0.3s ease-in-out",
        spin180to0: "spin180to0 0.3s ease-in-out",
      },
      textColor: {
        button: "#F7FAFC",
      },
      backgroundImage: {
        "loading-main": "linear-gradient(#9b59b6, #84cdfa, #5ad1cd)",
      },
    },
  },
  plugins: [],
};
