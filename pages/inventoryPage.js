class InventoryPage {

    constructor(page) {
        this.page = page;
        this.inventoryContainer = '.inventory_list';
        this.addToCartButton = '#add-to-cart-sauce-labs-backpack';
        this.cartIcon = '.shopping_cart_link';
    }

    async verifyInventoryPageLoaded() {
        await this.page.waitForSelector(this.inventoryContainer);
    }

    async addProductToCart() {
        await this.page.click(this.addToCartButton);
    }

    async goToCart() {
        await this.page.click(this.cartIcon);
    }
}

module.exports = InventoryPage;
