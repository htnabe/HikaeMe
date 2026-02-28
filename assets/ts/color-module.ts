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

export const getPreferredTheme = (
  storedTheme: Theme | null,
  prefersDark: boolean
): Theme => {
  if (storedTheme) return storedTheme;
  return prefersDark ? "dark" : "light";
};

export const updateRadioButtons = (
  theme: Theme,
  root: Document = document
): void => {
  const themeToggles = {
    light: root.getElementById("themeToggleSun") as HTMLInputElement | null,
    dark: root.getElementById("themeToggleMoon") as HTMLInputElement | null,
  };
  Object.entries(themeToggles).forEach(([key, toggle]) => {
    if (toggle) toggle.checked = key === theme;
  });
};

export const setTheme = (theme: Theme, root: Document = document): void => {
  root.documentElement.setAttribute("data-bs-theme", theme);
  updateRadioButtons(theme, root);
};

/** Persists the selected theme and applies it to the document. */
export const handleThemeChange = (
  theme: Theme,
  root: Document = document
): void => {
  setStoredTheme(theme);
  setTheme(theme, root);
};

// Initialization
(() => {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Initial setup
  setTheme(getPreferredTheme(getStoredTheme(), darkModeMediaQuery.matches));

  // Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    // map of theme names to their corresponding toggle elements
    const themeToggles = {
      light: document.getElementById(
        "themeToggleSun"
      ) as HTMLInputElement | null,
      dark: document.getElementById(
        "themeToggleMoon"
      ) as HTMLInputElement | null,
    };

    // Apply the corresponding theme when each toggle is selected
    Object.entries(themeToggles).forEach(([theme, toggle]) => {
      toggle?.addEventListener("change", function (this: HTMLInputElement) {
        if (this.checked) handleThemeChange(theme as Theme);
      });
    });
  });

  darkModeMediaQuery.addEventListener("change", () => {
    const storedTheme = getStoredTheme();
    if (!storedTheme)
      setTheme(getPreferredTheme(null, darkModeMediaQuery.matches));
  });
})();
