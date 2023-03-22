import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { EntityIdentifierNode } from '../../nodes/Entity/EntityIdentifierNode.js';
import { ExtendsRepoPortsNode } from '../../nodes/extendsRepoPortNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { MethodDefinitionListNode } from '../../nodes/method-definitions/MethodDefinitionListNode.js';
import { ReadModelIdentifierNode } from '../../nodes/readModel/ReadModelIdentifierNode.js';
import { RepoPortIdentifierNode } from '../../nodes/repo-port/RepoPortIdentifierNode.js';
import { RepoPortNode } from '../../nodes/repo-port/RepoPortNode.js';
import { IBuilder } from '../IBuilder.js';

export class RepoPortBuilder implements IBuilder<RepoPortNode> {
  private repoPort: RepoPortNode;
  private repoPortIdentifierNode: RepoPortIdentifierNode;
  private entityIdentifierNode: EntityIdentifierNode;
  private readModelIdentifierNode: ReadModelIdentifierNode;
  private extendsRepoPorts: ExtendsRepoPortsNode;
  private definitionMethods: MethodDefinitionListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.repoPort = new RepoPortNode(metadata);
  }

  public withEntityIdentifier(entityIdentifierNode: EntityIdentifierNode): RepoPortBuilder {
    this.entityIdentifierNode = entityIdentifierNode;
    return this;
  }

  public withReadModelIdentifier(
    readModelIdentifierNode: ReadModelIdentifierNode,
  ): RepoPortBuilder {
    this.readModelIdentifierNode = readModelIdentifierNode;
    return this;
  }

  public withRepoPortIdentifierNode(
    repoPortIdentifierNode: RepoPortIdentifierNode,
  ): RepoPortBuilder {
    this.repoPortIdentifierNode = repoPortIdentifierNode;
    const repoPortName = repoPortIdentifierNode.getIdentifierName();
    this.repoPort.setClassName(repoPortName);
    return this;
  }

  public withExtendsRepoPortNode(extendsRepoPorts: ExtendsRepoPortsNode): RepoPortBuilder {
    this.extendsRepoPorts = extendsRepoPorts;
    return this;
  }

  public withDefinitionMethodsNode(definitionMethods: MethodDefinitionListNode): RepoPortBuilder {
    this.definitionMethods = definitionMethods;
    return this;
  }

  public build(): RepoPortNode {
    this.intermediateASTTree.insertChild(this.repoPort);
    this.intermediateASTTree.insertChild(this.repoPortIdentifierNode);
    this.intermediateASTTree.insertSibling(this.extendsRepoPorts);

    if (this.definitionMethods) {
      this.intermediateASTTree.insertSibling(this.definitionMethods);
    }

    if (this.entityIdentifierNode) {
      this.intermediateASTTree.insertSibling(this.entityIdentifierNode);
    } else {
      this.intermediateASTTree.insertSibling(this.readModelIdentifierNode);
    }
    this.intermediateASTTree.setCurrentNodeToRoot();
    this.repoPort.buildObjectValue();

    return this.repoPort;
  }
}
