@filter
Feature: Customer Filter

  Scenario: Filter active customers
    Given I am logged in as gorakh and on the dashboard for filter tests
    When I navigate to the Customer section for filtering
    And I open the filter panel for filtering
    And I select the Active status radio button
    And I apply the customer filter
    Then I should see only active customers in the list
   Then I logout from the customer filter scenario