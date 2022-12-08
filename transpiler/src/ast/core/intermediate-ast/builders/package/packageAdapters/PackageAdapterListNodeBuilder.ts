import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { PackageAdapterListNode } from '../../../nodes/package/packageAdapters/PackageAdapterListNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PackageAdapterListNodeBuilder implements IBuilder<PackageAdapterListNode> {
  private packageAdapterList: PackageAdapterListNode;
  private adapters: any[];

  constructor(metadata?: TNodeMetadata) {
    this.packageAdapterList = new PackageAdapterListNode(metadata);
  }

  public withAdapters(fieldListNode: any[]): PackageAdapterListNodeBuilder {
    this.adapters = fieldListNode;
    return this;
  }

  public build(): PackageAdapterListNode {
    for (const adapter of this.adapters) {
      this.packageAdapterList.addChild(adapter);
    }

    this.packageAdapterList.buildArrayValue();

    return this.packageAdapterList;
  }
}
