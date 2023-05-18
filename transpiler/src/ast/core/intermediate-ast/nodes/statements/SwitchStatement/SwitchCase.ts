import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { ExpressionNode } from '../../Expression/ExpressionNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';
import { StatementListNode } from '../StatementList.js';

export class SwitchRegularCaseNode extends IntermediateASTNode {
  private static classNodeName = 'regularCase';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TSwitchCase, metadata, SwitchRegularCaseNode.classNodeName);
  }
  getStatements(): StatementNode[] {
    const statementList = this.getChildNodeByType<StatementListNode>(
      BitloopsTypesMapping.TStatements,
    );
    return statementList.statements;
  }

  public getExpression(): ExpressionNode {
    return this.getChildNodeByType<ExpressionNode>(BitloopsTypesMapping.TExpression);
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();
    const switchCaseExpression = this.getExpression();
    switchCaseExpression.typeCheck(initialSymbolTable);

    const caseCounter = symbolTableManager.increaseCaseCounter();
    const scopeName = SymbolTableManager.SCOPE_NAMES.CASE + caseCounter;
    symbolTableManager.createSymbolTableChildScope(scopeName, this);
    const caseStatements = this.getStatementListNode();
    caseStatements.addToSymbolTable(symbolTableManager);
    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
  }
}
