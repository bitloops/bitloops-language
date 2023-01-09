import { ControllerInstanceNameNode } from '../../nodes/setup/ControllerInstanceNameNode.js';
import { IBuilder } from '../IBuilder.js';

export class ControllerInstanceNameNodeBuilder implements IBuilder<ControllerInstanceNameNode> {
  private controllerInstanceNameNode: ControllerInstanceNameNode;
  private instanceName: string;

  constructor() {
    this.controllerInstanceNameNode = new ControllerInstanceNameNode();
  }

  public withInstanceName(instanceName: string): ControllerInstanceNameNodeBuilder {
    this.instanceName = instanceName;
    return this;
  }

  public build(): ControllerInstanceNameNode {
    this.controllerInstanceNameNode.buildLeafValue(this.instanceName);

    return this.controllerInstanceNameNode;
  }
}
