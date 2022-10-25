Feature: Const decomposition to Typescript target language

  Background:
    Given type is "TConstDecomposition"
    And language is "TypeScript"

    Scenario Template: Const decomposition success to Typescript
    Given I have a constDecomposition <const-decomposition>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | const-decomposition                                                                                                                                                                   | output                                      |
      | {"constDecomposition":{"names":["wings"],"evaluation":{"regularEvaluation":{"type":"variable","value":"bird"}}}}                                                                      | const { wings } = bird                      |
      | {"constDecomposition":{"names":["name"],"evaluation":{"regularEvaluation":{"type":"method","value":"getPerson","argumentDependencies":[{"value":"person-id-123","type":"string"}]}}}} | const { name } = getPerson('person-id-123') |
      | {"constDecomposition":{"names":["var1", "var2"],"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}}                                                                 | const { var1, var2 } = 'test'               |


