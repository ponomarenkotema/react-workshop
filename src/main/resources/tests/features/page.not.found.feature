Feature: 404 page should be shown when wrong #hash is provide

Scenario Outline: 404 page
    Given I am entering wrong hash <hash>
    Then I should see "404 Page not found" text

    Examples:
        | hash |
        | about |