import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { ConstDeclarationListNode } from '../../nodes/ConstDeclarationListNode.js';
import { DomainCreateNode } from '../../nodes/Domain/DomainCreateNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PrivateMethodDeclarationListNode } from '../../nodes/methods/PrivateMethodDeclarationListNode.js';
import { ValueObjectDeclarationNode } from '../../nodes/valueObject/ValueObjectDeclarationNode.js';
import { ValueObjectIdentifierNode } from '../../nodes/valueObject/ValueObjectIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class ValueObjectDeclarationNodeBuilder implements IBuilder<ValueObjectDeclarationNode> {
  private valueObjectDeclarationNode: ValueObjectDeclarationNode;
  private identifierNode: ValueObjectIdentifierNode;
  private constantListNode?: ConstDeclarationListNode;
  private domainCreateNode: DomainCreateNode;
  private privateMethodListNode?: PrivateMethodDeclarationListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.valueObjectDeclarationNode = new ValueObjectDeclarationNode(metadata);
  }

  public withIdentifier(
    valueObjectIdentifierNode: ValueObjectIdentifierNode,
  ): ValueObjectDeclarationNodeBuilder {
    this.identifierNode = valueObjectIdentifierNode;
    const voName = valueObjectIdentifierNode.getIdentifierName();
    this.valueObjectDeclarationNode.setClassName(voName);
    return this;
  }

  public withConstants(
    constantListNode: ConstDeclarationListNode,
  ): ValueObjectDeclarationNodeBuilder {
    this.constantListNode = constantListNode;
    return this;
  }

  public withCreate(domainCreateNode: DomainCreateNode): ValueObjectDeclarationNodeBuilder {
    this.domainCreateNode = domainCreateNode;
    return this;
  }

  public withPrivateMethods(
    privateMethodListNode: PrivateMethodDeclarationListNode,
  ): ValueObjectDeclarationNodeBuilder {
    this.privateMethodListNode = privateMethodListNode;
    return this;
  }

  public build(): ValueObjectDeclarationNode {
    this.intermediateASTTree.insertChild(this.valueObjectDeclarationNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.domainCreateNode);
    if (this.constantListNode) this.intermediateASTTree.insertSibling(this.constantListNode);
    if (this.privateMethodListNode)
      this.intermediateASTTree.insertSibling(this.privateMethodListNode);

    this.intermediateASTTree.setCurrentNodeToRoot();

    this.valueObjectDeclarationNode.buildObjectValue();

    return this.valueObjectDeclarationNode;
  }
}
