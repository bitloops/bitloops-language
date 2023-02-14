import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class IntegrationEventHandlerIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'integrationEventHandlerIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationEventHandlerIdentifier,
      IntegrationEventHandlerIdentifierNode.classNodeName,
      metadata,
    );
  }
}
