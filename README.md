# playwright-base

Repo "base" partage pour les agents cloud qui testent en parallele.

Playwright est **deja configure** ici (`package.json` + `playwright.config.ts`).
Un agent n'a donc plus a reinventer le setup : il installe les deps, ajoute son
fichier de test dans `tests/`, et lance la suite.

```bash
npm ci
npx playwright install --with-deps chromium
npm run test:e2e
```

`baseURL` pointe vers https://www.saucedemo.com (login: standard_user /
secret_sauce). A adapter au site cible.
