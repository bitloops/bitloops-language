import { DomainEvaluationPropsNode } from '../../../nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluationProps.js';
import { IntegrationEventEvaluationNode } from '../../../nodes/Expression/Evaluation/IntegrationEventEvaluation.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IntegrationEventIdentifierNode } from '../../../nodes/integration-event/IntegrationEventIdentifierNode.js';
import { IBuilder } from '../../IBuilder.js';

export class IntegrationEventEvaluationNodeBuilder
  implements IBuilder<IntegrationEventEvaluationNode>
{
  private integrationEventEvaluationNode: IntegrationEventEvaluationNode;
  private identifierNode: IntegrationEventIdentifierNode;
  private domainEvaluation: DomainEvaluationPropsNode;

  constructor(metadata?: TNodeMetadata) {
    this.integrationEventEvaluationNode = new IntegrationEventEvaluationNode(metadata);
  }

  public withIdentifier(
    name: IntegrationEventIdentifierNode,
  ): IntegrationEventEvaluationNodeBuilder {
    this.identifierNode = name;
    return this;
  }

  public withPropsInput(
    domainEvaluation: DomainEvaluationPropsNode,
  ): IntegrationEventEvaluationNodeBuilder {
    this.domainEvaluation = domainEvaluation;
    return this;
  }

  public build(): IntegrationEventEvaluationNode {
    this.integrationEventEvaluationNode.addChild(this.domainEvaluation);
    this.integrationEventEvaluationNode.addChild(this.identifierNode);

    this.integrationEventEvaluationNode.buildObjectValue();

    return this.integrationEventEvaluationNode;
  }
}
