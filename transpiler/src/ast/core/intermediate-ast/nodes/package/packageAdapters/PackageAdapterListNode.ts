import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class PackageAdapterListNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'adapters';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TPackageAdapterList, PackageAdapterListNode.classNodeName, metadata);
  }
}
