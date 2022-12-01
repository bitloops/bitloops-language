import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { StatementsNode } from '../../../nodes/statements/Statements.js';
import { DefaultSwitchCaseNode } from '../../../nodes/statements/SwitchStatement/DefaultSwitchCase.js';
import { IBuilder } from '../../IBuilder.js';

export class DefaultSwitchCaseNodeBuilder implements IBuilder<DefaultSwitchCaseNode> {
  private defaultSwitchCaseNode: DefaultSwitchCaseNode;
  private statements: StatementsNode;

  constructor(metadata: TNodeMetadata) {
    this.defaultSwitchCaseNode = new DefaultSwitchCaseNode(metadata);
  }

  public withStatements(statements: StatementsNode): DefaultSwitchCaseNodeBuilder {
    this.statements = statements;
    return this;
  }

  public build(): DefaultSwitchCaseNode {
    this.defaultSwitchCaseNode.addChild(this.statements);
    this.defaultSwitchCaseNode.buildObjectValue();

    return this.defaultSwitchCaseNode;
  }
}
