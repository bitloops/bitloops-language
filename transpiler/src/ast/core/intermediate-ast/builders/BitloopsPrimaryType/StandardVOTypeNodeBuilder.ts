import { TStandardVO } from '../../../../../types.js';
import { StandardVOTypeNode } from '../../nodes/BitloopsPrimaryType/StandardVOTypeNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class StandardVOTypeNodeBuilder implements IBuilder<StandardVOTypeNode> {
  private standardVOTypeNodeBuilder: StandardVOTypeNode;
  private type: TStandardVO;

  constructor(metadata?: TNodeMetadata) {
    this.standardVOTypeNodeBuilder = new StandardVOTypeNode(metadata);
  }

  public withValue(type: TStandardVO): StandardVOTypeNodeBuilder {
    this.type = type;
    return this;
  }

  public build(): StandardVOTypeNode {
    this.standardVOTypeNodeBuilder.buildLeafValue(this.type);

    return this.standardVOTypeNodeBuilder;
  }
}
