Feature: Rule Declaration to Typescript target language

  Background:
    Given language is "TypeScript"

    Scenario Template: Rule Declaration to Typescript
    Given I have a rule <rule>
    When I generate the code
    Then I should see the <output> code

    Examples:
      | rule                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | output                                                                                                                                                                                                                                                                          |
      | {"IsValidTitleRule":{"parameters":[{"type":"string","value":"title"}],"error":"DomainErrors.InvalidTitleError","statements":[],"isBrokenIfCondition":{"condition":{"expression":{"logicalExpression":{"orExpression":{"left":{"parenthesizedExpression":{"relationalExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"title.length"}}},"right":{"evaluation":{"regularEvaluation":{"type":"int32","value":"150"}}},"operator":">"}}},"right":{"parenthesizedExpression":{"relationalExpression":{"left":{"evaluation":{"regularEvaluation":{"type":"variable","value":"title.length"}}},"right":{"evaluation":{"regularEvaluation":{"type":"int32","value":"4"}}},"operator":"<"}}}}}}}}}} | {"IsValidTitleRule":"import { Domain } from '@bitloops/bl-boilerplate-core';import { DomainErrors } from '../errors/index';export class IsValidTitleRule implements Domain.IRule {  constructor(private title: string) {}  public Error = new DomainErrors.InvalidTitleError(this.title);  public isBrokenIf(): boolean {    return this.title.length > 150 \|\|this.title.length < 4;  }}"} |
