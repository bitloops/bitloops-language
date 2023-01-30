import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class DefaultEnvVarValueNode extends IntermediateASTNode {
  private static classNodeName = 'defaultValue';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TDefaultValueEnvironmentVariable,
      metadata,
      DefaultEnvVarValueNode.classNodeName,
    );
  }
}
