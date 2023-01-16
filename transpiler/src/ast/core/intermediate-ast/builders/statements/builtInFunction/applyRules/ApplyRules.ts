import { TNodeMetadata } from '../../../../nodes/IntermediateASTNode.js';
import { AppliedRuleNode } from '../../../../nodes/statements/builtinFunction/AppliedRuleNode.js';
import { ApplyRulesNode } from '../../../../nodes/statements/builtinFunction/ApplyRulesStatementNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class ApplyRulesNodeBuilder implements IBuilder<ApplyRulesNode> {
  private applyRulesNode: ApplyRulesNode;
  private appliedRules: AppliedRuleNode[];

  constructor(metadata: TNodeMetadata) {
    this.applyRulesNode = new ApplyRulesNode(metadata);
  }

  public withAppliedRules(appliedRules: AppliedRuleNode[]): ApplyRulesNodeBuilder {
    this.appliedRules = appliedRules;
    return this;
  }

  public build(): ApplyRulesNode {
    for (const appliedRule of this.appliedRules) {
      this.applyRulesNode.addChild(appliedRule);
    }
    this.applyRulesNode.buildArrayValue();

    return this.applyRulesNode;
  }
}
