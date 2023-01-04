import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ConfigInvocationNode } from '../../nodes/setup/ConfigInvocationNode.js';
import { IBuilder } from '../IBuilder.js';
import { CorsOptionsNode } from '../../nodes/setup/CorsOptionsNode.js';
import { CorsOriginNode } from '../../nodes/setup/CorsOriginNode.js';

export class CorsOptionsNodeBuilder implements IBuilder<CorsOptionsNode> {
  private corsOptionsNode: CorsOptionsNode;
  private corsOrigin: CorsOriginNode;

  constructor(metadata?: TNodeMetadata) {
    this.corsOptionsNode = new CorsOptionsNode(metadata);
  }

  public withOrigin(origin: CorsOriginNode): CorsOptionsNodeBuilder {
    this.corsOrigin = origin;
    return this;
  }

  public build(): ConfigInvocationNode {
    this.corsOptionsNode.addChild(this.corsOrigin);
    this.corsOptionsNode.buildObjectValue();

    return this.corsOptionsNode;
  }
}
