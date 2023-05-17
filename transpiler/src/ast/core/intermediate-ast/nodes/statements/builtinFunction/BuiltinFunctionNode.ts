import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { MethodCallSymbolEntry } from '../../../../../../semantic-analysis/type-inference/SymbolEntry.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNodeTypeGuards } from '../../../type-guards/intermediateASTNodeTypeGuards.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';

export class BuiltInFunctionNode extends StatementNode {
  private static classNodeName = 'builtInFunction';
  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TBuiltInFunction, metadata, BuiltInFunctionNode.classNodeName);
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const specificFunction = this.getChildren()[0];
    const symbolTable = symbolTableManager.getSymbolTable();
    if (IntermediateASTNodeTypeGuards.isAddDomainEvent(specificFunction)) {
      const leftExpression = specificFunction.getLeftExpression();
      leftExpression.typeCheck(symbolTable);

      const rightExpression = specificFunction.getRightExpression();
      rightExpression.addToSymbolTable(symbolTableManager);

      rightExpression.typeCheck(symbolTable);
      const leftExpressionKey = leftExpression.getIdentifierName();

      //Here add to symbol table the Add domain event statement
      const addDomainEventKey = symbolTableManager.appendMemberDot([
        leftExpressionKey,
        'addDomainEvent()',
      ]);

      symbolTable.insert(
        addDomainEventKey,
        new MethodCallSymbolEntry(specificFunction.getInferredType()),
      );
    } else if (IntermediateASTNodeTypeGuards.isApplyRules(specificFunction)) {
      const argumentListNode = specificFunction.getArgumentList();
      argumentListNode.addToSymbolTable(symbolTableManager);
    }
  }
}
