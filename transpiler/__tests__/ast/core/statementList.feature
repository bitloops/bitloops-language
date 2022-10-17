Feature: StatementList

    Scenario Template: Statement List is valid
    Given A valid Statement List <blString> string
    When I generate the model
    Then I should get <output>

    Examples:
      | blString                                                                         | output                                                                                                                                                                                                                                                                                                                                                                                                                              |
      | JestTestStatementList { this.ok ( response , result ) ; }                                     | {"Hello World": {"core":{"Tests":{"jestTest":{"statements":[{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"this.ok","argumentDependencies":[{"value":"response","type":"variable"},{"value":"result","type":"variable"}]}}}}]}}}}}                                                                                                                                                                      |
      | JestTestStatementList { helloWorldUseCase.execute ( dto ) ; this.ok ( response , result ) ; } | {"Hello World": {"core":{"Tests":{"jestTest":{"statements":[{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"helloWorldUseCase.execute","argumentDependencies":[{"value":"dto","type":"variable"}]}}}},{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"this.ok","argumentDependencies":[{"value":"response","type":"variable"},{"value":"result","type":"variable"}]}}}}]}}}}} |