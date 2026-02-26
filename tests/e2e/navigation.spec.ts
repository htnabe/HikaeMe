import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("clicking the Home nav link loads the home page", async ({ page }) => {
    await page.goto("/about");
    await page
      .locator("nav.navbar")
      .getByRole("link", { name: "Home" })
      .click();
    await expect(page).toHaveURL("/");
    await expect(page.locator("article.li").first()).toBeVisible();
  });

  test("clicking the About nav link loads the about page", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("nav.navbar")
      .getByRole("link", { name: "About" })
      .click();
    await expect(page).toHaveURL(/\/about\//);
    await expect(
      page.getByRole("heading", { name: "About", exact: true })
    ).toBeVisible();
  });

  test("clicking the Author nav link loads the author page", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .locator("nav.navbar")
      .getByRole("link", { name: "Author" })
      .click();
    await expect(page).toHaveURL(/\/author\//);
    await expect(
      page.getByRole("heading", { name: "Author", exact: true })
    ).toBeVisible();
  });

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
});
