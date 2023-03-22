import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { HTTPMethodVerbNode } from '../../nodes/setup/HTTPMethodVerbNode.js';
import { IBuilder } from '../IBuilder.js';

export class HTTPMethodVerbNodeBuilder implements IBuilder<HTTPMethodVerbNode> {
  private httpMethodVerbNode: HTTPMethodVerbNode;
  private verb: string;

  constructor(metadata?: TNodeMetadata) {
    this.httpMethodVerbNode = new HTTPMethodVerbNode(metadata);
  }

  public withVerb(verb: string): HTTPMethodVerbNodeBuilder {
    this.verb = verb;
    return this;
  }

  public build(): HTTPMethodVerbNode {
    this.httpMethodVerbNode.buildLeafValue(this.verb);

    return this.httpMethodVerbNode;
  }
}
