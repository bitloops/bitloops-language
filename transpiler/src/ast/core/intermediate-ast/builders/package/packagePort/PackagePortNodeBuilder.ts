import { FieldListNode } from '../../../nodes/FieldList/FieldListNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { PackagePortIdentifierNode } from '../../../nodes/package/packagePort/PackagePortIdentifierNode.js';
import { PackagePortNode } from '../../../nodes/package/packagePort/PackagePortNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PackagePortNodeBuilder implements IBuilder<PackagePortNode> {
  private packagePort: PackagePortNode;
  private packagePortIdentifier: PackagePortIdentifierNode;
  private fieldListNode: FieldListNode;

  constructor(metadata: TNodeMetadata) {
    this.packagePort = new PackagePortNode(metadata);
  }

  public withIdentifier(readModelIdentifier: PackagePortIdentifierNode): PackagePortNodeBuilder {
    this.packagePortIdentifier = readModelIdentifier;
    return this;
  }

  public withDefinitionMethods(fieldListNode: FieldListNode): PackagePortNodeBuilder {
    this.fieldListNode = fieldListNode;
    return this;
  }

  public build(): PackagePortNode {
    this.packagePort.addChild(this.packagePortIdentifier);
    this.packagePort.addChild(this.fieldListNode);

    this.packagePort.buildObjectValue();

    return this.packagePort;
  }
}
