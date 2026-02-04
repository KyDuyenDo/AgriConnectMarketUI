/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/components/**/*.{js,ts,tsx}', './src/screens/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#4CAF50",
          light: "#E8F5E9",
          lighter: "#C8E6C9",
          dark: "#2E7D32",
        },
        secondary: {
          main: "#FF9800",
          light: "#FFF3E0",
          dark: "#F57C00",
        },
        neutral: {
          background: "#F5F5F5",
          surface: "#FFFFFF",
          text: {
            primary: "#1B1F24",
            secondary: "#6B737A",
            tertiary: "#9DA3A8",
          },
          border: "#E0E0E0",
        },
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        xxl: "24px",
      }
    },
  },
  plugins: [],
};
