Feature: bitloopsFilesToString
    Returns a string containing all the bitloops code per module of bounded context

    Scenario Template: Valid filepath produces valid string
    Given I am sending path <bitloopsModuleFilePath>
    When I call the function
    Then I should get a string response not null <response>

    Examples:
      | bitloopsModuleFilePath                                                                                                                    | response                      |
      | ./__tests__/step-definitions/bitloopsLanguageToModel/bitloopsFileToString-testData/bounded-contexts/My Bounded 1/My Module A/             | DTO HelloDTO { string name; } |
      | ABSOLUTE_PATH/__tests__/step-definitions/bitloopsLanguageToModel/bitloopsFileToString-testData/bounded-contexts/My Bounded 1/My Module A/ | DTO HelloDTO { string name; } |
