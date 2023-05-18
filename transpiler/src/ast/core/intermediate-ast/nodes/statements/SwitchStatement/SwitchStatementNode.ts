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

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    const switchExpression = this.getExpression();
    switchExpression.typeCheck(symbolTable);
    switchExpression.addToSymbolTable(symbolTableManager);

    const switchCaseList = this.getCaseList();
    switchCaseList.addToSymbolTable(symbolTableManager);

    const defaultCase = this.getDefaultCase();
    defaultCase.addToSymbolTable(symbolTableManager);
  }
}
