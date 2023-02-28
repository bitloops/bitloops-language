import { DomainEventIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/DomainEvent/DomainEventIdentifierNodeBuilder.js';
import { DomainRuleIdentifierBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/DomainRule/DomainRuleIdentifierBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { AddDomainEventNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/builtInFunction/AddDomainEventNodeBuilder.js';
import { AppliedRuleNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/builtInFunction/applyRules/AppliedRule.js';
import { ApplyRulesNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/builtInFunction/applyRules/ApplyRules.js';
import { BuiltInFunctionNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/builtInFunction/BuiltInFunction.js';
import { ThisIdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/ThisIdentifier/ThisIdentifierNodeBuilder.js';
import { ArgumentListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { AppliedRuleNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/builtinFunction/AppliedRuleNode.js';
import { BuiltInFunctionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/builtinFunction/BuiltinFunctionNode.js';
import { TDomainEventIdentifier, TIdentifier } from '../../../../../../src/types.js';

type TAppliedRules = Array<{
  ruleIdentifier: string;
  argumentListNode: ArgumentListNode;
}>;

export class BuiltinFunctionStatementBuilderDirector {
  public buildApplyRules = (appliedRules: TAppliedRules): BuiltInFunctionNode => {
    const appliedRulesNode = appliedRules.map(this.buildAppliedRule);
    const param = new ApplyRulesNodeBuilder(null).withAppliedRules(appliedRulesNode).build();
    return new BuiltInFunctionNodeBuilder(null).withBuiltInFunction(param).build();
  };

  public buildAddDomainEventWithThisIdentifier = (
    domainEventIdentifier: TDomainEventIdentifier,
  ): BuiltInFunctionNode => {
    const domainEventIdentifierNode = new DomainEventIdentifierNodeBuilder()
      .withName(domainEventIdentifier)
      .build();
    const thisIdentifierNode = new ThisIdentifierNodeBuilder().withName('this').build();
    const addDomainEventNode = new AddDomainEventNodeBuilder(null)
      .withDomainEventIdentifier(domainEventIdentifierNode)
      .withThisIdentifier(thisIdentifierNode)
      .build();
    return new BuiltInFunctionNodeBuilder(null).withBuiltInFunction(addDomainEventNode).build();
  };

  public buildAddDomainEventWithIdentifier = (
    domainEventIdentifier: TDomainEventIdentifier,
    identifier: TIdentifier,
  ): BuiltInFunctionNode => {
    const domainEventIdentifierNode = new DomainEventIdentifierNodeBuilder()
      .withName(domainEventIdentifier)
      .build();
    const identifierNode = new IdentifierNodeBuilder().withName(identifier).build();
    const addDomainEventNode = new AddDomainEventNodeBuilder(null)
      .withDomainEventIdentifier(domainEventIdentifierNode)
      .withIdentifier(identifierNode)
      .build();
    return new BuiltInFunctionNodeBuilder(null).withBuiltInFunction(addDomainEventNode).build();
  };

  private buildAppliedRule({
    ruleIdentifier,
    argumentListNode,
  }: {
    ruleIdentifier: string;
    argumentListNode: ArgumentListNode;
  }): AppliedRuleNode {
    const ruleIdentifierNode = new DomainRuleIdentifierBuilder(null)
      .withName(ruleIdentifier)
      .build();
    return new AppliedRuleNodeBuilder(null)
      .withDomainRuleIdentifier(ruleIdentifierNode)
      .withArgumentListNode(argumentListNode)
      .build();
  }
}
