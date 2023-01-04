import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { packageAdapterKey } from '../../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { PackageAdapterIdentifierNode } from './PackageAdapterIdentifierNode.js';

export class PackageAdapterNode extends IntermediateASTNode {
  private static classNodeName = packageAdapterKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPackageAdapterClassName,
      metadata,
      PackageAdapterNode.classNodeName,
    );
  }

  get identifier(): string {
    const identifierNode = this.identifierNode;
    if (!identifierNode) {
      throw new Error('PackageAdapter has no identifier node');
    }
    return identifierNode.name;
  }

  get identifierNode(): PackageAdapterIdentifierNode | undefined {
    return this.getChildren().find(
      (child) => child instanceof IntermediateASTIdentifierNode,
    ) as PackageAdapterIdentifierNode;
  }
}
