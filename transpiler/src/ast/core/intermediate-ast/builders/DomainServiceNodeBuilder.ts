import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { DomainServiceNode } from '../nodes/domain-service/DomainServiceNode.js';
import { IdentifierNode } from '../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { PrivateMethodDeclarationListNode } from '../nodes/methods/PrivateMethodDeclarationListNode.js';
import { PublicMethodDeclarationListNode } from '../nodes/methods/PublicMethodDeclarationListNode.js';
import { ParameterListNode } from '../nodes/ParameterList/ParameterListNode.js';
import { IBuilder } from './IBuilder.js';

export class DomainServiceNodeBuilder implements IBuilder<DomainServiceNode> {
  private domainServiceNode: DomainServiceNode;
  private identifierNode: IdentifierNode;
  private parameterListNode: ParameterListNode;
  private publicMethodListNode: PublicMethodDeclarationListNode;
  private privateMethodListNode: PrivateMethodDeclarationListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.domainServiceNode = new DomainServiceNode(metadata);
  }

  public withIdentifier(domainServiceIdentifierNode: IdentifierNode): DomainServiceNodeBuilder {
    this.identifierNode = domainServiceIdentifierNode;
    const domainServiceName = domainServiceIdentifierNode.getIdentifierName();
    this.domainServiceNode.setClassName(domainServiceName);
    return this;
  }

  public withParameters(parameterListNode: ParameterListNode): DomainServiceNodeBuilder {
    this.parameterListNode = parameterListNode;
    return this;
  }

  public withPublicMethods(
    publicMethodListNode: PublicMethodDeclarationListNode,
  ): DomainServiceNodeBuilder {
    this.publicMethodListNode = publicMethodListNode;
    return this;
  }

  public withPrivateMethods(
    privateMethodListNode: PrivateMethodDeclarationListNode,
  ): DomainServiceNodeBuilder {
    this.privateMethodListNode = privateMethodListNode;
    return this;
  }

  public build(): DomainServiceNode {
    this.intermediateASTTree.insertChild(this.domainServiceNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.parameterListNode);
    this.intermediateASTTree.insertSibling(this.publicMethodListNode);
    if (this.privateMethodListNode) {
      this.intermediateASTTree.insertSibling(this.privateMethodListNode);
    }
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.domainServiceNode.buildObjectValue();
    return this.domainServiceNode;
  }
}
