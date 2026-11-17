"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const syncTheme = () => {
      let saved;
      try { saved = localStorage.getItem("portfolio-theme"); } catch {}
      const next = saved === "dark" || saved === "light"
        ? saved : "dark";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    const onStorage = event => {
      if (event.key === "portfolio-theme" || event.key === null) syncTheme();
    };
    syncTheme();
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch {}
  }

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}
      aria-label={label} title={label} aria-pressed={theme === "dark"}>
      <Moon className="theme-moon" size={18} aria-hidden="true" />
      <Sun className="theme-sun" size={18} aria-hidden="true" />
    </button>
  );
}
