import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class IntegrationEventIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'integrationEventIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationEventIdentifier,
      IntegrationEventIdentifierNode.classNodeName,
      metadata,
    );
  }
}
