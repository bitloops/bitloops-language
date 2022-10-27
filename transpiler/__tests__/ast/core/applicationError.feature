# https://docs.google.com/spreadsheets/d/1NMMMv2_3a9EdqkSaa8XQplkIW_RNUfLEiVMOFzzE7E4/edit#gid=1402558510
Feature: applicationError

    Scenario Template: applicationError is valid
    Given A valid application error string <blString>
    When I generate the model
    Then I should get the right model <output>

   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | ApplicationError InvalidNameError (name : string) { message: 'is an invalid name', errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe', } | {   "Hello World": {     "core": {       "ApplicationErrors": {         "InvalidNameError": {           "message": {"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"is an invalid name"}}}},           "errorId": {"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"}}}},           "parameters": [             {               "type": "string",               "value": "name"             }           ]         }       }     }   } } | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 65,112,112,108,105,99,97,116,105,111,110,69,114,114,111,114,32,73,110,118,97,108,105,100,78,97,109,101,69,114,114,111,114,32,40,110,97,109,101,32,58,32,115,116,114,105,110,103,41,32,123,32,109,101,115,115,97,103,101,58,32,39,105,115,32,97,110,32,105,110,118,97,108,105,100,32,110,97,109,101,39,44,32,101,114,114,111,114,73,100,58,32,39,101,53,97,48,98,100,56,50,45,56,101,102,55,45,52,98,49,97,45,97,98,54,55,45,99,98,56,51,100,49,100,55,55,55,50,102,101,39,44,32,125 | 123,10,32,32,34,72,101,108,108,111,32,87,111,114,108,100,34,58,32,123,10,32,32,32,32,34,99,111,114,101,34,58,32,123,10,32,32,32,32,32,32,34,65,112,112,108,105,99,97,116,105,111,110,69,114,114,111,114,115,34,58,32,123,10,32,32,32,32,32,32,32,32,34,73,110,118,97,108,105,100,78,97,109,101,69,114,114,111,114,34,58,32,123,10,32,32,32,32,32,32,32,32,32,32,34,109,101,115,115,97,103,101,34,58,32,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,105,115,32,97,110,32,105,110,118,97,108,105,100,32,110,97,109,101,34,125,125,125,125,44,10,32,32,32,32,32,32,32,32,32,32,34,101,114,114,111,114,73,100,34,58,32,123,34,101,120,112,114,101,115,115,105,111,110,34,58,123,34,101,118,97,108,117,97,116,105,111,110,34,58,123,34,114,101,103,117,108,97,114,69,118,97,108,117,97,116,105,111,110,34,58,123,34,116,121,112,101,34,58,34,115,116,114,105,110,103,34,44,34,118,97,108,117,101,34,58,34,101,53,97,48,98,100,56,50,45,56,101,102,55,45,52,98,49,97,45,97,98,54,55,45,99,98,56,51,100,49,100,55,55,55,50,102,101,34,125,125,125,125,44,10,32,32,32,32,32,32,32,32,32,32,34,112,97,114,97,109,101,116,101,114,115,34,58,32,91,10,32,32,32,32,32,32,32,32,32,32,32,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,34,118,97,108,117,101,34,58,32,34,110,97,109,101,34,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,93,10,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,125,10,32,32,32,32,125,10,32,32,125,10,125 | @bitloops-auto-generated |
  
    Scenario Template: applicationError is invalid
    Given An invalid application error string <blString>
    When I generate the model
    Then I should get an error

   # Examples: # @bitloops-auto-generated
       # | blString | @bitloops-auto-generated |
       # | ApplicationError InvalidNameError (name: string, hmm: number) { message: `name is an invalid ${ name }`, errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',hello : 'ff' } | @bitloops-auto-generated |
       # | ApplicationError InvalidNameError (name: string, hmm: number) {}  | @bitloops-auto-generated |
       # | ApplicationError InvalidNameError (name: string, hmm: number) {message: 'hello'}  | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | @bitloops-auto-generated |
        | 65,112,112,108,105,99,97,116,105,111,110,69,114,114,111,114,32,73,110,118,97,108,105,100,78,97,109,101,69,114,114,111,114,32,40,110,97,109,101,58,32,115,116,114,105,110,103,44,32,104,109,109,58,32,110,117,109,98,101,114,41,32,123,32,109,101,115,115,97,103,101,58,32,96,110,97,109,101,32,105,115,32,97,110,32,105,110,118,97,108,105,100,32,36,123,32,110,97,109,101,32,125,96,44,32,101,114,114,111,114,73,100,58,32,39,101,53,97,48,98,100,56,50,45,56,101,102,55,45,52,98,49,97,45,97,98,54,55,45,99,98,56,51,100,49,100,55,55,55,50,102,101,39,44,104,101,108,108,111,32,58,32,39,102,102,39,32,125 | @bitloops-auto-generated |
        | 65,112,112,108,105,99,97,116,105,111,110,69,114,114,111,114,32,73,110,118,97,108,105,100,78,97,109,101,69,114,114,111,114,32,40,110,97,109,101,58,32,115,116,114,105,110,103,44,32,104,109,109,58,32,110,117,109,98,101,114,41,32,123,125,32 | @bitloops-auto-generated |
        | 65,112,112,108,105,99,97,116,105,111,110,69,114,114,111,114,32,73,110,118,97,108,105,100,78,97,109,101,69,114,114,111,114,32,40,110,97,109,101,58,32,115,116,114,105,110,103,44,32,104,109,109,58,32,110,117,109,98,101,114,41,32,123,109,101,115,115,97,103,101,58,32,39,104,101,108,108,111,39,125,32 | @bitloops-auto-generated |
  
    # Examples:
    #   | blString                                                                                                                                  |
    #   | ApplicationError InvalidName (name : string) { message: 'is an invalid name', errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe', }         |
    #   | ApplicationError InvalidName (name : string) { message: `name is an invalid ${name}`, errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe', } |
    #   | ApplicationError InvalidName (name : string, errorId : string) { message: `name is an invalid ${name}`, errorId: `${errorId}`, }          |
  
# Examples:
#   | blString                                                                                                                                                            |
#   | ApplicationError InvalidName (name: string, hmm: number) { message: `name is an invalid ${ name }`, errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',hello : 'ff' } |
#   | ApplicationError InvalidName (name: string, hmm: number) {}                                                                                                         |
#   | ApplicationError InvalidName (name: string, hmm: number) {message: 'hello'}                                                                                         |
