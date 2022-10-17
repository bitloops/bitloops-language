Feature: Rest Controller Method Declaration

    Scenario Template: Rest Controller Method Declaration is valid
    Given A valid Rest Controller Method Declaration <blString> string
    When I generate the model
    Then I should get <output>

    Examples:
      | blString                                    | output                                                                                                                    |
      | JestTest { method: REST.Methods.GET; } | {"Hello World": {"core":{"Tests":{"jestTest":{ "method": "GET"}}}}} |
      | JestTest { method: REST.Methods.GET } | {"Hello World": {"core":{"Tests":{"jestTest":{ "method": "GET"}}}}} |
      | JestTest { method: REST.Methods.POST; } | {"Hello World": {"core":{"Tests":{"jestTest":{ "method": "POST"}}}}} |
      | JestTest { method: REST.Methods.PUT; } | {"Hello World": {"core":{"Tests":{"jestTest":{ "method": "PUT"}}}}} |
      | JestTest { method: REST.Methods.PATCH; } | {"Hello World": {"core":{"Tests":{"jestTest":{ "method": "PATCH"}}}}} |
      | JestTest { method: REST.Methods.DELETE; } | {"Hello World": {"core":{"Tests":{"jestTest":{ "method": "DELETE"}}}}} |
      | JestTest { method: REST.Methods.OPTIONS; } | {"Hello World": {"core":{"Tests":{"jestTest":{ "method": "OPTIONS"}}}}} |
