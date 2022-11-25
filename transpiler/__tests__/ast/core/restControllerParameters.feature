Feature: Rest Controller Parameters

    Scenario Template: Rest Controller Parameters
    Given A valid Rest Controller Parameters <blString> string
    When I generate the model
    Then I should get <output>

    Examples:
      | blString              | output                                                                            |
      | JestTest { req, res } | {"Hello World": {"core":{"Tests":{"jestTest":{"dependencies": ["req", "res"]}}}}} |