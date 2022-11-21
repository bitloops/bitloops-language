import { TBitloopsBuildInClasses } from '../../../../types.js';
import { BuildInClassTypeNode } from '../../nodes/BitloopsPrimaryType/BuildInClassTypeNode.js';
import { IBuilder } from '../IBuilder.js';

export class BuildInClassTypeBuilder implements IBuilder<BuildInClassTypeNode> {
  private buildInClassTypeNode: BuildInClassTypeNode;
  private type: TBitloopsBuildInClasses;

  constructor() {
    this.buildInClassTypeNode = new BuildInClassTypeNode();
  }

  public withType(type: TBitloopsBuildInClasses): BuildInClassTypeBuilder {
    this.type = type;
    return this;
  }

  public build(): BuildInClassTypeNode {
    this.buildInClassTypeNode.setValue(this.type);

    return this.buildInClassTypeNode;
  }
}
