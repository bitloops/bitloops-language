import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class IntegrationEventInputNode extends IntermediateASTNode {
  private static classNodeName = 'integrationEventInput';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationEventInput,
      metadata,
      IntegrationEventInputNode.classNodeName,
    );
  }
}
