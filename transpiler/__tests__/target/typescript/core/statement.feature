Feature: Statement to Typescript target language

  Background:
    Given type is "TStatement"
    And language is "TypeScript"

    Scenario Template: Statement with all possible type statements
    Given I have a statement <statement>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | statement                                                                                                                                                                                                                                                                                                                                                                                              | output                                                                         |
      | {"variableDeclaration":{"name":"c","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}},"type":"bool"}}                                                                                                                                                                                                                                                                    | let c: boolean = true                                                          |
      | {"switchStatement":{"expression":{"evaluation":{"regularEvaluation":{"type":"variable","value":"person"}}},"defaultCase":{"statements":[{"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"false"}}}}}]},"cases":[{"statements":[{"constDeclaration":{"name":"a","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"1"}}}}}],"caseValue":"1"}]}} | switch(person) {case 1: {const a = 1; break;} default: {return false; break;}} |
      | {"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}}}                                                                                                                                                                                                                                                                                                        | return 'test'                                                                  |
      | {"returnOK":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}}}                                                                                                                                                                                                                                                                                                      | return yay('test')                                                             |
      | {"returnError":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}}}                                                                                                                                                                                                                                                                                                   | return oops('test')                                                            |
      | {"constDecomposition":{"names":["wings"],"evaluation":{"regularEvaluation":{"type":"variable","value":"bird"}}}}                                                                                                                                                                                                                                                                                       | const { wings } = bird                                                         |
      | {"constDeclaration":{"name":"hello","type":"Hello","expression":{"struct":{"name":"StructName","fields":[{"name":"name","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"helloWorld"}}}}]}}}}                                                                                                                                                                                 | const hello: Hello = {name:'helloWorld'}                                       |
      | {"expression": {"evaluation":{"isInstanceOf":[{"value":"result","type":"variable"},{"class":"Error"}]}}}                                                                                                                                                                                                                                                                                               | result.isOops()                                                                |
      | "break"                                                                                                                                                                                                                                                                                                                                                                                                | break                                                                          |

    Scenario Template: Unsupported statement
    Given I have an invalid <statement> with unsupported <statementType>
    When I generate the code
    Then I should get an error saying that <statement> is unsupported

    Examples:
      | statement                                                                                            | statementType |
      | {"invalidType":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}}} | invalidType   |