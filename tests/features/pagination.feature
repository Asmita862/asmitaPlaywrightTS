@pagination
Feature: Verify pagination dropdown options on Customer page

  Scenario: Verify pagination dropdown options
    Given I am logged in as a valid user
    When I select 5 rows per page
    Then I should see at most 5 customers listed
    When I select 10 rows per page
    Then I should see at most 10 customers listed
    When I select 15 rows per page
    Then I should see at most 15 customers listed
