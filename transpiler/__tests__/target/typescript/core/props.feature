Feature: Props to Typescript target language

  Background:
    Given type is "TProps"
    And language is "TypeScript"

    Scenario Template: Props with one or two variables to Typescript
    Given I have a prop <prop>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | prop                                                                                                                                                               | output                                                                                                           |
      | {"NameProps":{"variables":[{"type":"string","name":"name","optional":false}]}}                                                                                     | export interface NameProps { name: string; }                                                                     |
      | {"ClassProps":{"variables":[{"type":"string","name":"name"},{"type":"int32","name":"numOfTeachers","optional":true}]}}                                             | export interface ClassProps { name: string; numOfTeachers?: number; }                                            |
      | {"NameProps":{"variables":[{"type":"string","name":"name"}]},"ClassProps":{"variables":[{"type":"string","name":"name"},{"type":"int32","name":"numOfTeachers"}]}} | export interface NameProps { name: string; }export interface ClassProps { name: string; numOfTeachers: number; } |
      | {"NewProp":{"variables":[{"name":"age","type":"int64","optional":true}]}}                                                                                          | export interface NewProp { age?: number; }                                                                       |
      | {"PriceProp":{"variables":[{"name":"price","type":"double","optional":false}]}}                                                                                    | export interface PriceProp { price: number; }                                                                    |
      | {"DecimalProp":{"variables":[{"name":"decimal","type":"float"}]}}                                                                                                  | export interface DecimalProp { decimal: number; }                                                                |
      | {"UClassProp":{"variables":[{"name":"unsigned_small","type":"uint32"},{"name":"unsigned_big","type":"uint64"}]}}                                                   | export interface UClassProp { unsigned_small: number; unsigned_big: number; }                                    |
      | {"SClassProp":{"variables":[{"name":"signed_small","type":"sint32"},{"name":"signed_big","type":"sint64"}]}}                                                       | export interface SClassProp { signed_small: number; signed_big: number; }                                        |
      | {"FClassProp":{"variables":[{"name":"fixed_small","type":"fixed32"},{"name":"fixed_big","type":"fixed64"}]}}                                                       | export interface FClassProp { fixed_small: number; fixed_big: number; }                                          |
      | {"SFClassProp":{"variables":[{"name":"sfixed_small","type":"sfixed32","optional":true},{"name":"sfixed_big","type":"sfixed64","optional":false}]}}                 | export interface SFClassProp { sfixed_small?: number; sfixed_big: number; }                                      |
      | {"BoolProp":{"variables":[{"name":"isTrue","type":"bool"}]}}                                                                                                       | export interface BoolProp { isTrue: boolean; }                                                                   |
      | {"TodoProps":{"variables":[{"optional":true,"type":"UUIDv4","name":"id"}]}}                                                                                        | export interface TodoProps { id?: Domain.UUIDv4; }                                                               |


    Scenario Template: Props with no variables to Typescript
    Given I have a prop <prop>
    When I generate the code
    Then I should see the <error> output

    Examples:
      | prop             | error                             |
      | {"NameProps":{}} | Variables of Prop are not defined |

    Scenario Template: Props with variables not formatted as array to Typescript
    Given I have a prop <prop>
    When I generate the code
    Then I should see the <error> output

    Examples:
      | prop                                                        | error                           |
      | {"NameProps":{"variables":2}}                               | Variables of Prop are not array |
      | {"NameProps":{"variables":{"name":"isTrue","type":"bool"}}} | Variables of Prop are not array |
      | {"NameProps":{"variables":"bool"}}                          | Variables of Prop are not array |
      | {"NameProps":{"variables":true}}                            | Variables of Prop are not array |

