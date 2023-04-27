import { ParameterIdentifierNodeBuilder } from '../builders/ParameterList/ParameterIdentifierNodeBuilder.js';
import { ParameterListNodeBuilder } from '../builders/ParameterList/ParameterListNodeBuilder.js';
import { ParameterNodeBuilder } from '../builders/ParameterList/ParameterNodeBuilder.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../nodes/ParameterList/ParameterListNode.js';
import { ParameterNode } from '../nodes/ParameterList/ParameterNode.js';

export class ParameterListNodeBuilderDirector {
  private builder: ParameterListNodeBuilder;
  private metadata: TNodeMetadata;

  constructor(metadata?: TNodeMetadata) {
    this.builder = new ParameterListNodeBuilder(null);
    this.metadata = metadata;
  }
  buildParams(...params: ParameterNode[]): ParameterListNode {
    return this.builder.withParameters(params).build();
  }

  buildParamWithoutType(identifier: string): ParameterListNode {
    return this.builder
      .withParameters([
        new ParameterNodeBuilder(this.metadata)
          .withIdentifier(new ParameterIdentifierNodeBuilder().withIdentifier(identifier).build())
          .build(),
      ])
      .build();
  }
}
