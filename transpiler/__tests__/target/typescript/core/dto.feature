Feature: DTO to Typescript target language

  Background:
    Given language is "TypeScript"

    Scenario Template: DTO with fields to Typescript
    Given I have a dto <dto>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | dto                                                                                                                                                       | output                                                                                                        |
      | {"HelloDTO":{"fields":[{"type":"string","name":"name","optional":false}]}}                                                                                | {"HelloDTO":"export interface HelloDTO { name: string; }"}                                                                   |
      | {"ClassDTO":{"fields":[{"type":"string","name":"name"},{"type":"int32","name":"numOfTeachers","optional":true}]}}                                         | {"ClassDTO":"export interface ClassDTO { name: string; numOfTeachers?: number; }"}                                           |
      | {"HelloDTO":{"fields":[{"type":"string","name":"name"}]},"ClassDTO":{"fields":[{"type":"string","name":"name"},{"type":"int32","name":"numOfTeachers"}]}} | {"HelloDTO":"export interface HelloDTO { name: string; }","ClassDTO":"export interface ClassDTO { name: string; numOfTeachers: number; }"} |
      | {"TestDTO":{"fields":[{"type":"string","name":"name","optional":true}]}}                                                                                  | {"TestDTO":"export interface TestDTO { name?: string; }"}                                                                   |
      | {"NewDTO":{"fields":[{"name":"age","type":"int64","optional":true}]}}                                                                                     | {"NewDTO":"export interface NewDTO { age?: number; }"}                                                                     |
      | {"PriceDTO":{"fields":[{"name":"price","type":"double","optional":false}]}}                                                                               | {"PriceDTO":"export interface PriceDTO { price: number; }"}                                                                  |
      | {"DecimalDTO":{"fields":[{"name":"decimal","type":"float"}]}}                                                                                             | {"DecimalDTO":"export interface DecimalDTO { decimal: number; }"}                                                              |
      | {"UClassDTO":{"fields":[{"name":"unsigned_small","type":"uint32"},{"name":"unsigned_big","type":"uint64"}]}}                                              | {"UClassDTO":"export interface UClassDTO { unsigned_small: number; unsigned_big: number; }"}                                  |
      | {"SClassDTO":{"fields":[{"name":"signed_small","type":"sint32"},{"name":"signed_big","type":"sint64"}]}}                                                  | {"SClassDTO":"export interface SClassDTO { signed_small: number; signed_big: number; }"}                                      |
      | {"FClassDTO":{"fields":[{"name":"fixed_small","type":"fixed32"},{"name":"fixed_big","type":"fixed64"}]}}                                                  | {"FClassDTO":"export interface FClassDTO { fixed_small: number; fixed_big: number; }"}                                        |
      | {"SFClassDTO":{"fields":[{"name":"sfixed_small","type":"sfixed32","optional":true},{"name":"sfixed_big","type":"sfixed64","optional":false}]}}            | {"SFClassDTO":"export interface SFClassDTO { sfixed_small?: number; sfixed_big: number; }"}                                    |
      | {"BoolDTO":{"fields":[{"name":"isTrue","type":"bool"}]}}                                                                                                  | {"BoolDTO":"export interface BoolDTO { isTrue: boolean; }"}                                                                 |

    Scenario Template: DTO with no fields to Typescript
    Given I have a dto <dto>
    When I generate the code
    Then I should see the <error> output

    Examples:
      | dto            | error                         |
      | {"NameDTO":{}} | Fields of DTO are not defined |

    Scenario Template: DTO with fields not formatted as array to Typescript
    Given I have a dto <dto>
    When I generate the code
    Then I should see the <error> output

    Examples:
      | dto                                                      | error                       |
      | {"NameProps":{"fields":2}}                               | Fields of DTO are not array |
      | {"NameProps":{"fields":{"name":"isTrue","type":"bool"}}} | Fields of DTO are not array |
      | {"NameProps":{"fields":"bool"}}                          | Fields of DTO are not array |
      | {"NameProps":{"fields":true}}                            | Fields of DTO are not array |