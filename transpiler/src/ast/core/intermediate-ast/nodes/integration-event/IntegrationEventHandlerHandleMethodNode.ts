import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from '../statements/Statement.js';
import { StatementListNode } from '../statements/StatementList.js';
import { IntegrationEventParameterNode } from './IntegrationEventParameterNode.js';

export class IntegrationEventHandlerHandleMethodNode extends IntermediateASTNode {
  private static NAME = 'integrationEventHandlerHandleMethod';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TIntegrationEventHandlerHandleMethod,
      metadata,
      IntegrationEventHandlerHandleMethodNode.NAME,
    );
  }

  getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    return statementList.statements;
  }

  getStatementList(): StatementListNode {
    return this.getChildNodeByType<StatementListNode>(BitloopsTypesMapping.TStatements);
  }

  getParameter(): IntegrationEventParameterNode {
    const parameterNode = this.getChildNodeByType<IntegrationEventParameterNode>(
      BitloopsTypesMapping.TIntegrationEventParameter,
    );
    return parameterNode;
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();
    symbolTableManager.createSymbolTableChildScope(SymbolTableManager.SCOPE_NAMES.HANDLE, this);
    const handleParam = this.getParameter();
    handleParam.addToSymbolTable(symbolTableManager);

    const statements = this.getStatementList();
    statements.addToSymbolTable(symbolTableManager);
    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
  }
}
