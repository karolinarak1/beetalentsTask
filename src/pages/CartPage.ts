import { expect, type Page, type Locator } from '@playwright/test';

export class CartPage {

  readonly cartContainer: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.cartContainer = this.page.getByTestId('cart-list');
    this.checkoutButton = this.page.getByTestId('checkout');
  }

  async expectLoaded() {
    await expect(this.cartContainer).toBeVisible();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }
}

export default CartPage;