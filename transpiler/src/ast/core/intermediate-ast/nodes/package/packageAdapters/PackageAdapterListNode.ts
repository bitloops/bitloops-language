import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class PackageAdapterListNode extends IntermediateASTNode {
  private static classNodeName = 'adapters';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TPackageAdapterList, metadata, PackageAdapterListNode.classNodeName);
  }
}
