import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { PackagePortIdentifierNode } from './PackagePortIdentifierNode.js';

export class PackagePortNode extends IntermediateASTNode {
  private static classNodeName = 'port';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TPackagePort, metadata, PackagePortNode.classNodeName);
  }

  get identifier(): string {
    const identifierNode = this.identifierNode;
    if (!identifierNode) {
      throw new Error('PackagePortNode has no identifier node');
    }
    return identifierNode.name;
  }

  get identifierNode(): PackagePortIdentifierNode | undefined {
    return this.getChildren().find(
      (child) => child instanceof IntermediateASTIdentifierNode,
    ) as PackagePortIdentifierNode;
  }
}
