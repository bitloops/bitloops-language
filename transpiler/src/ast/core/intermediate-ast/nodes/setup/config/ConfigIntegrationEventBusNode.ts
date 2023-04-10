import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class ConfigIntegrationEventBusNode extends IntermediateASTNode {
  private static classNodeName = 'integrationEventBus';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TConfigIntegrationEventBus,
      metadata,
      ConfigIntegrationEventBusNode.classNodeName,
    );
  }
}
