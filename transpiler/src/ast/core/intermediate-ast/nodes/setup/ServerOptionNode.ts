import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ServerOptionNode extends IntermediateASTNode {
  private static classNodeName = 'serverOption';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TServerOption, metadata, ServerOptionNode.classNodeName);
  }
}
