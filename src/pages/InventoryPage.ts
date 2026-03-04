import { expect, type Page, type Locator } from '@playwright/test';

export class InventoryPage {

  readonly inventoryContainer: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.inventoryContainer = this.page.getByTestId('inventory-container');
    this.cartLink = this.page.getByTestId('shopping-cart-link');
    this.cartBadge = this.page.getByTestId('shopping-cart-badge');
  }


  addToCartButton(item: string): Locator {
    return this.page.getByTestId(`add-to-cart-${item}`);
  }

  removeButton(item: string): Locator {
    return this.page.getByTestId(`remove-${item}`);
  }

  async expectLoaded() {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async addItemToCart(item: string) {
    await this.addToCartButton(item).click();
    await expect(this.removeButton(item)).toBeVisible();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

export default InventoryPage;