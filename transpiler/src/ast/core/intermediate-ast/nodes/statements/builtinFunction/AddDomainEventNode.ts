import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { MethodCallSymbolEntry } from '../../../../../../semantic-analysis/type-inference/SymbolEntry.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { bitloopsPrimitivesObj } from '../../../../../../types.js';
import { ExpressionNode } from '../../Expression/ExpressionNode.js';
import { ThisExpressionNode } from '../../Expression/ThisExpressionNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ThisIdentifierNode } from '../../ThisIdentifier/ThisIdentifierNode.js';
import { IdentifierNode } from '../../identifier/IdentifierNode.js';
import { BuiltInFunctionNode } from './BuiltinFunctionNode.js';

const classNodeName = 'addDomainEvent';
const ADD_DOMAIN_EVENT = 'addDomainEvent()';
export class AddDomainEventNode extends BuiltInFunctionNode {
  constructor(metadata: TNodeMetadata) {
    super(metadata);
    this.setClassNodeName(classNodeName);
    this.setNodeType(BitloopsTypesMapping.TAddDomainEvent);
  }

  getRightExpression(): ExpressionNode {
    const expressionNode = this.getChildren().find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    ) as ExpressionNode;
    return expressionNode;
  }

  getLeftExpression(): IdentifierNode | ThisExpressionNode {
    const identifierNode = this.getChildren().find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TIdentifier,
    ) as IdentifierNode;

    if (identifierNode) {
      return identifierNode;
    } else {
      return this.getChildren().find(
        (child) => child.getNodeType() === BitloopsTypesMapping.TThisIdentifier,
      ) as ThisIdentifierNode;
    }
  }

  getInferredType(): string {
    return bitloopsPrimitivesObj.void;
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    const leftExpression = this.getLeftExpression();
    leftExpression.addToSymbolTable(symbolTableManager);

    const rightExpression = this.getRightExpression();
    rightExpression.addToSymbolTable(symbolTableManager);

    //Here add to symbol table the Add domain event statement
    const leftExpressionKey = leftExpression.getIdentifierName();
    const addDomainEventKey = symbolTableManager.joinWithDot([leftExpressionKey, ADD_DOMAIN_EVENT]);
    symbolTable.insert(addDomainEventKey, new MethodCallSymbolEntry(this.getInferredType()));
  }
}
