import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../../nodes/setup/BoundedContextModuleNode.js';
import { UseCaseExpressionNode } from '../../nodes/setup/UseCaseExpressionNode.js';
import { UseCaseIdentifierNode } from '../../nodes/UseCase/UseCaseIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class UseCaseExpressionNodeBuilder implements IBuilder<UseCaseExpressionNode> {
  private bcModuleNode: BoundedContextModuleNode;
  private useCaseIdentifierNode: UseCaseIdentifierNode;
  private argumentListNode: ArgumentListNode;
  private useCaseExpressionNode: UseCaseExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.useCaseExpressionNode = new UseCaseExpressionNode(metadata);
  }

  public withBoundedContextModule(
    bcModuleNode: BoundedContextModuleNode,
  ): UseCaseExpressionNodeBuilder {
    this.bcModuleNode = bcModuleNode;
    return this;
  }

  public withIdentifier(
    useCaseIdentifierNode: UseCaseIdentifierNode,
  ): UseCaseExpressionNodeBuilder {
    this.useCaseIdentifierNode = useCaseIdentifierNode;
    return this;
  }

  public withArguments(argumentListNode: ArgumentListNode): UseCaseExpressionNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): UseCaseExpressionNode {
    this.useCaseExpressionNode.addChild(this.bcModuleNode);
    this.useCaseExpressionNode.addChild(this.useCaseIdentifierNode);
    this.useCaseExpressionNode.addChild(this.argumentListNode);

    this.useCaseExpressionNode.buildObjectValue();

    return this.useCaseExpressionNode;
  }
}
