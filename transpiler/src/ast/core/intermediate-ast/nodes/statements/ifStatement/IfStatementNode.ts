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
