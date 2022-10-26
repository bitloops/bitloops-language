Feature: ArgumentDependency to Typescript target language

  Background:
    Given type is "TArgumentDependency"
    And language is "TypeScript"

    Scenario Template: argumentDependency with valid input
    Given I have an argumentDependency <argumentDependency>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | argumentDependency                         | output       |
      | {"value": "fooBar", "type": "variable" }   | fooBar       |
      | {"value": "42", "type": "int32" }          | 42           |
      | {"value": "helloWorld", "type": "string" } | 'helloWorld' |
