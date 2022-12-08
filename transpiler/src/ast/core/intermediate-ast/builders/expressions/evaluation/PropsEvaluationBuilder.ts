import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { PropsEvaluationNode } from '../../../nodes/Expression/Evaluation/PropsEvaluation.js';
import { PropsIdentifierNode } from '../../../nodes/Props/PropsIdentifierNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PropsEvaluationNodeBuilder implements IBuilder<PropsEvaluationNode> {
  private structEvaluationNode: PropsEvaluationNode;
  private identifier: PropsIdentifierNode;
  private evaluationFieldListNode?: EvaluationFieldListNode;

  constructor() {
    this.structEvaluationNode = new PropsEvaluationNode();
  }

  public withIdentifier(identifier: PropsIdentifierNode): PropsEvaluationNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  public withEvaluationFieldList(
    evaluationFieldListNode: EvaluationFieldListNode,
  ): PropsEvaluationNodeBuilder {
    this.evaluationFieldListNode = evaluationFieldListNode;
    return this;
  }

  public build(): PropsEvaluationNode {
    this.structEvaluationNode.addChild(this.identifier);
    this.structEvaluationNode.addChild(this.evaluationFieldListNode);

    this.structEvaluationNode.buildObjectValue();

    return this.structEvaluationNode;
  }
}
