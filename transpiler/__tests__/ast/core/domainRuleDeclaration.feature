# https://docs.google.com/spreadsheets/d/1U-4zp0Z3_4OupsmV3w6pXfxo1xqmVzCbLZaSZlI2H6w/edit#gid=0

Feature: Rule Declaration

    Scenario Template: Rule declaration is valid
    Given Valid bounded context <boundedContext>, module <module>, rule <blString> strings
    When I generate the model
    Then I should get <output>
    
   # Examples: # @bitloops-auto-generated
       # | boundedContext | module | blString | output | @bitloops-auto-generated |
       # | Hello World | core | Rule IsValidTitle(title: string) throws DomainErrors.InvalidTitleError {   isBrokenIf ((title.length > 150) OR (title.length < 4)); } | {   "Hello World": {     "core": {       "Rules": {         "IsValidTitle": {           "parameters": [{ "type": "string", "value": "title" }],           "error": "DomainErrors.InvalidTitleError",           "statements": [],           "isBrokenIfCondition": {             "condition": {               "expression": {                 "logicalExpression": {                   "orExpression": {                     "left": {                       "parenthesizedExpression": {                         "relationalExpression": {                           "left": {                             "evaluation": {                               "regularEvaluation": {                                 "type": "variable",                                 "value": "title.length"                               }                             }                           },                           "right": {                             "evaluation": {                               "regularEvaluation": {                                 "type": "int32",                                 "value": "150"                               }                             }                           },                           "operator": ">"                         }                       }                     },                     "right": {                       "parenthesizedExpression": {                         "relationalExpression": {                           "left": {                             "evaluation": {                               "regularEvaluation": {                                 "type": "variable",                                 "value": "title.length"                               }                             }                           },                           "right": {                             "evaluation": {                               "regularEvaluation": {                                 "type": "int32",                                 "value": "4"                               }                             }                           },                           "operator": "<"                         }                       }                     }                   }                 }               }             }           }         }       }     }   } }  | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | boundedContext | module | blString | output | @bitloops-auto-generated |
        | 72,101,108,108,111,32,87,111,114,108,100 | 99,111,114,101 | 82,117,108,101,32,73,115,86,97,108,105,100,84,105,116,108,101,40,116,105,116,108,101,58,32,115,116,114,105,110,103,41,32,116,104,114,111,119,115,32,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,32,123,10,32,32,105,115,66,114,111,107,101,110,73,102,32,40,40,116,105,116,108,101,46,108,101,110,103,116,104,32,62,32,49,53,48,41,32,79,82,32,40,116,105,116,108,101,46,108,101,110,103,116,104,32,60,32,52,41,41,59,10,125 | 123,10,32,32,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,10,32,32,32,32,34,99,111,114,101,34,58,32,123,10,32,32,32,32,32,32,34,82,117,108,101,115,34,58,32,123,10,32,32,32,32,32,32,32,32,34,73,115,86,97,108,105,100,84,105,116,108,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,115,34,58,32,91,123,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,32,34,118,97,108,117,101,34,58,32,34,116,105,116,108,101,34,32,125,93,44,10,32,32,32,32,32,32,32,32,32,32,34,101,114,114,111,114,34,58,32,34,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,34,44,10,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,93,44,10,32,32,32,32,32,32,32,32,32,32,34,105,115,66,114,111,107,101,110,73,102,67,111,110,100,105,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,100,105,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,111,114,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,101,102,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,97,114,101,110,116,104,101,115,105,122,101,100,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,108,97,116,105,111,110,97,108,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,101,102,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,116,105,116,108,101,46,108,101,110,103,116,104,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,105,103,104,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,105,110,116,51,50,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,49,53,48,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,111,112,101,114,97,116,111,114,34,58,32,34,62,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,105,103,104,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,97,114,101,110,116,104,101,115,105,122,101,100,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,108,97,116,105,111,110,97,108,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,101,102,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,116,105,116,108,101,46,108,101,110,103,116,104,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,105,103,104,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,105,110,116,51,50,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,52,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,111,112,101,114,97,116,111,114,34,58,32,34,60,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,10,125,10 | @bitloops-auto-generated |
  