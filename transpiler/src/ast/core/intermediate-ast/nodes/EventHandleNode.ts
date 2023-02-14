import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

export class EventHandleNode extends IntermediateASTNode {
  private static NAME = 'handle';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEventHandlerHandleMethod, metadata, EventHandleNode.NAME);
  }
}
