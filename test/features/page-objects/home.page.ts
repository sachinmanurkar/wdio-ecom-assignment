import Page from './page';

class HomePage extends Page {
    constructor() {
        super();
    }

    /** Page Objects */
    get searchInputTextBox() {
        return $('#twotabsearchtextbox')
    }
    get searchButton() {
        return $('#nav-search-submit-button')
    }

    /** Page Actions */
    async visitUrl(url: string) {
        await this.navigateTo(url);
        await browser.maximizeWindow();
        console.log(`Navigated to URL: ${url}`);
    }

    async waitForPageLoad() {
        const pageTitle = await browser.getTitle();
        await browser.waitUntil(
            async () => (await browser.getTitle()) === pageTitle,
            {
                timeout: 10000,
                timeoutMsg: 'Page did not load within 10 seconds'
            }
        );
    }

    async getTitle() {
        return await browser.getTitle();
    }

    async searchForProduct(productName: string) {
        await this.typeInto(await this.searchInputTextBox, productName);
    }

    async clickOnSearchButton() {
        await this.click(await this.searchButton);
    }
}
export default new HomePage();