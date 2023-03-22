import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from './../IntermediateASTNode.js';
import { StatementNode } from './Statement.js';

export class BreakStatementNode extends StatementNode {
  private static classNodeName = 'breakStatement';

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TBreakStatement, metadata, BreakStatementNode.classNodeName);
  }
}
