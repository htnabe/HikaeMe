import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getPreferredTheme,
  getStoredTheme,
  handleThemeChange,
  setStoredTheme,
  setTheme,
  updateRadioButtons,
} from "../color-module";

describe("getStoredTheme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when no theme is stored", () => {
    expect(getStoredTheme()).toBeNull();
  });

  it("returns 'light' when light theme is stored", () => {
    localStorage.setItem("theme", "light");
    expect(getStoredTheme()).toBe("light");
  });

  it("returns 'dark' when dark theme is stored", () => {
    localStorage.setItem("theme", "dark");
    expect(getStoredTheme()).toBe("dark");
  });
});

describe("setStoredTheme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores 'light' in localStorage", () => {
    setStoredTheme("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("stores 'dark' in localStorage", () => {
    setStoredTheme("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});

describe("getPreferredTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: false,
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);
  });

  it("returns stored theme when one is set", () => {
    localStorage.setItem("theme", "dark");
    expect(getPreferredTheme()).toBe("dark");
  });

  it("returns 'dark' when no stored theme and system prefers dark", () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);
    expect(getPreferredTheme()).toBe("dark");
  });

  it("returns 'light' when no stored theme and system prefers light", () => {
    expect(getPreferredTheme()).toBe("light");
  });
});

describe("setTheme", () => {
  it("sets data-bs-theme to 'light' on the html element", () => {
    setTheme("light");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );
  });

  it("sets data-bs-theme to 'dark' on the html element", () => {
    setTheme("dark");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe("dark");
  });
});

describe("updateRadioButtons", () => {
  let sunToggle: HTMLInputElement;
  let moonToggle: HTMLInputElement;

  beforeEach(() => {
    sunToggle = document.createElement("input");
    sunToggle.type = "radio";
    sunToggle.id = "themeToggleSun";
    document.body.appendChild(sunToggle);

    moonToggle = document.createElement("input");
    moonToggle.type = "radio";
    moonToggle.id = "themeToggleMoon";
    document.body.appendChild(moonToggle);
  });

  afterEach(() => {
    document.body.removeChild(sunToggle);
    document.body.removeChild(moonToggle);
  });

  it("checks sun toggle when theme is 'light'", () => {
    updateRadioButtons("light");
    expect(sunToggle.checked).toBe(true);
    expect(moonToggle.checked).toBe(false);
  });

  it("checks moon toggle when theme is 'dark'", () => {
    updateRadioButtons("dark");
    expect(sunToggle.checked).toBe(false);
    expect(moonToggle.checked).toBe(true);
  });
});

describe("handleThemeChange", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-bs-theme");
  });

  it("stores the theme in localStorage", () => {
    handleThemeChange("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("applies the theme to the document", () => {
    handleThemeChange("light");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );
  });
});
