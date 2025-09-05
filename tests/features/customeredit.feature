@edit
Feature: Edit existing customer

  Scenario: Edit customer details
    Given I am already logged in and on the dashboard page
    When I click on the "Customer" section
    And I click on the kebab menu for a customer
    And I select "Edit" from the dropdown
    Then I should be redirected to the Edit User page
    And I should see the title User Profile
    When I upload a profile picture
    And I select status Active
    And I enter first name as "Asmita"
    And I enter last name as "Aryal"
    And Email and phone fields should not be clickable
    And I select gender "Female"
    And I select date of birth "01/01/1990"
    And I type and select street "New York Street"
    And I click Save Changes
    And I confirm the update by clicking "Yes"
    Then I should see a success toast message "Customer updated successfully"
    And I logout from the application

