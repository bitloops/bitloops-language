import { TBitloopsBuiltInClasses } from './../../../../types.js';
import { BuildInClassTypeNode } from '../../nodes/BitloopsPrimaryType/BuildInClassTypeNode.js';
import { IBuilder } from '../IBuilder.js';

export class BuildInClassTypeBuilder implements IBuilder<BuildInClassTypeNode> {
  private buildInClassTypeNode: BuildInClassTypeNode;
  private type: TBitloopsBuiltInClasses;

  constructor() {
    this.buildInClassTypeNode = new BuildInClassTypeNode();
  }

  public withType(type: TBitloopsBuiltInClasses): BuildInClassTypeBuilder {
    this.type = type;
    return this;
  }

  public build(): BuildInClassTypeNode {
    this.buildInClassTypeNode.setValue(this.type);

    return this.buildInClassTypeNode;
  }
}
