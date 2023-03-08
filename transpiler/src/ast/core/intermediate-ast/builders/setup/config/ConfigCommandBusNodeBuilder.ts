import { TBusType } from '../../../../../../types.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ConfigCommandBusNode } from '../../../nodes/setup/config/ConfigCommandBusNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ConfigCommandBusNodeBuilder implements IBuilder<ConfigCommandBusNode> {
  private configCommandBusNode: ConfigCommandBusNode;
  private busType: TBusType;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.configCommandBusNode = new ConfigCommandBusNode(nodeMetadata);
  }

  public withBusType(type: TBusType): ConfigCommandBusNodeBuilder {
    this.busType = type;
    return this;
  }

  public build(): ConfigCommandBusNode {
    this.configCommandBusNode.buildLeafValue(this.busType);

    return this.configCommandBusNode;
  }
}
