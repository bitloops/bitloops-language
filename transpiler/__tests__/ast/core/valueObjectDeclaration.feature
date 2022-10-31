# https://docs.google.com/spreadsheets/d/1q5819bfGh7srR95dX2sBd49OoYZu5D7sQcwAxhEatBQ/edit#gid=0
Feature: Value Object Declaration

        Scenario Template: Value Object declaration is valid
        Given A Valid bounded context <boundedContext>, module <module>, Value Object declaration <blString> string
        When I generate the model
        Then I should get <output>

   # Examples: # @bitloops-auto-generated
       # | boundedContext | module | blString | output | @bitloops-auto-generated |
       # | Hello World | core |  ValueObject NameVO {    constructor(props: string): ( OK ( NameVO ) ,  Errors ( DomainErrors.InvalidName )) {         return regName.test( name );     }         isValidName (name: string): bool { return regName.test( name ); }      isInvalidName (name: string): bool { return regName.test( name ); }    } | {   "Hello World": {     "core": {       "ValueObjects": {         "NameVO": {           "constantVars": [],           "create": {             "parameterDependency": { "value": "props", "type": "string" },             "returnType": { "ok": "NameVO", "errors": ["DomainErrors.InvalidName"] },             "statements": [               {                 "returnOK": {                   "expression": {                     "evaluation": {                       "regularEvaluation": {                         "type": "method",                         "argumentDependencies": [{ "value": "name", "type": "variable" }],                         "value": "regName.test"                       }                     }                   }                 }               }             ]           },           "methods": {             "isValidName": {               "privateMethod": {                 "parameterDependencies": [{ "value": "name", "type": "string" }],                 "returnType": "bool",                 "statements": [                   {                     "return": {                       "expression": {                         "evaluation": {                           "regularEvaluation": {                             "type": "method",                             "argumentDependencies": [{ "value": "name", "type": "variable" }],                             "value": "regName.test"                           }                         }                       }                     }                   }                 ]               }             },             "isInvalidName": {               "privateMethod": {                 "parameterDependencies": [{ "value": "name", "type": "string" }],                 "returnType": "bool",                 "statements": [                   {                     "return": {                       "expression": {                         "evaluation": {                           "regularEvaluation": {                             "type": "method",                             "argumentDependencies": [{ "value": "name", "type": "variable" }],                             "value": "regName.test"                           }                         }                       }                     }                   }                 ]               }             }           }         }       }     }   } }  | @bitloops-auto-generated |
       # | Hello World | core |  ValueObject NameVO {    const nameOrigin: string = "Greece";     constructor(props: string): ( OK ( NameVO ) ,  Errors ( DomainErrors.InvalidName )) {         return regName.test( name );     }         isValidName (name: string): bool { return regName.test( name ); }      isInvalidName (name: string): bool { return regName.test( name ); }    } | {   "Hello World": {     "core": {       "ValueObjects": {         "NameVO": {           "constantVars": [             {               "type": "string",               "expression": {                 "evaluation": { "regularEvaluation": { "type": "string", "value": "Greece" } }               },               "name": "nameOrigin"             }           ],           "create": {             "parameterDependency": { "value": "props", "type": "string" },             "returnType": { "ok": "NameVO", "errors": ["DomainErrors.InvalidName"] },             "statements": [               {                 "returnOK": {                   "expression": {                     "evaluation": {                       "regularEvaluation": {                         "type": "method",                         "argumentDependencies": [{ "value": "name", "type": "variable" }],                         "value": "regName.test"                       }                     }                   }                 }               }             ]           },           "methods": {             "isValidName": {               "privateMethod": {                 "parameterDependencies": [{ "value": "name", "type": "string" }],                 "returnType": "bool",                 "statements": [                   {                     "return": {                       "expression": {                         "evaluation": {                           "regularEvaluation": {                             "type": "method",                             "argumentDependencies": [{ "value": "name", "type": "variable" }],                             "value": "regName.test"                           }                         }                       }                     }                   }                 ]               }             },             "isInvalidName": {               "privateMethod": {                 "parameterDependencies": [{ "value": "name", "type": "string" }],                 "returnType": "bool",                 "statements": [                   {                     "return": {                       "expression": {                         "evaluation": {                           "regularEvaluation": {                             "type": "method",                             "argumentDependencies": [{ "value": "name", "type": "variable" }],                             "value": "regName.test"                           }                         }                       }                     }                   }                 ]               }             }           }         }       }     }   } }  | @bitloops-auto-generated |
       # | Hello World | core | ValueObject TitleVO {   constructor(props: TitleProps): ( OK ( TitleVO ), Errors ( DomainErrors.InvalidTitleError )) {     applyRules(InvalidTitleRule(props.title));   } } | {"Hello World":{"core":{"ValueObjects":{"TitleVO":{"constantVars":[],"create":{"returnType":{"ok":"TitleVO","errors":["DomainErrors.InvalidTitleError"]},"statements":[{"buildInFunction":{"applyRules":[{"name":"InvalidTitleRule","arguments":[{"type":"variable","value":"props.title"}]}]}}],"parameterDependency":{"value":"props","type":"TitleProps"}},"methods":{}}}}}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | boundedContext | module | blString | output | @bitloops-auto-generated |
        | 72,101,108,108,111,32,87,111,114,108,100 | 99,111,114,101 | 32,86,97,108,117,101,79,98,106,101,99,116,32,78,97,109,101,86,79,32,123,10,32,32,32,99,111,110,115,116,114,117,99,116,111,114,40,112,114,111,112,115,58,32,115,116,114,105,110,103,41,58,32,40,32,79,75,32,40,32,78,97,109,101,86,79,32,41,32,44,32,32,69,114,114,111,114,115,32,40,32,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,78,97,109,101,32,41,41,32,123,10,32,32,32,32,32,32,32,32,114,101,116,117,114,110,32,114,101,103,78,97,109,101,46,116,101,115,116,40,32,110,97,109,101,32,41,59,10,32,32,32,32,125,10,32,32,32,10,32,32,32,32,105,115,86,97,108,105,100,78,97,109,101,32,40,110,97,109,101,58,32,115,116,114,105,110,103,41,58,32,98,111,111,108,32,123,32,114,101,116,117,114,110,32,114,101,103,78,97,109,101,46,116,101,115,116,40,32,110,97,109,101,32,41,59,32,125,10,10,32,32,32,32,105,115,73,110,118,97,108,105,100,78,97,109,101,32,40,110,97,109,101,58,32,115,116,114,105,110,103,41,58,32,98,111,111,108,32,123,32,114,101,116,117,114,110,32,114,101,103,78,97,109,101,46,116,101,115,116,40,32,110,97,109,101,32,41,59,32,125,10,10,32,32,125 | 123,10,32,32,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,10,32,32,32,32,34,99,111,114,101,34,58,32,123,10,32,32,32,32,32,32,34,86,97,108,117,101,79,98,106,101,99,116,115,34,58,32,123,10,32,32,32,32,32,32,32,32,34,78,97,109,101,86,79,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,99,111,110,115,116,97,110,116,86,97,114,115,34,58,32,91,93,44,10,32,32,32,32,32,32,32,32,32,32,34,99,114,101,97,116,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,121,34,58,32,123,32,34,118,97,108,117,101,34,58,32,34,112,114,111,112,115,34,44,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,123,32,34,111,107,34,58,32,34,78,97,109,101,86,79,34,44,32,34,101,114,114,111,114,115,34,58,32,91,34,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,78,97,109,101,34,93,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,79,75,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,109,101,116,104,111,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,123,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,114,101,103,78,97,109,101,46,116,101,115,116,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,34,109,101,116,104,111,100,115,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,105,115,86,97,108,105,100,78,97,109,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,114,105,118,97,116,101,77,101,116,104,111,100,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,123,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,34,98,111,111,108,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,109,101,116,104,111,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,123,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,114,101,103,78,97,109,101,46,116,101,115,116,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,105,115,73,110,118,97,108,105,100,78,97,109,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,114,105,118,97,116,101,77,101,116,104,111,100,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,123,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,34,98,111,111,108,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,109,101,116,104,111,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,123,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,114,101,103,78,97,109,101,46,116,101,115,116,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,10,125,10 | @bitloops-auto-generated |
        | 72,101,108,108,111,32,87,111,114,108,100 | 99,111,114,101 | 32,86,97,108,117,101,79,98,106,101,99,116,32,78,97,109,101,86,79,32,123,10,32,32,32,99,111,110,115,116,32,110,97,109,101,79,114,105,103,105,110,58,32,115,116,114,105,110,103,32,61,32,34,71,114,101,101,99,101,34,59,10,10,32,32,32,99,111,110,115,116,114,117,99,116,111,114,40,112,114,111,112,115,58,32,115,116,114,105,110,103,41,58,32,40,32,79,75,32,40,32,78,97,109,101,86,79,32,41,32,44,32,32,69,114,114,111,114,115,32,40,32,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,78,97,109,101,32,41,41,32,123,10,32,32,32,32,32,32,32,32,114,101,116,117,114,110,32,114,101,103,78,97,109,101,46,116,101,115,116,40,32,110,97,109,101,32,41,59,10,32,32,32,32,125,10,32,32,32,10,32,32,32,32,105,115,86,97,108,105,100,78,97,109,101,32,40,110,97,109,101,58,32,115,116,114,105,110,103,41,58,32,98,111,111,108,32,123,32,114,101,116,117,114,110,32,114,101,103,78,97,109,101,46,116,101,115,116,40,32,110,97,109,101,32,41,59,32,125,10,10,32,32,32,32,105,115,73,110,118,97,108,105,100,78,97,109,101,32,40,110,97,109,101,58,32,115,116,114,105,110,103,41,58,32,98,111,111,108,32,123,32,114,101,116,117,114,110,32,114,101,103,78,97,109,101,46,116,101,115,116,40,32,110,97,109,101,32,41,59,32,125,10,10,32,32,125 | 123,10,32,32,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,10,32,32,32,32,34,99,111,114,101,34,58,32,123,10,32,32,32,32,32,32,34,86,97,108,117,101,79,98,106,101,99,116,115,34,58,32,123,10,32,32,32,32,32,32,32,32,34,78,97,109,101,86,79,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,99,111,110,115,116,97,110,116,86,97,114,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,32,34,118,97,108,117,101,34,58,32,34,71,114,101,101,99,101,34,32,125,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,110,97,109,101,79,114,105,103,105,110,34,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,32,32,34,99,114,101,97,116,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,121,34,58,32,123,32,34,118,97,108,117,101,34,58,32,34,112,114,111,112,115,34,44,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,123,32,34,111,107,34,58,32,34,78,97,109,101,86,79,34,44,32,34,101,114,114,111,114,115,34,58,32,91,34,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,78,97,109,101,34,93,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,79,75,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,109,101,116,104,111,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,123,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,114,101,103,78,97,109,101,46,116,101,115,116,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,34,109,101,116,104,111,100,115,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,105,115,86,97,108,105,100,78,97,109,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,114,105,118,97,116,101,77,101,116,104,111,100,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,123,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,34,98,111,111,108,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,109,101,116,104,111,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,123,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,114,101,103,78,97,109,101,46,116,101,115,116,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,105,115,73,110,118,97,108,105,100,78,97,109,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,114,105,118,97,116,101,77,101,116,104,111,100,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,123,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,34,98,111,111,108,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,109,101,116,104,111,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,123,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,114,101,103,78,97,109,101,46,116,101,115,116,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,10,125,10 | @bitloops-auto-generated |
        | 72,101,108,108,111,32,87,111,114,108,100 | 99,111,114,101 | 86,97,108,117,101,79,98,106,101,99,116,32,84,105,116,108,101,86,79,32,123,10,32,32,99,111,110,115,116,114,117,99,116,111,114,40,112,114,111,112,115,58,32,84,105,116,108,101,80,114,111,112,115,41,58,32,40,32,79,75,32,40,32,84,105,116,108,101,86,79,32,41,44,32,69,114,114,111,114,115,32,40,32,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,32,41,41,32,123,10,32,32,32,32,97,112,112,108,121,82,117,108,101,115,40,73,110,118,97,108,105,100,84,105,116,108,101,82,117,108,101,40,112,114,111,112,115,46,116,105,116,108,101,41,41,59,10,32,32,125,10,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,123,34,99,111,114,101,34,58,123,34,86,97,108,117,101,79,98,106,101,99,116,115,34,58,123,34,84,105,116,108,101,86,79,34,58,123,34,99,111,110,115,116,97,110,116,86,97,114,115,34,58,91,93,44,34,99,114,101,97,116,101,34,58,123,34,114,101,116,117,114,110,84,121,112,101,34,58,123,34,111,107,34,58,34,84,105,116,108,101,86,79,34,44,34,101,114,114,111,114,115,34,58,91,34,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,34,93,125,44,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,98,117,105,108,100,73,110,70,117,110,99,116,105,111,110,34,58,123,34,97,112,112,108,121,82,117,108,101,115,34,58,91,123,34,110,97,109,101,34,58,34,73,110,118,97,108,105,100,84,105,116,108,101,82,117,108,101,34,44,34,97,114,103,117,109,101,110,116,115,34,58,91,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,112,114,111,112,115,46,116,105,116,108,101,34,125,93,125,93,125,125,93,44,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,121,34,58,123,34,118,97,108,117,101,34,58,34,112,114,111,112,115,34,44,34,116,121,112,101,34,58,34,84,105,116,108,101,80,114,111,112,115,34,125,125,44,34,109,101,116,104,111,100,115,34,58,123,125,125,125,125,125,125 | @bitloops-auto-generated |
  