import { Then } from "@wdio/cucumber-framework";
import productDetailsPage from "../page-objects/productDetails.page";


Then(/^I add the product to the cart$/, async () => {
    await productDetailsPage.clickAddToCartButton();
});

Then(/^I verify the success message$/, async () => {
    await productDetailsPage.verifySuccessMessage();
});
