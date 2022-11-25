# https://docs.google.com/spreadsheets/d/1fa_9yjz705OMfmgX6uBbVbdOsQfQ5Wap_oeGh-wlzxM/edit#gid=0
Feature: GraphQL Server Declaration

        Scenario Template: Valid Server Declaration
        Given A valid Server Declaration <blString> string
        When I generate the model
        Then I should get <output>

   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | GraphQLServer({   port: env.APOLLO_SERVER OR 5001, }) {   [Demo][Hello World]HelloWorldController(); } | {   "setup": {     "servers": {       "GraphQL": {         "serverInstances": [           {             "port": {               "expression": {                 "logicalExpression": {                   "orExpression": {                     "left": {                       "expression": {                         "envVariable": {                           "value": "env.APOLLO_SERVER"                         }                       }                     },                     "right": {                       "expression": {                         "literal": {                           "type": "number",                           "value": "5001"                         }                       }                     }                   }                 }               }             },             "resolvers": [               {                 "boundedContext": "Demo",                 "module": "Hello World",                 "controllerClassName": "HelloWorldController",                 "dependencies": []               }             ]           }         ]       }     }   },   "controllers": {     "Demo": {       "Hello World": {         "HelloWorldController": {           "type": "graphql",           "instances": [             {               "controllerInstance": "helloWorldController",               "dependencies": []             }           ]         }       }     }   } } | @bitloops-auto-generated |
       # | GraphQLServer({   port: env.APOLLO_SERVER OR 5001, }) {   [Demo][Hello World]HelloWorldController();   [Demo][Bye World]HelloWorld2Controller(); } | {   "setup": {     "servers": {       "GraphQL": {         "serverInstances": [           {             "port": {               "expression": {                 "logicalExpression": {                   "orExpression": {                     "left": {                       "expression": {                         "envVariable": {                           "value": "env.APOLLO_SERVER"                         }                       }                     },                     "right": {                       "expression": {                         "literal": {                           "type": "number",                           "value": "5001"                         }                       }                     }                   }                 }               }             },             "resolvers": [               {                 "boundedContext": "Demo",                 "module": "Hello World",                 "controllerClassName": "HelloWorldController",                 "dependencies": []               },               {                 "boundedContext": "Demo",                 "module": "Bye World",                 "controllerClassName": "HelloWorld2Controller",                 "dependencies": []               }             ]           }         ]       }     }   },   "controllers": {     "Demo": {       "Hello World": {         "HelloWorldController": {           "type": "graphql",           "instances": [             {               "controllerInstance": "helloWorldController",               "dependencies": []             }           ]         }       },       "Bye World": {         "HelloWorld2Controller": {           "type": "graphql",           "instances": [             {               "controllerInstance": "helloWorld2Controller",               "dependencies": []             }           ]         }       }     }   } } | @bitloops-auto-generated |
       # | GraphQLServer({   port: env.APOLLO_SERVER OR 5001, }) {   [Demo][Hello World]HelloWorldController(useCase1Dependency);   [Demo][Bye World]HelloWorld2Controller(useCase2Dependency, usersRepo); } | {   "setup": {     "servers": {       "GraphQL": {         "serverInstances": [           {             "port": {               "expression": {                 "logicalExpression": {                   "orExpression": {                     "left": {                       "expression": {                         "envVariable": {                           "value": "env.APOLLO_SERVER"                         }                       }                     },                     "right": {                       "expression": {                         "literal": {                           "type": "number",                           "value": "5001"                         }                       }                     }                   }                 }               }             },             "resolvers": [               {                 "boundedContext": "Demo",                 "module": "Hello World",                 "controllerClassName": "HelloWorldController",                 "dependencies": [                   "useCase1Dependency"                 ]               },               {                 "boundedContext": "Demo",                 "module": "Bye World",                 "controllerClassName": "HelloWorld2Controller",                 "dependencies": [                   "useCase2Dependency",                   "usersRepo"                 ]               }             ]           }         ]       }     }   },   "controllers": {     "Demo": {       "Hello World": {         "HelloWorldController": {           "type": "graphql",           "instances": [             {               "controllerInstance": "helloWorldController",               "dependencies": [                 "useCase1Dependency"               ]             }           ]         }       },       "Bye World": {         "HelloWorld2Controller": {           "type": "graphql",           "instances": [             {               "controllerInstance": "helloWorld2Controller",               "dependencies": [                 "useCase2Dependency",                 "usersRepo"               ]             }           ]         }       }     }   } } | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 71,114,97,112,104,81,76,83,101,114,118,101,114,40,123,10,32,32,112,111,114,116,58,32,101,110,118,46,65,80,79,76,76,79,95,83,69,82,86,69,82,32,79,82,32,53,48,48,49,44,10,125,41,32,123,10,32,32,91,68,101,109,111,93,91,72,101,108,108,111,32,87,111,114,108,100,93,72,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,40,41,59,10,125 | 123,10,32,32,34,115,101,116,117,112,34,58,32,123,10,32,32,32,32,34,115,101,114,118,101,114,115,34,58,32,123,10,32,32,32,32,32,32,34,71,114,97,112,104,81,76,34,58,32,123,10,32,32,32,32,32,32,32,32,34,115,101,114,118,101,114,73,110,115,116,97,110,99,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,112,111,114,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,111,114,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,101,102,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,110,118,86,97,114,105,97,98,108,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,101,110,118,46,65,80,79,76,76,79,95,83,69,82,86,69,82,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,105,103,104,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,105,116,101,114,97,108,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,110,117,109,98,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,53,48,48,49,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,115,111,108,118,101,114,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,98,111,117,110,100,101,100,67,111,110,116,101,120,116,34,58,32,34,68,101,109,111,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,109,111,100,117,108,101,34,58,32,34,72,101,108,108,111,32,87,111,114,108,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,116,114,111,108,108,101,114,67,108,97,115,115,78,97,109,101,34,58,32,34,72,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,44,10,32,32,34,99,111,110,116,114,111,108,108,101,114,115,34,58,32,123,10,32,32,32,32,34,68,101,109,111,34,58,32,123,10,32,32,32,32,32,32,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,10,32,32,32,32,32,32,32,32,34,72,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,103,114,97,112,104,113,108,34,44,10,32,32,32,32,32,32,32,32,32,32,34,105,110,115,116,97,110,99,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,116,114,111,108,108,101,114,73,110,115,116,97,110,99,101,34,58,32,34,104,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,93,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,10,125 | @bitloops-auto-generated |
        | 71,114,97,112,104,81,76,83,101,114,118,101,114,40,123,10,32,32,112,111,114,116,58,32,101,110,118,46,65,80,79,76,76,79,95,83,69,82,86,69,82,32,79,82,32,53,48,48,49,44,10,125,41,32,123,10,32,32,91,68,101,109,111,93,91,72,101,108,108,111,32,87,111,114,108,100,93,72,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,40,41,59,10,32,32,91,68,101,109,111,93,91,66,121,101,32,87,111,114,108,100,93,72,101,108,108,111,87,111,114,108,100,50,67,111,110,116,114,111,108,108,101,114,40,41,59,10,125 | 123,10,32,32,34,115,101,116,117,112,34,58,32,123,10,32,32,32,32,34,115,101,114,118,101,114,115,34,58,32,123,10,32,32,32,32,32,32,34,71,114,97,112,104,81,76,34,58,32,123,10,32,32,32,32,32,32,32,32,34,115,101,114,118,101,114,73,110,115,116,97,110,99,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,112,111,114,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,111,114,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,101,102,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,110,118,86,97,114,105,97,98,108,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,101,110,118,46,65,80,79,76,76,79,95,83,69,82,86,69,82,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,105,103,104,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,105,116,101,114,97,108,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,110,117,109,98,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,53,48,48,49,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,115,111,108,118,101,114,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,98,111,117,110,100,101,100,67,111,110,116,101,120,116,34,58,32,34,68,101,109,111,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,109,111,100,117,108,101,34,58,32,34,72,101,108,108,111,32,87,111,114,108,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,116,114,111,108,108,101,114,67,108,97,115,115,78,97,109,101,34,58,32,34,72,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,98,111,117,110,100,101,100,67,111,110,116,101,120,116,34,58,32,34,68,101,109,111,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,109,111,100,117,108,101,34,58,32,34,66,121,101,32,87,111,114,108,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,116,114,111,108,108,101,114,67,108,97,115,115,78,97,109,101,34,58,32,34,72,101,108,108,111,87,111,114,108,100,50,67,111,110,116,114,111,108,108,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,44,10,32,32,34,99,111,110,116,114,111,108,108,101,114,115,34,58,32,123,10,32,32,32,32,34,68,101,109,111,34,58,32,123,10,32,32,32,32,32,32,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,10,32,32,32,32,32,32,32,32,34,72,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,103,114,97,112,104,113,108,34,44,10,32,32,32,32,32,32,32,32,32,32,34,105,110,115,116,97,110,99,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,116,114,111,108,108,101,114,73,110,115,116,97,110,99,101,34,58,32,34,104,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,93,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,34,66,121,101,32,87,111,114,108,100,34,58,32,123,10,32,32,32,32,32,32,32,32,34,72,101,108,108,111,87,111,114,108,100,50,67,111,110,116,114,111,108,108,101,114,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,103,114,97,112,104,113,108,34,44,10,32,32,32,32,32,32,32,32,32,32,34,105,110,115,116,97,110,99,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,116,114,111,108,108,101,114,73,110,115,116,97,110,99,101,34,58,32,34,104,101,108,108,111,87,111,114,108,100,50,67,111,110,116,114,111,108,108,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,93,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,10,125 | @bitloops-auto-generated |
        | 71,114,97,112,104,81,76,83,101,114,118,101,114,40,123,10,32,32,112,111,114,116,58,32,101,110,118,46,65,80,79,76,76,79,95,83,69,82,86,69,82,32,79,82,32,53,48,48,49,44,10,125,41,32,123,10,32,32,91,68,101,109,111,93,91,72,101,108,108,111,32,87,111,114,108,100,93,72,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,40,117,115,101,67,97,115,101,49,68,101,112,101,110,100,101,110,99,121,41,59,10,32,32,91,68,101,109,111,93,91,66,121,101,32,87,111,114,108,100,93,72,101,108,108,111,87,111,114,108,100,50,67,111,110,116,114,111,108,108,101,114,40,117,115,101,67,97,115,101,50,68,101,112,101,110,100,101,110,99,121,44,32,117,115,101,114,115,82,101,112,111,41,59,10,125 | 123,10,32,32,34,115,101,116,117,112,34,58,32,123,10,32,32,32,32,34,115,101,114,118,101,114,115,34,58,32,123,10,32,32,32,32,32,32,34,71,114,97,112,104,81,76,34,58,32,123,10,32,32,32,32,32,32,32,32,34,115,101,114,118,101,114,73,110,115,116,97,110,99,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,112,111,114,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,111,114,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,101,102,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,110,118,86,97,114,105,97,98,108,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,101,110,118,46,65,80,79,76,76,79,95,83,69,82,86,69,82,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,105,103,104,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,108,105,116,101,114,97,108,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,110,117,109,98,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,53,48,48,49,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,115,111,108,118,101,114,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,98,111,117,110,100,101,100,67,111,110,116,101,120,116,34,58,32,34,68,101,109,111,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,109,111,100,117,108,101,34,58,32,34,72,101,108,108,111,32,87,111,114,108,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,116,114,111,108,108,101,114,67,108,97,115,115,78,97,109,101,34,58,32,34,72,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,117,115,101,67,97,115,101,49,68,101,112,101,110,100,101,110,99,121,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,98,111,117,110,100,101,100,67,111,110,116,101,120,116,34,58,32,34,68,101,109,111,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,109,111,100,117,108,101,34,58,32,34,66,121,101,32,87,111,114,108,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,116,114,111,108,108,101,114,67,108,97,115,115,78,97,109,101,34,58,32,34,72,101,108,108,111,87,111,114,108,100,50,67,111,110,116,114,111,108,108,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,117,115,101,67,97,115,101,50,68,101,112,101,110,100,101,110,99,121,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,117,115,101,114,115,82,101,112,111,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,44,10,32,32,34,99,111,110,116,114,111,108,108,101,114,115,34,58,32,123,10,32,32,32,32,34,68,101,109,111,34,58,32,123,10,32,32,32,32,32,32,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,10,32,32,32,32,32,32,32,32,34,72,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,103,114,97,112,104,113,108,34,44,10,32,32,32,32,32,32,32,32,32,32,34,105,110,115,116,97,110,99,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,116,114,111,108,108,101,114,73,110,115,116,97,110,99,101,34,58,32,34,104,101,108,108,111,87,111,114,108,100,67,111,110,116,114,111,108,108,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,117,115,101,67,97,115,101,49,68,101,112,101,110,100,101,110,99,121,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,34,66,121,101,32,87,111,114,108,100,34,58,32,123,10,32,32,32,32,32,32,32,32,34,72,101,108,108,111,87,111,114,108,100,50,67,111,110,116,114,111,108,108,101,114,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,103,114,97,112,104,113,108,34,44,10,32,32,32,32,32,32,32,32,32,32,34,105,110,115,116,97,110,99,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,116,114,111,108,108,101,114,73,110,115,116,97,110,99,101,34,58,32,34,104,101,108,108,111,87,111,114,108,100,50,67,111,110,116,114,111,108,108,101,114,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,117,115,101,67,97,115,101,50,68,101,112,101,110,100,101,110,99,121,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,117,115,101,114,115,82,101,112,111,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,10,125 | @bitloops-auto-generated |
  
# Scenario Template: Multiple Valid Server Declarations
# Given Valid Server Declarations <blString> string
# When I generate the model
# Then I should get <output>
