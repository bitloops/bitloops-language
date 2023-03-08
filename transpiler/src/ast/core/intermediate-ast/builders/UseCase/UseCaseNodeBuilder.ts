import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { ExecuteNode } from '../../nodes/ExecuteNode.js';
import { UseCaseIdentifierNode } from '../../nodes/UseCase/UseCaseIdentifierNode.js';
import { UseCaseNode } from '../../nodes/UseCase/UseCaseNode.js';
import { IBuilder } from '../IBuilder.js';

export class UseCaseNodeBuilder implements IBuilder<UseCaseNode> {
  private useCaseNode: UseCaseNode;
  private identifierNode: UseCaseIdentifierNode;
  private executeNode: ExecuteNode;
  private parameterListNode: ParameterListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.useCaseNode = new UseCaseNode(metadata);
  }

  public withIdentifier(useCaseIdentifierNode: UseCaseIdentifierNode): UseCaseNodeBuilder {
    this.identifierNode = useCaseIdentifierNode;
    const useCaseName = useCaseIdentifierNode.getIdentifierName();
    this.useCaseNode.setClassName(useCaseName);
    return this;
  }

  public withParameterList(parameterListNode: ParameterListNode): UseCaseNodeBuilder {
    this.parameterListNode = parameterListNode;
    return this;
  }

  public withExecute(executeNode: ExecuteNode): UseCaseNodeBuilder {
    this.executeNode = executeNode;
    return this;
  }

  public build(): UseCaseNode {
    this.intermediateASTTree.insertChild(this.useCaseNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.executeNode);
    this.intermediateASTTree.insertSibling(this.parameterListNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.useCaseNode.buildObjectValue();

    return this.useCaseNode;
  }
}
