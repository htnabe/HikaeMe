import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("clicking the navbar brand navigates to the home page", async ({
    page,
  }) => {
    await page.goto("/about");
    await page.locator(".navbar-brand").click();
    await expect(page).toHaveURL("/");
  });

  test("clicking an article card navigates to the post", async ({ page }) => {
    await page.goto("/");
    const firstCard = page.locator("article.li a").first();
    const href = await firstCard.getAttribute("href");
    await firstCard.click();
    await expect(page).toHaveURL(new RegExp(href ?? ".+"));
    await expect(page.locator("article")).toBeVisible();
  });

  test("article page has a heading, body content, and footer", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("article.li a").first().click();
    const article = page.locator("article");
    await expect(article.locator("h1")).toBeVisible();
    await expect(article.locator(".card-body")).toBeVisible();
    await expect(article.locator("footer.article-footer")).toBeVisible();
  });
});
