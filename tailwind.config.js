// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-header": "#2563eb",
        "light-body": "#eff6ff",
        "light-text": "#333333",
        "light-card": "#dbeafe",
        "light-input": "#ffffff",
        "light-hover": "#bfdbfe",
        "dark-header": "#121212",
        "dark-body": "#242424",
        "dark-text": "#ffffff",
        "dark-card": "#1e1e1e",
        "dark-input": "#2c2c2c",
        "dark-hover": "#2a2a2a",
      },
    },
  },
  plugins: [],
};
