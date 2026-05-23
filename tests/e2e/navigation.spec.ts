import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  const toBaseLanguageCode = (code: string) => code.toLowerCase().split("-")[0];

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

  test("language switcher dropdown shows all configured languages", async ({
    page,
  }) => {
    await page.goto("/about/");
    const toggle = page.getByTestId("language-switcher-toggle");
    await expect(toggle).toBeVisible();
    await toggle.click();

    const menuItems = page.locator('[data-testid^="language-option-"]');
    const menuItemCount = await menuItems.count();
    expect(menuItemCount).toBeGreaterThan(1);

    const optionIds = await menuItems.evaluateAll((elements) =>
      elements
        .map((element) => element.getAttribute("data-testid") ?? "")
        .filter(Boolean)
    );

    const actualLanguageCodes = optionIds.map((optionId) =>
      optionId.replace("language-option-", "")
    );

    const optionMetadata = await menuItems.evaluateAll((elements) =>
      elements.map((element) => {
        const testId = element.getAttribute("data-testid") ?? "";
        const hreflang = element.getAttribute("hreflang") ?? "";
        const lang = element.getAttribute("lang") ?? "";
        return { testId, hreflang, lang };
      })
    );

    expect(new Set(optionIds).size).toBe(optionIds.length);
    expect(new Set(actualLanguageCodes).size).toBe(actualLanguageCodes.length);

    for (const option of optionMetadata) {
      expect(option.testId).toBeTruthy();
      expect(option.hreflang).toBeTruthy();
      expect(option.lang).toBeTruthy();

      const codeFromTestId = option.testId.replace("language-option-", "");
      expect(toBaseLanguageCode(option.hreflang)).toBe(
        toBaseLanguageCode(codeFromTestId)
      );
      expect(toBaseLanguageCode(option.lang)).toBe(
        toBaseLanguageCode(codeFromTestId)
      );
    }

    for (const optionId of optionIds) {
      await expect(page.getByTestId(optionId)).toBeVisible();
    }
  });

  test("language switcher navigates to the selected language page", async ({
    page,
  }) => {
    await page.goto("/about/");
    await page.getByTestId("language-switcher-toggle").click();
    await page.getByTestId("language-option-en").click();
    await expect(page).toHaveURL(/\/en\/about\/?$/);
  });

  test("language switcher falls back to language home when translation is missing", async ({
    page,
  }) => {
    await page.goto("/posts/tech/choosing-fonts-for-the-web/");
    await page.getByTestId("language-switcher-toggle").click();
    await page.getByTestId("language-option-en").click();
    await expect(page).toHaveURL(/\/en\/?$/);
  });

  test("language switcher navigates to simplified chinese page", async ({
    page,
  }) => {
    await page.goto("/about/");
    await page.getByTestId("language-switcher-toggle").click();
    await page.getByTestId("language-option-zh-cn").click();
    await expect(page).toHaveURL(/\/zh-cn\/about\/?$/);
  });
});
