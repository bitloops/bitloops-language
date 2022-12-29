import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { StringLiteralNode } from '../../nodes/Expression/Literal/StringLiteralNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RestServerNode } from '../../nodes/setup/RestServerNode.js';
import { ServerRoutesNode } from '../../nodes/setup/ServerRoutesNode.js';
import { ServerTypeIdentifierNode } from '../../nodes/setup/ServerTypeIdentifierNode.js';
import { SetupExpressionNode } from '../../nodes/setup/SetupExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

export class RestServerNodeBuilder implements IBuilder<RestServerNode> {
  private restServerNode: RestServerNode;
  private serverType: ServerTypeIdentifierNode;
  private port: SetupExpressionNode;
  private apiPrefix: StringLiteralNode;
  private routes: ServerRoutesNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, nodeMetadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.restServerNode = new RestServerNode(nodeMetadata);
  }

  public withServerType(serverType: ServerTypeIdentifierNode): RestServerNodeBuilder {
    this.serverType = serverType;
    return this;
  }

  public withPort(port: SetupExpressionNode): RestServerNodeBuilder {
    this.port = port;
    return this;
  }

  public withAPIPrefix(apiPrefix: StringLiteralNode): RestServerNodeBuilder {
    this.apiPrefix = apiPrefix;
    return this;
  }

  public withRoutes(routes: ServerRoutesNode): RestServerNodeBuilder {
    this.routes = routes;
    return this;
  }

  public build(): RestServerNode {
    this.intermediateASTTree.insertChild(this.restServerNode);
    this.intermediateASTTree.insertChild(this.serverType);
    this.intermediateASTTree.insertSibling(this.port);
    this.intermediateASTTree.insertSibling(this.apiPrefix);
    this.intermediateASTTree.insertSibling(this.routes);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.restServerNode.buildObjectValue();

    return this.restServerNode;
  }
}
