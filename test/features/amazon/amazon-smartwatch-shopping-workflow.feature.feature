Feature: Smartwatch Shopping Workflow

    @smart-watch-workflow
    Scenario Outline: As user I want to search for smartwatches, filter by brand and price, sort by price, select highest priced product, and add it to the cart
        Given I open browser and load url <url>
        And I wait for the page to load
        Then I should see the page title as <pageTitle>
        When I enter <searchKey> in the search box
        And I click on the search button
        Then I should see search results page with key <searchKey>
        And I filter results by brand <brand>
        And I set the minimum price to <minPrice> and the maximum price to <maxPrice>
        Then I should see products within the price range of <minPrice> to <maxPrice>
        When I sort the results by price from high to low
        And I select the product with the highest price
        And I add the product to the cart
        And I verify the success message


        Examples:
            | url                    | pageTitle                                                                                          | searchKey    | brand      | minPrice | maxPrice |
            | https://www.amazon.in/ | Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in | smartwatches | Noise      | 1000     | 4000     |
            # | https://www.amazon.in/ | Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in | smartwatches | boAt       | 1000     | 5000     |
            # | https://www.amazon.in/ | Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in | smartwatches | Fire-Boltt | 1000     | 5000     |