import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RouterExpressionNode extends IntermediateASTNode {
  private static classNodeName = 'routerExpression';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterExpression, metadata, RouterExpressionNode.classNodeName);
  }
}
