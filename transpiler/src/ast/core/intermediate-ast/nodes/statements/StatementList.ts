import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ReturnOKStatementNode } from './ReturnOKStatementNode.js';
import { StatementNode } from './Statement.js';

export class StatementListNode extends IntermediateASTNode {
  private static classNodeName = 'statements';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TStatements, metadata, StatementListNode.classNodeName);
  }

  get statements(): StatementNode[] {
    return this.getChildren() as StatementNode[];
  }

  getExpressionOfDeclaredIdentifier(identifierName: string): ExpressionNode | null {
    let expression: ExpressionNode = null;
    for (const statement of this.statements) {
      if (statement.isConstDeclarationNode() || statement.isVariableDeclarationNode()) {
        const identifierNode = statement.getIdentifier();
        if (identifierName === identifierNode.getIdentifierName()) {
          expression = statement.getExpressionValues();
        }
      }
    }
    return expression;
  }

  getParentStatementList(): StatementListNode | null {
    let parent = this.getParent();
    while (!parent.isRoot()) {
      if (parent instanceof StatementListNode) {
        return parent;
      }
      parent = parent.getParent();
    }
    return null;
  }

  getReturnOKStatements(): ReturnOKStatementNode[] {
    return this.getChildrenNodesByType(
      BitloopsTypesMapping.TReturnOKStatement,
    ) as ReturnOKStatementNode[];
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    for (const statement of this.statements) {
      statement.addToSymbolTable(symbolTableManager);
    }
  }
}
