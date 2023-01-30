import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ServerTypeIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'serverType';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TServerType, ServerTypeIdentifierNode.classNodeName, metadata);
  }
}
