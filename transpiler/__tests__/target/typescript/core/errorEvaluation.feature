Feature: Error Evaluation to Typescript target language

  Background:
    Given type is "TErrorEvaluation"
    And language is "TypeScript"

    Scenario Template: Error Evaluation for all possible types
    Given I have a errorEvaluation <errorEvaluation>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | errorEvaluation                                                                                                                                                               | output                                    |
      | {"errorEvaluation":{"name":"DomainErrors.InvalidTitleError","argumentDependencies":[]}}                                                                                       | new DomainErrors.InvalidTitleError()      |
      | {"errorEvaluation":{"name":"DomainErrors.InvalidTitleError","argumentDependencies":[{"value":"response","type":"variable"},{"value":"result.message","type":"variable"}]}}    | new DomainErrors.InvalidTitleError(response,result.message)      |
      | {"errorEvaluation":{"name":"DomainErrors.InvalidTitleError","argumentDependencies":[{"value":"title","type":"variable"}]}}    | new DomainErrors.InvalidTitleError(title)      |