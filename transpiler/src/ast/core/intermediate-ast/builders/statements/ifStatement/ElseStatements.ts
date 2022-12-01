import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ElseStatementsNode } from '../../../nodes/statements/ifStatement/ElseStatements.js';
import { StatementNode } from '../../../nodes/statements/Statement.js';
import { IBuilder } from '../../IBuilder.js';

export class ElseStatementsNodeBuilder implements IBuilder<ElseStatementsNode> {
  private elseStatementsNode: ElseStatementsNode;
  private statements: StatementNode[];

  constructor(metadata: TNodeMetadata) {
    this.elseStatementsNode = new ElseStatementsNode(metadata);
  }

  public withStatements(expression: StatementNode[]): ElseStatementsNodeBuilder {
    this.statements = expression;
    return this;
  }

  public build(): ElseStatementsNode {
    for (const statement of this.statements) {
      this.elseStatementsNode.addChild(statement);
    }
    this.elseStatementsNode.buildArrayValue();

    return this.elseStatementsNode;
  }
}
