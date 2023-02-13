import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class IntegrationVersionMapperNode extends IntermediateASTNode {
  private static classNodeName = 'integrationVersionMapper';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationVersionMapper,
      metadata,
      IntegrationVersionMapperNode.classNodeName,
    );
  }
}
