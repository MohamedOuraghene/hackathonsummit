import { expect, test } from "@playwright/test";

test("checkout info, order review, and completion", async ({ page }) => {
  await page.goto("/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();

  await page.evaluate(() => {
    window.localStorage.setItem("cart-contents", JSON.stringify([4]));
  });

  await page.goto("/checkout-step-one.html");
  await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Your Information");

  await page.locator("#first-name").fill("Test");
  await page.locator("#last-name").fill("User");
  await page.locator("#postal-code").fill("12345");
  await page.locator("#continue").click();

  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Overview");
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99");
  await expect(page.locator('[data-test="payment-info-label"]')).toHaveText("Payment Information:");
  await expect(page.locator('[data-test="shipping-info-label"]')).toHaveText("Shipping Information:");
  await expect(page.locator('[data-test="subtotal-label"]')).toHaveText("Item total: $29.99");
  await expect(page.locator('[data-test="tax-label"]')).toHaveText(/Tax: \$\d+\.\d{2}/);
  await expect(page.locator('[data-test="total-label"]')).toHaveText(/Total: \$\d+\.\d{2}/);

  await page.locator("#finish").click();

  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Complete!");
  await expect(page.locator('[data-test="complete-header"]')).toHaveText("Thank you for your order!");
  await expect(page.locator('[data-test="complete-text"]')).toContainText(
    "Your order has been dispatched",
  );
});
