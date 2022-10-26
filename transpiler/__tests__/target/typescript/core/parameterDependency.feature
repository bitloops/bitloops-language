Feature: ParameterDependency to Typescript target language

  Background:
    Given type is "TParameterDependency"
    And language is "TypeScript"

    Scenario Template: parameterDependency with valid input
    Given I have an parameterDependency <parameterDependency>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | parameterDependency                  | output      |
      | {"value": "arg1", "type": "string" } | arg1:string |
      | {"value": "arg2", "type": "int32" }  | arg2:number |
      | {"value": "arg3", "type": "Person" } | arg3:Person |
