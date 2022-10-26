# https://docs.google.com/spreadsheets/d/1bzjgVaqdkVRqRctxzDjLKb_uyrWZf1aiz1ZfWmwKBiw/edit#gid=0
Feature: Regular Evaluation

        Scenario Template: Regular Evaluation is valid
        Given A valid Regular Evaluation <blString> string
        When I generate the model
        Then I should get <output>

   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | JestTest { test.value.hello } | {"Hello World": {   "core":{     "Tests":{"jestTest":{"regularEvaluation":{"type":"variable","value":"test.value.hello"}}}}}} | @bitloops-auto-generated |
       # | JestTest {  'helloWorld' } | {"Hello World": {"core":{"Tests":{"jestTest":{"regularEvaluation":{"type":"string","value":"helloWorld"}}}}}} | @bitloops-auto-generated |
       # | JestTest { helloWorldUseCase.execute (dto) } | {"Hello World": {"core":{"Tests":{"jestTest":{"regularEvaluation":{"type":"method","value":"helloWorldUseCase.execute","argumentDependencies":[{"value":"dto","type":"variable"}]}}}}}}  | @bitloops-auto-generated |
       # | JestTest { helloWorldUseCase.execute ( dto , tismas ) } | {"Hello World": {"core":{"Tests":{"jestTest":{"regularEvaluation":{"type":"method","value":"helloWorldUseCase.execute","argumentDependencies":[{"value":"dto","type":"variable"}, {"value":"tismas","type":"variable"}]}}}}}} | @bitloops-auto-generated |
       # | JestTest { helloWorldUseCase.execute ( dto , 'tismas' ) } | {"Hello World": {"core":{"Tests":{"jestTest":{"regularEvaluation":{"type":"method","value":"helloWorldUseCase.execute","argumentDependencies":[{"value":"dto","type":"variable"}, {"value":"tismas","type":"string"}]}}}}}} | @bitloops-auto-generated |
       # | JestTest { helloWorldUseCase.execute ( dto , 'tismas' ) ; } | {"Hello World": {"core":{"Tests":{"jestTest":{"regularEvaluation":{"type":"method","value":"helloWorldUseCase.execute","argumentDependencies":[{"value":"dto","type":"variable"}, {"value":"tismas","type":"string"}]}}}}}} | @bitloops-auto-generated |
       # | JestTest { helloWorldUseCase.execute() } | {"Hello World": {"core":{"Tests":{"jestTest":{"regularEvaluation":{"type":"method","value":"helloWorldUseCase.execute"}}}}}} | @bitloops-auto-generated |
       # | JestTest { helloWorldUseCase.execute( ) } | {"Hello World": {"core":{"Tests":{"jestTest":{"regularEvaluation":{"type":"method","value":"helloWorldUseCase.execute"}}}}}} | @bitloops-auto-generated |
       # | JestTest { result is Error } | {"Hello World": {"core":{"Tests":{"jestTest":{"regularEvaluation":{"isInstanceOf":[{"value":"result","type":"variable"},{"class":"Error"}]}}}}}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,32,123,32,116,101,115,116,46,118,97,108,117,101,46,104,101,108,108,111,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,10,32,32,34,99,111,114,101,34,58,123,10,32,32,32,32,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,116,101,115,116,46,118,97,108,117,101,46,104,101,108,108,111,34,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,32,123,32,32,39,104,101,108,108,111,87,111,114,108,100,39,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,104,101,108,108,111,87,111,114,108,100,34,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,32,123,32,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,32,40,100,116,111,41,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,109,101,116,104,111,100,34,44,34,118,97,108,117,101,34,58,34,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,34,44,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,118,97,108,117,101,34,58,34,100,116,111,34,44,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,125,93,125,125,125,125,125,125,32 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,32,123,32,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,32,40,32,100,116,111,32,44,32,116,105,115,109,97,115,32,41,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,109,101,116,104,111,100,34,44,34,118,97,108,117,101,34,58,34,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,34,44,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,118,97,108,117,101,34,58,34,100,116,111,34,44,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,125,44,32,123,34,118,97,108,117,101,34,58,34,116,105,115,109,97,115,34,44,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,125,93,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,32,123,32,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,32,40,32,100,116,111,32,44,32,39,116,105,115,109,97,115,39,32,41,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,109,101,116,104,111,100,34,44,34,118,97,108,117,101,34,58,34,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,34,44,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,118,97,108,117,101,34,58,34,100,116,111,34,44,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,125,44,32,123,34,118,97,108,117,101,34,58,34,116,105,115,109,97,115,34,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,93,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,32,123,32,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,32,40,32,100,116,111,32,44,32,39,116,105,115,109,97,115,39,32,41,32,59,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,109,101,116,104,111,100,34,44,34,118,97,108,117,101,34,58,34,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,34,44,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,118,97,108,117,101,34,58,34,100,116,111,34,44,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,125,44,32,123,34,118,97,108,117,101,34,58,34,116,105,115,109,97,115,34,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,93,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,32,123,32,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,40,41,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,109,101,116,104,111,100,34,44,34,118,97,108,117,101,34,58,34,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,34,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,32,123,32,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,40,32,41,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,109,101,116,104,111,100,34,44,34,118,97,108,117,101,34,58,34,104,101,108,108,111,87,111,114,108,100,85,115,101,67,97,115,101,46,101,120,101,99,117,116,101,34,125,125,125,125,125,125 | @bitloops-auto-generated |
        | 74,101,115,116,84,101,115,116,32,123,32,114,101,115,117,108,116,32,105,115,32,69,114,114,111,114,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,123,34,106,101,115,116,84,101,115,116,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,105,115,73,110,115,116,97,110,99,101,79,102,34,58,91,123,34,118,97,108,117,101,34,58,34,114,101,115,117,108,116,34,44,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,125,44,123,34,99,108,97,115,115,34,58,34,69,114,114,111,114,34,125,93,125,125,125,125,125,125 | @bitloops-auto-generated |
  