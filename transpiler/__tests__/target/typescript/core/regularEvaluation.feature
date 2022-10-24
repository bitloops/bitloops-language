Feature: Regular Evaluation to Typescript target language

  Background:
    Given type is "TRegularEvaluation"
    And language is "TypeScript"

    Scenario Template: Regular Evaluation for all possible types
    Given I have a regularEvaluation <regularEvaluation>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | regularEvaluation                                                                                                                                                               | output                                    |
      | {"regularEvaluation":{"type":"variable","value":"result"}}                                                                                                                      | result                                    |
      | {"regularEvaluation":{"type":"method","value":"this.clientError","argumentDependencies":[{"value":"response","type":"variable"},{"value":"result.message","type":"variable"}]}} | this.clientError(response,result.message) |
      | {"regularEvaluation":{"type":"method","value":"this.clientError","argumentDependencies":[{"value":"response","type":"variable"}]}}                                              | this.clientError(response)                |
      | {"regularEvaluation":{"type":"string","value":"result"}}                                                                                                                        | 'result'                                  |
      | {"regularEvaluation":{"type":"int32","value":"2"}}                                                                                                                              | 2                                         |
      | {"regularEvaluation":{"type":"DomainError","value":"specificDomainError"}}                                                                                                      | specificDomainError                       |
      | {"regularEvaluation":{"type": "bool","value": "false"}}                                                                                                                         | false                                     |
      | {"regularEvaluation":{"type": "bool","value": "true"}}                                                                                                                          | true                                      |

    Scenario Template: Invalid boolean value
    Given I have a <regularEvaluation> with invalid <boolean>
    When I generate the code
    Then I should get an error saying that <regularEvaluation> has invalid <boolean>

    Examples:
      | regularEvaluation                                        | boolean |
      | {"regularEvaluation":{"type": "bool","value": "falsee"}} | falsee  |