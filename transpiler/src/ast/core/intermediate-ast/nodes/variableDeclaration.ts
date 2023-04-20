import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../semantic-analysis/type-inference/SymbolTable.js';
import { AlreadyDefinedIdentifierError } from '../../types.js';
import { ExpressionNode } from './Expression/ExpressionNode.js';
import { IdentifierNode } from './identifier/IdentifierNode.js';
import { TNodeMetadata } from './IntermediateASTNode.js';
import { StatementNode } from './statements/Statement.js';

const NAME = 'variableDeclaration';
export class VariableDeclarationNode extends StatementNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TVariableDeclaration, metadata, NAME);
  }

  getExpressionValues(): ExpressionNode | null {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expression || !expression.getChildren().length) {
      return null;
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

  public typeCheck(symbolTable: SymbolTable): void {
    const identifierName = this.getIdentifier().getIdentifierName();
    const identifierType = symbolTable.lookup(identifierName);
    if (identifierType) {
      throw new AlreadyDefinedIdentifierError(identifierName, this.getMetadata());
    }
    // this.setType(identifierType.type);
  }
}
