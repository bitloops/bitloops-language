Feature: NotInstanceOf to Typescript target language

  Background:
    Given type is "TNotInstanceOf"
    And language is "TypeScript"

  Scenario Template: NotInstanceOf with declared class
    Given I have an notInstanceOf <notInstanceOf>
    When I generate the code
    Then I should see the <output> code

    Examples:
    | notInstanceOf                                                                    | output                         |
    | {"isNotInstanceOf":[{"value":"result","type":"variable"},{"class":"Error"}]}     | !(result.isOops())             |
    | {"isNotInstanceOf":[{"value":"result","type":"variable"},{"class":"ClassName"}]} | !(result instanceof ClassName) |
