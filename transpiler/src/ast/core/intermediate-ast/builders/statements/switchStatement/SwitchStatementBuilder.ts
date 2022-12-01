import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { DefaultSwitchCaseNode } from '../../../nodes/statements/SwitchStatement/DefaultSwitchCase.js';
import { SwitchCasesNode } from '../../../nodes/statements/SwitchStatement/SwitchCases.js';
import { SwitchStatementNode } from '../../../nodes/statements/SwitchStatement/SwitchStatementNode.js';
import { IBuilder } from '../../IBuilder.js';

export class SwitchStatementBuilder implements IBuilder<SwitchStatementNode> {
  private switchStatementNode: SwitchStatementNode;
  private expression: ExpressionNode;
  private cases: SwitchCasesNode;
  private defaultCaseNode: DefaultSwitchCaseNode;

  constructor(metadata: TNodeMetadata) {
    this.switchStatementNode = new SwitchStatementNode(metadata);
  }

  public withExpression(expression: ExpressionNode): SwitchStatementBuilder {
    this.expression = expression;
    return this;
  }

  public withCases(cases: SwitchCasesNode): SwitchStatementBuilder {
    this.cases = cases;
    return this;
  }
  public withDefaultCase(defaultCase: DefaultSwitchCaseNode): SwitchStatementBuilder {
    this.defaultCaseNode = defaultCase;
    return this;
  }

  public build(): SwitchStatementNode {
    this.switchStatementNode.addChild(this.expression);
    this.switchStatementNode.addChild(this.cases);
    this.switchStatementNode.addChild(this.defaultCaseNode);
    this.switchStatementNode.buildObjectValue();

    return this.switchStatementNode;
  }
}
