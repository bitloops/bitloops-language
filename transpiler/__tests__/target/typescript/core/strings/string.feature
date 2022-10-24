Feature: String to Typescript target language

  Background:
    Given type is "TString"
    And language is "TypeScript"

    Scenario Template: String single quote
    Given I have a string <string>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | string                | output     |
      | {"string":"testName"} | 'testName' |