Feature: Read Model to Typescript target language

  Background:
    Given type is "TReadModels"
    And language is "TypeScript"

    Scenario Template: Read models with one or two variables to Typescript
    Given I have a readModel <readModel>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | readModel                                                                                                                  | output                                                                    |
      | {"NameReadModel":{"variables":[{"type":"string","name":"name","optional":false}]}}                                         | export interface NameReadModel { name: string; }                          |
      | {"ClassReadModel":{"variables":[{"type":"string","name":"name"},{"type":"int32","name":"numOfTeachers","optional":true}]}} | export interface ClassReadModel { name: string; numOfTeachers?: number; } |