import { EvaluationFieldNode } from '../../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { ExpressionNode } from '../../../../nodes/Expression/ExpressionNode.js';
import { IdentifierNode } from '../../../../nodes/identifier/IdentifierNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class EvaluationFieldNodeBuilder implements IBuilder<EvaluationFieldNode> {
  private identifierNode: IdentifierNode;
  private expressionNode: ExpressionNode;
  private evaluationFieldNode: EvaluationFieldNode;

  constructor() {
    this.evaluationFieldNode = new EvaluationFieldNode();
  }

  public withIdentifier(identifierNode: IdentifierNode): EvaluationFieldNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withExpression(exprNode: ExpressionNode): EvaluationFieldNodeBuilder {
    this.expressionNode = exprNode;
    return this;
  }

  public build(): EvaluationFieldNode {
    this.evaluationFieldNode.addChild(this.identifierNode);
    this.evaluationFieldNode.addChild(this.expressionNode);

    this.evaluationFieldNode.buildObjectValue();

    return this.evaluationFieldNode;
  }
}
