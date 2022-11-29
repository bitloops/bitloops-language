import { EvaluationFieldNode } from '../../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { ExpressionNode } from '../../../../nodes/Expression/ExpressionNode.js';
import { NameNode } from '../../../../nodes/NameNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class EvaluationFieldNodeBuilder implements IBuilder<EvaluationFieldNode> {
  public readonly NAME = 'field';

  private nameNode: NameNode;
  private expressionNode: ExpressionNode;
  private evaluationFieldNode: EvaluationFieldNode;

  constructor() {
    this.evaluationFieldNode = new EvaluationFieldNode();
  }

  public withName(name: NameNode): EvaluationFieldNodeBuilder {
    this.nameNode = name;
    return this;
  }

  public withExpression(exprNode: ExpressionNode): EvaluationFieldNodeBuilder {
    this.expressionNode = exprNode;
    return this;
  }

  public build(): EvaluationFieldNode {
    this.evaluationFieldNode.addChild(this.nameNode);
    this.evaluationFieldNode.addChild(this.expressionNode);

    this.evaluationFieldNode.buildObjectValue();

    return this.evaluationFieldNode;
  }
}
