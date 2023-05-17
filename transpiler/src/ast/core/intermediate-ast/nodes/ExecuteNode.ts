import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
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

  // addToSymbolTable(classA: ClassA): void {
  //   const symbolTable = classA.getSymbolTable();
  //   const executeScope = symbolTable.createChildScope(SCOPE_NAMES.EXECUTE, this);
  //   const executeParameter = this.getParameter();
  //   if (executeParameter) {
  //     executeParameter.addToSymbolTable(executeScope);
  //     // const paramName = paramNode.getIdentifier();
  //     // executeScope.insert(
  //     //   paramName,
  //     //   new ParameterSymbolEntry(inferType({ node: paramNode.getType() })),
  //     // );
  //   }
  // }
}
