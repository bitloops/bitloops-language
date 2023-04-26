import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { StatementListNode } from '../nodes/statements/StatementList.js';
import { IBuilder } from './IBuilder.js';
import { ReturnStatementNode } from '../nodes/statements/ReturnStatementNode.js';
import { ArrowFunctionBodyNode } from '../nodes/ArrowFunctionBodyNode.js';

export class ArrowFunctionBodyNodeBuilder implements IBuilder<ArrowFunctionBodyNode> {
  private body: ReturnStatementNode | StatementListNode;
  private arrowFunctionBodyNode: ArrowFunctionBodyNode;

  constructor(metadata?: TNodeMetadata) {
    this.arrowFunctionBodyNode = new ArrowFunctionBodyNode(metadata);
  }

  public withBody(body: ReturnStatementNode | StatementListNode): ArrowFunctionBodyNodeBuilder {
    this.body = body;
    return this;
  }

  public build(): ArrowFunctionBodyNode {
    this.arrowFunctionBodyNode.addChild(this.body);

    this.arrowFunctionBodyNode.buildObjectValue();

    return this.arrowFunctionBodyNode;
  }
}
