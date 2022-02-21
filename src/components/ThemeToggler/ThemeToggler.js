import React from "react";
import { useAppContext } from "../../context/quizContext";

/**
 *Toggles dark/light theme
 */
export default function ThemeToggler() {
  const { toggleTheme, theme } = useAppContext();

  return (
    <button
      data-test="theme-toggle-button"
      className="btn btn-tertiary"
      onClick={() => toggleTheme(theme)}
    >
      {`${theme === "light-theme" ? "dark mode" : "light mode"}`}
    </button>
  );
}
