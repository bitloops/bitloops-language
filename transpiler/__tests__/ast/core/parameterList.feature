Feature: Formal parameter list

    Scenario Template: Formal Parameter List is valid
    Given A valid Formal Parameter List <blString> string
    When I generate the model
    Then I should get <output>

    Examples:
      | blString                                            | output                                                                                                                   |
      | JestTest { (test: string, b: bool) }                | {"Hello World": {"core":{"Tests":{"jestTest":[{ "value": "test", "type": "string" }, {"value": "b", "type": "bool"}]}}}} |
      | JestTest { (test: string) }                         | {"Hello World": {"core":{"Tests":{"jestTest":[{ "value": "test", "type": "string" }]}}}}                                 |
      | JestTest { ( ) }                                    | {"Hello World": {"core":{"Tests":{"jestTest":[]}}}}                                                                      |
      | JestTest { () }                                     | {"Hello World": {"core":{"Tests":{"jestTest":[]}}}}                                                                      |
      | JestTest { (helloWorldUseCase: string) }            | {"Hello World": {"core":{"Tests":{"jestTest":[{ "value": "helloWorldUseCase", "type": "string" }]}}}}                    |
      | JestTest { (helloWorldUseCase: HelloWorldUseCase) } | {"Hello World": {"core":{"Tests":{"jestTest":[{ "value": "helloWorldUseCase", "type": "HelloWorldUseCase" }]}}}}         |
      | JestTest { (props: NameProps) }                     | {"Hello World": {"core":{"Tests":{"jestTest":[{ "value": "props", "type": "NameProps" }]}}}}                             |