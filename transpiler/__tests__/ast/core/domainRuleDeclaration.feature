# https://docs.google.com/spreadsheets/d/1U-4zp0Z3_4OupsmV3w6pXfxo1xqmVzCbLZaSZlI2H6w/edit#gid=0

Feature: Rule Declaration

    Scenario Template: Rule declaration is valid
    Given Valid bounded context <boundedContext>, module <module>, rule <blString> strings
    When I generate the model
    Then I should get <output>
    
   # Examples: # @bitloops-auto-generated
       # | boundedContext | module | blString | output | @bitloops-auto-generated |
       # | Hello World | core | Rule IsValidTitle(title: string) throws DomainErrors.InvalidTitleError {   isBrokenIf (title > 150 OR title < 4); } | {"Hello World":{"core":{"Rules":{"IsValidTitle":{"parameters":[{ "type": "string", "value": "title" }], "error": "DomainErrors.InvalidTitleError"}}}}} | @bitloops-auto-generated |
  
    Examples: # @bitloops-auto-generated
        | boundedContext | module | blString | output | @bitloops-auto-generated |
        | 72,101,108,108,111,32,87,111,114,108,100 | 99,111,114,101 | 82,117,108,101,32,73,115,86,97,108,105,100,84,105,116,108,101,40,116,105,116,108,101,58,32,115,116,114,105,110,103,41,32,116,104,114,111,119,115,32,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,32,123,10,32,32,105,115,66,114,111,107,101,110,73,102,32,40,116,105,116,108,101,32,62,32,49,53,48,32,79,82,32,116,105,116,108,101,32,60,32,52,41,59,10,125 | 123,34,72,101,108,108,111,32,87,111,114,108,100,34,58,123,34,99,111,114,101,34,58,123,34,82,117,108,101,115,34,58,123,34,73,115,86,97,108,105,100,84,105,116,108,101,34,58,123,34,112,97,114,97,109,101,116,101,114,115,34,58,91,123,32,34,116,121,112,101,34,58,32,34,115,116,114,105,110,103,34,44,32,34,118,97,108,117,101,34,58,32,34,116,105,116,108,101,34,32,125,93,44,32,34,101,114,114,111,114,34,58,32,34,68,111,109,97,105,110,69,114,114,111,114,115,46,73,110,118,97,108,105,100,84,105,116,108,101,69,114,114,111,114,34,125,125,125,125,125 | @bitloops-auto-generated |
  