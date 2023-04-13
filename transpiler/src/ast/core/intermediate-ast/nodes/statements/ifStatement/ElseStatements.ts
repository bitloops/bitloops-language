import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';
import { StatementListNode } from '../StatementList.js';

export class ElseStatementsNode extends IntermediateASTNode {
  private static classNodeName = 'elseStatements';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TElseStatements, metadata, ElseStatementsNode.classNodeName);
  }

  getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    return statementList.statements;
  }
}
