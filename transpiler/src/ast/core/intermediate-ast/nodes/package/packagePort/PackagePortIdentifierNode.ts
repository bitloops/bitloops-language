import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { PackagePortIdentifierKey } from '../../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class PackagePortIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = PackagePortIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPackagePortIdentifier,
      PackagePortIdentifierNode.classNodeName,
      metadata,
    );
  }

  get name(): string {
    return this.getValue()[this.getClassNodeName()];
  }
}
