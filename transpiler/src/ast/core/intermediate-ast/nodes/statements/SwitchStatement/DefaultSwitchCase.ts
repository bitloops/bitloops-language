import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';
import { StatementListNode } from '../StatementList.js';

export class DefaultSwitchCaseNode extends IntermediateASTNode {
  private static classNodeName = 'defaultCase';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDefaultCase, metadata, DefaultSwitchCaseNode.classNodeName);
  }

  getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    if (!statementList) {
      return [];
    }
    return statementList.statements;
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();
    const defaultScopeName = SymbolTableManager.SCOPE_NAMES.DEFAULT;
    symbolTableManager.createSymbolTableChildScope(defaultScopeName, this);

    const defaultStatements = this.getStatementListNode();
    defaultStatements.addToSymbolTable(symbolTableManager);

    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
  }
}
