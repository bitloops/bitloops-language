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
       # | {"TitleVO":{"constantVars":[],"create":{"returnType":{"ok":"TitleVO","errors":["DomainErrors.InvalidTitleError"]},"statements":[ {                     "thisDeclaration": {                       "name": "this.name",                       "expression": {                         "evaluation": {                           "regularEvaluation": {                             "type": "string",                             "value": "newName"                           }                         }                       }                     }                   },{"buildInFunction":{"applyRules":[{"name":"InvalidTitleRule","arguments":[{"type":"variable","value":"props.title"}]}]}}],"parameterDependency":{"value":"props","type":"TitleProps"}},"methods":{}}} | {     "TitleProps": {       "variables": [         {           "type": "string",           "name": "title"         }       ]     } } | {"TitleVO" : "import { Domain,Either,ok } from '@bitloops/bl-boilerplate-core';import { TitleProps } from './TitleProps';import { DomainErrors } from './errors/index';import { fail } from '@bitloops/bl-boilerplate-core';import { Rules } from './rules/index'; export class TitleVO extends Domain.ValueObject<TitleProps> { private constructor(props: TitleProps) { super(props); this.props.name = 'newName';} public static create(props: TitleProps): Either<TitleVO, DomainErrors.InvalidTitleError> { const res = Domain.applyRules([new Rules.InvalidTitleRule(props.title)]); if (res) return fail(res); return ok(new TitleVO(props)); } get title(): string { return this.props.title; } }"} | export interface TitleProps { title: string; } | @bitloops-auto-generated |
       # | {   "NameVO": {     "constantVars": [       {         "type": "string",         "value": "'Kostas'",         "name": "vName"       }     ],     "methods": { "testMethod": {               "privateMethod": {                 "parameterDependencies": [],                 "returnType": {                   "ok": "void",                   "errors": []                 },                 "statements": [                   {                     "thisDeclaration": {                       "name": "this.name",                       "expression": {                         "evaluation": {                           "regularEvaluation": {                             "type": "string",                             "value": "newName"                           }                         }                       }                     }                   },                   {                     "returnOK": {                       "expression": {                         "evaluation": {                           "regularEvaluation": {                             "type": "void",                             "value": ""                           }                         }                       }                     }                   }                 ]               }             },       "isInvalidName": {         "privateMethod": {           "parameterDependencies": [             {               "value": "name",               "type": "string"             }           ],           "returnType": "bool",           "statements": [             {               "return": {                 "expression": {                   "evaluation": {                     "regularEvaluation": {                       "type": "method",                       "argumentDependencies": [                         {                           "value": "name",                           "type": "variable"                         }                       ],                       "value": "regName.test"                     }                   }                 }               }             }           ]         }       }     },     "create": {       "parameterDependency": {         "value": "props",         "type": "NameProps"       },       "returnType": {         "ok": "NameVO",         "errors": [           "DomainErrors.InvalidNameError"         ]       },       "statements": [          {                     "thisDeclaration": {                       "name": "this.name",                       "expression": {                         "evaluation": {                           "regularEvaluation": {                             "type": "string",                             "value": "newName"                           }                         }                       }                     }                   }       ]     }   } } | {     "NameProps": {       "variables": [         {           "type": "string",           "name": "name"         }       ]     } } | {"NameVO" : "import { Domain,Either,ok } from '@bitloops/bl-boilerplate-core';import { NameProps } from './NameProps';import { DomainErrors } from './errors/index';const vName: string = 'Kostas'; export class NameVO extends Domain.ValueObject<NameProps> { private constructor(props: NameProps) { super(props); this.props.name = 'newName'; } public static create(props:NameProps): Either<NameVO, DomainErrors.InvalidNameError> { return ok(new NameVO(props)); } get name(): string { return this.props.name; } private testMethod():Either<void, never> {this.props.name ='newName';return ok();} private isInvalidName(name:string): boolean { return (regName.test(name)); }}"} | export interface NameProps { name: string; } | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | value-objects | value-object-props | output | outputProps | @bitloops-auto-generated |
        | 123,34,84,105,116,108,101,86,79,34,58,123,34,99,111,110,115,116,97,110,116,86,97,114,115,34,58,91,93,44,34,99,114,101,97,116,101,34,58,123,34,114,101,116,117,114,110,84,121,112,101,34,58,123,34,111,107,34,58,34,84,105,116,108,101,86,79,34,44,34,101,114,114,111,114,115,34,58,91,34,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,34,93,125,44,34,115,116,97,116,101,109,101,110,116,115,34,58,91,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,104,105,115,68,101,99,108,97,114,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,116,104,105,115,46,110,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,110,101,119,78,97,109,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,123,34,98,117,105,108,100,73,110,70,117,110,99,116,105,111,110,34,58,123,34,97,112,112,108,121,82,117,108,101,115,34,58,91,123,34,110,97,109,101,34,58,34,73,110,118,97,108,105,100,84,105,116,108,101,82,117,108,101,34,44,34,97,114,103,117,109,101,110,116,115,34,58,91,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,112,114,111,112,115,46,116,105,116,108,101,34,125,93,125,93,125,125,93,44,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,121,34,58,123,34,118,97,108,117,101,34,58,34,112,114,111,112,115,34,44,34,116,121,112,101,34,58,34,84,105,116,108,101,80,114,111,112,115,34,125,125,44,34,109,101,116,104,111,100,115,34,58,123,125,125,125 | 123,10,32,32,32,32,34,84,105,116,108,101,80,114,111,112,115,34,58,32,123,10,32,32,32,32,32,32,34,118,97,114,105,97,98,108,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,10,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,116,105,116,108,101,34,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,93,10,32,32,32,32,125,10,125 | 123,34,84,105,116,108,101,86,79,34,32,58,32,34,105,109,112,111,114,116,32,123,32,68,111,109,97,105,110,44,69,105,116,104,101,114,44,111,107,32,125,32,102,114,111,109,32,39,64,98,105,116,108,111,111,112,115,47,98,108,45,98,111,105,108,101,114,112,108,97,116,101,45,99,111,114,101,39,59,105,109,112,111,114,116,32,123,32,84,105,116,108,101,80,114,111,112,115,32,125,32,102,114,111,109,32,39,46,47,84,105,116,108,101,80,114,111,112,115,39,59,105,109,112,111,114,116,32,123,32,68,111,109,97,105,110,69,114,114,111,114,115,32,125,32,102,114,111,109,32,39,46,47,101,114,114,111,114,115,47,105,110,100,101,120,39,59,105,109,112,111,114,116,32,123,32,102,97,105,108,32,125,32,102,114,111,109,32,39,64,98,105,116,108,111,111,112,115,47,98,108,45,98,111,105,108,101,114,112,108,97,116,101,45,99,111,114,101,39,59,105,109,112,111,114,116,32,123,32,82,117,108,101,115,32,125,32,102,114,111,109,32,39,46,47,114,117,108,101,115,47,105,110,100,101,120,39,59,32,101,120,112,111,114,116,32,99,108,97,115,115,32,84,105,116,108,101,86,79,32,101,120,116,101,110,100,115,32,68,111,109,97,105,110,46,86,97,108,117,101,79,98,106,101,99,116,60,84,105,116,108,101,80,114,111,112,115,62,32,123,32,112,114,105,118,97,116,101,32,99,111,110,115,116,114,117,99,116,111,114,40,112,114,111,112,115,58,32,84,105,116,108,101,80,114,111,112,115,41,32,123,32,115,117,112,101,114,40,112,114,111,112,115,41,59,32,116,104,105,115,46,112,114,111,112,115,46,110,97,109,101,32,61,32,39,110,101,119,78,97,109,101,39,59,125,32,112,117,98,108,105,99,32,115,116,97,116,105,99,32,99,114,101,97,116,101,40,112,114,111,112,115,58,32,84,105,116,108,101,80,114,111,112,115,41,58,32,69,105,116,104,101,114,60,84,105,116,108,101,86,79,44,32,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,62,32,123,32,99,111,110,115,116,32,114,101,115,32,61,32,68,111,109,97,105,110,46,97,112,112,108,121,82,117,108,101,115,40,91,110,101,119,32,82,117,108,101,115,46,73,110,118,97,108,105,100,84,105,116,108,101,82,117,108,101,40,112,114,111,112,115,46,116,105,116,108,101,41,93,41,59,32,105,102,32,40,114,101,115,41,32,114,101,116,117,114,110,32,102,97,105,108,40,114,101,115,41,59,32,114,101,116,117,114,110,32,111,107,40,110,101,119,32,84,105,116,108,101,86,79,40,112,114,111,112,115,41,41,59,32,125,32,103,101,116,32,116,105,116,108,101,40,41,58,32,115,116,114,105,110,103,32,123,32,114,101,116,117,114,110,32,116,104,105,115,46,112,114,111,112,115,46,116,105,116,108,101,59,32,125,32,125,34,125 | 101,120,112,111,114,116,32,105,110,116,101,114,102,97,99,101,32,84,105,116,108,101,80,114,111,112,115,32,123,32,116,105,116,108,101,58,32,115,116,114,105,110,103,59,32,125 | @bitloops-auto-generated |
        | 123,10,32,32,34,78,97,109,101,86,79,34,58,32,123,10,32,32,32,32,34,99,111,110,115,116,97,110,116,86,97,114,115,34,58,32,91,10,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,10,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,39,75,111,115,116,97,115,39,34,44,10,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,118,78,97,109,101,34,10,32,32,32,32,32,32,125,10,32,32,32,32,93,44,10,32,32,32,32,34,109,101,116,104,111,100,115,34,58,32,123,10,34,116,101,115,116,77,101,116,104,111,100,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,114,105,118,97,116,101,77,101,116,104,111,100,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,111,107,34,58,32,34,118,111,105,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,114,114,111,114,115,34,58,32,91,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,104,105,115,68,101,99,108,97,114,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,116,104,105,115,46,110,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,110,101,119,78,97,109,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,79,75,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,111,105,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,34,105,115,73,110,118,97,108,105,100,78,97,109,101,34,58,32,123,10,32,32,32,32,32,32,32,32,34,112,114,105,118,97,116,101,77,101,116,104,111,100,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,34,98,111,111,108,34,44,10,32,32,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,109,101,116,104,111,100,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,97,114,103,117,109,101,110,116,68,101,112,101,110,100,101,110,99,105,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,114,101,103,78,97,109,101,46,116,101,115,116,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,44,10,32,32,32,32,34,99,114,101,97,116,101,34,58,32,123,10,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,121,34,58,32,123,10,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,112,114,111,112,115,34,44,10,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,78,97,109,101,80,114,111,112,115,34,10,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,34,114,101,116,117,114,110,84,121,112,101,34,58,32,123,10,32,32,32,32,32,32,32,32,34,111,107,34,58,32,34,78,97,109,101,86,79,34,44,10,32,32,32,32,32,32,32,32,34,101,114,114,111,114,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,34,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,78,97,109,101,69,114,114,111,114,34,10,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,104,105,115,68,101,99,108,97,114,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,116,104,105,115,46,110,97,109,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,110,101,119,78,97,109,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,93,10,32,32,32,32,125,10,32,32,125,10,125 | 123,10,32,32,32,32,34,78,97,109,101,80,114,111,112,115,34,58,32,123,10,32,32,32,32,32,32,34,118,97,114,105,97,98,108,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,10,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,110,97,109,101,34,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,93,10,32,32,32,32,125,10,125 | 123,34,78,97,109,101,86,79,34,32,58,32,34,105,109,112,111,114,116,32,123,32,68,111,109,97,105,110,44,69,105,116,104,101,114,44,111,107,32,125,32,102,114,111,109,32,39,64,98,105,116,108,111,111,112,115,47,98,108,45,98,111,105,108,101,114,112,108,97,116,101,45,99,111,114,101,39,59,105,109,112,111,114,116,32,123,32,78,97,109,101,80,114,111,112,115,32,125,32,102,114,111,109,32,39,46,47,78,97,109,101,80,114,111,112,115,39,59,105,109,112,111,114,116,32,123,32,68,111,109,97,105,110,69,114,114,111,114,115,32,125,32,102,114,111,109,32,39,46,47,101,114,114,111,114,115,47,105,110,100,101,120,39,59,99,111,110,115,116,32,118,78,97,109,101,58,32,115,116,114,105,110,103,32,61,32,39,75,111,115,116,97,115,39,59,32,101,120,112,111,114,116,32,99,108,97,115,115,32,78,97,109,101,86,79,32,101,120,116,101,110,100,115,32,68,111,109,97,105,110,46,86,97,108,117,101,79,98,106,101,99,116,60,78,97,109,101,80,114,111,112,115,62,32,123,32,112,114,105,118,97,116,101,32,99,111,110,115,116,114,117,99,116,111,114,40,112,114,111,112,115,58,32,78,97,109,101,80,114,111,112,115,41,32,123,32,115,117,112,101,114,40,112,114,111,112,115,41,59,32,116,104,105,115,46,112,114,111,112,115,46,110,97,109,101,32,61,32,39,110,101,119,78,97,109,101,39,59,32,125,32,112,117,98,108,105,99,32,115,116,97,116,105,99,32,99,114,101,97,116,101,40,112,114,111,112,115,58,78,97,109,101,80,114,111,112,115,41,58,32,69,105,116,104,101,114,60,78,97,109,101,86,79,44,32,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,78,97,109,101,69,114,114,111,114,62,32,123,32,114,101,116,117,114,110,32,111,107,40,110,101,119,32,78,97,109,101,86,79,40,112,114,111,112,115,41,41,59,32,125,32,103,101,116,32,110,97,109,101,40,41,58,32,115,116,114,105,110,103,32,123,32,114,101,116,117,114,110,32,116,104,105,115,46,112,114,111,112,115,46,110,97,109,101,59,32,125,32,112,114,105,118,97,116,101,32,116,101,115,116,77,101,116,104,111,100,40,41,58,69,105,116,104,101,114,60,118,111,105,100,44,32,110,101,118,101,114,62,32,123,116,104,105,115,46,112,114,111,112,115,46,110,97,109,101,32,61,39,110,101,119,78,97,109,101,39,59,114,101,116,117,114,110,32,111,107,40,41,59,125,32,112,114,105,118,97,116,101,32,105,115,73,110,118,97,108,105,100,78,97,109,101,40,110,97,109,101,58,115,116,114,105,110,103,41,58,32,98,111,111,108,101,97,110,32,123,32,114,101,116,117,114,110,32,40,114,101,103,78,97,109,101,46,116,101,115,116,40,110,97,109,101,41,41,59,32,125,125,34,125 | 101,120,112,111,114,116,32,105,110,116,101,114,102,97,99,101,32,78,97,109,101,80,114,111,112,115,32,123,32,110,97,109,101,58,32,115,116,114,105,110,103,59,32,125 | @bitloops-auto-generated |
  