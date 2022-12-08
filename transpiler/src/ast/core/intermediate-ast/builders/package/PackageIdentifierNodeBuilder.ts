import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { PackageIdentifierNode } from '../../nodes/package/PackageIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class PackageIdentifierNodeBuilder implements IBuilder<PackageIdentifierNode> {
  private packageIdentifierNode: PackageIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.packageIdentifierNode = new PackageIdentifierNode(metadata);
  }

  public withName(identifierName: string): PackageIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): PackageIdentifierNode {
    this.packageIdentifierNode.buildLeafValue(this.name);

    return this.packageIdentifierNode;
  }
}
