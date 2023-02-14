import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class DomainEventHandleNode extends IntermediateASTNode {
  private static NAME = 'handle';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TDomainEventHandlerHandleMethod,
      metadata,
      DomainEventHandleNode.NAME,
    );
  }
}
