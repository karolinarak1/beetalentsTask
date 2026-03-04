import { expect, type Page, type Locator } from '@playwright/test';

export class CheckoutPage {

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = this.page.getByTestId('firstName');
    this.lastNameInput = this.page.getByTestId('lastName');
    this.postalCodeInput = this.page.getByTestId('postalCode');
    this.continueButton = this.page.getByTestId('continue');
  }

  async expectLoaded() {
    await expect(this.firstNameInput).toBeVisible();
  }

  async fillCustomerData(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }
}

export default CheckoutPage;