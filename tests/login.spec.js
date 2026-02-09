const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');

test('User should login and add product to cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.verifyInventoryPageLoaded();
    await inventoryPage.addProductToCart();
    await inventoryPage.goToCart();

    await expect(page).toHaveURL(/cart/);
});
