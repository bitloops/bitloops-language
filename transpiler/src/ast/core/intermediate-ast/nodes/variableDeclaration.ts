import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ExpressionNode } from './Expression/ExpressionNode.js';
import { IdentifierNode } from './IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

const NAME = 'variableDeclaration';
export class VariableDeclarationNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TVariableDeclaration, metadata, NAME);
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

  getIdentifier(): IdentifierNode {
    const children = this.getChildren();
    const identifier = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TIdentifier,
    );
    if (!identifier) {
      throw new Error('Identifier not found');
    }
    return identifier as IdentifierNode;
  }
}