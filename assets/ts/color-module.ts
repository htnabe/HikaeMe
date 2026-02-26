/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

export type Theme = "light" | "dark";

const storageKey = "theme";

export const getStoredTheme = (): Theme | null =>
  localStorage.getItem(storageKey) as Theme | null;

export const setStoredTheme = (theme: Theme): void =>
  localStorage.setItem(storageKey, theme);

export const getPreferredTheme = (): Theme =>
  getStoredTheme() ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

export const updateRadioButtons = (theme: Theme): void => {
  const themeToggles = {
    light: document.getElementById("themeToggleSun") as HTMLInputElement | null,
    dark: document.getElementById("themeToggleMoon") as HTMLInputElement | null,
  };
  Object.entries(themeToggles).forEach(([key, toggle]) => {
    if (toggle) toggle.checked = key === theme;
  });
};

export const setTheme = (theme: Theme): void => {
  document.documentElement.setAttribute("data-bs-theme", theme);
  updateRadioButtons(theme);
};

export const handleThemeChange = (theme: Theme): void => {
  setStoredTheme(theme);
  setTheme(theme);
};

// Initialization
(() => {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Initial setup
  setTheme(getPreferredTheme());

  // Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    const themeToggles = {
      light: document.getElementById(
        "themeToggleSun"
      ) as HTMLInputElement | null,
      dark: document.getElementById(
        "themeToggleMoon"
      ) as HTMLInputElement | null,
    };
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
