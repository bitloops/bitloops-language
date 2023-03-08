import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { configInvocationKey } from '../../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../../IntermediateASTNode.js';

export class ConfigInvocationNode extends IntermediateASTNode {
  private static classNodeName = configInvocationKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TConfigInvocation, metadata, ConfigInvocationNode.classNodeName);
  }
}
