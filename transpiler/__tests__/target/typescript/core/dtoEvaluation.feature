# https://docs.google.com/spreadsheets/d/1qX1iXjxvQ0I4HbNs_vKE4qQhajFe39F3dAaB0QnWkpo/edit#gid=0
Feature: DTOEvaluation to Typescript target language

  Background:
    Given type is "TDTOEvaluation"
    And language is "TypeScript"

    Scenario Template: DTO Evaluation is valid
    Given I have a dtoEvaluation <dtoEvaluation>
    When I generate the code
    Then I should see the <output> code

   # Examples: # @bitloops-auto-generated
       # | dtoEvaluation | output | @bitloops-auto-generated |
       # | {"dto":{"fields":[{"name":"message","expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Hello, World!"}}}}],"name":"HelloWorldResponseDTO"}} | {message:'Hello, World!'} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | dtoEvaluation | output | @bitloops-auto-generated |
        | 123,34,100,116,111,34,58,123,34,102,105,101,108,100,115,34,58,91,123,34,110,97,109,101,34,58,34,109,101,115,115,97,103,101,34,44,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,72,101,108,108,111,44,32,87,111,114,108,100,33,34,125,125,125,125,93,44,34,110,97,109,101,34,58,34,72,101,108,108,111,87,111,114,108,100,82,101,115,112,111,110,115,101,68,84,79,34,125,125 | 123,109,101,115,115,97,103,101,58,39,72,101,108,108,111,44,32,87,111,114,108,100,33,39,125 | @bitloops-auto-generated |
  