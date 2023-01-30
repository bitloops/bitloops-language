import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
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
}
