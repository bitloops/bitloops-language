Feature: ApplicationErrors to Typescript target language

  Background:
    Given language is "TypeScript"

    Scenario Template: ApplicationErrors with messages
    Given I have ApplicationErrors <applicationErrors>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | applicationErrors                                                                                                                                                                                                                                                             | output                                                                                                                                                                                                                         |
      | {"InvalidNameError":{"message":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"Invalid name"}}}},"errorId":{"expression":{"evaluation":{"regularEvaluation":{"type":"string","value":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"}}}},"parameters":[]}} | {"InvalidNameError":"import { Application } from '@bitloops/bl-boilerplate-core';export class InvalidNameError extends Application.Error { constructor(){ super('Invalid name', 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}"} |
# | {"InvalidNameError":{"message":{"backTickString":"${name} is an invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"},"parameters":[{"type":"string","value":"name"}]}}                                                                                       | {"InvalidNameError":"export class InvalidNameError extends Application.Error { constructor(name:string){ super(`${name} is an invalid name`, 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}"}                                                                                                      |
# | {"InvalidNameError":{"message":{"backTickString":"${name} is an invalid name"},"errorId":{"string":"e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe"},"parameters":[{"type":"string","value":"name"}]},"ExampleError":{"message":{"string":"Example error"},"errorId":{"string":"e5a0bd82"}}} | {"InvalidNameError":"export class InvalidNameError extends Application.Error { constructor(name:string){ super(`${name} is an invalid name`, 'e5a0bd82-8ef7-4b1a-ab67-cb83d1d7772fe'); }}","ExampleError":"export class ExampleError extends Application.Error { constructor(){ super('Example error', 'e5a0bd82'); }}"} |


