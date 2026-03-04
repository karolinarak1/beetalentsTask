import { test as base } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { users } from '../src/data/users';

type Fixtures = {
  loginAs: (user: keyof typeof users) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  loginAs: async ({ page }, use) => {
    await use(async (userKey) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.login(users[userKey].username, users[userKey].password);
      await inventoryPage.expectLoaded();
    });
  }
});

export { expect } from '@playwright/test';