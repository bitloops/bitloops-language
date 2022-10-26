Feature: DomainErrors to Typescript target language

  Background:
    Given language is "TypeScript"

    Scenario Template: DomainErrors with messages
    Given I have domainErrors <domainErrors>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | domainErrors                                                                                                                                                                                                                                                                   | output                                                                                                                                                                                                                                                                                         |
      | {"InvalidNameError":{"message":{"backTickString":"${name} is an invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"},"parameters":[{"type":"string","value":"name"}]}}                                                                                       | export class InvalidNameError extends Domain.Error { constructor(name:string){ super(`${name} is an invalid name`, 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}                                                                                                      |
      | {"InvalidNameError":{"message":{"string":"Invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"}}}                                                                                                                                                             | export class InvalidNameError extends Domain.Error { constructor(){ super('Invalid name', 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}                                                                                                                               |
      | {"InvalidNameError":{"message":{"backTickString":"${name} is an invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"},"parameters":[{"type":"string","value":"name"}]}} | export class InvalidNameError extends Domain.Error { constructor(name:string){ super(`${name} is an invalid name`, 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }} |


