import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { packageAdapterIdentifierKey } from '../../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class PackageAdapterIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = packageAdapterIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPackageAdapterIdentifier,
      PackageAdapterIdentifierNode.classNodeName,
      metadata,
    );
  }
  get name(): string {
    return this.getValue()[this.getClassNodeName()];
  }
}
