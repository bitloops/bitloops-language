import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { ReturnOkErrorTypeNode } from '../returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementNode } from '../statements/Statement.js';
import { StatementListNode } from '../statements/StatementList.js';

export class DomainCreateNode extends IntermediateASTNode {
  private static classNodeName = 'create';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainCreateMethod, metadata, DomainCreateNode.classNodeName);
  }

  getParameterNode(): ParameterNode {
    return this.getChildNodeByType<ParameterNode>(BitloopsTypesMapping.TParameter);
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

  getMethodParameters(): ParameterNode[] {
    const parameterNode = this.getParameterNode();
    if (!parameterNode) return [];
    return [parameterNode];
  }

  public getReturnOkErrorType(): ReturnOkErrorTypeNode | null {
    return this.getChildNodeByType<ReturnOkErrorTypeNode>(BitloopsTypesMapping.TOkErrorReturnType);
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();
    symbolTableManager.createSymbolTableChildScope(
      SymbolTableManager.SCOPE_NAMES.DOMAIN_CREATE,
      this,
    );
    const domainCreateParam = this.getParameterNode();
    domainCreateParam.addToSymbolTable(symbolTableManager);

    const domainCreateStatementList = this.getStatementList();
    domainCreateStatementList.addToSymbolTable(symbolTableManager);

    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
  }
}
