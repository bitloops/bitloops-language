import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class DatabaseTypeNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'dbType';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRepoDatabaseType, DatabaseTypeNode.classNodeName, metadata);
  }
}
