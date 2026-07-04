import { defineConfig, devices } from "@playwright/test";

// Base de config partagee: les agents n'ont plus qu'a ajouter leurs tests
// dans tests/ et lancer `npm run test:e2e`. Pas de setup a reinventer.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "https://www.saucedemo.com",
    headless: true,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
