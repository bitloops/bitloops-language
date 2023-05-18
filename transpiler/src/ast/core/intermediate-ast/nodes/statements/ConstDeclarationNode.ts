import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { AlreadyDefinedIdentifierError } from '../../../types.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from './Statement.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { VariableSymbolEntry } from '../../../../../semantic-analysis/type-inference/SymbolEntry.js';

const NAME = 'constDeclaration';
export class ConstDeclarationNode extends StatementNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TConstDeclaration, metadata, NAME);
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

  getTypeAnnotation(): BitloopsPrimaryTypeNode {
    const typeAnnotation = this.getChildNodeByType<BitloopsPrimaryTypeNode>(
      BitloopsTypesMapping.TBitloopsPrimaryType,
    );

    return typeAnnotation;
  }

  public typeCheck(symbolTable: SymbolTable): void {
    const identifierName = this.getIdentifier().getIdentifierName();

    const identifierType = symbolTable.lookupLocally(identifierName);
    if (identifierType) {
      throw new AlreadyDefinedIdentifierError(identifierName, this.getMetadata());
    }
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const expression = this.getExpression();
    const symbolTable = symbolTableManager.getSymbolTable();
    this.typeCheck(symbolTable);
    const identifier = this.getIdentifier().getIdentifierName();
    const typeAnnotation = this.getTypeAnnotation();

    expression.addToSymbolTable(symbolTableManager);

    if (typeAnnotation) {
      symbolTable.insert(
        identifier,
        new VariableSymbolEntry(typeAnnotation.getInferredType(), false),
      );
    } else {
      symbolTable.insert(
        identifier,
        new VariableSymbolEntry(expression.getInferredType(symbolTableManager), true),
      );
    }
  }
}
