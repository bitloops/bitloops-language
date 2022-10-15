# https://docs.google.com/spreadsheets/d/1WwGNTKO6Fe7KlhaUqQIh0pu8rR_7p45yi13wKhBiF3w/edit#gid=0
Feature: Config Declaration

    Scenario Template: Valid Config Invocation
    Given A valid Config Invocation <blString> string
    When I generate the model
    Then I should get <output>

   # Examples: # @bitloops-auto-generated
       # | blString | output | @bitloops-auto-generated |
       # | Config.setLanguage (TypeScript ) ; | {    "setup": {       "language": "TypeScript"    } } | @bitloops-auto-generated |
       # | Config.setLanguage( Java); | { "setup": { "language": "Java" }} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | output | @bitloops-auto-generated |
        | 67,111,110,102,105,103,46,115,101,116,76,97,110,103,117,97,103,101,32,40,84,121,112,101,83,99,114,105,112,116,32,41,32,59 | 123,32,10,32,32,34,115,101,116,117,112,34,58,32,123,32,10,32,32,32,32,32,34,108,97,110,103,117,97,103,101,34,58,32,34,84,121,112,101,83,99,114,105,112,116,34,32,10,32,32,125,10,125 | @bitloops-auto-generated |
        | 67,111,110,102,105,103,46,115,101,116,76,97,110,103,117,97,103,101,40,32,74,97,118,97,41,59 | 123,32,34,115,101,116,117,112,34,58,32,123,32,34,108,97,110,103,117,97,103,101,34,58,32,34,74,97,118,97,34,32,125,125 | @bitloops-auto-generated |
  
    Scenario Template: Invalid Config Invocation
    Given An invalid Config Invocation <blString> string
    Then I should get an Unknown language error when I generate the model

   # Examples: # @bitloops-auto-generated
       # | blString | @bitloops-auto-generated |
       # | Config.setLanguage( Rust); | @bitloops-auto-generated |
       # | Config.setLanguage(Go); | @bitloops-auto-generated |
       # | Config.setLanguage ( JavaScript ); | @bitloops-auto-generated |
       # | Config.setLanguage ( Whatever ); | @bitloops-auto-generated |
       # | Config.setLanguage ( whatever ); | @bitloops-auto-generated |
       # | Config.setLanguage ( Whatever.whatever ); | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | blString | @bitloops-auto-generated |
        | 67,111,110,102,105,103,46,115,101,116,76,97,110,103,117,97,103,101,40,32,82,117,115,116,41,59 | @bitloops-auto-generated |
        | 67,111,110,102,105,103,46,115,101,116,76,97,110,103,117,97,103,101,40,71,111,41,59 | @bitloops-auto-generated |
        | 67,111,110,102,105,103,46,115,101,116,76,97,110,103,117,97,103,101,32,40,32,74,97,118,97,83,99,114,105,112,116,32,41,59 | @bitloops-auto-generated |
        | 67,111,110,102,105,103,46,115,101,116,76,97,110,103,117,97,103,101,32,40,32,87,104,97,116,101,118,101,114,32,41,59 | @bitloops-auto-generated |
        | 67,111,110,102,105,103,46,115,101,116,76,97,110,103,117,97,103,101,32,40,32,119,104,97,116,101,118,101,114,32,41,59 | @bitloops-auto-generated |
        | 67,111,110,102,105,103,46,115,101,116,76,97,110,103,117,97,103,101,32,40,32,87,104,97,116,101,118,101,114,46,119,104,97,116,101,118,101,114,32,41,59 | @bitloops-auto-generated |
  