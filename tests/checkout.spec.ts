import { test } from './fixtures';
import InventoryPage from '../src/pages/InventoryPage';
import CartPage from '../src/pages/CartPage';
import CheckoutPage from '../src/pages/CheckoutPage';

test('Add product to cart and start checkout', async ({ page, loginAs }) => {
  await loginAs('standard');

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addItemToCart('sauce-labs-backpack');
  await inventoryPage.goToCart();

  await cartPage.expectLoaded();
  await cartPage.startCheckout();

  await checkoutPage.expectLoaded();
});