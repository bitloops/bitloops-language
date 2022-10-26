Feature: EvaluatePrimitive to Typescript target language

  Background:
    Given type is "TEvaluatePrimitive"
    And language is "TypeScript"

    Scenario Template: primitiveEvaluation with valid input
    Given I have a primitiveEvaluation <primitiveEvaluation>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | primitiveEvaluation                        | output       |
      | {"value": "true", "type": "bool" }         | true         |
      | {"value": "42", "type": "int64" }          | 42           |
      | {"value": "42", "type": "int32" }          | 42           |
      | {"value": "42.534", "type": "float" }      | 42.534       |
      | {"value": "helloWorld", "type": "string" } | 'helloWorld' |
