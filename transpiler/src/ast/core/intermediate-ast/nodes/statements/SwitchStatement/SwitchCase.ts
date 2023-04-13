import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
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
}
