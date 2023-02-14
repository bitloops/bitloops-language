import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class DomainEventHandlerIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'domainEventHandlerIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TDomainEventHandlerIdentifier,
      DomainEventHandlerIdentifierNode.classNodeName,
      metadata,
    );
  }
}
