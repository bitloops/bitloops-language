# https://docs.google.com/spreadsheets/d/1W825CMojGfUvNZQLnkiqfIOtdNPyJ5jHS0AWak6Bw0E/edit#gid=0
Feature: IfStatement to Typescript target language

  Background:
    Given type is "TIfStatement"
    And language is "TypeScript"

    Scenario Template: IfStatement with a valid condition and statements
    Given I have an ifStatement <ifStatement>
    When I generate the code
    Then I should see the <output> code

   # Examples: # @bitloops-auto-generated
       # | ifStatement | output | @bitloops-auto-generated |
       # | {"ifStatement":{"condition":{"expression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"b"}}},"operator":"=="}}},"thenStatements":[{"constDeclaration":{"name":"test","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}}}},{"constDeclaration":{"name":"test2","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"3"}}}}}]}} | if (a == b) { const test = 2; const test2 = 3; } | @bitloops-auto-generated |
       # | {"ifStatement":{"condition":{"expression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"b"}}},"operator":"!="}}},"thenStatements":[{"constDeclaration":{"name":"test","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"OK"}}}}},{"constDeclaration":{"name":"test2","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}}}}]}} | if (a != b) { const test = 'OK'; const test2 = 2; } | @bitloops-auto-generated |
       # | {"ifStatement":{"condition":{"expression":{"logicalExpression":{"andExpression":{"left":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"b"}}},"operator":"=="}},"right":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"c"}}},"operator":"!="}}}}}},"thenStatements":[{"constDeclaration":{"name":"message","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"OK"}}},"type":"string"}},{"constDeclaration":{"name":"test2","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}}}}]}} | if (a == b && a != c) { const message: string = 'OK'; const test2 = 2; } | @bitloops-auto-generated |
       # | {"ifStatement":{"condition":{"expression":{"logicalExpression":{"andExpression":{"left":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"b"}}},"operator":"=="}},"right":{"logicalExpression":{"notExpression":{"parenthesizedExpression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"d"}}},"right":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}},"operator":"=="}}}}}}}}},"thenStatements":[{"constDeclaration":{"name":"a","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"1"}}}}}],"elseStatements":[{"constDeclaration":{"name":"a","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}}}}]}} | if (a == b && ! (d == true)) { const a = 1; } else { const a = 2; } | @bitloops-auto-generated |
       # | {"ifStatement":{"condition":{"expression":{"logicalExpression":{"orExpression":{"left":{"logicalExpression":{"andExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"variable","value":"b"}}}}}},"right":{"parenthesizedExpression":{"relationalExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"int32","value":"3"}}},"right":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}},"operator":">="}}}}}}},"thenStatements":[{"constDeclaration":{"name":"a","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"1"}}}}}],"elseStatements":[{"ifStatement":{"condition":{"expression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"int32","value":"1"}}},"operator":"=="}}},"thenStatements":[{"constDeclaration":{"name":"a","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}}}}],"elseStatements":[{"constDeclaration":{"name":"a","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"3"}}}}}]}}]}} | if (a && b || (3 >= 2)) { const a = 1; } else { if (a == 1) { const a = 2; } else { const a = 3; }; } | @bitloops-auto-generated |
       # | {"ifStatement":{"condition":{"expression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"int32","value":"1"}}},"operator":"=="}}},"thenStatements":[{"constDeclaration":{"name":"b","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"1"}}},"type":"int32"}}],"elseStatements":[{"ifStatement":{"condition":{"expression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}},"operator":"=="}}},"thenStatements":[{"constDeclaration":{"name":"b","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}},"type":"int64"}}],"elseStatements":[{"ifStatement":{"condition":{"expression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"int32","value":"3"}}},"operator":"=="}}},"thenStatements":[{"constDeclaration":{"name":"b","expression":{"evaluation":{"regularEvaluation":{"type":"float","value":"3.14"}}},"type":"float"}}],"elseStatements":[{"constDeclaration":{"name":"b","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}},"type":"string"}}]}}]}}]}} | if (a == 1) { const b: number = 1; } else { if (a == 2) { const b: number = 2; } else { if (a == 3) { const b: number = 3.14; } else { const b: string = 'test'; }; }; } | @bitloops-auto-generated |
       # | {"ifStatement":{"condition":{"expression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"int32","value":"1"}}},"operator":"=="}}},"thenStatements":[{"constDeclaration":{"name":"b","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"1"}}},"type":"int32"}},{"variableDeclaration":{"name":"c","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}},"type":"bool"}}],"elseStatements":[{"ifStatement":{"condition":{"expression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}},"operator":"=="}}},"thenStatements":[{"constDeclaration":{"name":"b","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"2"}}}}},{"variableDeclaration":{"name":"c","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"false"}}},"type":"bool"}}],"elseStatements":[{"ifStatement":{"condition":{"expression":{"equalityExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"a"}}},"right":{"evaluation":{"regularEvaluation":{"type":"int32","value":"3"}}},"operator":"=="}}},"thenStatements":[{"constDeclaration":{"name":"b","expression":{"evaluation":{"regularEvaluation":{"type":"float","value":"3.14"}}},"type":"float"}},{"constDeclaration":{"name":"c","expression":{"evaluation":{"regularEvaluation":{"type":"bool","value":"true"}}},"type":"bool"}}],"elseStatements":[{"constDeclaration":{"name":"b","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"test"}}}}},{"variableDeclaration":{"name":"c","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Default"}}},"type":"string"}}]}}]}}]}} | if (a == 1) { const b: number = 1; let c: boolean = true; } else { if (a == 2) { const b = 2; let c: boolean = false; } else { if (a == 3) { const b: number = 3.14; const c: boolean = true; } else { const b = 'test'; let c: string = 'Default'; }; }; } | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | ifStatement | output | @bitloops-auto-generated |
        | 123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,98,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,116,101,115,116,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,125,125,44,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,116,101,115,116,50,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,51,34,125,125,125,125,125,93,125,125 | 105,102,32,40,97,32,61,61,32,98,41,32,123,32,99,111,110,115,116,32,116,101,115,116,32,61,32,50,59,32,99,111,110,115,116,32,116,101,115,116,50,32,61,32,51,59,32,125 | @bitloops-auto-generated |
        | 123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,98,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,33,61,34,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,116,101,115,116,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,79,75,34,125,125,125,125,125,44,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,116,101,115,116,50,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,125,125,93,125,125 | 105,102,32,40,97,32,33,61,32,98,41,32,123,32,99,111,110,115,116,32,116,101,115,116,32,61,32,39,79,75,39,59,32,99,111,110,115,116,32,116,101,115,116,50,32,61,32,50,59,32,125 | @bitloops-auto-generated |
        | 123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,123,34,97,110,100,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,98,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,44,34,114,105,103,104,116,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,99,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,33,61,34,125,125,125,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,109,101,115,115,97,103,101,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,79,75,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,44,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,116,101,115,116,50,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,125,125,93,125,125 | 105,102,32,40,97,32,61,61,32,98,32,38,38,32,97,32,33,61,32,99,41,32,123,32,99,111,110,115,116,32,109,101,115,115,97,103,101,58,32,115,116,114,105,110,103,32,61,32,39,79,75,39,59,32,99,111,110,115,116,32,116,101,115,116,50,32,61,32,50,59,32,125 | @bitloops-auto-generated |
        | 123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,123,34,97,110,100,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,98,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,44,34,114,105,103,104,116,34,58,123,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,123,34,110,111,116,69,120,112,114,101,115,115,105,111,110,34,58,123,34,112,97,114,101,110,116,104,101,115,105,122,101,100,69,120,112,114,101,115,115,105,111,110,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,100,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,116,114,117,101,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,125,125,125,125,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,97,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,49,34,125,125,125,125,125,93,44,34,101,108,115,101,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,97,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,125,125,93,125,125 | 105,102,32,40,97,32,61,61,32,98,32,38,38,32,33,32,40,100,32,61,61,32,116,114,117,101,41,41,32,123,32,99,111,110,115,116,32,97,32,61,32,49,59,32,125,32,101,108,115,101,32,123,32,99,111,110,115,116,32,97,32,61,32,50,59,32,125 | @bitloops-auto-generated |
        | 123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,123,34,111,114,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,108,111,103,105,99,97,108,69,120,112,114,101,115,115,105,111,110,34,58,123,34,97,110,100,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,98,34,125,125,125,125,125,125,44,34,114,105,103,104,116,34,58,123,34,112,97,114,101,110,116,104,101,115,105,122,101,100,69,120,112,114,101,115,115,105,111,110,34,58,123,34,114,101,108,97,116,105,111,110,97,108,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,51,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,62,61,34,125,125,125,125,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,97,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,49,34,125,125,125,125,125,93,44,34,101,108,115,101,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,49,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,97,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,125,125,93,44,34,101,108,115,101,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,97,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,51,34,125,125,125,125,125,93,125,125,93,125,125 | 105,102,32,40,97,32,38,38,32,98,32,124,124,32,40,51,32,62,61,32,50,41,41,32,123,32,99,111,110,115,116,32,97,32,61,32,49,59,32,125,32,101,108,115,101,32,123,32,105,102,32,40,97,32,61,61,32,49,41,32,123,32,99,111,110,115,116,32,97,32,61,32,50,59,32,125,32,101,108,115,101,32,123,32,99,111,110,115,116,32,97,32,61,32,51,59,32,125,59,32,125 | @bitloops-auto-generated |
        | 123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,49,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,98,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,49,34,125,125,125,44,34,116,121,112,101,34,58,34,105,110,116,51,50,34,125,125,93,44,34,101,108,115,101,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,98,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,44,34,116,121,112,101,34,58,34,105,110,116,54,52,34,125,125,93,44,34,101,108,115,101,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,51,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,98,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,102,108,111,97,116,34,44,34,118,97,108,117,101,34,58,34,51,46,49,52,34,125,125,125,44,34,116,121,112,101,34,58,34,102,108,111,97,116,34,125,125,93,44,34,101,108,115,101,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,98,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,116,101,115,116,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,93,125,125,93,125,125,93,125,125 | 105,102,32,40,97,32,61,61,32,49,41,32,123,32,99,111,110,115,116,32,98,58,32,110,117,109,98,101,114,32,61,32,49,59,32,125,32,101,108,115,101,32,123,32,105,102,32,40,97,32,61,61,32,50,41,32,123,32,99,111,110,115,116,32,98,58,32,110,117,109,98,101,114,32,61,32,50,59,32,125,32,101,108,115,101,32,123,32,105,102,32,40,97,32,61,61,32,51,41,32,123,32,99,111,110,115,116,32,98,58,32,110,117,109,98,101,114,32,61,32,51,46,49,52,59,32,125,32,101,108,115,101,32,123,32,99,111,110,115,116,32,98,58,32,115,116,114,105,110,103,32,61,32,39,116,101,115,116,39,59,32,125,59,32,125,59,32,125 | @bitloops-auto-generated |
        | 123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,49,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,98,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,49,34,125,125,125,44,34,116,121,112,101,34,58,34,105,110,116,51,50,34,125,125,44,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,99,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,116,114,117,101,34,125,125,125,44,34,116,121,112,101,34,58,34,98,111,111,108,34,125,125,93,44,34,101,108,115,101,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,98,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,50,34,125,125,125,125,125,44,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,99,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,102,97,108,115,101,34,125,125,125,44,34,116,121,112,101,34,58,34,98,111,111,108,34,125,125,93,44,34,101,108,115,101,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,105,102,83,116,97,116,101,109,101,110,116,34,58,123,34,99,111,110,100,105,116,105,111,110,34,58,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,113,117,97,108,105,116,121,69,120,112,114,101,115,115,105,111,110,34,58,123,34,108,101,102,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,44,34,118,97,108,117,101,34,58,34,97,34,125,125,125,44,34,114,105,103,104,116,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,105,110,116,51,50,34,44,34,118,97,108,117,101,34,58,34,51,34,125,125,125,44,34,111,112,101,114,97,116,111,114,34,58,34,61,61,34,125,125,125,44,34,116,104,101,110,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,98,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,102,108,111,97,116,34,44,34,118,97,108,117,101,34,58,34,51,46,49,52,34,125,125,125,44,34,116,121,112,101,34,58,34,102,108,111,97,116,34,125,125,44,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,99,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,98,111,111,108,34,44,34,118,97,108,117,101,34,58,34,116,114,117,101,34,125,125,125,44,34,116,121,112,101,34,58,34,98,111,111,108,34,125,125,93,44,34,101,108,115,101,83,116,97,116,101,109,101,110,116,115,34,58,91,123,34,99,111,110,115,116,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,98,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,116,101,115,116,34,125,125,125,125,125,44,123,34,118,97,114,105,97,98,108,101,68,101,99,108,97,114,97,116,105,111,110,34,58,123,34,110,97,109,101,34,58,34,99,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,68,101,102,97,117,108,116,34,125,125,125,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,125,93,125,125,93,125,125,93,125,125 | 105,102,32,40,97,32,61,61,32,49,41,32,123,32,99,111,110,115,116,32,98,58,32,110,117,109,98,101,114,32,61,32,49,59,32,108,101,116,32,99,58,32,98,111,111,108,101,97,110,32,61,32,116,114,117,101,59,32,125,32,101,108,115,101,32,123,32,105,102,32,40,97,32,61,61,32,50,41,32,123,32,99,111,110,115,116,32,98,32,61,32,50,59,32,108,101,116,32,99,58,32,98,111,111,108,101,97,110,32,61,32,102,97,108,115,101,59,32,125,32,101,108,115,101,32,123,32,105,102,32,40,97,32,61,61,32,51,41,32,123,32,99,111,110,115,116,32,98,58,32,110,117,109,98,101,114,32,61,32,51,46,49,52,59,32,99,111,110,115,116,32,99,58,32,98,111,111,108,101,97,110,32,61,32,116,114,117,101,59,32,125,32,101,108,115,101,32,123,32,99,111,110,115,116,32,98,32,61,32,39,116,101,115,116,39,59,32,108,101,116,32,99,58,32,115,116,114,105,110,103,32,61,32,39,68,101,102,97,117,108,116,39,59,32,125,59,32,125,59,32,125 | @bitloops-auto-generated |
  
    # Examples:
    #   | ifStatement                                                                                                                                                                                                                                                                                                                                                                  | output                                                             |
    #   | {"if":{"condition":{"evaluateTrue":{"evaluation":{"regularEvaluation":{"type":"variable","value":"newVariable"}}}},"statements":[{"constDeclaration":{"name":"numOfTeachers","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"25"}}}}}]}}                                                                                                            | if (newVariable) {const numOfTeachers = 25;}                       |
    #   | {"if":{"condition":{"evaluateTrue":{"evaluation":{"regularEvaluation":{"type":"variable","value":"newVariable"}}}},"statements":[{"constDeclaration":{"name":"numOfTeachers","expression":{"evaluation":{"regularEvaluation":{"type":"int32","value":"25"}}}}},{"return":{"expression":{"evaluation":{"regularEvaluation":{"type":"variable","value":"numOfTeachers"}}}}}]}} | if (newVariable) {const numOfTeachers = 25; return numOfTeachers;} |
