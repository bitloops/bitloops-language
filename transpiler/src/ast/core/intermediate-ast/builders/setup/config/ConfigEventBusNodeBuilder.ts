import { TBusType } from '../../../../../../types.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ConfigEventBusNode } from '../../../nodes/setup/config/ConfigEventBusNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ConfigEventBusNodeBuilder implements IBuilder<ConfigEventBusNode> {
  private configEventBusNode: ConfigEventBusNode;
  private busType: TBusType;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.configEventBusNode = new ConfigEventBusNode(nodeMetadata);
  }

  public withBusType(type: TBusType): ConfigEventBusNodeBuilder {
    this.busType = type;
    return this;
  }

  public build(): ConfigEventBusNode {
    this.configEventBusNode.buildLeafValue(this.busType);

    return this.configEventBusNode;
  }
}
