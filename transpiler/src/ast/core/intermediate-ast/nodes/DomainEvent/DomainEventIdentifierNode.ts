import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { DomainEventIdentifierKey } from '../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class DomainEventIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = DomainEventIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TDomainEventIdentifier,
      DomainEventIdentifierNode.classNodeName,
      metadata,
    );
  }
}
