import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { PackageAdapterClassNameNode } from '../../../nodes/package/packageAdapters/PackageAdapterClassNameNode.js';
import { PackageAdapterIdentifierNode } from '../../../nodes/package/packageAdapters/PackageAdapterIdentifierNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PackageAdapterClassNameNodeBuilder implements IBuilder<PackageAdapterClassNameNode> {
  private packageAdapterClassNameNode: PackageAdapterClassNameNode;
  private packageAdapterIdentifier: PackageAdapterIdentifierNode;

  constructor(metadata: TNodeMetadata) {
    this.packageAdapterClassNameNode = new PackageAdapterClassNameNode(metadata);
  }

  public withIdentifier(
    readModelIdentifier: PackageAdapterIdentifierNode,
  ): PackageAdapterClassNameNodeBuilder {
    this.packageAdapterIdentifier = readModelIdentifier;
    return this;
  }

  public build(): PackageAdapterClassNameNode {
    this.packageAdapterClassNameNode.addChild(this.packageAdapterIdentifier);

    this.packageAdapterClassNameNode.buildObjectValue();

    return this.packageAdapterClassNameNode;
  }
}
