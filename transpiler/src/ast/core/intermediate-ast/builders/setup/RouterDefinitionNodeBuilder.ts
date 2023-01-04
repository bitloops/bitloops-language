import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RouterDefinitionNode } from '../../nodes/setup/RouterDefinitionNode.js';
import { RouterExpressionNode } from '../../nodes/setup/RouterExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

export class RouterDefinitionNodeBuilder implements IBuilder<RouterDefinitionNode> {
  private routerDefinitionNode: RouterDefinitionNode;
  private identifierNode: IdentifierNode;
  private routerExpressionNode: RouterExpressionNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.routerDefinitionNode = new RouterDefinitionNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): RouterDefinitionNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withExpression(routerExpressionNode: RouterExpressionNode): RouterDefinitionNodeBuilder {
    this.routerExpressionNode = routerExpressionNode;
    return this;
  }

  public build(): RouterDefinitionNode {
    this.intermediateASTTree.insertChild(this.routerDefinitionNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.routerExpressionNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.routerDefinitionNode.buildObjectValue();

    return this.routerDefinitionNode;
  }
}
