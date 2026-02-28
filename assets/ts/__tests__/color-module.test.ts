import { beforeEach, describe, expect, it } from "vitest";
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
  it("returns stored theme when one is set", () => {
    expect(getPreferredTheme("dark", false)).toBe("dark");
  });

  it("returns stored theme even when system prefers dark", () => {
    expect(getPreferredTheme("light", true)).toBe("light");
  });

  it("returns 'dark' when no stored theme and system prefers dark", () => {
    expect(getPreferredTheme(null, true)).toBe("dark");
  });

  it("returns 'light' when no stored theme and system prefers light", () => {
    expect(getPreferredTheme(null, false)).toBe("light");
  });
});

describe("setTheme", () => {
  let fakeDoc: Document;

  beforeEach(() => {
    fakeDoc = document.implementation.createHTMLDocument();
  });

  it("sets data-bs-theme to 'light' on the html element", () => {
    setTheme("light", fakeDoc);
    expect(fakeDoc.documentElement.getAttribute("data-bs-theme")).toBe("light");
  });

  it("sets data-bs-theme to 'dark' on the html element", () => {
    setTheme("dark", fakeDoc);
    expect(fakeDoc.documentElement.getAttribute("data-bs-theme")).toBe("dark");
  });
});

describe("updateRadioButtons", () => {
  let fakeDoc: Document;
  let sunToggle: HTMLInputElement;
  let moonToggle: HTMLInputElement;

  beforeEach(() => {
    fakeDoc = document.implementation.createHTMLDocument();

    sunToggle = fakeDoc.createElement("input");
    sunToggle.type = "radio";
    sunToggle.id = "themeToggleSun";
    fakeDoc.body.appendChild(sunToggle);

    moonToggle = fakeDoc.createElement("input");
    moonToggle.type = "radio";
    moonToggle.id = "themeToggleMoon";
    fakeDoc.body.appendChild(moonToggle);
  });

  it("checks sun toggle when theme is 'light'", () => {
    updateRadioButtons("light", fakeDoc);
    expect(sunToggle.checked).toBe(true);
    expect(moonToggle.checked).toBe(false);
  });

  it("checks moon toggle when theme is 'dark'", () => {
    updateRadioButtons("dark", fakeDoc);
    expect(sunToggle.checked).toBe(false);
    expect(moonToggle.checked).toBe(true);
  });

  it("does not throw when toggle elements are absent", () => {
    const emptyDoc = document.implementation.createHTMLDocument();
    expect(() => updateRadioButtons("light", emptyDoc)).not.toThrow();
  });
});

describe("handleThemeChange", () => {
  let fakeDoc: Document;

  beforeEach(() => {
    localStorage.clear();
    fakeDoc = document.implementation.createHTMLDocument();
  });

  it("stores the theme in localStorage", () => {
    handleThemeChange("dark", fakeDoc);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("applies the theme to the document", () => {
    handleThemeChange("light", fakeDoc);
    expect(fakeDoc.documentElement.getAttribute("data-bs-theme")).toBe("light");
  });
});
