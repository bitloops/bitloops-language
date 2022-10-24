Feature: Return statement to Typescript target language

  Background:
    Given type is "TReturnStatement"
    And language is "TypeScript"

    Scenario Template: Return statement success to Typescript
    Given I have a return statement <return-statement>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | return-statement                                                                                                                                                                        | output                 |
      | {"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}}}                                                                                         | return 'test'          |
      | {"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"variable","value":"frog"}}}}}                                                                                       | return frog            |
      | {"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}}}}                                                                                           | return true            |
      | {"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"42"}}}}}                                                                                            | return 42              |
      | {"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"multiply","argumentDependencies":[{"value":"2","type":"int32"},{"value":"a","type":"string"}]}}}}} | return multiply(2,'a') |


