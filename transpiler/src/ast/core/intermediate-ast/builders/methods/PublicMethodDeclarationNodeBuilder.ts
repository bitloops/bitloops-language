import { BitloopsPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PublicMethodDeclarationNode } from '../../nodes/methods/PublicMethodDeclarationNode.js';
import { StaticNode } from '../../nodes/methods/StaticNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { IBuilder } from '../IBuilder.js';

export class PublicMethodDeclarationNodeBuilder implements IBuilder<PublicMethodDeclarationNode> {
  private publicMethodDeclarationNode: PublicMethodDeclarationNode;
  private identifier: IdentifierNode;
  private parameters: ParameterListNode;
  private returnType: ReturnOkErrorTypeNode | BitloopsPrimaryTypeNode;
  private statements: StatementListNode;
  private staticNode: StaticNode;

  constructor(metadata?: TNodeMetadata) {
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

  public withReturnType(
    returnType: ReturnOkErrorTypeNode | BitloopsPrimaryTypeNode,
  ): PublicMethodDeclarationNodeBuilder {
    this.returnType = returnType;
    return this;
  }

  public withStatements(statements: StatementListNode): PublicMethodDeclarationNodeBuilder {
    this.statements = statements;
    return this;
  }

  public withStatic(staticNode: StaticNode): PublicMethodDeclarationNodeBuilder {
    this.staticNode = staticNode;
    return this;
  }

  public build(): PublicMethodDeclarationNode {
    this.publicMethodDeclarationNode.addChild(this.identifier);
    this.publicMethodDeclarationNode.addChild(this.parameters);
    this.publicMethodDeclarationNode.addChild(this.returnType);
    this.publicMethodDeclarationNode.addChild(this.statements);
    this.publicMethodDeclarationNode.addChild(this.staticNode);

    this.publicMethodDeclarationNode.buildObjectValue();

    return this.publicMethodDeclarationNode;
  }
}
