import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";
type FontSize = "small" | "medium" | "large";

interface ThemeContextType {
  theme: Theme;
  fontSize: FontSize;
  setTheme: (theme: Theme) => void;
  setFontSize: (fontSize: FontSize) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as Theme) || "light";
  });
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const savedFontSize = localStorage.getItem("fontSize");
    return (savedFontSize as FontSize) || "medium";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    document.body.className = `theme-${theme} font-${fontSize}`;
  }, [theme, fontSize]);

  const contextSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const contextSetFontSize = (newFontSize: FontSize) => {
    setFontSize(newFontSize);
    localStorage.setItem("fontSize", newFontSize);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        fontSize,
        setTheme: contextSetTheme,
        setFontSize: contextSetFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
