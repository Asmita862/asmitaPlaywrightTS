@customer
Feature: Customer management

  Scenario: Add a new customer
    Given I am already logged in and on the dashboard page
    When I click on the "Customer" section
    And I click on the "Add New" button
    And I enter the customer's first name
    And I enter the customer's last name
    And I enter the customer's email address
    And I enter the customer's contact number
    And I upload profile picture
    And I click "create new user" button
    Then I should see a success message that the user was created
    And I should see the new user added to the customer list
    Then I logout from the application
