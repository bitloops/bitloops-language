import { TBusType } from '../../../../../../types.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ConfigIntegrationEventBusNode } from '../../../nodes/setup/config/ConfigIntegrationEventBusNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ConfigIntegrationEventBusNodeBuilder
  implements IBuilder<ConfigIntegrationEventBusNode>
{
  private configIntegrationEventBusNode: ConfigIntegrationEventBusNode;
  private busType: TBusType;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.configIntegrationEventBusNode = new ConfigIntegrationEventBusNode(nodeMetadata);
  }

  public withBusType(type: TBusType): ConfigIntegrationEventBusNodeBuilder {
    this.busType = type;
    return this;
  }

  public build(): ConfigIntegrationEventBusNode {
    this.configIntegrationEventBusNode.buildLeafValue(this.busType);

    return this.configIntegrationEventBusNode;
  }
}
