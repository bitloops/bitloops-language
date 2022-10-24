# https://docs.google.com/spreadsheets/d/1y02SI9OQKiZwWhEn-1VWH9HoTOlnFI5kRKNL_NYLAWs/edit#gid=0
Feature: ValueObjects to Typescript target language

    Background:
        Given language is "TypeScript"

        Scenario Template: Value Object success to Typescript
        Given I have some value objects <value-objects> and props <value-object-props>
        When I generate the code
        Then I should see the output VOs <output> and outputProps <outputProps>

   # Examples: # @bitloops-auto-generated
       # | value-objects | value-object-props | output | outputProps | @bitloops-auto-generated |
       # | {   "NameVO": {     "constantVars": [       {         "type": "string",         "value": "'Kostas'",         "name": "vName"       }     ],     "methods": {       "isInvalidName": {         "privateMethod": {           "parameterDependencies": [             {               "value": "name",               "type": "string"             }           ],           "returnType": "bool",           "statements": [             {               "return": {                 "expression": {                   "evaluation": {                     "regularEvaluation": {                       "type": "method",                       "argumentDependencies": [                         {                           "value": "name",                           "type": "variable"                         }                       ],                       "value": "regName.test"                     }                   }                 }               }             }           ]         }       }     },     "create": {       "parameterDependency": {         "value": "props",         "type": "NameProps"       },       "returnType": {         "ok": "NameVO",         "errors": [           "DomainErrors.InvalidName"         ]       },       "statements": [         {           "ifStatement": {             "condition": {               "expression": {                 "evaluation": {                   "regularEvaluation": {                     "type": "method",                     "value": "isInvalidName",                     "argumentDependencies": [                       {                         "value": "props.name",                         "type": "variable"                       }                     ]                   }                 }               }             },             "elseStatements": [               {                 "returnOK": {                   "expression": {                     "classInstantiation": {                       "className": "NameVO",                       "argumentDependencies": [                         {                           "value": "props",                           "type": "variable"                         }                       ]                     }                   }                 }               }             ],             "thenStatements": [               {                 "returnError": {                   "expression": {                     "classInstantiation": {                       "className": "HelloWorldDomainErrors.InvalidName",                       "argumentDependencies": [                         {                           "value": "props.name",                           "type": "variable"                         }                       ]                     }                   }                 }               }             ]           }         }       ]     }   } } | {     "NameProps": {       "variables": [         {           "type": "string",           "name": "name"         }       ]     } } | {"NameVO" : "const vName: string = 'Kostas'; export class NameVO extends ValueObject<NameProps> { private constructor(props: NameProps) { super(props); } public static create(props:NameProps): XOR<NameVO, DomainErrors.InvalidName> { return ok(new NameVO(props)); }get name(): string { return this.props.name; } private isInvalidName(name:string): boolean { return (regName.test(name)); }}"} | export interface NameProps { name: string; } | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | value-objects | value-object-props | output | outputProps | @bitloops-auto-generated |
        | 123,10,32,32,34,78,97,109,101,86,79,34,58,32,123,10,32,32,32,32,34,99,111,110,115,116,97,110,116,86,97,114,115,34,58,32,91,10,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,10,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,39,75,111,115,116,97,115,39,34,44,10,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,118,78,97,109,101,34,10,32,32,32,32,32,32,125,10,32,32,32,32,93,44,10,32,32,32,32,34,109,101,116,104,111,100,115,34,58,32,123,10,32,32,32,32,32,32,34,105,115,73,110,118,97,108,105,100,78,97,109,101,34,58,32,123,10,32,32,32,32,32,32,32,32,34,112,114,105,118,97,116,101,77,101,116,104,111,100,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,34,98,111,111,108,34,44,10,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,109,101,116,104,111,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,114,101,103,78,97,109,101,46,116,101,115,116,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,44,10,32,32,32,32,34,99,114,101,97,116,101,34,58,32,123,10,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,121,34,58,32,123,10,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,112,114,111,112,115,34,44,10,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,78,97,109,101,80,114,111,112,115,34,10,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,123,10,32,32,32,32,32,32,32,32,34,111,107,34,58,32,34,78,97,109,101,86,79,34,44,10,32,32,32,32,32,32,32,32,34,101,114,114,111,114,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,34,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,78,97,109,101,34,10,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,34,105,102,83,116,97,116,101,109,101,110,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,100,105,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,109,101,116,104,111,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,105,115,73,110,118,97,108,105,100,78,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,112,114,111,112,115,46,110,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,101,108,115,101,83,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,79,75,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,108,97,115,115,73,110,115,116,97,110,116,105,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,108,97,115,115,78,97,109,101,34,58,32,34,78,97,109,101,86,79,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,112,114,111,112,115,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,69,114,114,111,114,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,108,97,115,115,73,110,115,116,97,110,116,105,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,99,108,97,115,115,78,97,109,101,34,58,32,34,72,101,108,108,111,87,111,114,108,100,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,78,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,112,114,111,112,115,46,110,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,93,10,32,32,32,32,125,10,32,32,125,10,125 | 123,10,32,32,32,32,34,78,97,109,101,80,114,111,112,115,34,58,32,123,10,32,32,32,32,32,32,34,118,97,114,105,97,98,108,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,10,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,110,97,109,101,34,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,93,10,32,32,32,32,125,10,125 | 123,34,78,97,109,101,86,79,34,32,58,32,34,99,111,110,115,116,32,118,78,97,109,101,58,32,115,116,114,105,110,103,32,61,32,39,75,111,115,116,97,115,39,59,32,101,120,112,111,114,116,32,99,108,97,115,115,32,78,97,109,101,86,79,32,101,120,116,101,110,100,115,32,86,97,108,117,101,79,98,106,101,99,116,60,78,97,109,101,80,114,111,112,115,62,32,123,32,112,114,105,118,97,116,101,32,99,111,110,115,116,114,117,99,116,111,114,40,112,114,111,112,115,58,32,78,97,109,101,80,114,111,112,115,41,32,123,32,115,117,112,101,114,40,112,114,111,112,115,41,59,32,125,32,112,117,98,108,105,99,32,115,116,97,116,105,99,32,99,114,101,97,116,101,40,112,114,111,112,115,58,78,97,109,101,80,114,111,112,115,41,58,32,88,79,82,60,78,97,109,101,86,79,44,32,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,78,97,109,101,62,32,123,32,114,101,116,117,114,110,32,111,107,40,110,101,119,32,78,97,109,101,86,79,40,112,114,111,112,115,41,41,59,32,125,103,101,116,32,110,97,109,101,40,41,58,32,115,116,114,105,110,103,32,123,32,114,101,116,117,114,110,32,116,104,105,115,46,112,114,111,112,115,46,110,97,109,101,59,32,125,32,112,114,105,118,97,116,101,32,105,115,73,110,118,97,108,105,100,78,97,109,101,40,110,97,109,101,58,115,116,114,105,110,103,41,58,32,98,111,111,108,101,97,110,32,123,32,114,101,116,117,114,110,32,40,114,101,103,78,97,109,101,46,116,101,115,116,40,110,97,109,101,41,41,59,32,125,125,34,125 | 101,120,112,111,114,116,32,105,110,116,101,114,102,97,99,101,32,78,97,109,101,80,114,111,112,115,32,123,32,110,97,109,101,58,32,115,116,114,105,110,103,59,32,125 | @bitloops-auto-generated |
  