Feature: Rest Controller Execute Declaration

    Scenario Template: Rest Controller Parameters
    Given A valid Rest Controller Execute declaration <blString> string
    When I generate the model
    Then I should get <output>

    Examples:
      | blString                                                                   | output                                                                                                                                                                                                                                                                                                                 |
      | JestTest { execute(request, response) { this.ok ( response , result ) ;} } | {"Hello World": {"core":{"Tests":{"jestTest":{ "execute": {"dependencies": ["request", "response"], "statements":[{"expression":{"evaluation":{"regularEvaluation":{"type":"method","value":"this.ok","argumentDependencies":[{"value":"response","type":"variable"},{"value":"result","type":"variable"}]}}}}]} }}}}} |