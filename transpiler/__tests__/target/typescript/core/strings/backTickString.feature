Feature: BackTickString to Typescript target language

  Background:
    Given type is "TBackTickString"
    And language is "TypeScript"

    Scenario Template: BackTick string
    Given I have a <backTickString>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | backTickString                                  | output                       |
      | {"backTickString":"${name} is an invalid name"} | `${name} is an invalid name` |