Feature: DomainErrors to Typescript target language

  Background:
    Given type is "TDomainErrors"
    And language is "TypeScript"

    Scenario Template: DomainErrors with messages
    Given I have domainErrors <domainErrors>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | domainErrors                                                                                                                                                                                                                                                                   | output                                                                                                                                                                                                                                                                                         |
      | {"InvalidName":{"message":{"backTickString":"${name} is an invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"},"parameters":[{"type":"string","value":"name"}]}}                                                                                       | export namespace DomainErrors {export class InvalidName extends DomainError { constructor(name:string){ super(`${name} is an invalid name`, 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}}                                                                                                      |
      | {"InvalidName":{"message":{"string":"Invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"}}}                                                                                                                                                             | export namespace DomainErrors {export class InvalidName extends DomainError { constructor(){ super('Invalid name', 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}}                                                                                                                               |
      | {"InvalidName":{"message":{"backTickString":"${name} is an invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"},"parameters":[{"type":"string","value":"name"}]},"ExampleError":{"message":{"string":"Example error"},"errorId":{"string":"e5a0bd82"}}} | export namespace DomainErrors {export class InvalidName extends DomainError { constructor(name:string){ super(`${name} is an invalid name`, 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}export class ExampleError extends DomainError { constructor(){ super('Example error', 'e5a0bd82'); }}} |


