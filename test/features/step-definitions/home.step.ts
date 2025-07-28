import { Given, Then, When } from "@wdio/cucumber-framework";
import { expect } from 'chai';
import homePage from "../page-objects/home.page";

Given(/^I open browser and load url (.*)$/, async (url: string) => {
    await homePage.visitUrl(url);
});

Then(/^I wait for the page to load$/, async () => {
    await homePage.waitForPageLoad();
});

Then(/^I should see the page title as (.*)$/, async (expectedTitle: string) => {
    await expect(await homePage.getTitle()).to.equal(expectedTitle);
});

When(/^I enter (.*) in the search box$/, async (searchKey: string) => {
    await homePage.searchForProduct(searchKey);
});

When(/^I click on the search button$/, async () => {
    await homePage.clickOnSearchButton();
});


