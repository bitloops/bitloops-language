import { ClassNode } from '../../nodes/ClassNode.js';
import { InstanceOfExpressionNode } from '../../nodes/Expression/InstanceOfExpression.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

export class IsInstanceOfExpressionNodeBuilder implements IBuilder<InstanceOfExpressionNode> {
  private instanceOfEvaluationNode: InstanceOfExpressionNode;
  private expressionNode: ExpressionNode;
  private classNode: ClassNode;

  constructor() {
    this.instanceOfEvaluationNode = new InstanceOfExpressionNode();
  }

  public withExpression(domainEvaluation: ExpressionNode): IsInstanceOfExpressionNodeBuilder {
    this.expressionNode = domainEvaluation;
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
