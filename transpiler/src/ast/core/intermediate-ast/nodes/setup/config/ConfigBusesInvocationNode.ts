import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { configBusesInvocationKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class ConfigBusesInvocationNode extends IntermediateASTNode {
  private static classNodeName = configBusesInvocationKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TConfigBusesInvocationNode,
      metadata,
      ConfigBusesInvocationNode.classNodeName,
    );
  }
}
