Feature: Return Error statement to Typescript target language

  Background:
    Given type is "TReturnErrorStatement"
    And language is "TypeScript"

    Scenario Template: Return Error statement success to Typescript
    Given I have a return statement <return-statement>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | return-statement                                                                                                                                                                             | output                       |
      | {"returnError":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}}}                                                                                         | return fail('test')          |
      | {"returnError":{"expression":{"evaluation":{"regularEvaluation":{"type":"variable","value":"frog"}}}}}                                                                                       | return fail(frog)            |
      | {"returnError":{"expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}}}}                                                                                           | return fail(true)            |
      | {"returnError":{"expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"42"}}}}}                                                                                            | return fail(42)              |
      | {"returnError":{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"multiply","argumentDependencies":[{"value":"2","type":"int32"},{"value":"a","type":"string"}]}}}}} | return fail(multiply(2,'a')) |
      | {"returnError":{"expression":{"classInstantiation":{"className":"Name","argumentDependencies":[{"value":"props","type":"variable"}]}}}}                                                      | return fail(new Name(props)) |


