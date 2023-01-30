import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'notExpression';
// This would extend the ExpressionNode class instead
export class NotExpressionNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = NAME;
    this.nodeType = BitloopsTypesMapping.TNotExpression;
  }

  // 🔧 TODO: Add a method to get the child node
  // getExpression(): ExpressionNode {
  //   const children = this.getChildren();
  //   const expression = children.find((child) => child instanceof ExpressionNode);
  //   return expression
  // }
}
