import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';

export class IfStatementNode extends StatementNode {
  private static classNodeName = 'ifStatement';

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TIfStatement, metadata, IfStatementNode.classNodeName);
  }
}
