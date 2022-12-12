# https://docs.google.com/spreadsheets/d/1nI_jIcW7TV_pRNDvqRSXYwO4nDfENH1I48gNbxCkuSU/edit#gid=0
Feature: BuiltIn Class Evaluation

    Scenario Template: BuiltIn Class is valid
    Given A valid builtIn class <blString> string
    When I generate the model
    Then I should get <output>

    # Examples: # @bitloops-auto-generated
    # | blString | output | @bitloops-auto-generated |
    # | JestTestBuiltInClass {  UUIDv4(id) } | {   "builtInClass": {     "className": "UUIDv4",     "argumentList": [{ "argument": { "expression": { "identifier": "id" } } }]   } } | @bitloops-auto-generated |

    Examples: # @bitloops-auto-generated
      | blString                                                                                                                       | output                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | @bitloops-auto-generated |
      | 74,101,115,116,84,101,115,116,66,117,105,108,116,73,110,67,108,97,115,115,32,123,32,32,85,85,73,68,118,52,40,105,100,41,32,125 | 123,10,32,32,34,98,117,105,108,116,73,110,67,108,97,115,115,34,58,32,123,10,32,32,32,32,34,99,108,97,115,115,78,97,109,101,34,58,32,34,85,85,73,68,118,52,34,44,10,32,32,32,32,34,97,114,103,117,109,101,110,116,76,105,115,116,34,58,32,91,123,32,34,97,114,103,117,109,101,110,116,34,58,32,123,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,32,34,105,100,101,110,116,105,102,105,101,114,34,58,32,34,105,100,34,32,125,32,125,32,125,93,10,32,32,125,10,125 | @bitloops-auto-generated |
