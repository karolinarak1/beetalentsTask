import { test } from './fixtures';
import LoginPage from '../src/pages/LoginPage';
import { users } from '../src/data/users';

test.describe('Login', () => {
  test('Successful login', async ({ page, loginAs }) => {
    await loginAs('standard');
  });

  test('Failed login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectErrorContains('locked out');
  });
});