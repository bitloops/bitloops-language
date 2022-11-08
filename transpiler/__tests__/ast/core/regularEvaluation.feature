# https://docs.google.com/spreadsheets/d/1bzjgVaqdkVRqRctxzDjLKb_uyrWZf1aiz1ZfWmwKBiw/edit#gid=0
Feature: Regular Evaluation

        Scenario Template: Regular Evaluation is valid
        Given A valid Regular Evaluation <blString> string
        When I generate the model
        Then I should get <output>

   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | JestTest {  'helloWorld' } | {"Hello World": {"core":{"Tests":{"jestTest":{"regularEvaluation":{"type":"string","value":"helloWorld"}}}}}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,32,123,32,32,39,104,101,108,108,111,87,111,114,108,100,39,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,104,101,108,108,111,87,111,114,108,100,34,125,125,125,125,125,125 | @bitloops-auto-generated |
  