import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { PackageIdentifierKey } from '../../../../../types.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class PackageIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = PackageIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TPackageIdentifier, PackageIdentifierNode.classNodeName, metadata);
  }
}
