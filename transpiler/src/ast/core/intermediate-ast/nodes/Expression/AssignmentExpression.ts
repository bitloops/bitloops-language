import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { VariableSymbolEntry } from '../../../../../semantic-analysis/type-inference/SymbolEntry.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { ConstVariableReassingedError } from '../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';
import { IdentifierExpressionNode } from './IdentifierExpression.js';
import { LeftExpressionNode } from './leftExpressionNode.js';

const NAME = 'assignmentExpression';
export class AssignmentExpressionNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TAssignmentExpression;
    this.classNodeName = NAME;
  }

  public getLeftExpression(): LeftExpressionNode {
    return this.getChildNodeByClassNodeName<LeftExpressionNode>(
      new LeftExpressionNode().getClassNodeName(),
    );
  }

  public getRightExpression(): ExpressionNode {
    return this.getChildNodeByClassNodeName<ExpressionNode>(
      new ExpressionNode().getClassNodeName(),
    );
  }

  public typeCheck(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    const leftExpression = this.getChildNodeByClassNodeName<LeftExpressionNode>(
      new LeftExpressionNode().getClassNodeName(),
    );
    const expressionNode = leftExpression.getChildren()[0];

    const identifierExpressionNode = expressionNode
      .getChildren()
      .find((child) => child instanceof IdentifierExpressionNode) as IdentifierExpressionNode;
    //if it does not find an identifierExpressionNode, it will return because it will be memberDotExpressionNode
    // and we do not want to check for that e.g. this.a = 1;
    if (identifierExpressionNode) {
      const identifierName = identifierExpressionNode.getValue().identifier;
      const identifierType = symbolTable.lookup(identifierName) as VariableSymbolEntry;
      if (identifierType && identifierType.isConstVariable()) {
        throw new ConstVariableReassingedError(identifierName, this.getMetadata());
      }
    }
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const leftExpression = this.getLeftExpression();
    leftExpression.addToSymbolTable(symbolTableManager);

    const rightExpression = this.getRightExpression();
    rightExpression.addToSymbolTable(symbolTableManager);
  }
}
