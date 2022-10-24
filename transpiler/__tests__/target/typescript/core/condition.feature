Feature: Condition to Typescript target language

  Background:
    Given type is "TCondition"
    And language is "TypeScript"

  Scenario Template: Condition 
    Given I have a condition <condition>
    When I generate the code
    Then I should see the <output> code

    Examples:
    | condition                                                                                                                                                           | output                         |
    | {"condition":{"expression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"b"}}},"operator":"=="}}}} | a == b |
    | {"condition":{"expression":{"logicalExpression":{"andExpression":{"left":{"parenthesizedExpression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"b"}}},"operator":"=="}}},"right":{"parenthesizedExpression":{"relationalExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"c"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"d"}}},"operator":">="}}}}}}}} | (a == b) && (c >= d) |


