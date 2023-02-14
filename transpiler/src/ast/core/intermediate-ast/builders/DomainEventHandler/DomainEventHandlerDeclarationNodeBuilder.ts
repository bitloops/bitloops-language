import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { EventHandleNode } from '../../nodes/EventHandleNode.js';
import { DomainEventHandlerDeclarationNode } from '../../nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { DomainEventHandlerIdentifierNode } from '../../nodes/DomainEventHandler/DomainEventHandlerIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainEventHandlerDeclarationNodeBuilder
  implements IBuilder<DomainEventHandlerDeclarationNode>
{
  private domainEventHandlerNode: DomainEventHandlerDeclarationNode;
  private identifierNode: DomainEventHandlerIdentifierNode;
  private parameterListNode: ParameterListNode;
  private handleNode: EventHandleNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.domainEventHandlerNode = new DomainEventHandlerDeclarationNode(metadata);
  }

  public withIdentifier(
    dtoIdentifierNode: DomainEventHandlerIdentifierNode,
  ): DomainEventHandlerDeclarationNodeBuilder {
    this.identifierNode = dtoIdentifierNode;
    const dtoName = dtoIdentifierNode.getIdentifierName();
    this.domainEventHandlerNode.setClassName(dtoName);
    return this;
  }

  public withParameterList(
    parameterListNode: ParameterListNode,
  ): DomainEventHandlerDeclarationNodeBuilder {
    this.parameterListNode = parameterListNode;
    return this;
  }

  public withHandleMethod(handle: EventHandleNode): DomainEventHandlerDeclarationNodeBuilder {
    this.handleNode = handle;
    return this;
  }

  public build(): DomainEventHandlerDeclarationNode {
    this.intermediateASTTree.insertChild(this.domainEventHandlerNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.parameterListNode);
    this.intermediateASTTree.insertSibling(this.handleNode);

    this.intermediateASTTree.setCurrentNodeToRoot();
    this.domainEventHandlerNode.buildObjectValue();

    return this.domainEventHandlerNode;
  }
}
