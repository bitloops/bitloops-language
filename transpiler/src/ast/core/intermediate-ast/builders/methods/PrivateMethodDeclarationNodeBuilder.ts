import { BitloopsPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PrivateMethodDeclarationNode } from '../../nodes/methods/PrivateMethodDeclarationNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { IBuilder } from '../IBuilder.js';

export class PrivateMethodDeclarationNodeBuilder implements IBuilder<PrivateMethodDeclarationNode> {
  private privateMethodDeclarationNode: PrivateMethodDeclarationNode;
  private identifier: IdentifierNode;
  private parameters: ParameterListNode;
  private returnType: ReturnOkErrorTypeNode;
  private statements: StatementListNode;

  constructor(metadata: TNodeMetadata) {
    this.privateMethodDeclarationNode = new PrivateMethodDeclarationNode(metadata);
  }

  public withIdentifier(identifier: IdentifierNode): PrivateMethodDeclarationNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  public withParameters(parameters: ParameterListNode): PrivateMethodDeclarationNodeBuilder {
    this.parameters = parameters;
    return this;
  }

  public withReturnType(
    returnType: ReturnOkErrorTypeNode | BitloopsPrimaryTypeNode,
  ): PrivateMethodDeclarationNodeBuilder {
    this.returnType = returnType;
    return this;
  }

  public withStatements(statements: StatementListNode): PrivateMethodDeclarationNodeBuilder {
    this.statements = statements;
    return this;
  }

  public build(): PrivateMethodDeclarationNode {
    this.privateMethodDeclarationNode.addChild(this.identifier);
    this.privateMethodDeclarationNode.addChild(this.parameters);
    this.privateMethodDeclarationNode.addChild(this.returnType);
    this.privateMethodDeclarationNode.addChild(this.statements);

    this.privateMethodDeclarationNode.buildObjectValue();

    return this.privateMethodDeclarationNode;
  }
}
