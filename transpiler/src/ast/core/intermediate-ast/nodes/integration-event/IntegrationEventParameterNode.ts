import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class IntegrationEventParameterNode extends IntermediateASTNode {
  private static classNodeName = 'integrationEventParameter';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationEventParameter,
      metadata,
      IntegrationEventParameterNode.classNodeName,
    );
  }
}
