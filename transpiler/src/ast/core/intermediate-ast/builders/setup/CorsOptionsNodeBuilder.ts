import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';
import { CorsOptionsNode } from '../../nodes/setup/CorsOptionsNode.js';
import { CorsOriginNode } from '../../nodes/setup/CorsOriginNode.js';

export class CorsOptionsNodeBuilder implements IBuilder<CorsOptionsNode> {
  private corsOptionsNode: CorsOptionsNode;
  private corsOrigin: CorsOriginNode;

  constructor(metadata?: TNodeMetadata) {
    this.corsOptionsNode = new CorsOptionsNode(metadata);
  }

  // public withCorsOptionsList(corsOptionsList: CorsOptionsListNode): CorsOptionsNodeBuilder {
  //   this.corsOptionsList = corsOptionsList;
  //   return this;
  // }

  public withCorsOrigin(corsOrigin: CorsOriginNode): CorsOptionsNodeBuilder {
    this.corsOrigin = corsOrigin;
    return this;
  }

  public build(): CorsOptionsNode {
    this.corsOptionsNode.addChild(this.corsOrigin);
    this.corsOptionsNode.buildObjectValue();

    return this.corsOptionsNode;
  }
}
