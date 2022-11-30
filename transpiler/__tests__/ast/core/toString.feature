# https://docs.google.com/spreadsheets/d/1-9KISau0gqmjjCHCwXsDSuwiAby6qlf_sy0IPNrGsy0/edit#gid=0

Feature: toStringCall

        Scenario Template: toStringCall is valid
        Given A valid toStringCall <blString> string
        When I generate the model
        Then I should get <output>

   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | JestTestExpression { this.props.toString() } | {   "expression": {     "toStringMethod": {       "expression": {         "memberDotExpression": {           "expression": { "thisExpression": "this" },           "identifier": "props"         }       }     }   } } | @bitloops-auto-generated |
       # | JestTestExpression { personName.toString() } | {   "expression": {     "toStringMethod": {       "expression": {            "identifier": "personName"                }     }   } } | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,120,112,114,101,115,115,105,111,110,32,123,32,116,104,105,115,46,112,114,111,112,115,46,116,111,83,116,114,105,110,103,40,41,32,125 | 123,10,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,34,116,111,83,116,114,105,110,103,77,101,116,104,111,100,34,58,32,123,10,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,34,109,101,109,98,101,114,68,111,116,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,32,34,116,104,105,115,69,120,112,114,101,115,115,105,111,110,34,58,32,34,116,104,105,115,34,32,125,44,10,32,32,32,32,32,32,32,32,32,32,34,105,100,101,110,116,105,102,105,101,114,34,58,32,34,112,114,111,112,115,34,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,10,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,120,112,114,101,115,115,105,111,110,32,123,32,112,101,114,115,111,110,78,97,109,101,46,116,111,83,116,114,105,110,103,40,41,32,125 | 123,10,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,34,116,111,83,116,114,105,110,103,77,101,116,104,111,100,34,58,32,123,10,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,10,32,32,32,32,32,32,32,32,32,32,34,105,100,101,110,116,105,102,105,101,114,34,58,32,34,112,101,114,115,111,110,78,97,109,101,34,10,32,32,32,32,32,32,32,32,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,10,125 | @bitloops-auto-generated |
  