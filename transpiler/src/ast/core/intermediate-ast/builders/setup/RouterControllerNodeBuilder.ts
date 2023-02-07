import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { RESTControllerIdentifierNode } from '../../nodes/controllers/restController/RESTControllerIdentifierNode.js';
import { StringLiteralNode } from '../../nodes/Expression/Literal/StringLiteralNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ApiDeclarationNode } from '../../nodes/setup/Api/ApiDeclarationNode.js';
import { HTTPMethodVerbNode } from '../../nodes/setup/HTTPMethodVerbNode.js';
import { RouterControllerNode } from '../../nodes/setup/RouterControllerNode.js';
import { IBuilder } from '../IBuilder.js';

export class RouterControllerNodeBuilder implements IBuilder<RouterControllerNode> {
  private routerControllerNode: RouterControllerNode;
  private methodNode: HTTPMethodVerbNode;
  private pathNode: StringLiteralNode;
  private apiDeclarationNode: ApiDeclarationNode;
  private restControllerIdentifierNode: RESTControllerIdentifierNode;
  private argumentListNode: ArgumentListNode;

  constructor(metadata?: TNodeMetadata) {
    this.routerControllerNode = new RouterControllerNode(metadata);
  }

  public withMethod(methodNode: HTTPMethodVerbNode): RouterControllerNodeBuilder {
    this.methodNode = methodNode;
    return this;
  }

  public withPath(pathNode: StringLiteralNode): RouterControllerNodeBuilder {
    this.pathNode = pathNode;
    return this;
  }

  public withApiDeclaration(apiDeclarationNode: ApiDeclarationNode): RouterControllerNodeBuilder {
    this.apiDeclarationNode = apiDeclarationNode;
    return this;
  }

  public withControllerIdentifier(
    restControllerIdentifierNode: RESTControllerIdentifierNode,
  ): RouterControllerNodeBuilder {
    this.restControllerIdentifierNode = restControllerIdentifierNode;
    return this;
  }

  public withArguments(argumentListNode: ArgumentListNode): RouterControllerNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): RouterControllerNode {
    this.routerControllerNode.addChild(this.methodNode);
    this.routerControllerNode.addChild(this.pathNode);
    this.routerControllerNode.addChild(this.apiDeclarationNode);
    this.routerControllerNode.addChild(this.restControllerIdentifierNode);
    this.routerControllerNode.addChild(this.argumentListNode);

    this.routerControllerNode.buildObjectValue();

    return this.routerControllerNode;
  }
}
