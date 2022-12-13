import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ThenStatementsNode } from '../../../nodes/statements/ifStatement/ThenStatements.js';
import { StatementNode } from '../../../nodes/statements/Statement.js';
import { IBuilder } from '../../IBuilder.js';

export class ThenStatementsNodeBuilder implements IBuilder<ThenStatementsNode> {
  private thenStatementsNode: ThenStatementsNode;
  private statements: StatementNode[];

  constructor(metadata: TNodeMetadata) {
    this.thenStatementsNode = new ThenStatementsNode(metadata);
  }

  public withStatements(statements: StatementNode[]): ThenStatementsNodeBuilder {
    this.statements = statements;
    return this;
  }

  public build(): ThenStatementsNode {
    for (const statement of this.statements) {
      this.thenStatementsNode.addChild(statement);
    }
    this.thenStatementsNode.buildArrayValue();

    return this.thenStatementsNode;
  }
}
