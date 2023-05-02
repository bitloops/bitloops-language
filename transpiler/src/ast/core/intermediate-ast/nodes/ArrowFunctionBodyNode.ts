import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';
import { ReturnErrorStatementNode } from './statements/ReturnErrorStatementNode.js';
import { ReturnStatementNode } from './statements/ReturnStatementNode.js';
import { StatementListNode } from './statements/StatementList.js';

export class ArrowFunctionBodyNode extends IntermediateASTNode {
  private static classNodeName = 'arrowFunctionBody';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TArrowFunctionBody, metadata, ArrowFunctionBodyNode.classNodeName);
  }

  getStatements(): StatementListNode {
    return this.getChildNodeByType<StatementListNode>(BitloopsTypesMapping.TStatements);
  }

  getReturnStatement(): ReturnStatementNode {
    return this.getChildNodeByType<ReturnStatementNode>(BitloopsTypesMapping.TReturnStatement);
  }

  getReturnErrorStatement(): ReturnErrorStatementNode {
    return this.getChildNodeByType<ReturnErrorStatementNode>(
      BitloopsTypesMapping.TReturnErrorStatement,
    );
  }
}
