import { expect, type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly error: Locator; // 

  constructor(private readonly page: Page) {
    this.usernameField = this.page.getByTestId('username');
    this.passwordField = this.page.getByTestId('password');
    this.loginButton = this.page.getByTestId('login-button');
    this.error = this.page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.loginButton).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async expectErrorContains(text: string) {
    await expect(this.error).toBeVisible();
    await expect(this.error).toContainText(text);
  }
}

export default LoginPage;