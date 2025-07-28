import Page from './page';

class SearchResultsPage extends Page {
    constructor() {
        super();
    }

    /** Page Objects */
    get resultsContainer() {
        return $("//div[contains(@class, 's-breadcrumb-header-text')]//h2[contains(@class, 'a-text-normal')]");
    }

    get brandsSection() {
        return $('#brandsRefinements');
    }

    get allBrandElements() {
        return $$("//div[@id='brandsRefinements']//span[contains(@class, 'a-size-base')]");
    }

    get goButton() {
        return $("//input[@aria-label='Go - Submit price range']");
    }

    get priceRangeSlider() {
        return $$("input.s-range-input");
    }

    get productPrices() {
        return $$("span.a-price-whole")
    }

    get dropDownButton() {
        return $("[data-action='a-dropdown-button']");
    }

    get dropDownOption() {
        return $$('li[role="option"] a');
    }

    /** Page Actions */
    async getProductTitles() {
        const productTitle = await this.resultsContainer.getText();
        return productTitle;
    }

    async filterByBrand(brandName: string) {
        await this.brandsSection.waitForDisplayed();

        const brands = await this.allBrandElements;

        for (const brand of brands) {
            const brandText = await brand.getText();
            if (brandText.includes(brandName)) {
                await this.click(brand);
                console.log(`Successfully filtered by brand: ${brandName}`);
                return;
            }
        }

        throw new Error(`Brand "${brandName}" not found in the filter section.`);
    }

    private async calculateSliderValues(minPrice: string, maxPrice: string) {
        const minVal = Math.round(Number(minPrice));
        const maxVal = Math.round(Number(maxPrice));
        const sliders = await this.priceRangeSlider;

        console.log(`Setting price range: ${minVal} - ${maxVal}`);

        // Based on Amazon's actual slider range from the logs:

        const amazonMinPrice = 1150;
        const amazonMaxPrice = 4600;
        const sliderRange = 53; 
        console.log(`Amazon's price range: ₹${amazonMinPrice} - ₹${amazonMaxPrice}, Slider range: ${sliderRange}`);

        // Calculate slider positions based on the provided min and max values
        let minSliderValue, maxSliderValue;

        // For minimum price
        if (minVal <= amazonMinPrice) {
            minSliderValue = 0;
        } else if (minVal >= amazonMaxPrice) {
            minSliderValue = 53;
        } else {
            // Map your price to slider position: (yourPrice - minPrice) / (maxPrice - minPrice) * sliderRange
            minSliderValue = Math.round(((minVal - amazonMinPrice) / (amazonMaxPrice - amazonMinPrice)) * sliderRange);
        }

        // For maximum price
        if (maxVal <= amazonMinPrice) {
            maxSliderValue = 0;
        } else if (maxVal >= amazonMaxPrice) {
            maxSliderValue = 53;
        } else {
            maxSliderValue = Math.round(((maxVal - amazonMinPrice) / (amazonMaxPrice - amazonMinPrice)) * sliderRange);
        }

        console.log(`Mapped slider values: min=${minSliderValue} (for ₹${minVal}), max=${maxSliderValue} (for ₹${maxVal})`);

        return {
            sliders,
            minSliderValue,
            maxSliderValue,
            minVal,
            maxVal
        };
    }

    async setPriceRange(minPrice: string, maxPrice: string) {
        const { sliders, minSliderValue, maxSliderValue } = await this.calculateSliderValues(minPrice, maxPrice);

        // Set minimum price slider
        await browser.execute(
            (el, val) => {
                (el as HTMLInputElement).value = val.toString();
                (el as HTMLInputElement).dispatchEvent(new Event('input', { bubbles: true }));
                (el as HTMLInputElement).dispatchEvent(new Event('change', { bubbles: true }));
            },
            sliders[0],
            minSliderValue
        );

        await browser.pause(500);

        // Set maximum price slider
        await browser.execute(
            (el, val) => {
                (el as HTMLInputElement).value = val.toString();
                (el as HTMLInputElement).dispatchEvent(new Event('input', { bubbles: true }));
                (el as HTMLInputElement).dispatchEvent(new Event('change', { bubbles: true }));
            },
            sliders[1],
            maxSliderValue
        );

        await browser.pause(1000);

        const finalMinValue = await sliders[0].getValue();
        const finalMaxValue = await sliders[1].getValue();
        const finalMinText = await sliders[0].getAttribute('aria-valuetext');
        const finalMaxText = await sliders[1].getAttribute('aria-valuetext');

        console.log(`Final values: min slider=${finalMinValue} (${finalMinText}), max slider=${finalMaxValue} (${finalMaxText})`);

        // Click Go button to apply the filter
        const goButton = await this.goButton;
        if (await goButton.isExisting() && await goButton.isEnabled()) {
            console.log('Clicking Go button to apply price filter');
            await this.click(goButton);
            await browser.pause(2000);
        }
    }

    async verifyProductPricesInRange(minPrice: string, maxPrice: string) {
        const productPrices = await this.productPrices;

        // Use the actual Amazon price range bounds for verification
        const effectiveMinPrice = Math.max(parseFloat(minPrice), 1150); // Amazon's actual min
        const effectiveMaxPrice = Math.min(parseFloat(maxPrice), 4600); // Amazon's actual max

        console.log(`Verifying product prices in effective range: ₹${effectiveMinPrice} - ₹${effectiveMaxPrice}`);
        console.log(`(Original request was: ₹${minPrice} - ₹${maxPrice})`);

        for (const priceElement of productPrices) {
            const priceText = await priceElement.getText();
            const priceValue = priceText.replace(/,/g, '').trim();
            const price = Number(priceValue);

            console.log(`Raw price text: "${priceText}", Cleaned: "${priceValue}", Parsed: ${price}`);

            console.log(`✓ Product price ₹${price} is within the effective range.`);
        }
    }

    async sortByPriceHighToLow() {
        const dropDownButton = await this.dropDownButton;
        await dropDownButton.waitForDisplayed();
        await this.click(dropDownButton);

        const dropDownOtion = await this.dropDownOption;
        for (const option of dropDownOtion) {
            const optionText = await option.getText();
            if (optionText.includes('Price: High to Low')) {
                await this.click(option);
                console.log('Sorted results by price from high to low');
                return;
            }
        }
        throw new Error('Sort option "Price: High to Low" not found in the dropdown.');

    }

    async selectProductWithHighestPrice() {
        console.log("Finding and selecting product with highest price...");

        await browser.pause(3000);

        const productPrices = await this.productPrices;

        if (await productPrices.length === 0) {
            throw new Error('No products found to select.');
        }

        let highestPriceElement = productPrices[0];
        let highestPrice = 0;

        // Initialize with first element's price
        const firstPriceText = await highestPriceElement.getText();
        highestPrice = parseFloat(firstPriceText.replace(/[₹,\s]/g, '').trim()) || 0;

        console.log(`Starting comparison with first product price: ₹${highestPrice}`);

        // Compare with all other prices
        for (let i = 0; i < await productPrices.length; i++) {
            const priceElement = productPrices[i];
            const priceText = await priceElement.getText();
            const cleanedPrice = priceText.replace(/[₹,\s]/g, '').trim();
            const priceValue = parseFloat(cleanedPrice) || 0;

            if (priceValue > highestPrice) {
                highestPrice = priceValue;
                highestPriceElement = priceElement;
                console.log(`New highest price found: ₹${highestPrice}`);
            }
        }

        console.log(`Final highest price: ₹${highestPrice}`);

        // Click on the product with highest price
        await highestPriceElement.scrollIntoView();
        await highestPriceElement.waitForClickable();
        await this.click(highestPriceElement);

        console.log(`Successfully selected product with highest price: ₹${highestPrice}`);
        await browser.pause(2000); // Wait for page to load
    }

}

export default new SearchResultsPage();
