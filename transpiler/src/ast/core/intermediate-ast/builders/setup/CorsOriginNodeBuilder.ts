import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';
import { CorsOriginNode } from '../../nodes/setup/CorsOriginNode.js';
import { StringLiteralNode } from '../../nodes/Expression/Literal/StringLiteralNode.js';

export class CorsOriginNodeBuilder implements IBuilder<CorsOriginNode> {
  private corsOriginNode: CorsOriginNode;
  private originLiteral: StringLiteralNode;

  constructor(metadata?: TNodeMetadata) {
    this.corsOriginNode = new CorsOriginNode(metadata);
  }

  public withOrigin(originLiteral: StringLiteralNode): CorsOriginNodeBuilder {
    this.originLiteral = originLiteral;
    return this;
  }

  public build(): CorsOriginNode {
    this.corsOriginNode.addChild(this.originLiteral);
    this.corsOriginNode.buildObjectValue();

    return this.corsOriginNode;
  }
}
