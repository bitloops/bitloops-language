import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class ConfigEventBusNode extends IntermediateASTNode {
  private static classNodeName = 'eventBus';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TConfigEventBus, metadata, ConfigEventBusNode.classNodeName);
  }
}
