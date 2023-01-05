import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ServerOptionsNode } from '../../nodes/setup/ServerOptionsNode.js';
import { EvaluationFieldListNode } from '../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';

export class ServerOptionsNodeBuilder implements IBuilder<ServerOptionsNode> {
  private serverOptionsNode: ServerOptionsNode;
  private fieldList: EvaluationFieldListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.serverOptionsNode = new ServerOptionsNode(nodeMetadata);
  }

  public withFields(fieldList: EvaluationFieldListNode): ServerOptionsNodeBuilder {
    this.fieldList = fieldList;
    return this;
  }

  public build(): ServerOptionsNode {
    this.serverOptionsNode.addChild(this.fieldList);
    this.serverOptionsNode.buildObjectValue();

    return this.serverOptionsNode;
  }
}
