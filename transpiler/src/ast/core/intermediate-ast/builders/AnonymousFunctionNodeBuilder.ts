import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { StatementListNode } from '../nodes/statements/StatementList.js';
import { IBuilder } from './IBuilder.js';
import { AnonymousFunctionNode } from '../nodes/AnonymousFunctionNode.js';
import { ParameterListNode } from '../nodes/ParameterList/ParameterListNode.js';
import { ReturnStatementNode } from '../nodes/statements/ReturnStatementNode.js';

export class AnonymousFunctionNodeBuilder implements IBuilder<AnonymousFunctionNode> {
  private parameters?: ParameterListNode;
  private arrowFunctionBody: ReturnStatementNode | StatementListNode;
  private anonymousFunctionNode: AnonymousFunctionNode;

  constructor(metadata?: TNodeMetadata) {
    this.anonymousFunctionNode = new AnonymousFunctionNode(metadata);
  }

  public withArrowFunctionBody(
    arrowFunctionBody: ReturnStatementNode | StatementListNode,
  ): AnonymousFunctionNodeBuilder {
    this.arrowFunctionBody = arrowFunctionBody;
    return this;
  }

  public withParameters(parameters: ParameterListNode): AnonymousFunctionNodeBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): AnonymousFunctionNode {
    this.anonymousFunctionNode.addChild(this.arrowFunctionBody);
    if (this.parameters) this.anonymousFunctionNode.addChild(this.parameters);

    this.anonymousFunctionNode.buildObjectValue();

    return this.anonymousFunctionNode;
  }
}
