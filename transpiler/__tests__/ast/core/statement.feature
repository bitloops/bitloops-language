Feature: Statement

    Scenario Template: Steatement is valid
    Given A valid statement <blString> string
    When I generate the model
    Then I should get <output>

    Examples:
      | blString                                            | output                                                                                                                                                                                                                                            |
      | JestTestStatement { this.ok( response , 'Hello World!' ) ; } | {"Hello World": {"core":{"Tests":{"jestTest":{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"this.ok","argumentDependencies":[{"value":"response","type":"variable"},{"value":"Hello World!","type":"string"}]}}}}}}}} |
#
