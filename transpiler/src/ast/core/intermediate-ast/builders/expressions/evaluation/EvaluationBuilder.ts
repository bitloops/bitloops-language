import { EvaluationNode } from '../../../nodes/Expression/Evaluation/EvaluationNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class EvaluationBuilder implements IBuilder<EvaluationNode> {
  private evaluationWrapper: EvaluationNode;
  private actualEvaluation: EvaluationNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.evaluationWrapper = new EvaluationNode(nodeMetadata);
  }

  public withEvaluation(evaluation: EvaluationNode): EvaluationBuilder {
    this.actualEvaluation = evaluation;
    return this;
  }

  public build(): EvaluationNode {
    this.evaluationWrapper.addChild(this.actualEvaluation);
    this.evaluationWrapper.buildObjectValue();

    return this.evaluationWrapper;
  }
}
