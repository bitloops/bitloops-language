Feature: Struct declaration to Typescript target language

  Background:
    Given type is "TStructs"
    And language is "TypeScript"

    Scenario Template: Struct declaration success to Typescript object
    Given I have a structDeclaration <structDeclaration>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | structDeclaration                                                                                                                                                                                                                                                                                 | output                                                                                                                                                                         |
      | {"HelloWorldStruct":{"fields":[{"type":"string","name":"name"}]}}                                                                                                                                                                                                                                 | export type HelloWorldStruct = { name: string; };                                                                                                                              |
      | {"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"type":"int32","name":"age"}]}}                                                                                                                                                                                                   | export type HelloWorldStruct = { name: string; age: number; };                                                                                                                 |
      | {"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"optional":true,"type":"double","name":"price"}]}}                                                                                                                                                                                | export type HelloWorldStruct = { name: string; price?: number; };                                                                                                              |
      | {"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"type":"Address","name":"address"}]}}                                                                                                                                                                                             | export type HelloWorldStruct = { name: string; address: Address; };                                                                                                            |
      | {"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"type":"Address","name":"address"},{"optional":true,"type":"Info","name":"info"}]}}                                                                                                                                               | export type HelloWorldStruct = { name: string; address: Address; info?: Info; };                                                                                               |
      | {"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"type":"Address","name":"address"},{"optional":false,"type":"bool","name":"isAvailable"}]}}                                                                                                                                       | export type HelloWorldStruct = { name: string; address: Address; isAvailable: boolean; };                                                                                      |
      | {"Address":{"fields":[{"type":"string","name":"street"},{"type":"number","name":"number"},{"type":"string","name":"city"}]},"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"type":"Address","name":"address"}]}}                                                                  | export type Address = { street: string; number: number; city: string; };export type HelloWorldStruct = { name: string; address: Address; };                                    |
      | {"Person":{"fields":[{"type":"string","name":"name"},{"type":"Address","name":"address"},{"optional":true,"type":"Info","name":"info"}]},"HelloWorldStruct":{"fields":[{"type":"string","name":"name"},{"type":"Address","name":"address"}]},"Info":{"fields":[{"type":"string","name":"code"}]}} | export type Person = { name: string; address: Address; info?: Info; };export type HelloWorldStruct = { name: string; address: Address; };export type Info = { code: string; }; |

    Scenario Template: Struct declaration with no fields to Typescript
    Given I have a structDeclaration <structDeclaration>
    When I generate the code
    Then I should see the <error> output
    Examples:
      | structDeclaration       | error                            |
      | {"HelloWorldStruct":{}} | Fields of Struct are not defined |

    Scenario Template: Struct declaration with fields not formatted as array to Typescript
    Given I have a structDeclaration <structDeclaration>
    When I generate the code
    Then I should see the <error> output

    Examples:
      | structDeclaration                                               | error                          |
      | {"HelloWorldStruct":{"fields":2}}                               | Fields of Struct are not array |
      | {"HelloWorldStruct":{"fields":{"name":"isTrue","type":"bool"}}} | Fields of Struct are not array |
      | {"HelloWorldStruct":{"fields":"bool"}}                          | Fields of Struct are not array |
      | {"HelloWorldStruct":{"fields":true}}                            | Fields of Struct are not array |
      