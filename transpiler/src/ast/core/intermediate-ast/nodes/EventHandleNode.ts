import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';
import { StatementNode } from './statements/Statement.js';
import { StatementListNode } from './statements/StatementList.js';

export class EventHandleNode extends IntermediateASTNode {
  private static NAME = 'handle';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEventHandlerHandleMethod, metadata, EventHandleNode.NAME);
  }

  getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    return statementList.statements;
  }
}