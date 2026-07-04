import { test, expect } from "@playwright/test";

test("adds, removes, and views products in the shopping cart", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2");

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Bike Light");
  await expect(page.getByText("Sauce Labs Backpack")).toHaveCount(0);

  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
});
