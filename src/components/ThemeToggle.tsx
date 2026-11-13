"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    );
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="btn press"
      onClick={toggle}
      aria-label="Switch between dark and light mode"
      style={{ minWidth: 64, visibility: theme ? "visible" : "hidden" }}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
