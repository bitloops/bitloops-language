import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { packageConcretionKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class PackageConcretionNode extends IntermediateASTNode {
  private static classNodeName = packageConcretionKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TPackageConcretion, metadata, PackageConcretionNode.classNodeName);
  }
}
