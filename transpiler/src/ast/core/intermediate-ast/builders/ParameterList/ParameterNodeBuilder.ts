import { ParameterIdentifierNode } from './../../nodes/ParameterList/ParameterIdentifierNode.js';
import { BitloopsPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ParameterNode } from '../../nodes/ParameterList/ParameterNode.js';
import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';

export class ParameterNodeBuilder implements IBuilder<ParameterNode> {
  private parameterNode: ParameterNode;
  private parameterTypeNode: BitloopsPrimaryTypeNode;
  private parameterIdentifierNode: ParameterIdentifierNode;

  constructor(metadata: TNodeMetadata) {
    this.parameterNode = new ParameterNode(metadata);
  }

  public withType(expression: BitloopsPrimaryTypeNode): ParameterNodeBuilder {
    this.parameterTypeNode = expression;
    return this;
  }

  public withIdentifier(parameterIdentifierNode: ParameterIdentifierNode): ParameterNodeBuilder {
    this.parameterIdentifierNode = parameterIdentifierNode;
    return this;
  }

  public build(): ParameterNode {
    this.parameterNode.addChild(this.parameterTypeNode);
    this.parameterNode.addChild(this.parameterIdentifierNode);
    this.parameterNode.buildObjectValue();

    return this.parameterNode;
  }
}
