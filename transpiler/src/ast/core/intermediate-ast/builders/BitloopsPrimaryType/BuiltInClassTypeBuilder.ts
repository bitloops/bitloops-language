import { TBitloopsBuiltInClasses } from '../../../../../types.js';
import { BuiltInClassTypeNode } from '../../nodes/BitloopsPrimaryType/BuildInClassTypeNode.js';

import { IBuilder } from '../IBuilder.js';

export class BuiltInClassTypeBuilder implements IBuilder<BuiltInClassTypeNode> {
  private buildInClassTypeNode: BuiltInClassTypeNode;
  private type: TBitloopsBuiltInClasses;

  constructor() {
    this.buildInClassTypeNode = new BuiltInClassTypeNode();
  }

  public withType(type: TBitloopsBuiltInClasses): BuiltInClassTypeBuilder {
    this.type = type;
    return this;
  }

  public build(): BuiltInClassTypeNode {
    this.buildInClassTypeNode.buildLeafValue(this.type);

    return this.buildInClassTypeNode;
  }
}
