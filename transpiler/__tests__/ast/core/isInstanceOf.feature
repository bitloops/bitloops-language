# https://docs.google.com/spreadsheets/d/15towqhzqkRXNC8JIcMfMjZFqyJAn2bVCsZm-nUI0kqw/edit#gid=0
Feature: IsInstanceOf
    
    Scenario Template: IsInstanceOf is valid
    Given A valid IsInstanceOf <blString> string
    When I generate the model
    Then I should get <output> 
    
   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | JestTestExpression { result is Error ; } | { "expression": { "isInstanceOf": { "expression": { "identifier": "result" }, "class": "Error" } } } | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,120,112,114,101,115,115,105,111,110,32,123,32,114,101,115,117,108,116,32,105,115,32,69,114,114,111,114,32,59,32,125 | 123,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,32,34,105,115,73,110,115,116,97,110,99,101,79,102,34,58,32,123,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,32,34,105,100,101,110,116,105,102,105,101,114,34,58,32,34,114,101,115,117,108,116,34,32,125,44,32,34,99,108,97,115,115,34,58,32,34,69,114,114,111,114,34,32,125,32,125,32,125 | @bitloops-auto-generated |
  