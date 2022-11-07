Feature: Error Evaluation to Typescript target language

  Background:
    Given type is "TErrorEvaluation"
    And language is "TypeScript"

    Scenario Template: Error Evaluation for all possible types
    Given I have a errorEvaluation <errorEvaluation>
    When I generate the code
    Then I should see the <output> code with the corresponding dependencies <dependencies>

    Examples:
      | errorEvaluation                                                                                                                                                               | output                                    | dependencies |
      | {"errorEvaluation":{"name":"DomainErrors.InvalidTitleError","argumentDependencies":[]}}                                                                                       | new DomainErrors.InvalidTitleError()      |  [{"className": "index", "classType": "DomainErrors", "default": false, "type": "relative", "value": "DomainErrors"}]    |
      | {"errorEvaluation":{"name":"DomainErrors.InvalidTitleError","argumentDependencies":[{"value":"response","type":"variable"},{"value":"result.message","type":"variable"}]}}    | new DomainErrors.InvalidTitleError(response,result.message)      | [{"className": "index", "classType": "DomainErrors", "default": false, "type": "relative", "value": "DomainErrors"}]  |
      | {"errorEvaluation":{"name":"DomainErrors.InvalidTitleError","argumentDependencies":[{"value":"title","type":"variable"}]}}    | new DomainErrors.InvalidTitleError(title)      | [{"className": "index", "classType": "DomainErrors", "default": false, "type": "relative", "value": "DomainErrors"}]   |
      | {"errorEvaluation":{"name":"ApplicationErrors.InvalidTitleError","argumentDependencies":[{"value":"title","type":"variable"}]}}    | new ApplicationErrors.InvalidTitleError(title)      | [{"className": "index", "classType": "ApplicationErrors", "default": false, "type": "relative", "value": "ApplicationErrors"}] |