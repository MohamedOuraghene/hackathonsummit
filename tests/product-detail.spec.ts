import { expect, test } from "@playwright/test";

test("opens a product detail page and returns to inventory", async ({ page }) => {
  await page.goto("/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  await expect(page).toHaveURL(/.*\/inventory\.html/);

  await page.locator('[data-test="item-4-title-link"]').click();
  await expect(page).toHaveURL(/.*\/inventory-item\.html\?id=4/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
    "Sauce Labs Backpack",
  );

  await page.locator('[data-test="back-to-products"]').click();
  await expect(page).toHaveURL(/.*\/inventory\.html/);
  await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
});
