import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from '../../directors/BitloopsPrimaryTypeNodeBuilderDirector.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
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

  static getCommandBusMethodType(): Record<string, BitloopsPrimaryTypeNode> {
    return {
      send: new BitloopsPrimaryTypeNodeBuilderDirector().buildPrimitivePrimaryType('void'),
    };
  }
}
