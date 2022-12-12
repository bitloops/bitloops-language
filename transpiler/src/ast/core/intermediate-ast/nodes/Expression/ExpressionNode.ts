import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { IdentifierExpressionNode } from './IdentifierExpression.js';
import { MemberDotExpressionNode } from './MemberDot/MemberDotExpression.js';
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

  // get childrenIdentifiers(): string[] {
  //   if (this instanceof IdentifierExpressionNode) {
  //     return [this.getValue()];
  //   }

  //   if (this instanceof MethodCallExpressionNode) {
  //     return this.getExpression().childrenIdentifiers;
  //   }

  //   // if (this instanceof MemberDotExpressionNode) {
  //   //   return [...this.expression.childrenIdentifiers, this.identifierExpression.identifierName];
  //   // }
  //   return [];
  // }

  isIdentifierExpression(): this is IdentifierExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TIdentifierExpression;
  }

  isMethodCallExpression(): this is MethodCallExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TMethodCallExpression;
  }

  isMemberDotExpression(): this is MemberDotExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TMemberDotExpression;
  }
}
