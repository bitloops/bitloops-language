import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
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

  getStatementListNode(): StatementListNode {
    return this.getChildNodeByType<StatementListNode>(BitloopsTypesMapping.TStatements);
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();
    const elseStatementList = this.getStatementListNode();
    const elseCounter = initialSymbolTable.increaseElseCounter();

    const scopeName = SymbolTableManager.SCOPE_NAMES.ELSE + elseCounter;

    symbolTableManager.createSymbolTableChildScope(scopeName, this);
    elseStatementList.addToSymbolTable(symbolTableManager);
    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
  }
}
