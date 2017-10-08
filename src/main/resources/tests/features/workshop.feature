Feature: Workshop feature

Scenario: Workshop page
    Given I am on workshop page

    When I enter property1 "test property 1" and property2 "test property 2" and property3 "test property 3" and status "success"

    And I click add button

    Then I should see new row in grid

