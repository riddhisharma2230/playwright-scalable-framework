const { expect } = require('@playwright/test');

class InventoryPage {

    constructor(page) {
        this.page = page;
        this.inventoryContainer = '.inventory_list';
        this.addToCartBackpack = '#add-to-cart-sauce-labs-backpack';
        this.addToCartBikeLight = '#add-to-cart-sauce-labs-bike-light';
        this.cartIcon = '.shopping_cart_link';
        this.cartBadge = '.shopping_cart_badge';
        this.inventoryItems = '.inventory_item';
        this.productTitles = '.inventory_item_name';
        this.productPrices = '.inventory_item_price';
    }

    async verifyInventoryPageLoaded() {
        await this.page.waitForSelector(this.inventoryContainer, { timeout: 60000 });
    }

    async verifyProductTitlesLoaded() {
        await expect(this.page.locator(this.productTitles).first()).toBeVisible();
    }

    async verifyProductPricesLoaded() {
        await expect(this.page.locator(this.productPrices).first()).toBeVisible();
    }

    async verifyProductsComplete() {
        const itemCount = await this.page.locator(this.inventoryItems).count();
        const titleCount = await this.page.locator(this.productTitles).count();
        const priceCount = await this.page.locator(this.productPrices).count();
        
        await expect(titleCount).toBe(itemCount);
        await expect(priceCount).toBe(itemCount);
    }

    async addProductToCart() {
        await this.page.click(this.addToCartBackpack);
    }

    async addBackpackToCart() {
        await this.page.click(this.addToCartBackpack);
    }

    async addBikeLightToCart() {
        await this.page.click(this.addToCartBikeLight);
    }

    async addMultipleProducts(countToAdd) {
    const addToCartButtons = this.page.locator('.inventory_item button');

    const totalButtons = await addToCartButtons.count();

    if (countToAdd > totalButtons) {
        throw new Error(
            `Requested ${countToAdd} products, but only ${totalButtons} available`
        );
    }

    for (let i = 0; i < countToAdd; i++) {
        await addToCartButtons.nth(i).click();
    }

    return countToAdd;
}


    async getCartBadgeCount() {
        const badge = await this.page.textContent(this.cartBadge);
        return parseInt(badge);
    }

    async verifyCartBadgeCount(expectedCount) {
        const actualCount = await this.getCartBadgeCount();
        await expect(actualCount).toBe(expectedCount);
    }

    async goToCart() {
        await this.page.click(this.cartIcon);
    }
}

module.exports = InventoryPage;
