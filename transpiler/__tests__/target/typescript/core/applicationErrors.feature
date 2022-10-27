Feature: ApplicationErrors to Typescript target language

  Background:
    Given language is "TypeScript"

    Scenario Template: ApplicationErrors with messages
    Given I have ApplicationErrors <applicationErrors>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | applicationErrors                                                                                                                                                                                                                                                              | output                                                                                                                                                                                                                                                              |
      | {"InvalidName":{"message":{"backTickString":"${name} is an invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"},"parameters":[{"type":"string","value":"name"}]}}                                                                                       | {"InvalidName":"export class InvalidName extends Application.Error { constructor(name:string){ super(`${name} is an invalid name`, 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}"}                                                                                                      |
      | {"InvalidName":{"message":{"string":"Invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"}}}                                                                                                                                                             | {"InvalidName":"export class InvalidName extends Application.Error { constructor(){ super('Invalid name', 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}"}                                                                                                                               |
      | {"InvalidName":{"message":{"backTickString":"${name} is an invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"},"parameters":[{"type":"string","value":"name"}]},"ExampleError":{"message":{"string":"Example error"},"errorId":{"string":"e5a0bd82"}}} | {"InvalidName":"export class InvalidName extends Application.Error { constructor(name:string){ super(`${name} is an invalid name`, 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}","ExampleError":"export class ExampleError extends Application.Error { constructor(){ super('Example error', 'e5a0bd82'); }}"} |

