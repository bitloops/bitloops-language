import { TPackageAdapterIdentifier } from '../../../../../../types.js';
import { PackageAdapterIdentifierNode } from '../../../nodes/package/packageAdapters/PackageAdapterIdentifierNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PackageAdapterIdentifierNodeBuilder implements IBuilder<PackageAdapterIdentifierNode> {
  private packageAdapterIdentifierNode: PackageAdapterIdentifierNode;
  private name: TPackageAdapterIdentifier;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.packageAdapterIdentifierNode = new PackageAdapterIdentifierNode(nodeMetadata);
  }

  public withName(name: TPackageAdapterIdentifier): PackageAdapterIdentifierNodeBuilder {
    this.name = name;
    return this;
  }

  public build(): PackageAdapterIdentifierNode {
    this.packageAdapterIdentifierNode.buildLeafValue(this.name);

    return this.packageAdapterIdentifierNode;
  }
}
