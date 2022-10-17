Feature: domainError 

  Scenario Template: domainError is valid
    Given A valid domain error string <blString>
    When I generate the model
    Then I should get the right model

    Examples:
      |                    blString              |
      | DomainError InvalidName (name : string) { message: 'is an invalid name', errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe', } |
      | DomainError InvalidName (name : string) { message: `name is an invalid ${name}`, errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe', } |
      | DomainError InvalidName (name : string, errorId : string) { message: `name is an invalid ${name}`, errorId: `${errorId}`, } |

Scenario Template: domainError is invalid
    Given An invalid domain error string <blString>
    When I generate the model
    Then I should get an error

    Examples:
      |                    blString              |
      | DomainError InvalidName (name: string, hmm: number) { message: `name is an invalid ${ name }`, errorId: 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe',hello : 'ff' } |
      | DomainError InvalidName (name: string, hmm: number) {} |
      | DomainError InvalidName (name: string, hmm: number) {message: 'hello'} |
