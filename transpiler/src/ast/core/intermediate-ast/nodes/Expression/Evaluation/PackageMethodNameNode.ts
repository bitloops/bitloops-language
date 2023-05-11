import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class PackageMethodNameNode extends IntermediateASTNode {
  private static classNodeName = 'methodName';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TPackageEvaluationMethod,
      metadata,
      PackageMethodNameNode.classNodeName,
    );
  }
}
