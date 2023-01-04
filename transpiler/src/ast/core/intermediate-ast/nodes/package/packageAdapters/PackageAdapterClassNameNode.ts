import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { packageAdapterClassNameKey } from '../../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { PackageAdapterIdentifierNode } from './PackageAdapterIdentifierNode.js';

export class PackageAdapterClassNameNode extends IntermediateASTNode {
  private static classNodeName = packageAdapterClassNameKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPackageAdapterClassName,
      metadata,
      PackageAdapterClassNameNode.classNodeName,
    );
  }

  get identifier(): string {
    const identifierNode = this.identifierNode;
    if (!identifierNode) {
      throw new Error('PackageAdapterClassName has no identifier node');
    }
    return identifierNode.name;
  }

  get identifierNode(): PackageAdapterIdentifierNode | undefined {
    return this.getChildren().find(
      (child) => child instanceof IntermediateASTIdentifierNode,
    ) as PackageAdapterIdentifierNode;
  }
}
