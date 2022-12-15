import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ElseStatementsNode } from '../../../nodes/statements/ifStatement/ElseStatements.js';
import { StatementListNode } from '../../../nodes/statements/StatementList.js';
import { IBuilder } from '../../IBuilder.js';

export class ElseStatementsNodeBuilder implements IBuilder<ElseStatementsNode> {
  private elseStatementsNode: ElseStatementsNode;
  private statements: StatementListNode;

  constructor(metadata: TNodeMetadata) {
    this.elseStatementsNode = new ElseStatementsNode(metadata);
  }

  public withStatements(expression: StatementListNode): ElseStatementsNodeBuilder {
    this.statements = expression;
    return this;
  }

  public build(): ElseStatementsNode {
    this.elseStatementsNode.addChild(this.statements);

    this.elseStatementsNode.buildObjectValue();

    return this.elseStatementsNode;
  }
}
