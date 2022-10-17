Feature: FunctionBody

    Scenario Template: Function Body is valid
    Given A valid Function Body <blString> string
    When I generate the model
    Then I should get <output>

    Examples:
      | blString                                                 | output                                                                                                                                                                                                                                                         |
      | JestTestFunctionBody { this.ok ( response , result ) ; } | {"Hello World": {"core":{"Tests":{"jestTest":{"statements":[{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"this.ok","argumentDependencies":[{"value":"response","type":"variable"},{"value":"result","type":"variable"}]}}}}]}}}}} |
# | JestTestFunctionBody { helloWorldUseCase.execute ( dto ) ; this.ok ( response , result ) ; } | {"Hello World": {"core":{"Tests":{"jestTest":{"statements":[{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"helloWorldUseCase.execute","argumentDependencies":[{"value":"dto","type":"variable"}]}}}},{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"this.ok","argumentDependencies":[{"value":"response","type":"variable"},{"value":"result","type":"variable"}]}}}}]}}}}} |