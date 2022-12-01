import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';
import { StatementsNode } from '../../nodes/statements/Statements.js';
import { StatementNode } from '../../nodes/statements/Statement.js';

export class StatementsNodeBuilder implements IBuilder<StatementsNode> {
  private statementsNode: StatementsNode;
  private statements: StatementNode[];

  constructor(metadata: TNodeMetadata) {
    this.statementsNode = new StatementsNode(metadata);
  }

  public withStatements(statements: StatementNode[]): StatementsNodeBuilder {
    this.statements = statements;
    return this;
  }

  public build(): StatementsNode {
    for (const statement of this.statements) {
      this.statementsNode.addChild(statement);
    }
    this.statementsNode.buildArrayValue();

    return this.statementsNode;
  }
}
