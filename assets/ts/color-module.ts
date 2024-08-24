/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

type Theme = "light" | "dark";

(() => {
  const storageKey = "theme";
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const themeToggles = {
    light: document.getElementById("themeToggleSun") as HTMLInputElement | null,
    dark: document.getElementById("themeToggleMoon") as HTMLInputElement | null,
  };

  const getStoredTheme = (): Theme | null =>
    localStorage.getItem(storageKey) as Theme | null;

  const setStoredTheme = (theme: Theme): void =>
    localStorage.setItem(storageKey, theme);

  const getPreferredTheme = (): Theme =>
    getStoredTheme() || (darkModeMediaQuery.matches ? "dark" : "light");

  const setTheme = (theme: Theme): void => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    updateRadioButtons(theme);
  };

  const updateRadioButtons = (theme: Theme): void => {
    Object.entries(themeToggles).forEach(([key, toggle]) => {
      if (toggle) toggle.checked = key === theme;
    });
  };

  const handleThemeChange = (theme: Theme) => {
    setStoredTheme(theme);
    setTheme(theme);
  };

  // Initial setup
  setTheme(getPreferredTheme());

  // Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    Object.entries(themeToggles).forEach(([theme, toggle]) => {
      toggle?.addEventListener("change", function (this: HTMLInputElement) {
        if (this.checked) handleThemeChange(theme as Theme);
      });
    });
  });

  darkModeMediaQuery.addEventListener("change", () => {
    const storedTheme = getStoredTheme();
    if (!storedTheme) setTheme(getPreferredTheme());
  });
})();
