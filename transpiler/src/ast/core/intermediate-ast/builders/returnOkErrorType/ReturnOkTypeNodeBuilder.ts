import { BitloopsPrimaryTypeNode } from '../../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ReturnOkTypeNode } from '../../nodes/returnOkErrorType/ReturnOkTypeNode.js';
import { IBuilder } from '../IBuilder.js';

export class ReturnOkTypeNodeBuilder implements IBuilder<ReturnOkTypeNode> {
  private returnOkTypeNode: ReturnOkTypeNode;
  private type: BitloopsPrimaryTypeNode;

  constructor(metadata?: TNodeMetadata) {
    this.returnOkTypeNode = new ReturnOkTypeNode(metadata);
  }

  public withType(type: BitloopsPrimaryTypeNode): ReturnOkTypeNodeBuilder {
    this.type = type;
    return this;
  }

  public build(): ReturnOkTypeNode {
    this.returnOkTypeNode.addChild(this.type);

    this.returnOkTypeNode.buildObjectValue();

    return this.returnOkTypeNode;
  }
}
