import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class IntegrationVersionMapperListNode extends IntermediateASTNode {
  private static classNodeName = 'integrationVersionMappers';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationVersionMappers,
      metadata,
      IntegrationVersionMapperListNode.classNodeName,
    );
  }
}
