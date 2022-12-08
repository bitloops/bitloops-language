import { ConstDeclarationListNode } from '../../nodes/ConstDeclarationListNode.js';
import { DomainCreateNode } from '../../nodes/Domain/DomainCreateNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PrivateMethodDeclarationListNode } from '../../nodes/methods/PrivateMethodDeclarationListNode.js';
import { PublicMethodDeclarationListNode } from '../../nodes/methods/PublicMethodDeclarationListNode.js';
import { RootEntityValuesNode } from '../../nodes/RootEntity/RootEntityValuesNode.js';
import { IBuilder } from '../IBuilder.js';

export class RootEntityValuesNodeBuilder implements IBuilder<RootEntityValuesNode> {
  private RootentityValuesNode: RootEntityValuesNode;
  private constantListNode?: ConstDeclarationListNode;
  private domainCreateNode: DomainCreateNode;
  private publicMethodListNode?: PublicMethodDeclarationListNode;
  private privateMethodListNode?: PrivateMethodDeclarationListNode;

  constructor(metadata?: TNodeMetadata) {
    this.RootentityValuesNode = new RootEntityValuesNode(metadata);
  }

  public withConstants(constantListNode: ConstDeclarationListNode): RootEntityValuesNodeBuilder {
    this.constantListNode = constantListNode;
    return this;
  }

  public withCreate(domainCreateNode: DomainCreateNode): RootEntityValuesNodeBuilder {
    this.domainCreateNode = domainCreateNode;
    return this;
  }

  public withPublicMethods(
    publicMethodListNode: PublicMethodDeclarationListNode,
  ): RootEntityValuesNodeBuilder {
    this.publicMethodListNode = publicMethodListNode;
    return this;
  }

  public withPrivateMethods(
    privateMethodListNode: PrivateMethodDeclarationListNode,
  ): RootEntityValuesNodeBuilder {
    this.privateMethodListNode = privateMethodListNode;
    return this;
  }

  public build(): RootEntityValuesNode {
    this.RootentityValuesNode.addChild(this.domainCreateNode);
    if (this.constantListNode) this.RootentityValuesNode.addChild(this.constantListNode);
    if (this.publicMethodListNode) this.RootentityValuesNode.addChild(this.publicMethodListNode);
    if (this.privateMethodListNode) this.RootentityValuesNode.addChild(this.privateMethodListNode);

    this.RootentityValuesNode.buildObjectValue();

    return this.RootentityValuesNode;
  }
}
