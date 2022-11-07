Feature: Bitloops Primary type

    Scenario Template: Bitloops Primary Type is Valid
    Given A valid primType <blString> string
    When I generate the model
    Then I should get <output>

    Examples:
      | boundedContext | module | blString                                    | output                                                                                                            |
      | Hello World    | core   | JestTestBitloopsPrimaryType { string  }     | {"Hello World": {"core":{"Tests":{"jestTest": "string"}}}}                                                        |
      | Hello World    | core   | JestTestBitloopsPrimaryType { int32  }      | {"Hello World": {"core":{"Tests":{"jestTest": "int32"}}}}                                                         |
      | Hello World    | core   | JestTestBitloopsPrimaryType { double  }     | {"Hello World": {"core":{"Tests":{"jestTest": "double"}}}}                                                        |
      | Hello World    | core   | JestTestBitloopsPrimaryType { double[]  }   | {"Hello World": {"core":{"Tests":{"jestTest": { "arrayType": { "value": "double"}} }}}}                           |
      | Hello World    | core   | JestTestBitloopsPrimaryType { double[][]  } | {"Hello World": {"core":{"Tests":{"jestTest": { "arrayType": { "value": {"arrayType": {"value": "double"}}}} }}}} |
