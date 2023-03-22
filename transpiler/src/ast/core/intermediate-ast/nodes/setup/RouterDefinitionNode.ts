import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { RouterExpressionNode } from './RouterExpressionNode.js';

export class RouterDefinitionNode extends IntermediateASTNode {
  private static classNodeName = 'routerDefinition';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterDefinition, metadata, RouterDefinitionNode.classNodeName);
  }

  public getRouterExpression(): RouterExpressionNode {
    const children = this.getChildren();
    const routerExpression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TRouterExpression,
    );
    if (!routerExpression) {
      throw new Error('Router expression not found');
    }
    return routerExpression as RouterExpressionNode;
  }

  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType(BitloopsTypesMapping.TIdentifier);
    if (!identifier) {
      throw new Error('Identifier not found');
    }
    return identifier as IdentifierNode;
  }
}
