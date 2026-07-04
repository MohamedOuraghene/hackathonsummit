import { test, expect, type Page } from "@playwright/test";

const username = "standard_user";
const password = "secret_sauce";

async function login(page: Page) {
  await page.goto("/");
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

function sortedCopy(values: string[], direction: "asc" | "desc") {
  const sorted = [...values].sort((a, b) => a.localeCompare(b));
  return direction === "asc" ? sorted : sorted.reverse();
}

function sortedNumbers(values: number[], direction: "asc" | "desc") {
  const sorted = [...values].sort((a, b) => a - b);
  return direction === "asc" ? sorted : sorted.reverse();
}

async function productNames(page: Page) {
  return page.locator(".inventory_item_name").allTextContents();
}

async function productPrices(page: Page) {
  const prices = await page.locator(".inventory_item_price").allTextContents();
  return prices.map((price) => Number(price.replace("$", "")));
}

test("inventory list supports catalog sort order changes", async ({ page }) => {
  await login(page);

  const inventoryItems = page.locator(".inventory_item");
  await expect(inventoryItems).toHaveCount(6);

  const sort = page.locator('[data-test="product-sort-container"]');

  const defaultNames = await productNames(page);
  expect(defaultNames).toEqual(sortedCopy(defaultNames, "asc"));

  await sort.selectOption("za");
  const descendingNames = await productNames(page);
  expect(descendingNames).toEqual(sortedCopy(descendingNames, "desc"));

  await sort.selectOption("lohi");
  const ascendingPrices = await productPrices(page);
  expect(ascendingPrices).toEqual(sortedNumbers(ascendingPrices, "asc"));

  await sort.selectOption("hilo");
  const descendingPrices = await productPrices(page);
  expect(descendingPrices).toEqual(sortedNumbers(descendingPrices, "desc"));
});
