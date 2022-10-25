Feature: Evaluation to Typescript target language

  Background:
    Given type is "TEvaluation"
    And language is "TypeScript"

    Scenario Template: Evaluation with all possible evaluation types
    Given I have an evaluation <evaluation>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | evaluation                                                                                                                                                                      | output                         |
      | {"evaluation":{"isInstanceOf":[{"value":"result","type":"variable"},{"class":"Error"}]}}                                                                                        | result.isOops()                |
      | {"evaluation":{"isNotInstanceOf":[{"value":"result","type":"variable"},{"class":"ClassName"}]}}                                                                                 | !(result instanceof ClassName) |
      | {"evaluation":{"getClass":{"regularEvaluation":{"type":"variable","value":"result"}}}}                                                                                          | result.constructor             |
      | {"evaluation":{"regularEvaluation":{"type":"method","value":"this.clientError","argumentDependencies":[{"value":"response","type":"variable"}]}}}                               | this.clientError(response)     |
      | {"evaluation":{"struct":{"fields":[{"name":"message","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Hello, World!"}}}}],"name":"HelloWorldStruct"}}} | {message:'Hello, World!'}      |
      | {"evaluation":{"dto":{"fields":[{"name":"message","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Hello, World!"}}}}],"name":"HelloWorldDTO"}}}       | {message:'Hello, World!'}      |
      | {"evaluation":{"valueObject":{"name":"NameVO","props":{"regularEvaluation":{"type":"variable","value":"props"}}}}}                                                              | NameVO.create(props);          |
      | {"evaluation":{"entity":{"name":"NameEntity","props":{"regularEvaluation":{"type":"variable","value":"props"}}}}}                                                               | NameEntity.create(props);      |


    Scenario Template: Unsupported evaluation type
    Given I have an invalid <evaluation> with unsupported <evaluationType>
    When I generate the code
    Then I should get an error saying that <evaluation> is unsupported

    Examples:
      | evaluation                                                                              | evaluationType |
      | {"evaluation":{"invalidType":[{"value":"result","type":"variable"},{"class":"Error"}]}} | invalidType    |

