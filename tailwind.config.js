// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' if you want to use the system preference
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#ffffff",
          text: "#333333",
          card: "#f0f0f0",
          input: "#e8f0fe",
          hover: "#f0f0f0",
        },
        dark: {
          bg: "#121212",
          text: "#ffffff",
          card: "#1e1e1e",
          input: "#2c2c2c",
          hover: "#2a2a2a",
        },
      },
    },
  },
  plugins: [],
};
