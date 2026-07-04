import { test, expect } from "@playwright/test";

// Test "smoke" minimal juste pour prouver que la base tourne.
// Les agents ajouteront leurs propres fichiers *.spec.ts a cote.
test("the demo site loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#user-name")).toBeVisible();
});
