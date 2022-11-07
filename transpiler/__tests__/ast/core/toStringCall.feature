# https://docs.google.com/spreadsheets/d/1-9KISau0gqmjjCHCwXsDSuwiAby6qlf_sy0IPNrGsy0/edit#gid=0
Feature: toStringCall

    Scenario Template: toStringCall is valid
    Given A valid toStringCall <blString> string
    When I generate the model
    Then I should get <output>

   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | JestTestStatement { re.toString() } | {"Hello World":{"core":{"Tests":{"jestTest":{        "name": "this.id",     "expression": {       "evaluation": {         "regularEvaluation": {           "value": "OK",           "type": "string"         }       }        } }}}}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,83,116,97,116,101,109,101,110,116,32,123,32,114,101,46,116,111,83,116,114,105,110,103,40,41,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,10,32,32,10,32,32,32,32,34,110,97,109,101,34,58,32,34,116,104,105,115,46,105,100,34,44,10,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,79,75,34,44,10,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,10,32,32,125,10,125,125,125,125,125 | @bitloops-auto-generated |
  