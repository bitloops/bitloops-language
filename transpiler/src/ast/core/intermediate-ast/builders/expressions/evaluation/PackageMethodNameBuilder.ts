import { PackageMethodNameNode } from '../../../nodes/Expression/Evaluation/PackageMethodNameNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PackageMethodNameBuilder implements IBuilder<PackageMethodNameNode> {
  private packageMethodNameNode: PackageMethodNameNode;
  private value: string;

  constructor(nodeMetadata: TNodeMetadata) {
    this.packageMethodNameNode = new PackageMethodNameNode(nodeMetadata);
  }

  public withName(value: string): PackageMethodNameBuilder {
    this.value = value;
    return this;
  }

  public build(): PackageMethodNameNode {
    this.packageMethodNameNode.buildLeafValue(this.value);

    return this.packageMethodNameNode;
  }
}
