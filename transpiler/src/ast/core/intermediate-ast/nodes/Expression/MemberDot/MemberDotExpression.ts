import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ExpressionNode } from '../ExpressionNode.js';
import { IdentifierExpressionNode } from '../IdentifierExpression.js';

export class MemberDotExpressionNode extends ExpressionNode {
  private static NAME = 'memberDotExpression';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = MemberDotExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TMemberDotExpression;
  }

  getExpression(): ExpressionNode {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expression) {
      throw new Error('Expression not found');
    }
    return expression as ExpressionNode;
  }

  getIdentifierExpression(): IdentifierExpressionNode {
    const children = this.getChildren();
    const identifier = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TIdentifierExpression,
    );
    if (!identifier) {
      throw new Error('Identifier not found');
    }
    return identifier as IdentifierExpressionNode;
  }
}
