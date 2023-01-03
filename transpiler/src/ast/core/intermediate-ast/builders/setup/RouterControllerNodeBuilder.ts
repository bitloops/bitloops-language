import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { RESTControllerIdentifierNode } from '../../nodes/controllers/restController/RESTControllerIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../../nodes/setup/BoundedContextModuleNode.js';
import { HTTPMethodVerbNode } from '../../nodes/setup/HTTPMethodVerbNode.js';
import { RouterControllerNode } from '../../nodes/setup/RouterControllerNode.js';
import { IBuilder } from '../IBuilder.js';

export class RouterControllerNodeBuilder implements IBuilder<RouterControllerNode> {
  private routerControllerNode: RouterControllerNode;
  private methodNode: HTTPMethodVerbNode;
  private pathNode: PathStringNode;
  private bcModuleNode: BoundedContextModuleNode;
  private restControllerIdentifierNode: RESTControllerIdentifierNode;
  private argumentListNode: ArgumentListNode;

  constructor(metadata?: TNodeMetadata) {
    this.routerControllerNode = new RouterControllerNode(metadata);
  }

  public withMethod(methodNode: HTTPMethodVerbNode): RouterControllerNodeBuilder {
    this.methodNode = methodNode;
    return this;
  }

  public withPath(pathNode: PathStringNode): RouterControllerNodeBuilder {
    this.pathNode = pathNode;
    return this;
  }

  public withBoundedContextModule(
    bcModuleNode: BoundedContextModuleNode,
  ): RouterControllerNodeBuilder {
    this.bcModuleNode = bcModuleNode;
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
    this.routerControllerNode.addChild(this.bcModuleNode);
    this.routerControllerNode.addChild(this.restControllerIdentifierNode);
    this.routerControllerNode.addChild(this.argumentListNode);

    this.routerControllerNode.buildObjectValue();

    return this.routerControllerNode;
  }
}
