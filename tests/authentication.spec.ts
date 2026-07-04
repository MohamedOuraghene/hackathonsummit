import { expect, test } from "@playwright/test";

const username = "standard_user";
const password = "secret_sauce";

async function login(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.locator("#user-name").fill(username);
  await page.locator("#password").fill(password);
  await page.locator("#login-button").click();
}

test.describe("authentication", () => {
  test("allows a standard user to log in successfully", async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator("#react-burger-menu-btn")).toBeVisible();
  });

  test("shows an error for invalid login credentials", async ({ page }) => {
    await page.goto("/");
    await page.locator("#user-name").fill("locked_out_user");
    await page.locator("#password").fill("wrong_password");
    await page.locator("#login-button").click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      "Username and password do not match",
    );
    await expect(page).toHaveURL(/\/$/);
  });

  test("allows a logged-in user to log out", async ({ page }) => {
    await login(page);
    await page.locator("#react-burger-menu-btn").click();
    await page.locator("#logout_sidebar_link").click();

    await expect(page.locator("#login-button")).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });
});
