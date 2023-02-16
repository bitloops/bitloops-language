import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';
import { StatementNode } from './statements/Statement.js';
import { StatementListNode } from './statements/StatementList.js';

export class ExecuteNode extends IntermediateASTNode {
  private static classNodeName = 'execute';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TExecute, metadata, ExecuteNode.classNodeName);
  }

  getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    return statementList.statements;
  }
}
