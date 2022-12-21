import { DomainEvaluationNode } from '../../../nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluation.js';
import { ValueObjectEvaluationNode } from '../../../nodes/Expression/Evaluation/ValueObjectEvaluation.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ValueObjectEvaluationNodeBuilder implements IBuilder<ValueObjectEvaluationNode> {
  private valueObjectEvaluationNode: ValueObjectEvaluationNode;
  private domainEvaluation: DomainEvaluationNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.valueObjectEvaluationNode = new ValueObjectEvaluationNode(nodeMetadata);
  }

  public withDomainEvaluation(
    domainEvaluation: DomainEvaluationNode,
  ): ValueObjectEvaluationNodeBuilder {
    this.domainEvaluation = domainEvaluation;
    return this;
  }

  public build(): ValueObjectEvaluationNode {
    this.valueObjectEvaluationNode.addChild(this.domainEvaluation);

    this.valueObjectEvaluationNode.buildObjectValue();

    return this.valueObjectEvaluationNode;
  }
}
