import { ClassNode } from '../../nodes/ClassNode.js';
import { InstanceOfExpressionNode } from '../../nodes/Expression/InstanceOfExpression.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';

export class IsInstanceOfExpressionNodeBuilder implements IBuilder<InstanceOfExpressionNode> {
  private instanceOfEvaluationNode: InstanceOfExpressionNode;
  private expressionNode: ExpressionNode;
  private classNode: ClassNode;

  constructor(metadata?: TNodeMetadata) {
    this.instanceOfEvaluationNode = new InstanceOfExpressionNode(metadata);
  }

  public withExpression(expression: ExpressionNode): IsInstanceOfExpressionNodeBuilder {
    this.expressionNode = expression;
    return this;
  }

  public withClass(classNode: ClassNode): IsInstanceOfExpressionNodeBuilder {
    this.classNode = classNode;
    return this;
  }

  public build(): InstanceOfExpressionNode {
    this.instanceOfEvaluationNode.addChild(this.expressionNode);
    this.instanceOfEvaluationNode.addChild(this.classNode);

    this.instanceOfEvaluationNode.buildObjectValue();

    return this.instanceOfEvaluationNode;
  }
}
