import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ConditionNode } from '../../../nodes/statements/ifStatement/ConditionNode.js';
import { ThenStatementsNode as ExpressionNode } from '../../../nodes/statements/ifStatement/ThenStatements.js';
import { IBuilder } from '../../IBuilder.js';

export class ConditionNodeBuilder implements IBuilder<ConditionNode> {
  private conditionNode: ConditionNode;
  private expression: ExpressionNode;

  constructor(metadata: TNodeMetadata) {
    this.conditionNode = new ConditionNode(metadata);
  }

  public withExpression(expression: ExpressionNode): ConditionNodeBuilder {
    this.expression = expression;
    return this;
  }

  public build(): ConditionNode {
    this.conditionNode.addChild(this.expression);
    this.conditionNode.buildObjectValue();

    return this.conditionNode;
  }
}
