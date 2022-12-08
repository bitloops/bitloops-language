import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { PackagePortIdentifierNode } from '../../../nodes/package/packagePort/PackagePortIdentifierNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PackagePortIdentifierNodeBuilder implements IBuilder<PackagePortIdentifierNode> {
  private packagePortIdentifierNode: PackagePortIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.packagePortIdentifierNode = new PackagePortIdentifierNode(metadata);
  }

  public withName(identifierName: string): PackagePortIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): PackagePortIdentifierNode {
    this.packagePortIdentifierNode.buildLeafValue(this.name);

    return this.packagePortIdentifierNode;
  }
}
