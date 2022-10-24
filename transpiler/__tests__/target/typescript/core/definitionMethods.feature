# https://docs.google.com/spreadsheets/d/1YvOpr-xEQRy2W5W8RQT3MTwrAw5ZAIqjQQ5RVyHIGiM/edit#gid=0
Feature: DefinitionMethods to Typescript target language

  Background:
    Given type is "TDefinitionMethods"
    And language is "TypeScript"

    Scenario Template: Valid DefinitionMethods 
    Given I have DefinitionMethods <definitionMethods>
    When I generate the code
    Then I should see the <output> code

   # Examples: # @bitloops-auto-generated
       # | definitionMethods | output | @bitloops-auto-generated |
       # | {"encode":{"parameterDependencies":[{"value":"value","type":"string"}],"returnType":"bytes"}} | encode(value:string):Uint8Array; | @bitloops-auto-generated |
       # | {"encode":{"parameterDependencies":[{"value":"value","type":"WhateverType"}, {"value":"test1","type":"WhateverType"}],"returnType":"string"}, "decode": {"parameterDependencies":[{"value":"value","type":"WhateverType"}, {"value":"test1","type":"bool"}],"returnType":"double"}} | encode(value:WhateverType,test1:WhateverType):string;decode(value:WhateverType,test1:boolean):number; | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | definitionMethods | output | @bitloops-auto-generated |
        | 123,34,101,110,99,111,100,101,34,58,123,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,118,97,108,117,101,34,58,34,118,97,108,117,101,34,44,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,125,93,44,34,114,101,116,117,114,110,84,121,112,101,34,58,34,98,121,116,101,115,34,125,125 | 101,110,99,111,100,101,40,118,97,108,117,101,58,115,116,114,105,110,103,41,58,85,105,110,116,56,65,114,114,97,121,59 | @bitloops-auto-generated |
        | 123,34,101,110,99,111,100,101,34,58,123,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,118,97,108,117,101,34,58,34,118,97,108,117,101,34,44,34,116,121,112,101,34,58,34,87,104,97,116,101,118,101,114,84,121,112,101,34,125,44,32,123,34,118,97,108,117,101,34,58,34,116,101,115,116,49,34,44,34,116,121,112,101,34,58,34,87,104,97,116,101,118,101,114,84,121,112,101,34,125,93,44,34,114,101,116,117,114,110,84,121,112,101,34,58,34,115,116,114,105,110,103,34,125,44,32,34,100,101,99,111,100,101,34,58,32,123,34,112,97,114,97,109,101,116,101,114,68,101,112,101,110,100,101,110,99,105,101,115,34,58,91,123,34,118,97,108,117,101,34,58,34,118,97,108,117,101,34,44,34,116,121,112,101,34,58,34,87,104,97,116,101,118,101,114,84,121,112,101,34,125,44,32,123,34,118,97,108,117,101,34,58,34,116,101,115,116,49,34,44,34,116,121,112,101,34,58,34,98,111,111,108,34,125,93,44,34,114,101,116,117,114,110,84,121,112,101,34,58,34,100,111,117,98,108,101,34,125,125 | 101,110,99,111,100,101,40,118,97,108,117,101,58,87,104,97,116,101,118,101,114,84,121,112,101,44,116,101,115,116,49,58,87,104,97,116,101,118,101,114,84,121,112,101,41,58,115,116,114,105,110,103,59,100,101,99,111,100,101,40,118,97,108,117,101,58,87,104,97,116,101,118,101,114,84,121,112,101,44,116,101,115,116,49,58,98,111,111,108,101,97,110,41,58,110,117,109,98,101,114,59 | @bitloops-auto-generated |
  
