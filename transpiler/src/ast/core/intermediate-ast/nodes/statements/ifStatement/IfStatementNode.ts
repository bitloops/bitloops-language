import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { ExpressionNode } from '../../Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';
import { StatementListNode } from '../StatementList.js';
import { ConditionNode } from './ConditionNode.js';
import { ElseStatementsNode } from './ElseStatements.js';
import { ThenStatementsNode } from './ThenStatements.js';

export class IfStatementNode extends StatementNode {
  private static classNodeName = 'ifStatement';

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TIfStatement, metadata, IfStatementNode.classNodeName);
  }

  getConditionExpression(): ExpressionNode {
    return this.getConditionNode().expression;
  }

  getThenStatements(): StatementNode[] {
    const thenNode = this.getThenNode();
    if (!thenNode) throw new Error('No then node found');
    return thenNode.getStatements();
  }

  getThenStatementList(): StatementListNode {
    const thenNode = this.getThenNode();
    if (!thenNode) throw new Error('No then node found');
    return thenNode.getStatementList();
  }

  hasElseBlock(): boolean {
    return !!this.getElseNode();
  }

  getElseStatements(): StatementNode[] {
    const elseNode = this.getElseNode();
    return elseNode.getStatements();
  }

  getElseStatementList(): StatementListNode {
    const elseNode = this.getElseNode();
    if (!elseNode) throw new Error('No then node found');
    return elseNode.getStatementListNode();
  }

  /**
   * It returns an array of the ExpressionNodes including in the if statement
   * we use it in domainRule nodeTransformer to prepend `this` to every
   * parameter of the domainRule which is used in the if statement
   * we check the condition, thenStatements and elseStatements
   */
  getAllExpressions(): ExpressionNode[] {
    const conditionExpression = this.getConditionExpression();
    const thenStatements = this.getThenStatements();
    const thenExpressions: ExpressionNode[] = [];
    thenStatements.forEach((statement) => {
      thenExpressions.push(statement.getExpression());
    });
    const elseStatements = this.getElseStatements();
    const elseExpressions: ExpressionNode[] = [];
    elseStatements.forEach((statement) => {
      elseExpressions.push(statement.getExpression());
    });

    return [conditionExpression, ...thenExpressions, ...elseExpressions];
  }

  public getConditionNode(): ConditionNode {
    return this.getChildNodeByType<ConditionNode>(BitloopsTypesMapping.TCondition);
  }

  private getThenNode(): ThenStatementsNode {
    return this.getChildNodeByType<ThenStatementsNode>(BitloopsTypesMapping.TThenStatements);
  }
  private getElseNode(): ElseStatementsNode {
    return this.getChildNodeByType<ElseStatementsNode>(BitloopsTypesMapping.TElseStatements);
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();
    const conditionExpression = this.getConditionExpression();
    conditionExpression.addToSymbolTable(symbolTableManager);

    const ifCounter = initialSymbolTable.increaseIfCounter();
    const scopeName = SymbolTableManager.SCOPE_NAMES.IF + ifCounter;

    symbolTableManager.createSymbolTableChildScope(scopeName, this);

    const thenStatementList = this.getThenStatementList();
    thenStatementList.addToSymbolTable(symbolTableManager);
    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);

    if (this.hasElseBlock()) {
      const elseNode = this.getElseNode();
      elseNode.addToSymbolTable(symbolTableManager);
    }
    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
  }
}
