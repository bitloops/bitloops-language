import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class IntegrationEventEvaluationNode extends EvaluationNode {
  private static integrationEventNodeName = 'integrationEvent';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TIntegrationEventEvaluation;
    this.classNodeName = IntegrationEventEvaluationNode.integrationEventNodeName;
  }
}
