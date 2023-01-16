import { DomainRuleIdentifierBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/DomainRule/DomainRuleIdentifierBuilder.js';
import { AppliedRuleNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/builtInFunction/applyRules/AppliedRule.js';
import { ApplyRulesNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/builtInFunction/applyRules/ApplyRules.js';
import { BuiltInFunctionNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/builtInFunction/BuiltInFunction.js';
import { ArgumentListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { AppliedRuleNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/builtinFunction/AppliedRuleNode.js';
import { BuiltInFunctionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/builtinFunction/BuiltinFunctionNode.js';

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
