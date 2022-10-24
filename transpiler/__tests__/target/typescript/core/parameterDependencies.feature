Feature: ParameterDependencies to Typescript target language

  Background:
    Given type is "TParameterDependencies"
    And language is "TypeScript"

    Scenario Template: parameterDependencies with valid input
    Given I have parameterDependencies <parameterDependencies>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | parameterDependencies                                                                                                    | output                                       |
      | [{"value": "arg1", "type": "string" }]                                                                                   | (arg1:string)                                |
      | [{"value": "arg2", "type": "int32" }]                                                                                    | (arg2:number)                                |
      | [{"value": "arg3", "type": "Person" }]                                                                                   | (arg3:Person)                                |
      | [{"value": "arg4", "type": "Person" }, {"value": "arg5", "type": "string" }]                                             | (arg4:Person,arg5:string)                    |
      | [{"value": "name", "type": "string" }, {"value": "age", "type": "int32" }, {"value": "children", "type": "Children[]" }] | (name:string,age:number,children:Children[]) |
