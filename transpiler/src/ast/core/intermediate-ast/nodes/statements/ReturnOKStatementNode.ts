import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { returnOKKey } from '../../../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from './Statement.js';

export class ReturnOKStatementNode extends StatementNode {
  private static classNodeName = returnOKKey;

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TReturnOKStatement, metadata, ReturnOKStatementNode.classNodeName);
  }
}
