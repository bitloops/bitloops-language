import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PackageConcretionNode } from '../../nodes/package/PackageConcretionNode.js';
import { BoundedContextModuleNode } from '../../nodes/setup/BoundedContextModuleNode.js';
import { IBuilder } from '../IBuilder.js';
import { PackagePortIdentifierNode } from '../../nodes/package/packagePort/PackagePortIdentifierNode.js';
import { PackageAdapterIdentifierNode } from '../../nodes/package/packageAdapters/PackageAdapterIdentifierNode.js';

export class PackageConcretionNodeBuilder implements IBuilder<PackageConcretionNode> {
  private packageConcretionNode: PackageConcretionNode;
  private bcModuleNode: BoundedContextModuleNode;
  private packageAdapterIdentifierNode: PackageAdapterIdentifierNode;
  private packagePortIdentifierNode: PackagePortIdentifierNode;
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

  public withAdapterIdentifier(
    packageAdapterIdentifierNode: PackageAdapterIdentifierNode,
  ): PackageConcretionNodeBuilder {
    this.packageAdapterIdentifierNode = packageAdapterIdentifierNode;
    return this;
  }

  public withPortIdentifier(
    packagePortIdentifierNode: PackagePortIdentifierNode,
  ): PackageConcretionNodeBuilder {
    this.packagePortIdentifierNode = packagePortIdentifierNode;
    return this;
  }

  public build(): PackageConcretionNode {
    this.intermediateASTTree.insertChild(this.packageConcretionNode);
    this.intermediateASTTree.insertChild(this.bcModuleNode);
    this.intermediateASTTree.insertSibling(this.packageAdapterIdentifierNode);
    this.intermediateASTTree.insertSibling(this.packagePortIdentifierNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.packageConcretionNode.buildObjectValue();

    return this.packageConcretionNode;
  }
}
