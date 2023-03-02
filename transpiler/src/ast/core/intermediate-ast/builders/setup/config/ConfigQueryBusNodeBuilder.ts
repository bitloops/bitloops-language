import { TBusType } from '../../../../../../types.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ConfigQueryBusNode } from '../../../nodes/setup/config/ConfigQueryBusNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ConfigQueryBusNodeBuilder implements IBuilder<ConfigQueryBusNode> {
  private configQueryBusNode: ConfigQueryBusNode;
  private busType: TBusType;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.configQueryBusNode = new ConfigQueryBusNode(nodeMetadata);
  }

  public withBusType(type: TBusType): ConfigQueryBusNodeBuilder {
    this.busType = type;
    return this;
  }

  public build(): ConfigQueryBusNode {
    this.configQueryBusNode.buildLeafValue(this.busType);

    return this.configQueryBusNode;
  }
}
