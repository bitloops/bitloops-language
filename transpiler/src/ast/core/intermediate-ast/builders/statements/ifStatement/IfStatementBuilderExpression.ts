import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ConditionNode } from '../../../nodes/statements/ifStatement/ConditionNode.js';
import { ElseStatementsNode } from '../../../nodes/statements/ifStatement/ElseStatements.js';
import { IfStatementNode } from '../../../nodes/statements/ifStatement/IfStatementNode.js';
import { ThenStatementsNode } from '../../../nodes/statements/ifStatement/ThenStatements.js';
import { IBuilder } from '../../IBuilder.js';

export class IfStatementBuilder implements IBuilder<IfStatementNode> {
  private ifStatementNode: IfStatementNode;
  private conditionNode: ConditionNode;
  private thenStatementsNode: ThenStatementsNode;
  private elseStatementsNode?: ElseStatementsNode;

  constructor(metadata: TNodeMetadata) {
    this.ifStatementNode = new IfStatementNode(metadata);
  }

  public withCondition(condition: ConditionNode): IfStatementBuilder {
    this.conditionNode = condition;
    return this;
  }
  public withThenStatements(thenStatements: ThenStatementsNode): IfStatementBuilder {
    this.thenStatementsNode = thenStatements;
    return this;
  }
  public withElseStatements(elseStatements: ElseStatementsNode): IfStatementBuilder {
    this.elseStatementsNode = elseStatements;
    return this;
  }

  public build(): IfStatementNode {
    this.ifStatementNode.addChild(this.conditionNode);
    this.ifStatementNode.addChild(this.thenStatementsNode);
    if (this.elseStatementsNode) {
      this.ifStatementNode.addChild(this.elseStatementsNode);
    }
    this.ifStatementNode.buildObjectValue();

    return this.ifStatementNode;
  }
}
