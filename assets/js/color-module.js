/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    return (
      storedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  };

  const updateRadioButtons = (theme) => {
    const lightModeBtn = document.getElementById("themeToggleSun");
    const darkModeBtn = document.getElementById("themeToggleMoon");
    if (lightModeBtn && darkModeBtn) {
      lightModeBtn.checked = theme !== "dark";
      darkModeBtn.checked = theme === "dark";
    }
  };

  const theme = getPreferredTheme();
  setTheme(theme);
  updateRadioButtons(theme);

  document.addEventListener("DOMContentLoaded", () => {
    const lightModeBtn = document.getElementById("themeToggleSun");
    const darkModeBtn = document.getElementById("themeToggleMoon");

    if (lightModeBtn && darkModeBtn) {
      lightModeBtn.addEventListener("change", function () {
        if (this.checked) {
          setStoredTheme("light");
          setTheme("light");
        }
      });

      darkModeBtn.addEventListener("change", function () {
        if (this.checked) {
          setStoredTheme("dark");
          setTheme("dark");
        }
      });
    }
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });
})();
