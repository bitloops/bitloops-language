#https://docs.google.com/spreadsheets/d/1XOB2f_q-mKnsIw_SIAjTFew1FcJy5KOOo965H81e3UQ/edit#gid=0
Feature: Switch Statement to Typescript target language

  Background:
    Given type is "TSwitchStatement"
    And language is "TypeScript"

    Scenario Template: Switch statement success to Typescript
    Given I have a switch statement <switch>
    When I generate the code
    Then I should see the <output> code

   # Examples: # @bitloops-auto-generated
       # | switch | output | @bitloops-auto-generated |
       # | {"switchStatement":{"expression":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"cases":[{"statements":[{"constDeclaration":{"name":"a","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"1"}}}}}],"caseValue":"1"},{"statements":[{"constDeclaration":{"name":"a","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}}}}],"caseValue":"2"}],"defaultCase":{"statements":[{"constDeclaration":{"name":"a","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"3"}}}}}]}}} | switch(a) {case 1: {const a = 1;} case 2: {const a = 2;} default: {const a = 3; }} | @bitloops-auto-generated |
       # | {   "switchStatement": {     "expression": {       "additiveExpression": {         "left": {             "evaluation": {               "regularEvaluation": {                 "type": "variable",                 "value": "x"               }           }         },         "right": {             "evaluation": {               "regularEvaluation": {                 "type": "variable",                 "value": "y"               }             }         },         "operator": "-"       }     },     "cases": [       {         "statements": [           {             "constDeclaration": {               "name": "res",               "expression": {                 "evaluation": {                   "regularEvaluation": {                     "type": "variable",                     "value": "x"                   }                 }               }             }           }         ],         "caseValue": "10"       },       {         "statements": [           {             "constDeclaration": {               "name": "res",               "expression": {                 "evaluation": {                   "regularEvaluation": {                     "type": "variable",                     "value": "y"                   }                 }               }             }           }         ],         "caseValue": "5"       },       {         "statements": [           {             "constDeclaration": {               "name": "res",               "expression": {                 "evaluation": {                   "regularEvaluation": {                     "type": "variable",                     "value": "n"                   }                 }               }             }           }         ],         "caseValue": "0"       }     ],     "defaultCase": {       "statements": [         {           "constDeclaration": {             "name": "res",             "expression": {               "evaluation": {                 "regularEvaluation": {                   "type": "variable",                   "value": "z"                 }               }             }           }         }       ]     }   } } | switch(x - y) {case 10: {const res = x;} case 5: {const res = y;} case 0: {const res = n;} default: {const res = z;}} | @bitloops-auto-generated |
       # | {"switchStatement":{"expression":{"evaluation":{"regularEvaluation":{"type":"variable","value":"day"}}},"cases":[{"statements":[{"variableDeclaration":{"name":"d","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Sunday"}}},"type":"string"}}],"caseValue":"0"},{"statements":[{"variableDeclaration":{"name":"d","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Monday"}}},"type":"string"}}],"caseValue":"1"},{"statements":[{"variableDeclaration":{"name":"d","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Tuesday"}}},"type":"string"}}],"caseValue":"2"},{"statements":[{"variableDeclaration":{"name":"d","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Wednesday"}}},"type":"string"}}],"caseValue":"3"},{"statements":[{"variableDeclaration":{"name":"d","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Thursday"}}},"type":"string"}}],"caseValue":"4"},{"statements":[{"variableDeclaration":{"name":"d","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Friday"}}},"type":"string"}}],"caseValue":"5"},{"statements":[{"variableDeclaration":{"name":"d","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Saturday"}}},"type":"string"}}],"caseValue":"6"}],"defaultCase":{"statements":[{"variableDeclaration":{"name":"d","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"error"}}},"type":"string"}}]}}} | switch(day) {case 0: {let d: string = 'Sunday';} case 1: {let d: string = 'Monday';} case 2: {let d: string = 'Tuesday';} case 3: {let d: string = 'Wednesday';} case 4: {let d: string = 'Thursday';} case 5: {let d: string = 'Friday';} case 6: {let d: string = 'Saturday';} default: {let d: string = 'error';}} | @bitloops-auto-generated |
       # | {"switchStatement":{"expression":{"logicalExpression":{"xorExpression":{"left":{"parenthesizedExpression":{"logicalExpression":{"orExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"x"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"y"}}}}}}},"right":{"logicalExpression":{"andExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"z"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"w"}}}}}}}}},"cases":[{"statements":[{"constDeclaration":{"name":"res","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}}}},{"variableDeclaration":{"name":"test","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"false"}}},"type":"bool"}}],"caseValue":"true"},{"statements":[{"constDeclaration":{"name":"res","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"false"}}}}},{"variableDeclaration":{"name":"test","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}},"type":"bool"}}],"caseValue":"false"}],"defaultCase":{"statements":[{"constDeclaration":{"name":"res","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"false"}}}}},{"variableDeclaration":{"name":"test","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"false"}}},"type":"bool"}}]}}} | switch(((x || y) && ! z && w) || (! (x || y) && z && w)) {case true: {const res = true;let test: boolean = false;} case false: {const res = false;let test: boolean = true;} default: {const res = false;let test: boolean = false;}} | @bitloops-auto-generated |
       # | {   "switchStatement": {     "expression": {       "evaluation": {         "regularEvaluation": {           "type": "variable",           "value": "a"         }       }     },     "cases": [       {         "caseValue": "5",         "statements": [           {             "constDecomposition": {               "names": [                 "wings"               ],               "evaluation": {                 "regularEvaluation": {                   "type": "variable",                   "value": "bird"                 }               }             }           },           {             "return": {               "expression": {                 "evaluation": {                   "regularEvaluation": {                     "type": "bool",                     "value": "false"                   }                 }               }             }           }         ]       }     ],     "defaultCase": {       "statements": [         {           "constDecomposition": {             "names": [               "wings"             ],             "evaluation": {               "regularEvaluation": {                 "type": "variable",                 "value": "bird"               }             }           }         },         {           "return": {             "expression": {               "evaluation": {                 "regularEvaluation": {                   "type": "bool",                   "value": "false"                 }               }             }           }         }       ]     }   } } | switch(a) {case 5: {const { wings } = bird; return false;} default: {const { wings } = bird; return false;}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | switch | output | @bitloops-auto-generated |
        | 123,34,115,119,105,116,99,104,83,116,97,116,101,109,101,110,116,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,99,97,115,101,115,34,58,91,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,97,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,49,34,125,125,125,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,49,34,125,44,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,97,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,50,34,125,93,44,34,100,101,102,97,117,108,116,67,97,115,101,34,58,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,97,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,51,34,125,125,125,125,125,93,125,125,125 | 115,119,105,116,99,104,40,97,41,32,123,99,97,115,101,32,49,58,32,123,99,111,110,115,116,32,97,32,61,32,49,59,125,32,99,97,115,101,32,50,58,32,123,99,111,110,115,116,32,97,32,61,32,50,59,125,32,100,101,102,97,117,108,116,58,32,123,99,111,110,115,116,32,97,32,61,32,51,59,32,125,125 | @bitloops-auto-generated |
        | 123,10,32,32,34,115,119,105,116,99,104,83,116,97,116,101,109,101,110,116,34,58,32,123,10,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,34,97,100,100,105,116,105,118,101,69,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,34,108,101,102,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,120,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,34,114,105,103,104,116,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,121,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,34,111,112,101,114,97,116,111,114,34,58,32,34,45,34,10,32,32,32,32,32,32,125,10,32,32,32,32,125,44,10,32,32,32,32,34,99,97,115,101,115,34,58,32,91,10,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,114,101,115,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,120,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,34,99,97,115,101,86,97,108,117,101,34,58,32,34,49,48,34,10,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,114,101,115,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,121,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,34,99,97,115,101,86,97,108,117,101,34,58,32,34,53,34,10,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,114,101,115,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,110,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,34,99,97,115,101,86,97,108,117,101,34,58,32,34,48,34,10,32,32,32,32,32,32,125,10,32,32,32,32,93,44,10,32,32,32,32,34,100,101,102,97,117,108,116,67,97,115,101,34,58,32,123,10,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,34,58,32,34,114,101,115,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,122,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,93,10,32,32,32,32,125,10,32,32,125,10,125 | 115,119,105,116,99,104,40,120,32,45,32,121,41,32,123,99,97,115,101,32,49,48,58,32,123,99,111,110,115,116,32,114,101,115,32,61,32,120,59,125,32,99,97,115,101,32,53,58,32,123,99,111,110,115,116,32,114,101,115,32,61,32,121,59,125,32,99,97,115,101,32,48,58,32,123,99,111,110,115,116,32,114,101,115,32,61,32,110,59,125,32,100,101,102,97,117,108,116,58,32,123,99,111,110,115,116,32,114,101,115,32,61,32,122,59,125,125 | @bitloops-auto-generated |
        | 123,34,115,119,105,116,99,104,83,116,97,116,101,109,101,110,116,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,100,97,121,34,125,125,125,44,34,99,97,115,101,115,34,58,91,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,100,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,83,117,110,100,97,121,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,48,34,125,44,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,100,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,77,111,110,100,97,121,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,49,34,125,44,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,100,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,84,117,101,115,100,97,121,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,50,34,125,44,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,100,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,87,101,100,110,101,115,100,97,121,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,51,34,125,44,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,100,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,84,104,117,114,115,100,97,121,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,52,34,125,44,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,100,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,70,114,105,100,97,121,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,53,34,125,44,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,100,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,83,97,116,117,114,100,97,121,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,54,34,125,93,44,34,100,101,102,97,117,108,116,67,97,115,101,34,58,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,100,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,101,114,114,111,114,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,93,125,125,125 | 115,119,105,116,99,104,40,100,97,121,41,32,123,99,97,115,101,32,48,58,32,123,108,101,116,32,100,58,32,115,116,114,105,110,103,32,61,32,39,83,117,110,100,97,121,39,59,125,32,99,97,115,101,32,49,58,32,123,108,101,116,32,100,58,32,115,116,114,105,110,103,32,61,32,39,77,111,110,100,97,121,39,59,125,32,99,97,115,101,32,50,58,32,123,108,101,116,32,100,58,32,115,116,114,105,110,103,32,61,32,39,84,117,101,115,100,97,121,39,59,125,32,99,97,115,101,32,51,58,32,123,108,101,116,32,100,58,32,115,116,114,105,110,103,32,61,32,39,87,101,100,110,101,115,100,97,121,39,59,125,32,99,97,115,101,32,52,58,32,123,108,101,116,32,100,58,32,115,116,114,105,110,103,32,61,32,39,84,104,117,114,115,100,97,121,39,59,125,32,99,97,115,101,32,53,58,32,123,108,101,116,32,100,58,32,115,116,114,105,110,103,32,61,32,39,70,114,105,100,97,121,39,59,125,32,99,97,115,101,32,54,58,32,123,108,101,116,32,100,58,32,115,116,114,105,110,103,32,61,32,39,83,97,116,117,114,100,97,121,39,59,125,32,100,101,102,97,117,108,116,58,32,123,108,101,116,32,100,58,32,115,116,114,105,110,103,32,61,32,39,101,114,114,111,114,39,59,125,125 | @bitloops-auto-generated |
        | 123,34,115,119,105,116,99,104,83,116,97,116,101,109,101,110,116,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,123,34,120,111,114,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,112,97,114,101,110,116,104,101,115,105,122,101,100,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,123,34,111,114,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,120,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,121,34,125,125,125,125,125,125,125,44,34,114,105,103,104,116,34,58,123,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,123,34,97,110,100,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,122,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,119,34,125,125,125,125,125,125,125,125,125,44,34,99,97,115,101,115,34,58,91,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,114,101,115,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,116,114,117,101,34,125,125,125,125,125,44,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,116,101,115,116,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,102,97,108,115,101,34,125,125,125,44,34,116,121,112,101,34,58,34,98,111,111,108,34,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,116,114,117,101,34,125,44,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,114,101,115,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,102,97,108,115,101,34,125,125,125,125,125,44,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,116,101,115,116,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,116,114,117,101,34,125,125,125,44,34,116,121,112,101,34,58,34,98,111,111,108,34,125,125,93,44,34,99,97,115,101,86,97,108,117,101,34,58,34,102,97,108,115,101,34,125,93,44,34,100,101,102,97,117,108,116,67,97,115,101,34,58,123,34,115,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,114,101,115,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,102,97,108,115,101,34,125,125,125,125,125,44,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,116,101,115,116,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,102,97,108,115,101,34,125,125,125,44,34,116,121,112,101,34,58,34,98,111,111,108,34,125,125,93,125,125,125 | 115,119,105,116,99,104,40,40,40,120,32,124,124,32,121,41,32,38,38,32,33,32,122,32,38,38,32,119,41,32,124,124,32,40,33,32,40,120,32,124,124,32,121,41,32,38,38,32,122,32,38,38,32,119,41,41,32,123,99,97,115,101,32,116,114,117,101,58,32,123,99,111,110,115,116,32,114,101,115,32,61,32,116,114,117,101,59,108,101,116,32,116,101,115,116,58,32,98,111,111,108,101,97,110,32,61,32,102,97,108,115,101,59,125,32,99,97,115,101,32,102,97,108,115,101,58,32,123,99,111,110,115,116,32,114,101,115,32,61,32,102,97,108,115,101,59,108,101,116,32,116,101,115,116,58,32,98,111,111,108,101,97,110,32,61,32,116,114,117,101,59,125,32,100,101,102,97,117,108,116,58,32,123,99,111,110,115,116,32,114,101,115,32,61,32,102,97,108,115,101,59,108,101,116,32,116,101,115,116,58,32,98,111,111,108,101,97,110,32,61,32,102,97,108,115,101,59,125,125 | @bitloops-auto-generated |
        | 123,10,32,32,34,115,119,105,116,99,104,83,116,97,116,101,109,101,110,116,34,58,32,123,10,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,97,34,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,44,10,32,32,32,32,34,99,97,115,101,115,34,58,32,91,10,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,34,99,97,115,101,86,97,108,117,101,34,58,32,34,53,34,44,10,32,32,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,99,111,110,115,116,68,101,99,111,109,112,111,115,105,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,119,105,110,103,115,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,98,105,114,100,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,98,111,111,108,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,102,97,108,115,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,125,10,32,32,32,32,93,44,10,32,32,32,32,34,100,101,102,97,117,108,116,67,97,115,101,34,58,32,123,10,32,32,32,32,32,32,34,115,116,97,116,101,109,101,110,116,115,34,58,32,91,10,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,34,99,111,110,115,116,68,101,99,111,109,112,111,115,105,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,110,97,109,101,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,119,105,110,103,115,34,10,32,32,32,32,32,32,32,32,32,32,32,32,93,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,118,97,114,105,97,98,108,101,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,98,105,114,100,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,34,114,101,116,117,114,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,101,120,112,114,101,115,115,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,101,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,98,111,111,108,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,102,97,108,115,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,93,10,32,32,32,32,125,10,32,32,125,10,125 | 115,119,105,116,99,104,40,97,41,32,123,99,97,115,101,32,53,58,32,123,99,111,110,115,116,32,123,32,119,105,110,103,115,32,125,32,61,32,98,105,114,100,59,32,114,101,116,117,114,110,32,102,97,108,115,101,59,125,32,100,101,102,97,117,108,116,58,32,123,99,111,110,115,116,32,123,32,119,105,110,103,115,32,125,32,61,32,98,105,114,100,59,32,114,101,116,117,114,110,32,102,97,108,115,101,59,125,125 | @bitloops-auto-generated |
  