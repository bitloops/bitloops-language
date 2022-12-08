import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { StructEvaluationNode } from '../../../nodes/Expression/Evaluation/StructEvaluation.js';
import { StructIdentifierNode } from '../../../nodes/struct/StructIdentifierNode.js';
import { IBuilder } from '../../IBuilder.js';

export class StructEvaluationNodeBuilder implements IBuilder<StructEvaluationNode> {
  private structEvaluationNode: StructEvaluationNode;
  private identifier: StructIdentifierNode;
  private evaluationFieldListNode?: EvaluationFieldListNode;

  constructor() {
    this.structEvaluationNode = new StructEvaluationNode();
  }

  public withIdentifier(identifier: StructIdentifierNode): StructEvaluationNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  public withEvaluationFieldList(
    evaluationFieldListNode: EvaluationFieldListNode,
  ): StructEvaluationNodeBuilder {
    this.evaluationFieldListNode = evaluationFieldListNode;
    return this;
  }

  public build(): StructEvaluationNode {
    this.structEvaluationNode.addChild(this.identifier);
    this.structEvaluationNode.addChild(this.evaluationFieldListNode);

    this.structEvaluationNode.buildObjectValue();

    return this.structEvaluationNode;
  }
}
