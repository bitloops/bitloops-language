import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PackageIdentifierNode } from '../../nodes/package/PackageIdentifierNode.js';
import { PackageNode } from '../../nodes/package/PackageNode.js';
import { PackagePortNode } from '../../nodes/package/packagePort/PackagePortNode.js';
import { IBuilder } from '../IBuilder.js';

export class PackageNodeBuilder implements IBuilder<PackageNode> {
  private package: PackageNode;
  private identifierNode: PackageIdentifierNode;
  private packagePort: PackagePortNode;
  private packageAdapters: any;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.package = new PackageNode(metadata);
  }

  public withIdentifier(readModelIdentifier: PackageIdentifierNode): PackageNodeBuilder {
    this.identifierNode = readModelIdentifier;
    const readModelName = readModelIdentifier.getIdentifierName();
    this.package.setClassName(readModelName);
    return this;
  }

  public withPort(packagePort: PackagePortNode): PackageNodeBuilder {
    this.packagePort = packagePort;
    return this;
  }

  public withAdapters(packageAdapters: any): PackageNodeBuilder {
    this.packageAdapters = packageAdapters;
    return this;
  }

  public build(): PackageNode {
    this.intermediateASTTree.insertChild(this.package);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.packagePort);
    if (this.packageAdapters) {
      this.intermediateASTTree.insertSibling(this.packageAdapters);
    }
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.package.buildObjectValue();

    return this.package;
  }
}
