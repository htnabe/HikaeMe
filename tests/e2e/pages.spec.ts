import { test, expect } from "@playwright/test";

test.describe("About page", () => {
  test("renders the page heading", async ({ page }) => {
    await page.goto("/about/");
    await expect(
      page.getByRole("heading", { name: "About", exact: true })
    ).toBeVisible();
  });

  test("renders the page content", async ({ page }) => {
    await page.goto("/about/");
    const main = page.locator("main");
    await expect(main).toBeVisible();
    await expect(main).not.toBeEmpty();
  });
});

test.describe("Author page", () => {
  test("renders the page heading", async ({ page }) => {
    await page.goto("/author/");
    await expect(
      page.getByRole("heading", { name: "Author", exact: true })
    ).toBeVisible();
  });

  test("renders the author section", async ({ page }) => {
    await page.goto("/author/");
    const main = page.locator("main");
    await expect(main).toBeVisible();
    await expect(main).not.toBeEmpty();
  });
});

test.describe("Single post page", () => {
  test("renders the article with a heading and content", async ({ page }) => {
    await page.goto("/posts/tech/hello-world/");
    const article = page.locator("article");
    await expect(article).toBeVisible();
    await expect(article.locator("h1")).toBeVisible();
  });

  test("renders the footer with share section", async ({ page }) => {
    await page.goto("/posts/tech/hello-world/");
    const footer = page.locator("article footer.article-footer");
    await expect(footer).toBeVisible();
  });
});
