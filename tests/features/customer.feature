@customer
Feature: Customer management


 Scenario: Add a new customer
   Given I am already logged in and on dashboard page
   When I click on "Customer" section
   And I click on "Add New" button
   And I enter customer's first name
   And I enter customer's last name
   And I enter customer's email address
   And I enter customer's contact number
   And I upload profile picture
   And I click "create new user" button
   Then I should see a success message  user was created
   And I search for newly added user by email address
   And I search for newly added user by first name 
   And I search for newly added user by last name
   And I should see  new user added to  customer list
   Then I logout from application
