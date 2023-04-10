import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';

export class ForStatementNode extends StatementNode {
  private static classNodeName = 'forStatement';

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TForStatement, metadata, ForStatementNode.classNodeName);
  }
}
