import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';
import { MethodCallExpressionNode } from './MethodCallExpression.js';

export abstract class ExpressionNode extends IntermediateASTNode {
  isMethodCallExpression(): this is MethodCallExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TMethodCallExpression;
  }
}
