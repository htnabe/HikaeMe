import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders at least one article card", async ({ page }) => {
    await page.goto("/");
    const articles = page.locator("article.li");
    await expect(articles.first()).toBeVisible();
  });

  test("has a color theme toggle button group", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator('[aria-label="Theme toggle button group"]');
    await expect(toggle).toBeVisible();
  });
});
