import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PublicMethodDeclarationNode } from '../../nodes/methods/PublicMethodDeclarationNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { IBuilder } from '../IBuilder.js';

export class PublicMethodDeclarationNodeBuilder implements IBuilder<PublicMethodDeclarationNode> {
  private publicMethodDeclarationNode: PublicMethodDeclarationNode;
  private identifier: IdentifierNode;
  private parameters: ParameterListNode;
  private returnType: ReturnOkErrorTypeNode;
  private statements: StatementListNode;

  constructor(metadata: TNodeMetadata) {
    this.publicMethodDeclarationNode = new PublicMethodDeclarationNode(metadata);
  }

  public withIdentifier(identifier: IdentifierNode): PublicMethodDeclarationNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  public withParameters(parameters: ParameterListNode): PublicMethodDeclarationNodeBuilder {
    this.parameters = parameters;
    return this;
  }

  public withReturnType(returnType: ReturnOkErrorTypeNode): PublicMethodDeclarationNodeBuilder {
    this.returnType = returnType;
    return this;
  }

  public withStatements(statements: StatementListNode): PublicMethodDeclarationNodeBuilder {
    this.statements = statements;
    return this;
  }

  public build(): PublicMethodDeclarationNode {
    this.publicMethodDeclarationNode.addChild(this.identifier);
    this.publicMethodDeclarationNode.addChild(this.parameters);
    this.publicMethodDeclarationNode.addChild(this.returnType);
    this.publicMethodDeclarationNode.addChild(this.statements);

    this.publicMethodDeclarationNode.buildObjectValue();

    return this.publicMethodDeclarationNode;
  }
}
