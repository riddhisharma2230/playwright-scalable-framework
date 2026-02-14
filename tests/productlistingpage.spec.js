const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const loginData = require('../test-data/loginData.json');

test('Verify product titles are loaded on inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    await inventoryPage.verifyInventoryPageLoaded();
    
    await inventoryPage.verifyProductTitlesLoaded();
});

test('Verify product prices are loaded on inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    await inventoryPage.verifyInventoryPageLoaded();
    
    await inventoryPage.verifyProductPricesLoaded();
});

test('Verify all products have complete data (titles and prices)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    await inventoryPage.verifyInventoryPageLoaded();
    
    await inventoryPage.verifyProductsComplete();
});

test('Verify at least 6 inventory items are loaded', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    await inventoryPage.verifyInventoryPageLoaded();
    
    const itemCount = await page.locator('.inventory_item').count();
    await expect(itemCount).toBeGreaterThanOrEqual(6);
});

test.only('Verify cart badge updates dynamically', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    await inventoryPage.verifyInventoryPageLoaded();

    const productsToAdd = 3;

    const addedCount = await inventoryPage.addMultipleProducts(productsToAdd);

    await inventoryPage.verifyCartBadgeCount(addedCount);
});


test('Verify product titles, prices loaded and inventory count is correct', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    await inventoryPage.verifyInventoryPageLoaded();
    
    await inventoryPage.verifyProductTitlesLoaded();
    await inventoryPage.verifyProductPricesLoaded();
    
    const itemCount = await page.locator('.inventory_item').count();
    await expect(itemCount).toBeGreaterThanOrEqual(6);
    
    await inventoryPage.verifyProductsComplete();
});

test('Verify end to end product listing and cart workflow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    
    await inventoryPage.verifyInventoryPageLoaded();
    await expect(page.locator('.inventory_list')).toBeVisible();
    
    await inventoryPage.verifyProductTitlesLoaded();
    await inventoryPage.verifyProductPricesLoaded();
    await inventoryPage.verifyProductsComplete();
    
    const initialItemCount = await page.locator('.inventory_item').count();
    await expect(initialItemCount).toBeGreaterThanOrEqual(6);
    
    await inventoryPage.addMultipleProducts();
    await inventoryPage.verifyCartBadgeCount(2);
    
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart/);
});
