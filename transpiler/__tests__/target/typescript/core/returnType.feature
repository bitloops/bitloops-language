Feature: ReturnType to Typescript target language

  Background:
    Given type is "TReturnType"
    And language is "TypeScript"

    Scenario Template: Statement with all possible type statements
    Given I have a returnType <returnType>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | returnType                | output      |
      | "double"                  | :number     |
      | "string"                  | :string     |
      |"Whatever"                 | :Whatever   |