import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';

export class ForOfStatementNode extends StatementNode {
  private static classNodeName = 'forOfStatement';

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TForOfStatement, metadata, ForOfStatementNode.classNodeName);
  }
}
