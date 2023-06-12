import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { ReturnOkErrorTypeNode } from '../returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementNode } from '../statements/Statement.js';
import { StatementListNode } from '../statements/StatementList.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';

export class PrivateMethodDeclarationNode extends IntermediateASTNode {
  private static classNodeName = 'privateMethod';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPrivateMethod,
      metadata,
      PrivateMethodDeclarationNode.classNodeName,
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

  getMethodParameters(): ParameterNode[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getParameters();
  }

  getMethodParameterList(): ParameterListNode {
    return this.getChildNodeByType<ParameterListNode>(BitloopsTypesMapping.TParameterList);
  }

  getIdentifier(): string {
    return this.getChildNodeByType<IdentifierNode>(BitloopsTypesMapping.TIdentifier).getValue()
      .identifier;
  }

  public getMethodName(): string {
    const identifierNode = this.getChildNodeByType<IdentifierNode>(
      BitloopsTypesMapping.TIdentifier,
    );
    return identifierNode.getIdentifierName();
  }

  public getBitloopsPrimaryType(): BitloopsPrimaryTypeNode | null {
    return this.getChildNodeByType<BitloopsPrimaryTypeNode>(
      BitloopsTypesMapping.TBitloopsPrimaryType,
    );
  }

  public getReturnOkErrorType(): ReturnOkErrorTypeNode | null {
    return this.getChildNodeByType<ReturnOkErrorTypeNode>(BitloopsTypesMapping.TOkErrorReturnType);
  }

  public getReturnType(): ReturnOkErrorTypeNode | BitloopsPrimaryTypeNode {
    return this.getReturnOkErrorType() ?? this.getBitloopsPrimaryType();
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();
    const methodName = this.getIdentifier();
    const methodScope = symbolTableManager.findChildScope(methodName);
    symbolTableManager.setCurrentSymbolTable(methodScope);

    const methodParameterList = this.getMethodParameterList();
    methodParameterList.addToSymbolTable(symbolTableManager);

    const methodStatementList = this.getStatementList();
    methodStatementList.addToSymbolTable(symbolTableManager);
    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
  }
}
