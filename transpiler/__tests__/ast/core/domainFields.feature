# https://docs.google.com/spreadsheets/d/152IgZ8Or9ZTI7j0FVGMr6RXN3dpxCT08DYQde10ANOM/edit#gid=0
Feature: Domain Field Declaration

        Scenario Template: Domain field declaration is valid
        Given A Valid bounded context <boundedContext>, module <module>, Domain field declaration <blString> string
        When I generate the model
        Then I should get <output>

   # Examples: # @bitloops-auto-generated
       # | boundedContext | module | blString | output | @bitloops-auto-generated |
       # | Hello World | core | JestTestDomainFieldDeclaration {    string myName; } | {"Hello World":{"core":{"Tests": {"jestTest": { "fields": [{"type": "string","name": "myName"}] }}}}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | boundedContext | module | blString | output | @bitloops-auto-generated |
        | 72,101,108,108,111,32,87,111,114,108,100 | 99,111,114,101 | 74,101,115,116,84,101,115,116,68,111,109,97,105,110,70,105,101,108,100,68,101,99,108,97,114,97,116,105,111,110,32,123,10,32,32,32,115,116,114,105,110,103,32,109,121,78,97,109,101,59,10,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,123,34,99,111,114,101,34,58,123,34,84,101,115,116,115,34,58,32,123,34,106,101,115,116,84,101,115,116,34,58,32,123,10,34,102,105,101,108,100,115,34,58,32,91,123,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,34,110,97,109,101,34,58,32,34,109,121,78,97,109,101,34,125,93,10,125,125,125,125,125 | @bitloops-auto-generated |
  