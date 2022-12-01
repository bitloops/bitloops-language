import { StatementsNode } from './../../../nodes/statements/Statements.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ThenStatementsNode as ExpressionNode } from '../../../nodes/statements/ifStatement/ThenStatements.js';
import { SwitchRegularCaseNode } from '../../../nodes/statements/SwitchStatement/SwitchCase.js';
import { IBuilder } from '../../IBuilder.js';

export class SwitchRegularCaseBuilder implements IBuilder<SwitchRegularCaseNode> {
  private regularCase: SwitchRegularCaseNode;
  private expression: ExpressionNode;
  private statements: StatementsNode;

  constructor(metadata: TNodeMetadata) {
    this.regularCase = new SwitchRegularCaseNode(metadata);
  }

  public withExpression(expression: ExpressionNode): SwitchRegularCaseBuilder {
    this.expression = expression;
    return this;
  }

  public withStatements(statements: StatementsNode): SwitchRegularCaseBuilder {
    this.statements = statements;
    return this;
  }

  public build(): SwitchRegularCaseNode {
    this.regularCase.addChild(this.expression);
    this.regularCase.addChild(this.statements);
    this.regularCase.buildObjectValue();

    return this.regularCase;
  }
}
