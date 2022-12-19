import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { StatementNode } from '../../nodes/statements/Statement.js';

export class StatementListNodeBuilder implements IBuilder<StatementListNode> {
  private statementsNode: StatementListNode;
  private statements: StatementNode[];

  constructor(metadata?: TNodeMetadata) {
    this.statementsNode = new StatementListNode(metadata);
  }

  public withStatements(statements: StatementNode[]): StatementListNodeBuilder {
    this.statements = statements;
    return this;
  }

  public build(): StatementListNode {
    for (const statement of this.statements) {
      this.statementsNode.addChild(statement);
    }
    this.statementsNode.buildArrayValue();

    return this.statementsNode;
  }
}
