import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class PackagePortNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'port';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TPackagePortIdentifier, PackagePortNode.classNodeName, metadata);
  }
}
