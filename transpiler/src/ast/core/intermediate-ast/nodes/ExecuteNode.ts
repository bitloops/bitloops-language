import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';
import { ParameterNode } from './ParameterList/ParameterNode.js';
import { ReturnOkErrorTypeNode } from './returnOkErrorType/ReturnOkErrorTypeNode.js';
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

  getStatementList(): StatementListNode {
    return this.getChildNodeByType<StatementListNode>(BitloopsTypesMapping.TStatements);
  }

  getParameter(): ParameterNode {
    const parameterNode = this.getChildNodeByType<ParameterNode>(BitloopsTypesMapping.TParameter);
    return parameterNode;
  }

  getReturnOkErrorTypeNodes(): ReturnOkErrorTypeNode[] {
    const returnOkErrorTypeNode = this.getChildNodeByType<ReturnOkErrorTypeNode>(
      BitloopsTypesMapping.TOkErrorReturnType,
    );
    return [returnOkErrorTypeNode];
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    symbolTableManager.createSymbolTableChildScope(SymbolTableManager.SCOPE_NAMES.EXECUTE, this);
    const executeParameter = this.getParameter();
    if (executeParameter) {
      executeParameter.addToSymbolTable(symbolTableManager);
    }

    const statementList = this.getStatementList();
    statementList.addToSymbolTable(symbolTableManager);
  }
}
