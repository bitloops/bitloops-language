import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ForStatementNode } from '../../nodes/statements/iteration/forStatementNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { VariableDeclarationNode } from '../../nodes/variableDeclaration.js';
import { IBuilder } from '../IBuilder.js';

export class ForStatementNodeBuilder implements IBuilder<ForStatementNode> {
  private iterationNode: ForStatementNode;
  private variableDeclaration: VariableDeclarationNode;
  private condition: ExpressionNode;
  private increment: ExpressionNode;
  private body: StatementListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.iterationNode = new ForStatementNode(nodeMetadata);
  }

  public withVariableDeclaration(
    variableDeclaration: VariableDeclarationNode,
  ): ForStatementNodeBuilder {
    this.variableDeclaration = variableDeclaration;
    return this;
  }

  public withCondition(condition: ExpressionNode): ForStatementNodeBuilder {
    this.condition = condition;
    return this;
  }

  public withIncrement(increment: ExpressionNode): ForStatementNodeBuilder {
    this.increment = increment;
    return this;
  }

  public withBody(body: StatementListNode): ForStatementNodeBuilder {
    this.body = body;

    return this;
  }

  public build(): ForStatementNode {
    this.iterationNode.addChild(this.variableDeclaration);
    this.iterationNode.addChild(this.condition);
    this.iterationNode.addChild(this.increment);
    this.iterationNode.addChild(this.body);

    return this.iterationNode;
  }
}
