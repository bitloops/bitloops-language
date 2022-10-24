#https://docs.google.com/spreadsheets/d/1GHeESL4EW3MwIvgGR76gniHJYsJVO9Vm-uQcbshRbZA/edit#gid=0

Feature: Get Class

    Scenario Template: Get Class is valid
    Given A valid getClass <blString> string
    When I generate the model
    Then I should get <output>

   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | JestTestGetClass { result.getClass; } | {"Hello World":{"core":{"Tests":{"jestTest":{"getClass":{"regularEvaluation":{"type":"variable","value":"result"}}}}}}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,71,101,116,67,108,97,115,115,32,123,32,114,101,115,117,108,116,46,103,101,116,67,108,97,115,115,59,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,103,101,116,67,108,97,115,115,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,114,101,115,117,108,116,34,125,125,125,125,125,125,125 | @bitloops-auto-generated |
  