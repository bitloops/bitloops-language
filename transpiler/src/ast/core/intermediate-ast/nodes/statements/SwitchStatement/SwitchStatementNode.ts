import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { SCOPE_NAMES } from '../../../../../../semantic-analysis/type-inference/TypeInferenceValidator.js';
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
    const casesListNode: SwitchCaseListNode = this.getChildNodeByType<SwitchCaseListNode>(
      BitloopsTypesMapping.TSwitchCases,
    );
    return casesListNode.getCases();
  }

  public getDefaultCase(): DefaultSwitchCaseNode {
    const defaultCaseNode: DefaultSwitchCaseNode = this.getChildNodeByType<DefaultSwitchCaseNode>(
      BitloopsTypesMapping.TDefaultCase,
    );
    return defaultCaseNode;
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const switchExpression = this.getExpression();
    const symbolTable = symbolTableManager.getSymbolTable();
    switchExpression.typeCheck(symbolTable);
    switchExpression.addToSymbolTable(symbolTableManager);

    const switchCounter = symbolTableManager.increaseSwitchCounter();
    const scopeName = SCOPE_NAMES.SWITCH + switchCounter;

    const switchScope = symbolTable.createChildScope(scopeName, this);
    const switchCases = this.getCases();
    switchCases.forEach((switchCase) => {
      const switchCaseExpression = switchCase.getExpression();
      switchCaseExpression.typeCheck(switchScope);

      symbolTableManager.createSymbolTableChildScope(scopeName, this);
      const caseStatements = switchCase.getStatementListNode();
      caseStatements.addToSymbolTable(symbolTableManager);
    });
    const defaultCase = this.getDefaultCase();
    const defaultScopeName = SCOPE_NAMES.DEFAULT + switchCounter;
    symbolTableManager.createSymbolTableChildScope(defaultScopeName, this);
    const defaultStatements = defaultCase.getStatementListNode();
    defaultStatements.addToSymbolTable(symbolTableManager);
  }
}
