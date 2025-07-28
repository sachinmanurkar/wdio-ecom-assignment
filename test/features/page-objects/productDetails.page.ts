import Page from './page';

class ProductDetailsPage extends Page {
    constructor() {
        super();
    }

    /** Page Objects */
    get addCardButton() {
        return $("//div[@class='a-section a-spacing-none a-padding-none']//input[@id='add-to-cart-button']");
    }

    get successMessage() {
        return $('#NATC_SMART_WAGON_CONF_MSG_SUCCESS');
    }


    /** Page Actions */
    async clickAddToCartButton() {
        await this.addCardButton.waitForDisplayed();
        console.log("Add to Cart button is displayed, proceeding to click it.");
        const button = this.addCardButton;

        await browser.execute(() => {
            window.scrollBy(0, window.innerHeight);
        });

        await this.click(button);
        console.log("Clicked on the Add to Cart button.");
    }

    async verifySuccessMessage() {
        await this.successMessage.waitForDisplayed({ timeout: 5000 });
        await expect(this.successMessage).toHaveText('Added to cart');
    }
}


export default new ProductDetailsPage();