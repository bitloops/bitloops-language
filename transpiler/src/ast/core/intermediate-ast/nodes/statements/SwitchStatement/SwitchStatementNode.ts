import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { ExpressionNode } from '../../Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';
import { DefaultSwitchCaseNode } from './DefaultSwitchCase.js';
import { SwitchRegularCaseNode } from './SwitchCase.js';
import { SwitchCaseListNode } from './SwitchCases.js';

export class SwitchStatementNode extends StatementNode {
  private static classNodeName = 'switchStatement';

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TSwitchStatement, metadata, SwitchStatementNode.classNodeName);
  }

  public getExpression(): ExpressionNode {
    return this.getChildNodeByType<ExpressionNode>(BitloopsTypesMapping.TExpression);
  }

  public getCases(): SwitchRegularCaseNode[] {
    const casesListNode: SwitchCaseListNode = this.getCaseList();
    return casesListNode.getCases();
  }

  public getCaseList(): SwitchCaseListNode {
    return this.getChildNodeByType<SwitchCaseListNode>(BitloopsTypesMapping.TSwitchCases);
  }

  public getDefaultCase(): DefaultSwitchCaseNode {
    const defaultCaseNode: DefaultSwitchCaseNode = this.getChildNodeByType<DefaultSwitchCaseNode>(
      BitloopsTypesMapping.TDefaultCase,
    );
    return defaultCaseNode;
  }

  /**
   * It returns an array of the ExpressionNodes including in the switch statement
   * we use it in domainRule nodeTransformer to prepend `this` to every
   * parameter of the domainRule which is used in the switch statement
   * we check the switchExpression, cases and default case
   */
  getAllExpressions(): ExpressionNode[] {
    const switchExpression = this.getExpression();
    const switchCaseExpressions: ExpressionNode[] = [];
    const defaultCaseExpressions: ExpressionNode[] = [];

    //cases
    const switchCases = this.getCases();
    switchCases.forEach((switchCase) => {
      switchCaseExpressions.push(switchCase.getExpression());
      const switchCaseStatements = switchCase.getStatements();
      switchCaseStatements.forEach((statement) => {
        if (statement.getExpression()) switchCaseExpressions.push(statement.getExpression());
      });
    });

    //default
    const defaultCase = this.getDefaultCase();
    const defaultCaseStatements = defaultCase.getStatements();
    defaultCaseStatements.forEach((statement) => {
      if (statement.getExpression()) defaultCaseExpressions.push(statement.getExpression());
    });

    return [switchExpression, ...switchCaseExpressions, ...defaultCaseExpressions];
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();
    const switchCounter = initialSymbolTable.increaseSwitchCounter();
    const scopeName = SymbolTableManager.SCOPE_NAMES.SWITCH + switchCounter;
    symbolTableManager.createSymbolTableChildScope(scopeName, this);

    const switchExpression = this.getExpression();
    switchExpression.typeCheck(symbolTableManager);
    switchExpression.addToSymbolTable(symbolTableManager);

    const switchCaseList = this.getCaseList();
    switchCaseList.addToSymbolTable(symbolTableManager);

    const defaultCase = this.getDefaultCase();
    defaultCase.addToSymbolTable(symbolTableManager);
    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
  }
}
