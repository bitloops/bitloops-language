import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterNode } from '../../nodes/ParameterList/ParameterNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { IBuilder } from '../IBuilder.js';

export class ParameterListNodeBuilder implements IBuilder<ParameterListNode> {
  private parameterListNode: ParameterListNode;
  private parameterNodes: ParameterNode[];

  constructor(metadata: TNodeMetadata) {
    this.parameterListNode = new ParameterListNode(metadata);
  }

  public withParameters(parameters: ParameterNode[]): ParameterListNodeBuilder {
    this.parameterNodes = parameters;
    return this;
  }

  public build(): ParameterListNode {
    this.parameterNodes.forEach((parameterNode) => {
      this.parameterListNode.addChild(parameterNode);
    });
    this.parameterListNode.buildArrayValue();

    return this.parameterListNode;
  }
}
