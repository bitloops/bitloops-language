import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { IBuilder } from './IBuilder.js';
import { AnonymousFunctionNode } from '../nodes/AnonymousFunctionNode.js';
import { ParameterListNode } from '../nodes/ParameterList/ParameterListNode.js';
import { ArrowFunctionBodyNode } from '../nodes/ArrowFunctionBodyNode.js';

export class AnonymousFunctionNodeBuilder implements IBuilder<AnonymousFunctionNode> {
  private parameters: ParameterListNode;
  private arrowFunctionBody: ArrowFunctionBodyNode;
  private anonymousFunctionNode: AnonymousFunctionNode;

  constructor(metadata?: TNodeMetadata) {
    this.anonymousFunctionNode = new AnonymousFunctionNode(metadata);
  }

  public withArrowFunctionBody(
    arrowFunctionBody: ArrowFunctionBodyNode,
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
    this.anonymousFunctionNode.addChild(this.parameters);

    this.anonymousFunctionNode.buildObjectValue();

    return this.anonymousFunctionNode;
  }
}
