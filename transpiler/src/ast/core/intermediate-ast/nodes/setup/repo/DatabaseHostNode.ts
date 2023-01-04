import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class DatabaseHostNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'host';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRepoHost, DatabaseHostNode.classNodeName, metadata);
  }
}
