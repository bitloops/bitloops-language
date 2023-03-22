import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ThenStatementsNode } from '../../../nodes/statements/ifStatement/ThenStatements.js';
import { StatementListNode } from '../../../nodes/statements/StatementList.js';
import { IBuilder } from '../../IBuilder.js';

export class ThenStatementsNodeBuilder implements IBuilder<ThenStatementsNode> {
  private thenStatementsNode: ThenStatementsNode;
  private statements: StatementListNode;

  constructor(metadata: TNodeMetadata) {
    this.thenStatementsNode = new ThenStatementsNode(metadata);
  }

  public withStatements(statements: StatementListNode): ThenStatementsNodeBuilder {
    this.statements = statements;
    return this;
  }

  public build(): ThenStatementsNode {
    this.thenStatementsNode.addChild(this.statements);

    this.thenStatementsNode.buildObjectValue();

    return this.thenStatementsNode;
  }
}
