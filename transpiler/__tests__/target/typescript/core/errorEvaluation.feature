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
    #   | {"regularEvaluation":{"type":"method","value":"this.clientError","argumentDependencies":[{"value":"response","type":"variable"},{"value":"result.message","type":"variable"}]}} | this.clientError(response,result.message) |
    #   | {"regularEvaluation":{"type":"method","value":"this.clientError","argumentDependencies":[{"value":"response","type":"variable"}]}}                                              | this.clientError(response)                |
    #   | {"regularEvaluation":{"type":"string","value":"result"}}                                                                                                                        | 'result'                                  |
    #   | {"regularEvaluation":{"type":"int32","value":"2"}}                                                                                                                              | 2                                         |
    #   | {"regularEvaluation":{"type":"DomainErrors.specificDomainError","value":"DomainErrors.specificDomainError"}}                                                                    | DomainErrors.specificDomainError          |
    #   | {"regularEvaluation":{"type": "bool","value": "false"}}                                                                                                                         | false                                     |
    #   | {"regularEvaluation":{"type": "bool","value": "true"}}   