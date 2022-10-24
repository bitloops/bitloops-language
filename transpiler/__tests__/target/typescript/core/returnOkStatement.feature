Feature: Return OK statement to Typescript target language

  Background:
    Given type is "TReturnOKStatement"
    And language is "TypeScript"

    Scenario Template: Return OK statement success to Typescript
    Given I have a return statement <return-statement>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | return-statement                                                                                                                                                                          | output                      |
      | {"returnOK":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}}}                                                                                         | return yay('test')          |
      | {"returnOK":{"expression":{"evaluation":{"regularEvaluation":{"type":"variable","value":"frog"}}}}}                                                                                       | return yay(frog)            |
      | {"returnOK":{"expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}}}}                                                                                           | return yay(true)            |
      | {"returnOK":{"expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"42"}}}}}                                                                                            | return yay(42)              |
      | {"returnOK":{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"multiply","argumentDependencies":[{"value":"2","type":"int32"},{"value":"a","type":"string"}]}}}}} | return yay(multiply(2,'a')) |
      | {"returnOK":{"expression":{"classInstantiation":{"className":"Name","argumentDependencies":[{"value":"props","type":"variable"}]}}}}                                                      | return yay(new Name(props)) |


