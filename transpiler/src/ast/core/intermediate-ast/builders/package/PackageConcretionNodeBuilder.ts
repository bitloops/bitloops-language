import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PackageAdapterClassNameNode } from '../../nodes/package/packageAdapters/PackageAdapterClassNameNode.js';
import { PackageAdapterIdentifierNode } from '../../nodes/package/packageAdapters/PackageAdapterIdentifierNode.js';
import { PackageConcretionNode } from '../../nodes/package/PackageConcretionNode.js';
import { BoundedContextModuleNode } from '../../nodes/setup/BoundedContextModuleNode.js';
import { IBuilder } from '../IBuilder.js';

export class PackageConcretionNodeBuilder implements IBuilder<PackageConcretionNode> {
  private packageConcretionNode: PackageConcretionNode;
  private bcModuleNode: BoundedContextModuleNode;
  private packageAdapterClassNameNode: PackageAdapterClassNameNode;
  private packageAdapterIdentifierNode: PackageAdapterIdentifierNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.packageConcretionNode = new PackageConcretionNode(metadata);
  }

  public withBoundedContextModule(
    bcModuleNode: BoundedContextModuleNode,
  ): PackageConcretionNodeBuilder {
    this.bcModuleNode = bcModuleNode;
    return this;
  }

  public withAdapterClassName(
    packageAdapterClassNameNode: PackageAdapterClassNameNode,
  ): PackageConcretionNodeBuilder {
    this.packageAdapterClassNameNode = packageAdapterClassNameNode;
    return this;
  }

  public withAdapterIdentifier(
    packageAdapterIdentifierNode: PackageAdapterIdentifierNode,
  ): PackageConcretionNodeBuilder {
    this.packageAdapterIdentifierNode = packageAdapterIdentifierNode;
    return this;
  }

  public build(): PackageConcretionNode {
    this.intermediateASTTree.insertChild(this.packageConcretionNode);
    this.intermediateASTTree.insertChild(this.bcModuleNode);
    this.intermediateASTTree.insertSibling(this.packageAdapterClassNameNode);
    this.intermediateASTTree.insertSibling(this.packageAdapterIdentifierNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.packageConcretionNode.buildObjectValue();

    return this.packageConcretionNode;
  }
}
