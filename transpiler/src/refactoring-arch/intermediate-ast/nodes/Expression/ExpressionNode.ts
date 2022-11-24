import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { MethodCallExpressionNode } from './MethodCallExpression.js';

// export abstract class ExpressionNode extends IntermediateASTNode {
//   isMethodCallExpression(): this is MethodCallExpressionNode {
//     return this.getNodeType() === BitloopsTypesMapping.TMethodCallExpression;
//   }
// }

export class ExpressionNode extends IntermediateASTNode {
  private static classNodeName = 'expression';
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TExpression, metadata, ExpressionNode.classNodeName);
  }

  isMethodCallExpression(): this is MethodCallExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TMethodCallExpression;
  }
}
export class BitloopsPrimaryTypeNode extends IntermediateASTNode {}
