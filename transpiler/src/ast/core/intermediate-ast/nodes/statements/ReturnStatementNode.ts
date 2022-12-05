import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from './Statement.js';

export class ReturnStatementNode extends StatementNode {
  private static classNodeName = 'return';

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TReturnStatement, metadata, ReturnStatementNode.classNodeName);
  }
}
