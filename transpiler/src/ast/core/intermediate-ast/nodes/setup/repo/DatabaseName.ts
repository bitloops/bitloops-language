import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class DatabaseNameNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'databaseName';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRepoDatabase, DatabaseNameNode.classNodeName, metadata);
  }
}
