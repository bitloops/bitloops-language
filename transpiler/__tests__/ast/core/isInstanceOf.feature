# https://docs.google.com/spreadsheets/d/15towqhzqkRXNC8JIcMfMjZFqyJAn2bVCsZm-nUI0kqw/edit#gid=0
Feature: IsInstanceOf
    
    Scenario Template: IsInstanceOf is valid
    Given A valid IsInstanceOf <blString> string
    When I generate the model
    Then I should get <output> 
    
   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | JestTestIsInstanceOf { result is Error ; } | {"Hello World":{"core":{"Tests":{"jestTest":{"isInstanceOf":[{"value":"result","type":"variable"},{"class":"Error"}]}}}}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,73,115,73,110,115,116,97,110,99,101,79,102,32,123,32,114,101,115,117,108,116,32,105,115,32,69,114,114,111,114,32,59,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,105,115,73,110,115,116,97,110,99,101,79,102,34,58,91,123,34,118,97,108,117,101,34,58,34,114,101,115,117,108,116,34,44,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,125,44,123,34,99,108,97,115,115,34,58,34,69,114,114,111,114,34,125,93,125,125,125,125,125 | @bitloops-auto-generated |
  