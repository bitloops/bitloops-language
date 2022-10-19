# https://docs.google.com/spreadsheets/d/17ns1aRDYzJaPh7Pe6ni_eEG_V2TxZ2RI2kd1YSI6xVk/edit#gid=0

Feature: Entity Declaration

        Scenario Template: Entity declaration is valid
        Given A Valid bounded context <boundedContext>, module <module>, Entity declaration <blString> string
        When I generate the model
        Then I should get <output>

   # Examples: # @bitloops-auto-generated
       # | boundedContext | module | blString | output | @bitloops-auto-generated |
       # | Hello World | core |  Entity TodoEntity {    constructor(props: TodoProps): ( OK ( TodoEntity ), Errors ( DomainErrors.InvalidTitleError ) )  {       const id = 7;   }  complete (  ): ( OK( TodoEntity ), Errors( )) {     return  'hey';   }   uncomplete ( ): ( OK( void ), Errors( )) {     this.completed = false;   }   isValidName (name: string): bool { return true }    } | {"Hello World":   {"core":   {"Entities": {     "TodoEntity": {         "create":{           "parameterDependency":[{"type": "TodoProps", "value": "props"}],           "returnType":{"ok":"TodoEntity","errors":["DomainErrors.InvalidTitleError"]},           "statements":[{"constDeclaration":{"name":"id","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"7"}}}}}]},         "methods" : {           "isValidName" :{           "privateMethod":{"parameterDependencies":[{"type": "string", "value": "name"}],           "returnType":"bool",           "statements":[{"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}}}}]             }}, "complete" :{           "publicMethod":{"parameterDependencies":[],           "returnType":{"ok":"TodoEntity","errors":[]},           "statements":[{"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"hey"}}}}}]             }         }     } } }}}} | @bitloops-auto-generated |
       # | Hello World | core |  Entity TodoEntity {    constructor(props: TodoProps): ( OK ( TodoEntity ), Errors ( DomainErrors.InvalidTitleError ) )  {       const id = 7;   } public greet (  ): ( OK( TodoEntity ), Errors( )) {     return  'hey';   }     isValidName (name: string): bool { return true }          } | {"Hello World":   {"core":   {"Entities": {     "TodoEntity": {         "create":{           "parameterDependency":[{"type": "TodoProps", "value": "props"}],           "returnType":{"ok":"TodoEntity","errors":["DomainErrors.InvalidTitleError"]},           "statements":[{"constDeclaration":{"name":"id","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"7"}}}}}]},         "methods" : {           "isValidName" :{           "privateMethod":{"parameterDependencies":[{"type": "string", "value": "name"}],           "returnType":"bool",           "statements":[{"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}}}}]             }}, "greet" :{           "publicMethod":{"parameterDependencies":[],           "returnType":{"ok":"TodoEntity","errors":[]},           "statements":[{"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"hey"}}}}}]             }         }     } } }}}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | boundedContext | module | blString | output | @bitloops-auto-generated |
        | 72,101,108,108,111,32,87,111,114,108,100 | 99,111,114,101 | 32,69,110,116,105,116,121,32,84,111,100,111,69,110,116,105,116,121,32,123,10,10,32,32,99,111,110,115,116,114,117,99,116,111,114,40,112,114,111,112,115,58,32,84,111,100,111,80,114,111,112,115,41,58,32,40,32,79,75,32,40,32,84,111,100,111,69,110,116,105,116,121,32,41,44,32,69,114,114,111,114,115,32,40,32,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,32,41,32,41,32,32,123,10,32,32,32,32,32,32,99,111,110,115,116,32,105,100,32,61,32,55,59,10,32,32,125,10,10,99,111,109,112,108,101,116,101,32,40,32,32,41,58,32,40,32,79,75,40,32,84,111,100,111,69,110,116,105,116,121,32,41,44,32,69,114,114,111,114,115,40,32,41,41,32,123,10,32,32,32,32,114,101,116,117,114,110,32,32,39,104,101,121,39,59,10,32,32,125,32,32,10,117,110,99,111,109,112,108,101,116,101,32,40,32,41,58,32,40,32,79,75,40,32,118,111,105,100,32,41,44,32,69,114,114,111,114,115,40,32,41,41,32,123,10,32,32,32,32,116,104,105,115,46,99,111,109,112,108,101,116,101,100,32,61,32,102,97,108,115,101,59,10,32,32,125,10,10,32,105,115,86,97,108,105,100,78,97,109,101,32,40,110,97,109,101,58,32,115,116,114,105,110,103,41,58,32,98,111,111,108,32,123,32,114,101,116,117,114,110,32,116,114,117,101,32,125,10,10,32,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,10,32,32,123,34,99,111,114,101,34,58,10,32,32,123,34,69,110,116,105,116,105,101,115,34,58,32,123,10,32,32,32,32,34,84,111,100,111,69,110,116,105,116,121,34,58,32,123,10,32,32,32,32,32,32,32,32,34,99,114,101,97,116,101,34,58,123,10,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,121,34,58,91,123,34,116,121,112,101,34,58,32,34,84,111,100,111,80,114,111,112,115,34,44,32,34,118,97,108,117,101,34,58,32,34,112,114,111,112,115,34,125,93,44,10,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,123,34,111,107,34,58,34,84,111,100,111,69,110,116,105,116,121,34,44,34,101,114,114,111,114,115,34,58,91,34,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,34,93,125,44,10,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,105,100,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,55,34,125,125,125,125,125,93,125,44,10,32,32,32,32,32,32,32,32,34,109,101,116,104,111,100,115,34,32,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,105,115,86,97,108,105,100,78,97,109,101,34,32,58,123,10,32,32,32,32,32,32,32,32,32,32,34,112,114,105,118,97,116,101,77,101,116,104,111,100,34,58,123,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,125,93,44,10,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,34,98,111,111,108,34,44,10,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,114,101,116,117,114,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,116,114,117,101,34,125,125,125,125,125,93,10,32,32,32,32,32,32,32,32,32,32,32,32,125,125,44,32,34,99,111,109,112,108,101,116,101,34,32,58,123,10,32,32,32,32,32,32,32,32,32,32,34,112,117,98,108,105,99,77,101,116,104,111,100,34,58,123,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,93,44,10,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,123,34,111,107,34,58,34,84,111,100,111,69,110,116,105,116,121,34,44,34,101,114,114,111,114,115,34,58,91,93,125,44,10,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,114,101,116,117,114,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,104,101,121,34,125,125,125,125,125,93,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,125,10,125,10,125,125,125,125 | @bitloops-auto-generated |
        | 72,101,108,108,111,32,87,111,114,108,100 | 99,111,114,101 | 32,69,110,116,105,116,121,32,84,111,100,111,69,110,116,105,116,121,32,123,10,10,32,32,99,111,110,115,116,114,117,99,116,111,114,40,112,114,111,112,115,58,32,84,111,100,111,80,114,111,112,115,41,58,32,40,32,79,75,32,40,32,84,111,100,111,69,110,116,105,116,121,32,41,44,32,69,114,114,111,114,115,32,40,32,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,32,41,32,41,32,32,123,10,32,32,32,32,32,32,99,111,110,115,116,32,105,100,32,61,32,55,59,10,32,32,125,10,112,117,98,108,105,99,32,103,114,101,101,116,32,40,32,32,41,58,32,40,32,79,75,40,32,84,111,100,111,69,110,116,105,116,121,32,41,44,32,69,114,114,111,114,115,40,32,41,41,32,123,10,32,32,32,32,114,101,116,117,114,110,32,32,39,104,101,121,39,59,10,32,32,125,32,32,10,10,32,105,115,86,97,108,105,100,78,97,109,101,32,40,110,97,109,101,58,32,115,116,114,105,110,103,41,58,32,98,111,111,108,32,123,32,114,101,116,117,114,110,32,116,114,117,101,32,125,10,10,32,32,32,10,10,10,32,32,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,10,32,32,123,34,99,111,114,101,34,58,10,32,32,123,34,69,110,116,105,116,105,101,115,34,58,32,123,10,32,32,32,32,34,84,111,100,111,69,110,116,105,116,121,34,58,32,123,10,32,32,32,32,32,32,32,32,34,99,114,101,97,116,101,34,58,123,10,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,121,34,58,91,123,34,116,121,112,101,34,58,32,34,84,111,100,111,80,114,111,112,115,34,44,32,34,118,97,108,117,101,34,58,32,34,112,114,111,112,115,34,125,93,44,10,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,123,34,111,107,34,58,34,84,111,100,111,69,110,116,105,116,121,34,44,34,101,114,114,111,114,115,34,58,91,34,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,34,93,125,44,10,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,105,100,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,55,34,125,125,125,125,125,93,125,44,10,32,32,32,32,32,32,32,32,34,109,101,116,104,111,100,115,34,32,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,105,115,86,97,108,105,100,78,97,109,101,34,32,58,123,10,32,32,32,32,32,32,32,32,32,32,34,112,114,105,118,97,116,101,77,101,116,104,111,100,34,58,123,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,125,93,44,10,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,34,98,111,111,108,34,44,10,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,114,101,116,117,114,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,116,114,117,101,34,125,125,125,125,125,93,10,32,32,32,32,32,32,32,32,32,32,32,32,125,125,44,32,34,103,114,101,101,116,34,32,58,123,10,32,32,32,32,32,32,32,32,32,32,34,112,117,98,108,105,99,77,101,116,104,111,100,34,58,123,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,93,44,10,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,123,34,111,107,34,58,34,84,111,100,111,69,110,116,105,116,121,34,44,34,101,114,114,111,114,115,34,58,91,93,125,44,10,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,114,101,116,117,114,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,104,101,121,34,125,125,125,125,125,93,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,125,10,125,10,125,125,125,125 | @bitloops-auto-generated |
  