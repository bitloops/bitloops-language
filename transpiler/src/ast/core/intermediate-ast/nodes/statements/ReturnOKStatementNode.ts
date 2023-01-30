import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { returnOKKey } from '../../../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from './Statement.js';
import { StatementListNode } from './StatementList.js';

export class ReturnOKStatementNode extends StatementNode {
  private static classNodeName = returnOKKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TReturnOKStatement, metadata, ReturnOKStatementNode.classNodeName);
  }

  public getTopLevelStatementList(): StatementListNode | null {
    const statementListNode = this.getChildNodeByType(
      BitloopsTypesMapping.TStatements,
    ) as StatementListNode;
    return statementListNode;
  }
}
