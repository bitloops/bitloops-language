import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';
import { ParameterNode } from './ParameterList/ParameterNode.js';
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

  getParameters(): ParameterNode[] {
    const parameterNode = this.getChildrenNodesByType<ParameterNode>(
      BitloopsTypesMapping.TParameter,
    );
    return parameterNode;
  }

  getParameter(): ParameterNode {
    return this.getChildNodeByType<ParameterNode>(BitloopsTypesMapping.TParameter);
  }

  getStatementList(): StatementListNode {
    return this.getChildNodeByType<StatementListNode>(BitloopsTypesMapping.TStatements);
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();
    symbolTableManager.createSymbolTableChildScope(SymbolTableManager.SCOPE_NAMES.HANDLE, this);
    const parameter = this.getParameter();
    symbolTableManager.addMetadataContext(parameter.getIdentifier());
    parameter.addToSymbolTable(symbolTableManager);

    const statementList = this.getStatementList();
    statementList.addToSymbolTable(symbolTableManager);
    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
  }
}
