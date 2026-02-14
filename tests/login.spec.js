const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const loginData = require('../test-data/loginData.json');


test('User should login and add product to cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await inventoryPage.verifyInventoryPageLoaded();
    await expect(page.locator('.inventory_list')).toBeVisible();
    const itemCount = await page.locator('.inventory_item').count();
    await expect(itemCount).toBeGreaterThanOrEqual(6);

    
    await inventoryPage.addMultipleProducts();
    await inventoryPage.verifyCartBadgeCount(2);
    
    await inventoryPage.goToCart();

    await expect(page).toHaveURL(/cart/);
});

test('Locked user should not login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login(
        loginData.invalidUser.username,
        loginData.invalidUser.password
    );

    await expect(page.locator('[data-test="error"]')).toBeVisible();
});
