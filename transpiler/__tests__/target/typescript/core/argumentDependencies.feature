Feature: ArgumentDependencies to Typescript target language

  Background:
    Given type is "TArgumentDependencies"
    And language is "TypeScript"

    Scenario Template: argumentDependencies with valid input
    Given I have argumentDependencies <argumentDependencies>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | argumentDependencies                                                                                                    | output                 |
      | [{"value": "helloWorld", "type": "string" }]                                                                            | ('helloWorld')         |
      | [{"value": "42", "type": "int32" }]                                                                                     | (42)                   |
      | [{"value": "person", "type": "variable" }]                                                                              | (person)               |
      | [{"value": "person", "type": "variable" }, {"value": "UncleBob", "type": "string" }]                                    | (person,'UncleBob')    |
      | [{"value": "string", "type": "string" }, {"value": "42", "type": "int32" }, {"value": "children", "type": "variable" }] | ('string',42,children) |
