import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ExpressionNode } from './Expression/ExpressionNode.js';
import { IdentifierNode } from './identifier/IdentifierNode.js';
import { TNodeMetadata } from './IntermediateASTNode.js';
import { StatementNode } from './statements/Statement.js';

const NAME = 'variableDeclaration';
export class VariableDeclarationNode extends StatementNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TVariableDeclaration, metadata, NAME);
  }

  getExpressionValues(): ExpressionNode {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expression || !expression.getChildren().length) {
      throw new Error('Expression not found');
    }
    return expression.getChildren()[0] as ExpressionNode;
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
