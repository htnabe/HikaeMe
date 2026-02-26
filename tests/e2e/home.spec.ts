import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("has the site title in the navbar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".navbar-brand")).toBeVisible();
    await expect(page.locator(".navbar-brand")).toContainText("HUGO Site");
  });

  test("displays navigation menu links", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav.navbar");
    await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Author" })).toBeVisible();
  });

  test("renders at least one article card", async ({ page }) => {
    await page.goto("/");
    const articles = page.locator("article.li");
    await expect(articles.first()).toBeVisible();
    await expect(articles).not.toHaveCount(0);
  });

  test("renders the footer with copyright and HUGO link", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByRole("link", { name: "HUGO" })).toBeVisible();
  });

  test("has a color theme toggle button group", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator('[aria-label="Theme toggle button group"]');
    await expect(toggle).toBeVisible();
  });
});
