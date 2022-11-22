import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { ExpressionNode } from './Expression/ExpressionNode.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

const NAME = 'ConstDeclaration';
export class ConstDeclarationNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TConstDeclaration, { lines: lines! }, NAME);
  }

  getExpression(): ExpressionNode {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    )!;
    if (!expression) {
      throw new Error('Expression not found');
    }
    return expression as ExpressionNode;
  }
}
