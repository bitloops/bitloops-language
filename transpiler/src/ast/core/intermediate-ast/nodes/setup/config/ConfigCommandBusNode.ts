import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class ConfigCommandBusNode extends IntermediateASTNode {
  private static classNodeName = 'commandBus';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TConfigCommandBus, metadata, ConfigCommandBusNode.classNodeName);
  }
}
