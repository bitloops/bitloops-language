# https://docs.google.com/spreadsheets/d/1CWnWes5o9UxzvFZqUpoHt_nhMlpMpXlGgC7hIMgWtDA/edit#gid=0
Feature: BuildInFunctions to Typescript target language

  Background:
     Given type is "TBuildInFunction"
    And language is "TypeScript"

    Scenario Template: BuildInFunctions to Typescript
    Given I have a buildInFunction <buildInFunction>
    When I generate the code
    Then I should see the <output> code

   # Examples: # @bitloops-auto-generated
       # | buildInFunction | output | @bitloops-auto-generated |
       # | {"buildInFunction":{"applyRules":[{"name":"TooLongStringRule","arguments":[{"value":"props.name","type":"variable"}]}]}} | const res = Domain.applyRules([new TooLongStringRule(props.name),]);if (res) return fail(res); | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | buildInFunction | output | @bitloops-auto-generated |
        | 123,34,98,117,105,108,100,73,110,70,117,110,99,116,105,111,110,34,58,123,34,97,112,112,108,121,82,117,108,101,115,34,58,91,123,34,110,97,109,101,34,58,34,84,111,111,76,111,110,103,83,116,114,105,110,103,82,117,108,101,34,44,34,97,114,103,117,109,101,110,116,115,34,58,91,123,34,118,97,108,117,101,34,58,34,112,114,111,112,115,46,110,97,109,101,34,44,34,116,121,112,101,34,58,34,118,97,114,105,97,98,108,101,34,125,93,125,93,125,125 | 99,111,110,115,116,32,114,101,115,32,61,32,68,111,109,97,105,110,46,97,112,112,108,121,82,117,108,101,115,40,91,110,101,119,32,84,111,111,76,111,110,103,83,116,114,105,110,103,82,117,108,101,40,112,114,111,112,115,46,110,97,109,101,41,44,93,41,59,105,102,32,40,114,101,115,41,32,114,101,116,117,114,110,32,102,97,105,108,40,114,101,115,41,59 | @bitloops-auto-generated |
  