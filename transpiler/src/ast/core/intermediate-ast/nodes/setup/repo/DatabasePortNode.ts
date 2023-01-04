import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class DatabasePortNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'port';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRepoConfigPort, DatabasePortNode.classNodeName, metadata);
  }
}
