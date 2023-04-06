import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterListNode } from '../ParameterList/ParameterListNode.js';
import { ParameterNode } from '../ParameterList/ParameterNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { ReturnOkErrorTypeNode } from '../returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementNode } from '../statements/Statement.js';
import { StatementListNode } from '../statements/StatementList.js';

export class PublicMethodDeclarationNode extends IntermediateASTNode {
  private static classNodeName = 'publicMethod';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TPublicMethod, metadata, PublicMethodDeclarationNode.classNodeName);
  }

  getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    return statementList.statements;
  }

  getMethodParameters(): ParameterNode[] {
    const parameterList = this.getChildNodeByType<ParameterListNode>(
      BitloopsTypesMapping.TParameterList,
    );
    return parameterList.getParameters();
  }

  public getMethodName(): string {
    const identifierNode = this.getChildNodeByType<IdentifierNode>(
      BitloopsTypesMapping.TIdentifier,
    );
    return identifierNode.getIdentifierName();
  }

  public returnsOkError(): boolean {
    return (
      this.getChildNodeByType<ReturnOkErrorTypeNode>(BitloopsTypesMapping.TOkErrorReturnType) !==
      undefined
    );
  }
}
