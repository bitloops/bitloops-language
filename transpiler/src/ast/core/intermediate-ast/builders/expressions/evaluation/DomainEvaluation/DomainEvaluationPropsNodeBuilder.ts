import { DomainEvaluationPropsNode } from '../../../../nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluationProps.js';
import { EvaluationFieldListNode } from '../../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { ExpressionNode } from '../../../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class DomainEvaluationPropsNodeBuilder implements IBuilder<DomainEvaluationPropsNode> {
  private expressionNode: ExpressionNode;
  private evaluationFieldListNode: EvaluationFieldListNode;
  private domainEvaluationPropsNode: DomainEvaluationPropsNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.domainEvaluationPropsNode = new DomainEvaluationPropsNode(nodeMetadata);
  }

  public withEvaluationFieldList(
    fieldList: EvaluationFieldListNode,
  ): DomainEvaluationPropsNodeBuilder {
    this.evaluationFieldListNode = fieldList;
    return this;
  }

  public withExpression(exprNode: ExpressionNode): DomainEvaluationPropsNodeBuilder {
    this.expressionNode = exprNode;
    return this;
  }

  public build(): DomainEvaluationPropsNode {
    if (this.evaluationFieldListNode) {
      this.domainEvaluationPropsNode.addChild(this.evaluationFieldListNode);
    } else if (this.expressionNode) {
      this.domainEvaluationPropsNode.addChild(this.expressionNode);
    }

    this.domainEvaluationPropsNode.buildObjectValue();

    return this.domainEvaluationPropsNode;
  }
}
