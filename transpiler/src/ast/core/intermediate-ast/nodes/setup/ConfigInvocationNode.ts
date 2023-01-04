import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ConfigInvocationNode extends IntermediateASTNode {
  private static classNodeName = 'configInvocation';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TConfigInvocation, metadata, ConfigInvocationNode.classNodeName);
  }
}
