Feature: domainError

    Scenario Template: domainError is valid
    Given A valid domain error string <blString>
    When I generate the model
    Then I should get the right model

    Examples:
      | blString                                                                                                                                        |
      | DomainError InvalidNameError (name : string) { message: 'is an invalid name', errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe' }                |
      | DomainError InvalidNameError (name : string, hello: string) { message:'is an invalid name', errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe', } |
    # | DomainError InvalidNameError (name : string, errorId : string) { message: `name is an invalid ${name}`, errorId: `${errorId}`, } |

    Scenario Template: domainError is invalid
    Given An invalid domain error string <blString>
    When I generate the model
    Then I should get an error

    Examples:
      | blString                                                                                                                                    |
      | DomainError InvalidNameError (name : string) { message: 'is an invalid name', lol: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe' }                |
      | DomainError InvalidNameError (name: string, hmm: string) { message: 'name', errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',hello : 'ff' } |
      | DomainError InvalidNameError (name: string) {}                                                                                              |
      | DomainError InvalidNameError (name: string, hmm: string) {message: 'hello'}                                                                 |
