import { ErrorIdentifiersNode } from '../../nodes/ErrorIdentifiers/ErrorIdentifiersNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ReturnOkTypeNode } from '../../nodes/returnOkErrorType/ReturnOkTypeNode.js';
import { IBuilder } from '../IBuilder.js';

export class ReturnOkErrorTypeNodeBuilder implements IBuilder<ReturnOkErrorTypeNode> {
  private returnOkErrorTypeNode: ReturnOkErrorTypeNode;
  private okTypeNode: ReturnOkTypeNode;
  private errorsNode: ErrorIdentifiersNode;

  constructor(metadata?: TNodeMetadata) {
    this.returnOkErrorTypeNode = new ReturnOkErrorTypeNode(metadata);
  }

  public withOk(okTypeNode: ReturnOkTypeNode): ReturnOkErrorTypeNodeBuilder {
    this.okTypeNode = okTypeNode;
    return this;
  }

  public withErrors(errorsNode: ErrorIdentifiersNode): ReturnOkErrorTypeNodeBuilder {
    this.errorsNode = errorsNode;
    return this;
  }

  public build(): ReturnOkErrorTypeNode {
    this.returnOkErrorTypeNode.addChild(this.okTypeNode);
    this.returnOkErrorTypeNode.addChild(this.errorsNode);

    this.returnOkErrorTypeNode.buildObjectValue();

    return this.returnOkErrorTypeNode;
  }
}
