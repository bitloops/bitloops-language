import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
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
}
