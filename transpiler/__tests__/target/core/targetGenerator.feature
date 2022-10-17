# https://docs.google.com/spreadsheets/d/12RrcIrf2yeCXT_7jxGp87kiiX5-OEy0ruoqnMl8znsI/edit#gid=0
Feature: Target Generator

    Scenario Template: Generate successfully in target language
    Given A valid intermediateAST <intermediateAST>
    And target language is <targetLanguage> 
    And formatterConfig is <formatterConfig>
    And setupData is <setupData>
    When I generate to target language
    Then I should get the correct target output <output>

   # Examples: # @bitloops-auto-generated
       # | intermediateAST | targetLanguage | formatterConfig | setupData | output | @bitloops-auto-generated |
       # | {   'Hello world': {     demo: {       ApplicationErrors: {         InvalidName: {           message: { backTickString: '${name} is an invalid name' },           errorId: { string: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe' },           parameters: [{ type: 'string', value: 'name' }],         },       },     },   }, } | Typescript | {} | {} | export namespace ApplicationErrors {export class InvalidName extends ApplicationError { constructor(name:string){ super(`${name} is an invalid name`, 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | intermediateAST | targetLanguage | formatterConfig | setupData | output | @bitloops-auto-generated |
        | 123,10,32,32,39,72,101,108,108,111,32,119,111,114,108,100,39,58,32,123,10,32,32,32,32,100,101,109,111,58,32,123,10,32,32,32,32,32,32,65,112,112,108,105,99,97,116,105,111,110,69,114,114,111,114,115,58,32,123,10,32,32,32,32,32,32,32,32,73,110,118,97,108,105,100,78,97,109,101,58,32,123,10,32,32,32,32,32,32,32,32,32,32,109,101,115,115,97,103,101,58,32,123,32,98,97,99,107,84,105,99,107,83,116,114,105,110,103,58,32,39,36,123,110,97,109,101,125,32,105,115,32,97,110,32,105,110,118,97,108,105,100,32,110,97,109,101,39,32,125,44,10,32,32,32,32,32,32,32,32,32,32,101,114,114,111,114,73,100,58,32,123,32,115,116,114,105,110,103,58,32,39,101,53,97,48,98,100,56,50,45,56,101,102,55,45,52,98,49,97,45,97,98,54,55,45,99,98,56,51,100,49,100,55,55,55,50,102,101,39,32,125,44,10,32,32,32,32,32,32,32,32,32,32,112,97,114,97,109,101,116,101,114,115,58,32,91,123,32,116,121,112,101,58,32,39,115,116,114,105,110,103,39,44,32,118,97,108,117,101,58,32,39,110,97,109,101,39,32,125,93,44,10,32,32,32,32,32,32,32,32,125,44,10,32,32,32,32,32,32,125,44,10,32,32,32,32,125,44,10,32,32,125,44,10,125 | 84,121,112,101,115,99,114,105,112,116 | 123,125 | 123,125 | 101,120,112,111,114,116,32,110,97,109,101,115,112,97,99,101,32,65,112,112,108,105,99,97,116,105,111,110,69,114,114,111,114,115,32,123,101,120,112,111,114,116,32,99,108,97,115,115,32,73,110,118,97,108,105,100,78,97,109,101,32,101,120,116,101,110,100,115,32,65,112,112,108,105,99,97,116,105,111,110,69,114,114,111,114,32,123,32,99,111,110,115,116,114,117,99,116,111,114,40,110,97,109,101,58,115,116,114,105,110,103,41,123,32,115,117,112,101,114,40,96,36,123,110,97,109,101,125,32,105,115,32,97,110,32,105,110,118,97,108,105,100,32,110,97,109,101,96,44,32,39,101,53,97,48,98,100,56,50,45,56,101,102,55,45,52,98,49,97,45,97,98,54,55,45,99,98,56,51,100,49,100,55,55,55,50,102,101,39,41,59,32,125,125,125 | @bitloops-auto-generated |
  