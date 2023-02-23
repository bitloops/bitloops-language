import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class ConfigQueryBusNode extends IntermediateASTNode {
  private static classNodeName = 'queryBus';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TConfigQueryBus, metadata, ConfigQueryBusNode.classNodeName);
  }
}
