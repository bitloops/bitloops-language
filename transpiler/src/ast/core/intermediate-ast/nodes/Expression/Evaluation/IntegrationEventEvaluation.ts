import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { IntegrationEventIdentifierNode } from '../../integration-event/IntegrationEventIdentifierNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class IntegrationEventEvaluationNode extends EvaluationNode {
  private static integrationEventNodeName = 'integrationEvent';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TIntegrationEventEvaluation;
    this.classNodeName = IntegrationEventEvaluationNode.integrationEventNodeName;
  }

  public override getIdentifierNode(): IntegrationEventIdentifierNode {
    return this.getChildNodeByType<IntegrationEventIdentifierNode>(
      BitloopsTypesMapping.TIntegrationEventIdentifier,
    );
  }

  public getInferredType(): string {
    const integrationEventIdentifier = this.getIdentifierNode().getValue().identifier;
    return integrationEventIdentifier;
  }
}
