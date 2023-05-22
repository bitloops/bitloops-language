import { IntermediateASTTree } from '../../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { MethodDefinitionListNode } from '../../../nodes/method-definitions/MethodDefinitionListNode.js';
import { PackagePortIdentifierNode } from '../../../nodes/package/packagePort/PackagePortIdentifierNode.js';
import { PackagePortNode } from '../../../nodes/package/packagePort/PackagePortNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PackagePortNodeBuilder implements IBuilder<PackagePortNode> {
  private packagePort: PackagePortNode;
  private packagePortIdentifier: PackagePortIdentifierNode;
  private methodDefinitionListNode: MethodDefinitionListNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.packagePort = new PackagePortNode(metadata);
  }

  public withIdentifier(packagePortIdentifier: PackagePortIdentifierNode): PackagePortNodeBuilder {
    this.packagePortIdentifier = packagePortIdentifier;

    const packagePortName = packagePortIdentifier.getIdentifierName();
    this.packagePort.setClassName(packagePortName);

    return this;
  }

  public withMethodDefinitions(fieldListNode: MethodDefinitionListNode): PackagePortNodeBuilder {
    this.methodDefinitionListNode = fieldListNode;
    return this;
  }

  public build(): PackagePortNode {
    this.intermediateASTTree.insertChild(this.packagePort);

    this.intermediateASTTree.insertChild(this.packagePortIdentifier);
    this.intermediateASTTree.insertSibling(this.methodDefinitionListNode);

    this.intermediateASTTree.setCurrentNodeToRoot();

    this.packagePort.buildObjectValue();

    return this.packagePort;
  }
}
