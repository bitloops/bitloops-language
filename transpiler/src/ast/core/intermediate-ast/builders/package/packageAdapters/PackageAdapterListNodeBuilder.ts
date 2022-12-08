import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { PackagePortNode } from '../../../nodes/package/packagePort/PackagePortNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PackageAdapterListNodeBuilder implements IBuilder<PackagePortNode> {
  private packageAdapterList: PackagePortNode;
  private adapters: any[];

  constructor(metadata?: TNodeMetadata) {
    this.packageAdapterList = new PackagePortNode(metadata);
  }

  public withAdapters(fieldListNode: any[]): PackageAdapterListNodeBuilder {
    this.adapters = fieldListNode;
    return this;
  }

  public build(): PackagePortNode {
    for (const adapter of this.adapters) {
      this.packageAdapterList.addChild(adapter);
    }

    this.packageAdapterList.buildArrayValue();

    return this.packageAdapterList;
  }
}
