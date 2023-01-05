import { CorsOptionsEvaluationNode } from '../../../nodes/Expression/Evaluation/CorsOptionsEvaluation.js';
import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class CorsOptionsEvaluationNodeBuilder implements IBuilder<CorsOptionsEvaluationNode> {
  private corsOptionsEvaluationNode: CorsOptionsEvaluationNode;
  private evaluationFieldListNode: EvaluationFieldListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.corsOptionsEvaluationNode = new CorsOptionsEvaluationNode(nodeMetadata);
  }

  public withEvaluationFieldList(
    evaluationFieldListNode: EvaluationFieldListNode,
  ): CorsOptionsEvaluationNodeBuilder {
    this.evaluationFieldListNode = evaluationFieldListNode;
    return this;
  }

  public build(): CorsOptionsEvaluationNode {
    this.corsOptionsEvaluationNode.addChild(this.evaluationFieldListNode);

    this.corsOptionsEvaluationNode.buildObjectValue();

    return this.corsOptionsEvaluationNode;
  }
}
