import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class EventHandlerBusDependenciesNode extends IntermediateASTNode {
  private static NAME = 'eventHandlerBusDependencies';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TEventHandlerBusDependencies,
      metadata,
      EventHandlerBusDependenciesNode.NAME,
    );
  }
}
