Feature: GetClass to Typescript target language

  Background:
    Given type is "TExpression"

  Scenario Template: Expression with toString
    Given I have a ToString expression <toString>
    When I generate the code
    Then I should see the <output> code

    Examples:
    | toString                                                                | output                                  |
    | {"expression":{"toString":{"value":"this.props"}}}                      | this.props.toString()                   |
    | {"expression":{"toString":{"value":"cat"}}}                              | cat.toString()                   |
