Feature: Struct to Typescript target language

  Background:
    Given type is "TBitloopsPrimaryType"

    Scenario Template: BitloopsPrimaryType success to Typescript object
    Given I have a BitloopsPrimaryType <intermediateModel>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | intermediateModel                                              | output     |
      | { "arrayType": { "value": "double"}}                           | number[]   |
      | { "arrayType": { "value": {"arrayType": {"value": "double"}}}} | number[][] |
# |  "string"                                                      | string                    |
# |"int32"                                                       |  number                  |
# | "double"                                                       |  number                         |
