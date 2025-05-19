import { useEffect, useState } from "react";
import { THEMES } from "../config/themes";

function getSystemTheme() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

const themeKeys = THEMES.map(t => t.key);

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Try to get from localStorage, else system, else light
    const stored = localStorage.getItem("theme");
    if (stored && themeKeys.includes(stored)) return stored;
    return getSystemTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}
