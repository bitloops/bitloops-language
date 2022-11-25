Feature: Struct

    Scenario Template: Struct is valid
    Given A valid struct <blString> string
    When I generate the model
    Then I should get <output>

    Examples:
      | boundedContext | module | blString                                                                       | output                                                                                                                                                                                    |
      | Hello World    | core   | Struct HelloWorldStruct { string name ; }                                      | {"Hello World": {"core":{"Structs":{"HelloWorldStruct":{"fields":[{"type":"string","name":"name"}]}}}}}                                                                                   |
      | Hello World    | core   | Struct HelloWorldStruct { string name ; int32 age; }                           | {"Hello World": {"core":{"Structs":{"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"type":"int32","name":"age"}]}}}}}                                                     |
      | Hello World    | core   | Struct HelloWorldStruct { string name ; optional double price; }               | {"Hello World": {"core":{"Structs":{"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"optional":true,"type":"double","name":"price"}]}}}}}                                  |
      | Hello World    | core   | Struct HelloWorldStruct { string name ; Address address; }                     | {"Hello World": {"core":{"Structs":{"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"type":"Address","name":"address"}]}}}}}                                               |
      | Hello World    | core   | Struct HelloWorldStruct { string name ; Address address; optional Info info; } | {"Hello World": {"core":{"Structs":{"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"type":"Address","name":"address"},{"optional":true,"type":"Info","name":"info"}]}}}}} |
      | Hello World    | core   | Struct HelloWorldStruct { string[] addresses ; }                               | {"Hello World": {"core":{"Structs":{"HelloWorldStruct":{"fields":[{"type":{"arrayType":{"value":"string"}},"name":"addresses"}]}}}}}                                                      |

    Scenario Template: Struct is invalid
    Given A valid struct <blString> string
    When I generate the model
    Then I should get <error>
    Examples:
      | boundedContext | module | blString                                       | error              |
      | Hello World    | core   | Struct HelloWorldStruct { qaddress address;  } | Invalid field data |
# | Hello World    | core   | Struct HelloWorldStruct { string name ; optional qaddress address;  } | Invalid field data |

