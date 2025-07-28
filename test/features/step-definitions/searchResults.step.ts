import {When, Then } from "@wdio/cucumber-framework";
import { expect } from 'chai';
import searchResultsPage from "../page-objects/searchResults.page";


Then(/^I should see search results page with key (.*)$/, async (searchKey: string) => {
    const productName = await searchResultsPage.getProductTitles();
    await expect(productName).to.contain(searchKey);
});

Then(/^I filter results by brand (.*)$/, async (brandName: string) => {
    await searchResultsPage.filterByBrand(brandName);
});

Then(/^I set the minimum price to (.*) and the maximum price to (.*)$/, async (minPrice: string, maxPrice: string) => {
    await searchResultsPage.setPriceRange(minPrice, maxPrice);
});

Then(/^I should see products within the price range of (.*) to (.*)$/, async (minPrice: string, maxPrice: string) => {
    await searchResultsPage.verifyProductPricesInRange(minPrice, maxPrice);
});

When(/^I sort the results by price from high to low$/, async () => {
    await searchResultsPage.sortByPriceHighToLow();
});

Then(/^I select the product with the highest price$/, async () => {
    await searchResultsPage.selectProductWithHighestPrice();
});

