import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ServerOptionsNode extends IntermediateASTNode {
  private static classNodeName = 'serverOptions';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TServerOptions, metadata, ServerOptionsNode.classNodeName);
  }
}
