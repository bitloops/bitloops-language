import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { MethodDefinitionListNode } from '../../../nodes/method-definitions/MethodDefinitionListNode.js';
import { PackagePortIdentifierNode } from '../../../nodes/package/packagePort/PackagePortIdentifierNode.js';
import { PackagePortNode } from '../../../nodes/package/packagePort/PackagePortNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PackagePortNodeBuilder implements IBuilder<PackagePortNode> {
  private packagePort: PackagePortNode;
  private packagePortIdentifier: PackagePortIdentifierNode;
  private methodDefinitionListNode: MethodDefinitionListNode;

  constructor(metadata: TNodeMetadata) {
    this.packagePort = new PackagePortNode(metadata);
  }

  public withIdentifier(readModelIdentifier: PackagePortIdentifierNode): PackagePortNodeBuilder {
    this.packagePortIdentifier = readModelIdentifier;
    return this;
  }

  public withMethodDefinitions(fieldListNode: MethodDefinitionListNode): PackagePortNodeBuilder {
    this.methodDefinitionListNode = fieldListNode;
    return this;
  }

  public build(): PackagePortNode {
    this.packagePort.addChild(this.packagePortIdentifier);
    this.packagePort.addChild(this.methodDefinitionListNode);

    this.packagePort.buildObjectValue();

    return this.packagePort;
  }
}
