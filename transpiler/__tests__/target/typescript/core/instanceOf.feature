Feature: InstanceOf to Typescript target language

  Background:
    Given type is "TInstanceOf"
    And language is "TypeScript"

  Scenario Template: InstanceOf with declared class
    Given I have an instanceOf <instanceOf>
    When I generate the code
    Then I should see the <output> code

    Examples:
    | instanceOf                                                                    | output                      |
    | {"isInstanceOf":[{"value":"result","type":"variable"},{"class":"Error"}]}     | result.isFail()             |
    | {"isInstanceOf":[{"value":"result","type":"variable"},{"class":"ClassName"}]} | result instanceof ClassName |
