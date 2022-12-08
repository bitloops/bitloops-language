import { ConstDeclarationListNode } from '../../nodes/ConstDeclarationListNode.js';
import { DomainCreateNode } from '../../nodes/Domain/DomainCreateNode.js';
import { EntityValuesNode } from '../../nodes/Entity/EntityValuesNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PrivateMethodDeclarationListNode } from '../../nodes/methods/PrivateMethodDeclarationListNode.js';
import { PublicMethodDeclarationListNode } from '../../nodes/methods/PublicMethodDeclarationListNode.js';
import { IBuilder } from '../IBuilder.js';

export class EntityValuesNodeBuilder implements IBuilder<EntityValuesNode> {
  private entityValuesNode: EntityValuesNode;
  private constantListNode?: ConstDeclarationListNode;
  private domainCreateNode: DomainCreateNode;
  private publicMethodListNode?: PublicMethodDeclarationListNode;
  private privateMethodListNode?: PrivateMethodDeclarationListNode;

  constructor(metadata?: TNodeMetadata) {
    this.entityValuesNode = new EntityValuesNode(metadata);
  }

  public withConstants(constantListNode: ConstDeclarationListNode): EntityValuesNodeBuilder {
    this.constantListNode = constantListNode;
    return this;
  }

  public withCreate(domainCreateNode: DomainCreateNode): EntityValuesNodeBuilder {
    this.domainCreateNode = domainCreateNode;
    return this;
  }

  public withPublicMethods(
    publicMethodListNode: PublicMethodDeclarationListNode,
  ): EntityValuesNodeBuilder {
    this.publicMethodListNode = publicMethodListNode;
    return this;
  }

  public withPrivateMethods(
    privateMethodListNode: PrivateMethodDeclarationListNode,
  ): EntityValuesNodeBuilder {
    this.privateMethodListNode = privateMethodListNode;
    return this;
  }

  public build(): EntityValuesNode {
    this.entityValuesNode.addChild(this.domainCreateNode);
    if (this.constantListNode) this.entityValuesNode.addChild(this.constantListNode);
    if (this.publicMethodListNode) this.entityValuesNode.addChild(this.publicMethodListNode);
    if (this.privateMethodListNode) this.entityValuesNode.addChild(this.privateMethodListNode);

    this.entityValuesNode.buildObjectValue();

    return this.entityValuesNode;
  }
}
