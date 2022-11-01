#https://docs.google.com/spreadsheets/d/1VQrZy0k5fJMTnr3jCpKqyaOEL9TYUrMlaat7oSqakCM/edit#gid=0

Feature: Evaluation

        Scenario Template: Evaluation with all possible evaluation types
        Given A valid evaluation <blString> string
        When I generate the model
        Then I should get <output>
        
   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | JestTestEvaluation { HelloWorldDTO({ message: 'Hello, World!' })} | {"Hello World": {"core":{"Tests":{"jestTest":{"evaluation":{"dto":{"fields":[{"name":"message","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Hello, World!"}}}}],"name":"HelloWorldDTO"}}}}}}} | @bitloops-auto-generated |
       # | JestTestEvaluation { HelloWorldStruct({ message: 'Hello, World!' })} | {"Hello World": {"core":{"Tests":{"jestTest":{"evaluation":{"struct":{"fields":[{"name":"message","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Hello, World!"}}}}],"name":"HelloWorldStruct"}}}}}}} | @bitloops-auto-generated |
       # | JestTestEvaluation {this.clientError(response)} | {"Hello World": {"core":{"Tests":{"jestTest":{"evaluation":{"regularEvaluation":{"type":"method","value":"this.clientError","argumentDependencies":[{"value":"response","type":"variable"}]}}}}}}} | @bitloops-auto-generated |
       # | JestTestEvaluation { this.clientError( response ) } | {"Hello World": {"core":{"Tests":{"jestTest":{"evaluation":{"regularEvaluation":{"type":"method","value":"this.clientError","argumentDependencies":[{"value":"response","type":"variable"}]}}}}}}} | @bitloops-auto-generated |
       # | JestTestEvaluation { NameVO({ message: 'Hello, World!' })} | {"Hello World": {"core":{"Tests":{"jestTest":{"evaluation":{"valueObject":{"name":"NameVO","props":[{"name":"message","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Hello, World!"}}}}]}}}}}}} | @bitloops-auto-generated |
       # | JestTestEvaluation { NameEntity({ message: 'Hello, World!' })} | {"Hello World": {"core":{"Tests":{"jestTest":{"evaluation":{"entity":{"name":"NameEntity","props":[{"name":"message","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Hello, World!"}}}}]}}}}}}} | @bitloops-auto-generated |
       # | JestTestEvaluation { result.getClass() } | {"Hello World":{"core":{"Tests":{"jestTest":{"evaluation":{"getClass":{"regularEvaluation":{"type":"variable","value":"result"}}}}}}}} | @bitloops-auto-generated |
       # | JestTestEvaluation { result is Error } | {   "Hello World": {     "core": {       "Tests": {         "jestTest": {           "evaluation": {             "isInstanceOf": [               {                 "value": "result",                 "type": "variable"               },               {                 "class": "Error"               }             ]           }         }       }     }   } } | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,118,97,108,117,97,116,105,111,110,32,123,32,72,101,108,108,111,87,111,114,108,100,68,84,79,40,123,32,109,101,115,115,97,103,101,58,32,39,72,101,108,108,111,44,32,87,111,114,108,100,33,39,32,125,41,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,100,116,111,34,58,123,34,102,105,101,108,100,115,34,58,91,123,34,110,97,109,101,34,58,34,109,101,115,115,97,103,101,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,72,101,108,108,111,44,32,87,111,114,108,100,33,34,125,125,125,125,93,44,34,110,97,109,101,34,58,34,72,101,108,108,111,87,111,114,108,100,68,84,79,34,125,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,118,97,108,117,97,116,105,111,110,32,123,32,72,101,108,108,111,87,111,114,108,100,83,116,114,117,99,116,40,123,32,109,101,115,115,97,103,101,58,32,39,72,101,108,108,111,44,32,87,111,114,108,100,33,39,32,125,41,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,115,116,114,117,99,116,34,58,123,34,102,105,101,108,100,115,34,58,91,123,34,110,97,109,101,34,58,34,109,101,115,115,97,103,101,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,72,101,108,108,111,44,32,87,111,114,108,100,33,34,125,125,125,125,93,44,34,110,97,109,101,34,58,34,72,101,108,108,111,87,111,114,108,100,83,116,114,117,99,116,34,125,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,118,97,108,117,97,116,105,111,110,32,123,116,104,105,115,46,99,108,105,101,110,116,69,114,114,111,114,40,114,101,115,112,111,110,115,101,41,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,109,101,116,104,111,100,34,44,34,118,97,108,117,101,34,58,34,116,104,105,115,46,99,108,105,101,110,116,69,114,114,111,114,34,44,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,118,97,108,117,101,34,58,34,114,101,115,112,111,110,115,101,34,44,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,125,93,125,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,118,97,108,117,97,116,105,111,110,32,123,32,116,104,105,115,46,99,108,105,101,110,116,69,114,114,111,114,40,32,114,101,115,112,111,110,115,101,32,41,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,109,101,116,104,111,100,34,44,34,118,97,108,117,101,34,58,34,116,104,105,115,46,99,108,105,101,110,116,69,114,114,111,114,34,44,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,118,97,108,117,101,34,58,34,114,101,115,112,111,110,115,101,34,44,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,125,93,125,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,118,97,108,117,97,116,105,111,110,32,123,32,78,97,109,101,86,79,40,123,32,109,101,115,115,97,103,101,58,32,39,72,101,108,108,111,44,32,87,111,114,108,100,33,39,32,125,41,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,118,97,108,117,101,79,98,106,101,99,116,34,58,123,34,110,97,109,101,34,58,34,78,97,109,101,86,79,34,44,34,112,114,111,112,115,34,58,91,123,34,110,97,109,101,34,58,34,109,101,115,115,97,103,101,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,72,101,108,108,111,44,32,87,111,114,108,100,33,34,125,125,125,125,93,125,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,118,97,108,117,97,116,105,111,110,32,123,32,78,97,109,101,69,110,116,105,116,121,40,123,32,109,101,115,115,97,103,101,58,32,39,72,101,108,108,111,44,32,87,111,114,108,100,33,39,32,125,41,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,101,110,116,105,116,121,34,58,123,34,110,97,109,101,34,58,34,78,97,109,101,69,110,116,105,116,121,34,44,34,112,114,111,112,115,34,58,91,123,34,110,97,109,101,34,58,34,109,101,115,115,97,103,101,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,72,101,108,108,111,44,32,87,111,114,108,100,33,34,125,125,125,125,93,125,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,118,97,108,117,97,116,105,111,110,32,123,32,114,101,115,117,108,116,46,103,101,116,67,108,97,115,115,40,41,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,103,101,116,67,108,97,115,115,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,114,101,115,117,108,116,34,125,125,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,69,118,97,108,117,97,116,105,111,110,32,123,32,114,101,115,117,108,116,32,105,115,32,69,114,114,111,114,32,125 | 123,10,32,32,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,10,32,32,32,32,34,99,111,114,101,34,58,32,123,10,32,32,32,32,32,32,34,84,101,115,116,115,34,58,32,123,10,32,32,32,32,32,32,32,32,34,106,101,115,116,84,101,115,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,105,115,73,110,115,116,97,110,99,101,79,102,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,114,101,115,117,108,116,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,108,97,115,115,34,58,32,34,69,114,114,111,114,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,10,125 | @bitloops-auto-generated |
  