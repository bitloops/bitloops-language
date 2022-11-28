import { ClassNode } from '../../../nodes/ClassNode.js';
import { InstanceOfEvaluationNode } from '../../../nodes/Expression/Evaluation/InstanceOfEvaluation.js';
import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';
import { IBuilder } from '../../IBuilder.js';

export class IsInstanceOfEvaluationNodeBuilder implements IBuilder<InstanceOfEvaluationNode> {
  private instanceOfEvaluationNode: InstanceOfEvaluationNode;
  private expressionNode: ExpressionNode;
  private classNode: ClassNode;

  constructor() {
    this.instanceOfEvaluationNode = new InstanceOfEvaluationNode();
  }

  public withExpression(domainEvaluation: ExpressionNode): IsInstanceOfEvaluationNodeBuilder {
    this.expressionNode = domainEvaluation;
    return this;
  }

  public withClass(classNode: ClassNode): IsInstanceOfEvaluationNodeBuilder {
    this.classNode = classNode;
    return this;
  }

  public build(): InstanceOfEvaluationNode {
    this.instanceOfEvaluationNode.addChild(this.expressionNode);
    this.instanceOfEvaluationNode.addChild(this.classNode);

    this.instanceOfEvaluationNode.buildObjectValue();

    return this.instanceOfEvaluationNode;
  }
}
