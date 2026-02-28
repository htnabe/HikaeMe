import { test, expect } from "@playwright/test";

test.describe("About page", () => {
  test("renders main content", async ({ page }) => {
    await page.goto("/about/");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Author page", () => {
  test("renders main content", async ({ page }) => {
    await page.goto("/author/");
    await expect(page.locator("main")).toBeVisible();
  });
});
