@login
Feature: Login functionality

  Scenario: Successful login with valid credentials
    Given the user is on the Login page
    When the user enters email "gorakh@ebpearls.com.au"
    And the user enters password "Password@1"
    And the user clicks on "Sign in now"
    Then the user should be redirected to the Dashboard

  Scenario: Failed login with invalid credentials
    Given the user is on the Login page
    When the user enters email "invalid@example.com"
    And the user enters password "wrongPassword"
    And the user clicks on "Sign in now"
    Then the user should see a validation error message

  Scenario: Forgot password navigation
    Given the user is on the Login page
    When the user clicks on "Forgot password"
    Then the user should be redirected to the Forgot Password page